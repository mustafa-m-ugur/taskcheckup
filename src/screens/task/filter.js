import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Pressable, Modal, RefreshControl, FlatList } from "react-native";
import { styles } from "../../assets/style";
import services from "../../api/services";
import getList from "../../api/getList";
import BadgeIcon from "../../component/Badge/BadgeIcon";
import AlertStatus from "../../component/Alert/alert";
import BackButton from "../../component/Header/BackButton";

function FilterTask({ navigation, route }) {

    let project_id = route.params.project_id;
    let employee_id = route.params.employee_id;
    let priority_id = route.params.priority_id;
    let status_id = route.params.status_id;
    let end_date = route.params.end_date ? route.params.end_date : '';

    const [modalVisible, setModalVisible] = useState(false);
    const [project, setProject] = React.useState(project_id);
    const [employee, setEmployee] = React.useState(employee_id);
    const [priority, setPriority] = React.useState(priority_id);
    const [status, setStatus] = React.useState(status_id);

    let serviceResponse = getList({
        service: services.getTask,
        status_id: status,
        employee_id: employee,
        project_id: project,
        priority_id: priority,
        end_date: end_date,
    });

    const [refresh, setRefresh] = useState(serviceResponse.loading);

    const onRefresh = () => {
        serviceResponse.onRefresh();
    };

    useEffect(() => {
        setTimeout(() => {
            setRefresh(serviceResponse.loading);
        }, 2000);
    }, []);

    if (serviceResponse.loading) {
        return (
            <ActivityIndicator style={{ flex: 1 }} />
        );
    } else {

        return (
            <SafeAreaView style={styles.body}>
                <ScrollView style={styles.grayBackground}
                    refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
                    }>
                    <View style={styles.centeredView}>
                        {BackButton(navigation)}
                    </View>
                    {
                        serviceResponse.data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                            serviceResponse.data.map((data, index) => (
                                <TouchableOpacity style={styles.mainContainer}
                                    onPress={() => navigation.navigate('EditTask', { id: data.id })}
                                >
                                    <View style={styles.mainContainerTbody}>
                                        <View style={styles.containerLeft}>
                                            <View style={styles.flexDirectionRow}>
                                                <View style={styles.taskCardLeft}></View>
                                                <View style={{ flex: 0.9 }}>
                                                    <BadgeIcon status={data.status} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.containerRight}>
                                            <View style={styles.flex1}>
                                                <Text style={styles.tbodyNumber}>#{data.id} - {data.employee_name}</Text>
                                            </View>
                                            <View style={styles.flex1}>
                                                <Text style={[styles.tbodyTitle, data.status === 3 ? styles.delText : '']}>{data.title} {data.project_name ? '/ ' + data.project_name : ''}</Text>
                                            </View>
                                            {data.end_date ? (
                                                <View style={styles.flex1}>
                                                    <Text style={styles.tbodyDate}>Bitirme Tarihi: {data.end_date}</Text>
                                                </View>
                                            ) : ''}

                                            <View style={styles.flex1}>
                                                <Text style={styles.tbodyDate}>Oluşturulma Tarihi: {data.created_at}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                    }

                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default FilterTask;