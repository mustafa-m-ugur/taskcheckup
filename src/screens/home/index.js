import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import accountDetail from "../../api/accountDetail";
import Moment from 'moment';
import services from "../../api/services";
import useApi from "../../api/useApi";
import getList from "../../api/getList";
import AlertStatus from "../../component/Alert/alert";
import BadgeIcon from "../../component/Badge/BadgeIcon";

function HomeScreen({ navigation, route }) {

    let user = accountDetail();

    const [data, setData] = useState({});

    const getDetail = useApi(services.getHome);

    const getData = async () => {
        let response = await getDetail.request();
        if (response.ok) {
            setData(response.data);
        }
    };

    let taskServiceResponse = getList({
        service: services.getTask,
        status_id: 5,
        employee_id: '',
        project_id: '',
        priority_id: '',
        end_date: '',
    });

    const [refresh, setRefresh] = useState(getDetail.loading);

    const onRefresh = () => {
        getData();
        taskServiceResponse.onRefresh();
    };

    useEffect(() => {
        onRefresh();
        setTimeout(() => {
            setRefresh(getDetail.loading);
        }, 2000);
    }, []);


    if (getDetail.loading) {
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

                <View style={[styles.headerHome]}></View>

                <View style={[styles.mainHomeContainer]}>
                    <View style={styles.profileMainContainer}>
                        <View style={styles.iconUserView}>
                            <IconFa name="user" style={styles.iconUser} />
                        </View>
                        <View style={styles.flex1}>
                            <Text style={styles.HomeTbodyNumber}>{user.user ? user.user.full_name : '-'}</Text>
                            <Text style={styles.homeTbodyTitle}>{user.user ? user.user.title : ''}</Text>
                        </View>

                        <TouchableOpacity style={styles.buttonProfile}
                            onPress={() => navigation.navigate('EditProfile')}>
                            <Text style={styles.buttonProfileText}><IconFa name="edit" size={12} color="#8ba8c6cc" /> Düzenle</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[taskServiceResponse.data.length > 0 ? {marginTop: 140} : styles.marginTopView]}>

                    {user.user && user.user.roles.projects_index ?
                        <TouchableOpacity style={styles.mainContainer}
                            onPress={() => navigation.navigate('TaskList')}
                        >
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.mainContainerLeft}>
                                    <View style={styles.iconViewWarning}>
                                        <IconFa name="edit" style={[styles.iconWarning, styles.fontSize12]} />
                                    </View>
                                </View>
                                <View style={styles.mainContainerCenter}>
                                    <View style={styles.flex1}>
                                        <Text style={styles.tbodyTitle}>Görevlerim </Text>
                                    </View>
                                    <View style={styles.flex1}>
                                        <Text style={styles.homeTbodyTitle}>Tüm Görevlerim</Text>
                                    </View>
                                </View>
                                <View style={styles.mainContainerRight}>
                                    <View style={styles.iconRight}>
                                        <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        : false
                    }

                    {user.user && user.user.roles.projects_index ?
                        <TouchableOpacity style={styles.mainContainer}
                            onPress={() => navigation.navigate('ProjectList')}
                        >
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.mainContainerLeft}>
                                    <View style={styles.iconViewDanger}>
                                        <IconFa name="lightbulb" style={[styles.iconDanger, styles.fontSize12]} />
                                    </View>
                                </View>
                                <View style={styles.mainContainerCenter}>
                                    <View style={styles.flex1}>
                                        <Text style={styles.tbodyTitle}>Projelerim </Text>
                                    </View>
                                    <View style={styles.flex1}>
                                        <Text style={styles.homeTbodyTitle}>Tüm Projelerim</Text>
                                    </View>
                                </View>
                                <View style={styles.mainContainerRight}>
                                    <View style={styles.iconRight}>
                                        <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        : false
                    }

                    {user.user && user.user.roles.notes_index ?
                        <TouchableOpacity style={styles.mainContainer}
                            onPress={() => navigation.navigate('NoteList')}
                        >
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.mainContainerLeft}>
                                    <View style={styles.iconViewSuccess}>
                                        <IconFa name="file-alt" style={[styles.iconSuccess, styles.fontSize12]} />
                                    </View>
                                </View>
                                <View style={styles.mainContainerCenter}>
                                    <View style={styles.flex1}>
                                        <Text style={styles.tbodyTitle}>Notlarım </Text>
                                    </View>
                                    <View style={styles.flex1}>
                                        <Text style={styles.homeTbodyTitle}>Tüm Notlarım</Text>
                                    </View>
                                </View>
                                <View style={styles.mainContainerRight}>
                                    <View style={styles.iconRight}>
                                        <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        : false
                    }

                    {user.user && user.user.roles.employees_index ?
                        <TouchableOpacity style={styles.mainContainer}
                            onPress={() => navigation.navigate('EmployeeList')}
                        >
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.mainContainerLeft}>
                                    <View style={styles.iconViewPrimary}>
                                        <IconFa name="user-circle" style={[styles.iconPrimary, styles.fontSize12]} />
                                    </View>
                                </View>
                                <View style={styles.mainContainerCenter}>
                                    <View style={styles.flex1}>
                                        <Text style={styles.tbodyTitle}>Çalışanlar </Text>
                                    </View>
                                    <View style={styles.flex1}>
                                        <Text style={styles.homeTbodyTitle}>Personel Listesi</Text>
                                    </View>

                                </View>

                                <View style={styles.mainContainerRight}>
                                    <View style={styles.iconRight}>
                                        <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        : false
                    }


                    <View style={[styles.flex1, { marginTop: 20 }]}>
                        <View style={styles.mainContainerTbody}>
                            <View style={styles.containerRight}>
                                <Text style={[styles.tbodyTitle]}>Son 5 Bekleyen Görev</Text>
                            </View>
                        </View>
                    </View>


                    <View style={[styles.mainContainer, { margin: 0 }]}>

                        {
                            taskServiceResponse.data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                                taskServiceResponse.data.map((data, index) => index < 5 ? (

                                    <TouchableOpacity style={[styles.mainContainerTbody, styles.notificationCard, data.is_read == 0 ? styles.notificationCardBackground : '']}
                                        onPress={() => navigation.navigate('EditTask', { id: data.id })}>
                                        <View style={[styles.mainContainerCenter]}>

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

                                        <View style={styles.mainContainerRight}>
                                            <View style={styles.iconRight}>
                                                <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                            </View>
                                        </View>

                                    </TouchableOpacity>

                                ) : false)
                        }

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default HomeScreen;