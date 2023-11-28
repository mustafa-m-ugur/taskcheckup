import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import services from "../../api/services";
import getList from "../../api/getList";
import AlertStatus from "../../component/Alert/alert";

function NotificationList({ navigation, route }) {
    let serviceResponse = getList({
        service: services.getNotification,
    });

    let notifyUpdate = getList({
        service: services.notificationUpdate
    })

    const [refresh, setRefresh] = useState(serviceResponse.loading);

    const onRefresh = () => {
        serviceResponse.onRefresh();
        notifyUpdate.onRefresh();
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


                    <View style={styles.mainContainer}>

                        {
                            serviceResponse.data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                                serviceResponse.data.map((data, index) => (

                                    <TouchableOpacity style={[styles.mainContainerTbody, styles.notificationCard, data.is_read == 0 ? styles.notificationCardBackground : '']}
                                    onPress={() => navigation.navigate('EditTask', { id: data.slug })}>
                                        <View style={[styles.mainContainerCenter]}>
                                            <View style={styles.flex1}>
                                                <Text style={[styles.tbodyDate]}>
                                                    <Text style={styles.fwBold}>{data.sender_full_name} </Text>
                                                    size bir görev atadı
                                                </Text>
                                            </View>

                                            <View style={styles.flex1}>
                                                <Text style={[styles.tbodyDate]}>
                                                    <Text style={styles.fwBold}>Görev : </Text>
                                                    <Text style={[styles.tbodyTitle]}> {data.title}</Text>
                                                </Text>

                                            </View>

                                        </View>

                                        <View style={styles.mainContainerRight}>
                                            <View style={styles.iconRight}>
                                                <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                            </View>
                                        </View>

                                    </TouchableOpacity>

                                ))
                        }

                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default NotificationList;