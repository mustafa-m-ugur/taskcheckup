import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, Alert, RefreshControl } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import services from "../../api/services";
import useApi from "../../api/useApi";
import routes from "../../navigation/routes";
import Moment from 'moment';
import BackButton from "../../component/Header/BackButton";

function EmployeeDetail({ navigation, route }) {
    const [data, setData] = useState({});

    const [email, setEmail] = useState();
    const [pass, setPassword] = useState();
    const [gsm, setGsm] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [title, setTitle] = useState();

    const getDetail = useApi(services.getEmployeeDetail);
    const updateEmployee = useApi(services.updateEmployee);

    const getData = async () => {
        let response = await getDetail.request(route.params.id);
        if (response.ok) {
            setData(response.data);
            setEmail(response.data.email);
            setPassword(response.data.password);
            setGsm(response.data.gsm);
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setTitle(response.data.title);
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

    const handleUpdate = async () => {
        const serviceResponse = await updateEmployee.request(data.id, {
            email: email,
            password: pass,
            first_name: firstName,
            last_name: lastName,
            gsm: gsm,
            title: title,
        });

        if (serviceResponse.ok) {
            Alert.alert(serviceResponse.message);
            navigation.navigate(routes.EMPLOYEE_DETAIL, { id: data.id });
        } else {
            Alert.alert(serviceResponse.message);
        }
    };


    if (getDetail.loading || updateEmployee.loading) {
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
                    <View style={[styles.headerHome]}>
                        <View style={styles.headerTop}>
                            <View style={styles.headerLeft}>
                                {BackButton(navigation)}
                            </View>
                        </View>
                    </View>

                    <View style={styles.mainHomeContainer}>
                        <View style={[styles.profileMainContainer]}>
                            
                            <View style={styles.iconUserView}>
                                <IconFa name="user" style={styles.iconUser} />
                            </View>
                            
                            <View style={[styles.flex1, styles.alignItemsCenter]}>
                                <Text style={[styles.HomeTbodyNumber]}>{data.full_name}</Text>

                                <Text style={[styles.homeTbodyTitle]}> 
                                 <Text style={styles.fwBold}>Ünvan: </Text>
                                    {data.title}
                                </Text> 

                                <Text style={[styles.homeTbodyTitle]}> 
                                 <Text style={styles.fwBold}>E-Posta: </Text>
                                    {data.email}
                                </Text>

                            </View>

                           

                        </View>
                    </View>

                    <View style={{ marginTop: 150, }}>

                        <TouchableOpacity style={styles.mainContainer}
                            onPress={() => navigation.navigate('FilterTask', {
                                title: 'Bugün Tarihli Görevler',
                                project_id: '',
                                employee_id: route.params.id,
                                priority_id: '',
                                status_id: 5,
                                end_date: Moment().format('Y-MM-DD')
                            })}
                        >
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.containerLeft}>
                                    <View style={styles.iconViewDanger}>
                                        <Text style={[styles.iconDanger, styles.fontSize12]}>6</Text>
                                    </View>
                                </View>
                                <View style={[styles.mainContainerCenter, { marginLeft: 20 }]}>

                                    <View style={[styles.flex1, styles.mt10]}>
                                        <Text style={[styles.tbodyTitle]}>Bugün Tarihli Görevler</Text>
                                    </View>
                                </View>

                                <View style={styles.mainContainerRight}>
                                    <View style={styles.iconRight}>
                                        <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainContainer}
                            onPress={() => navigation.navigate('FilterTask', {
                                title: 'Bekleyen Görevler',
                                project_id: '',
                                employee_id: route.params.id,
                                priority_id: '',
                                status_id: 5,
                                end_date: ''
                            })}
                        >
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.containerLeft}>
                                    <View style={styles.iconViewPrimary}>
                                        <Text style={[styles.iconPrimary, styles.fontSize12]}>6</Text>
                                    </View>
                                </View>
                                <View style={[styles.mainContainerCenter, { marginLeft: 20 }]}>

                                    <View style={[styles.flex1, styles.mt10]}>
                                        <Text style={[styles.tbodyTitle]}>Bekleyen Görevler</Text>
                                    </View>
                                </View>

                                <View style={styles.mainContainerRight}>
                                    <View style={styles.iconRight}>
                                        <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainContainer}
                            onPress={() => navigation.navigate('FilterTask', {
                                title: 'Başlanmış Görevler',
                                project_id: '',
                                employee_id: route.params.id,
                                priority_id: '',
                                status_id: 2,
                                end_date: ''
                            })}
                        >
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.containerLeft}>
                                    <View style={styles.iconViewDark}>
                                        <Text style={[styles.iconDark, styles.fontSize12]}>6</Text>
                                    </View>
                                </View>
                                <View style={[styles.mainContainerCenter, { marginLeft: 20 }]}>

                                    <View style={[styles.flex1, styles.mt10]}>
                                        <Text style={[styles.tbodyTitle]}>Başlanmış Görevler</Text>
                                    </View>
                                </View>

                                <View style={styles.mainContainerRight}>
                                    <View style={styles.iconRight}>
                                        <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.mainContainer}
                            onPress={() => navigation.navigate('FilterTask', {
                                title: 'Tamamlanmış Görevler',
                                project_id: '',
                                employee_id: route.params.id,
                                priority_id: '',
                                status_id: 3,
                                end_date: ''
                            })}
                        >
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.containerLeft}>
                                    <View style={styles.iconViewSuccess}>
                                        <Text style={[styles.iconSuccess, styles.fontSize12]}>6</Text>
                                    </View>
                                </View>
                                <View style={[styles.mainContainerCenter, { marginLeft: 20 }]}>

                                    <View style={[styles.flex1, styles.mt10]}>
                                        <Text style={[styles.tbodyTitle]}>Tamamlanmış Görevler</Text>
                                    </View>
                                </View>

                                <View style={styles.mainContainerRight}>
                                    <View style={styles.iconRight}>
                                        <IconFa name="angle-right" size={20} color="#e5ecfb" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>


                        <View style={styles.main}>

                            <Text style={styles.employeeDetailInfoUpdateTitle}> Bilgileri Güncelle</Text>

                            <Text style={styles.label}> Adı</Text>
                            <TextInput
                                placeholder="Adı"
                                style={styles.input}
                                value={firstName}
                                onChangeText={newFirstName => setFirstName(newFirstName)}
                            />

                            <Text style={styles.label}> Soyadı</Text>
                            <TextInput
                                placeholder="Soyadı"
                                style={styles.input}
                                value={lastName}
                                onChangeText={newLastName => setLastName(newLastName)}
                            />

                            <Text style={styles.label}> Ünvan</Text>
                            <TextInput
                                placeholder="Ünvan"
                                style={styles.input}
                                value={title}
                                onChangeText={newTitle => setTitle(newTitle)}
                            />

                            <Text style={styles.label}> E-posta</Text>
                            <TextInput
                                placeholder="E-Posta"
                                style={styles.input}
                                value={email}
                                onChangeText={newEmail => setEmail(newEmail)}
                            />

                            <Text style={styles.label}> GSM</Text>
                            <TextInput
                                placeholder="GSM"
                                style={styles.input}
                                value={gsm}
                                onChangeText={newGsm => setGsm(newGsm)}
                            />

                            <Text style={styles.label}> Şifre</Text>

                            <TextInput
                                placeholder="Şifre"
                                style={styles.input}
                                onChangeText={newPassword => setPassword(newPassword)}
                            />

                            <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.mb10]}>

                                {
                                    updateEmployee.loading ? <ActivityIndicator size={30} color="#900" /> : <TouchableOpacity style={styles.saveButton}
                                        onPress={() => {
                                            handleUpdate();
                                        }}
                                    >
                                        <Text style={styles.buttonText}>Kaydet</Text>
                                    </TouchableOpacity>
                                }
                            </View>

                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default EmployeeDetail;