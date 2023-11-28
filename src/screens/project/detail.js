import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, Alert, RefreshControl } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import services from "../../api/services";
import useApi from "../../api/useApi";
import routes from "../../navigation/routes";
import BackButton from "../../component/Header/BackButton";
import BadgeIcon from "../../component/Badge/BadgeIcon";
import BadgeStatus from "../../component/Badge/BadgeStatus";

function ProjectDetail({ navigation, route }) {
    const [data, setData] = useState({});

    const getDetail = useApi(services.getProjectDetail);
    const updateProject = useApi(services.updateProject);

    const getData = async () => {
        let response = await getDetail.request(route.params.id);
        if (response.ok) {
            setData(response.data);
        }
    };

    const [refresh, setRefresh] = useState(getDetail.loading);

    const onRefresh = () => {
        getData();
    };

    useEffect(() => {
        onRefresh();
        setTimeout(() => {
            setRefresh(getDetail.loading);
        }, 2000);
    }, []);

    const stripped_description = data.description
        ? data.description.replace(/<[^>]+>/g, '')
        : '';

    const handleUpdate = async () => {
        const serviceResponse = await updateProject.request(data.id, {

        });

        if (serviceResponse.ok) {
            Alert.alert(serviceResponse.message);
            navigation.navigate(routes.EMPLOYEE_DETAIL, { id: data.id });
        } else {
            Alert.alert(serviceResponse.message);
        }
    };


    if (getDetail.loading || updateProject.loading) {
        return (
            <ActivityIndicator style={{ flex: 1 }} />
        );
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView style={styles.grayBackground}
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
                }>
                <View style={[styles.headerHome]}>
                    <View style={styles.headerTop}>
                        <View style={styles.headerLeft}>
                            {BackButton(navigation)}
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: -55 }}>

                    <View style={styles.mainContainer}>
                        <View style={styles.mainContainerTbody}>
                            <View style={styles.mainContainerLeft}>
                                <View style={styles.iconViewDanger}>
                                    <IconFa name="lightbulb" style={[styles.iconDanger, styles.fontSize12]} />
                                </View>
                            </View>
                            <View style={styles.mainContainerCenter}>
                                <View style={styles.flex1}>
                                    <Text style={styles.tbodyTitle}>Proje Başlığı </Text>
                                </View>
                                <View style={styles.flex1}>
                                    <Text style={styles.homeTbodyTitle}>{data.name}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mainContainer}>
                        <View style={styles.mainContainerTbody}>
                            <View style={styles.mainContainerLeft}>
                                <View style={styles.iconViewDanger}>
                                    <IconFa name="lightbulb" style={[styles.iconDanger, styles.fontSize12]} />
                                </View>
                            </View>
                            <View style={[styles.mainContainerCenter,]}>
                                <View style={[styles.mt10]}>
                                    <Text style={styles.tbodyTitle}>Öncelik </Text>
                                </View>
                            </View>
                            <View style={[styles.mainContainerRight, { flex: 0.3 }]}>
                                <Text style={[data.priority === 1 ? styles.tbodyStatusSuccess : '' || data.priority === 2 ? styles.tbodyStatusWarning : '' || data.priority === 3 ? styles.tbodyStatusDanger : '', { width: '100%', marginBottom: 10 }]}>{data.priority_text}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mainContainer}>
                        <View style={styles.mainContainerTbody}>
                            <View style={styles.mainContainerLeft}>
                                <BadgeIcon status={data.status} />
                            </View>
                            <View style={styles.mainContainerCenter}>
                                <View style={styles.mt10}>
                                    <Text style={styles.tbodyTitle}>Durum </Text>
                                </View>
                            </View>
                            <View style={[styles.mainContainerRight, { flex: 0.3 }]}>
                                <BadgeStatus status={data.status} text={data.status_text} badgeStyle={{ width: '100%', marginBottom: 10 }} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.mainContainer}>
                        <View style={styles.mainContainerTbody}>
                            <View style={styles.mainContainerLeft}>
                                <View style={styles.iconViewPrimary}>
                                    <IconFa name="users" style={[styles.iconPrimary, styles.fontSize12]} />
                                </View>
                            </View>
                            <View style={styles.mainContainerCenter}>
                                <View style={styles.flex1}>
                                    <Text style={styles.tbodyTitle}>Personeller </Text>
                                </View>
                                <View style={styles.flex1}>

                                    {
                                        data.employees ? data.employees.map((data, index) => (
                                            <TouchableOpacity style={styles.mainContainerTbody}
                                                onPress={() => navigation.navigate('EmployeeDetail', { id: data.id })}>
                                                <View style={styles.mainContainerCenter}>
                                                    <Text style={styles.homeTbodyTitle}>{data.full_name}</Text>
                                                </View>
                                                <View style={styles.mainContainerRight}>
                                                    <View style={styles.iconRight}>
                                                        <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )) : ''
                                    }

                                </View>
                            </View>

                        </View>
                    </View>

                    {
                        stripped_description !== '' ? (
                            <View style={styles.mainContainer}>
                                <View style={styles.flex1}>
                                    <Text style={styles.tbodyTitle}>Açıklama </Text>
                                </View>
                                <View style={styles.flex1}>
                                    <Text style={styles.homeTbodyTitle}>{stripped_description}</Text>
                                </View>
                            </View>
                        ) : ''
                    }

                </View>

            </ScrollView>
        </SafeAreaView >
    );
};

export default ProjectDetail;