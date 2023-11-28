import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Pressable, Modal, RefreshControl, FlatList } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import services from "../../api/services";
import getList from "../../api/getList";

function EmployeeList({ navigation, route }) {

    let serviceResponse = getList({
        service: services.getEmployee,
    });

    const [refresh, setRefresh] = useState(serviceResponse.loading);

    const onRefresh = () => {
        serviceResponse.onRefresh();
    };

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

                    {
                        serviceResponse.data.length < 1 ? <Text>Data yok</Text> :
                            serviceResponse.data.map((data, index) => (
                                <TouchableOpacity style={styles.mainContainer}
                                    onPress={() => navigation.navigate('EmployeeDetail', { id: data.id })}
                                >
                                    <View style={styles.mainContainerTbody}>
                                        <View style={styles.containerLeft}>
                                            <View style={styles.iconViewSuccess}>
                                                <Text style={[styles.iconSuccess, styles.fontSize12]}>MU</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.mainContainerCenter, { marginLeft: 20 }]}>
                                            <View style={styles.flex1}>
                                                <Text style={styles.tbodyNumber}>#{data.id} - {data.title}</Text>
                                            </View>

                                            <View style={styles.flex1}>
                                                <Text style={[styles.tbodyTitle]}>{data.full_name}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.mainContainerRight}>
                                            <View style={styles.iconRight}>
                                                <IconFa name="angle-right" size={20} color="#e5ecfb" />
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

export default EmployeeList;