import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Modal, Pressable, TextInput, Alert, RefreshControl } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import IconMa from 'react-native-vector-icons/MaterialIcons';
import services from "../../api/services";
import useApi from "../../api/useApi";
import getList from "../../api/getList";
import Dropdown from 'react-native-input-select';
import DatePicker from 'react-native-date-picker';
import routes from "../../navigation/routes";
import BackButton from "../../component/Header/BackButton";
import BadgeStatus from "../../component/Badge/BadgeStatus";

function EditTask({ navigation, route }) {

    const [statusModalVisible, setStatusModalVisible] = useState(false);
    const [eforModalVisible, setEforModalVisible] = useState(false);
    const [status, setStatus] = React.useState();
    const [durationType, setDurationType] = React.useState(1);
    const [duration, setDuration] = React.useState('');
    const [timeDescription, setTimeDescription] = React.useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const [data, setData] = useState({});

    const getDetail = useApi(services.getTaskDetail);
    const updateTask = useApi(services.updateTask);

    const getData = async () => {
        let response = await getDetail.request(route.params.id);
        if (response.ok) {
            setData(response.data);
            setStatus(response.data.status);
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

    // useEffect(() => {
    //     getData();
    // }, []);

    const stripped_description = data.description
        ? data.description.replace(/<[^>]+>/g, '')
        : '';

    let statusServiceResponse = getList({
        service: services.getStatus
    });

    const updateStatus = async () => {
        const serviceResponse = await updateTask.request(data.id, {
            status: status,
        });

        if (serviceResponse.ok) {
            Alert.alert(serviceResponse.message);
            navigation.navigate(routes.EDIT_TASK, { id: data.id });
        } else {
            Alert.alert(serviceResponse.message);
        }
    };

    const setTimeTracking = async () => {

        if (duration.length < 1) {
            Alert.alert('Lütfen süre giriniz.');
            return false;
        } else if (date.length < 1) {
            Alert.alert('Lütfen tarih giriniz.');
            return false;
        } else {

            const serviceResponse = await updateTask.request(data.id, {
                status: status,
                duration: duration,
                duration_type: durationType,
                date: date,
                time_description: timeDescription,

            });

            if (serviceResponse.ok) {
                Alert.alert(serviceResponse.message);
                navigation.navigate(routes.TASK_LIST);
            } else {
                Alert.alert(serviceResponse.message);
            }

        }

    };

    if (getDetail.loading || updateTask.loading) {
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

                    <View style={{ marginTop: -55, }}>

                        <View style={styles.mainContainer}>
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.mainContainerLeft}>
                                    <View style={styles.iconViewDanger}>
                                        <IconMa name="title" style={[styles.iconDanger, styles.fontSize12, {fontSize: 15}]} />
                                    </View>
                                </View>
                                <View style={styles.mainContainerCenter}>
                                    <View style={styles.flex1}>
                                        <Text style={styles.tbodyTitle}>Başlık </Text>
                                    </View>
                                    <View style={styles.flex1}>
                                        <Text style={styles.homeTbodyTitle}>{data.title}</Text>
                                    </View>
                                </View>
                                <View style={styles.mainContainerRight}></View>
                            </View>
                        </View>

                        <View style={styles.mainContainer}>
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.mainContainerLeft}>
                                <View style={data.priority === 1 ? styles.iconViewSuccess : '' || data.priority === 2 ? styles.iconViewWarning : '' || data.priority === 3 ? styles.iconViewDanger : ''}>
                                        <IconMa name="priority-high" style={[
                                            data.priority === 1 ? styles.iconSuccess : '' || data.priority === 2 ? styles.iconWarning : '' || data.priority === 3 ? styles.iconDanger : '',
                                             styles.fontSize12]} />
                                    </View>
                                </View>
                                <View style={[styles.mainContainerCenter,]}>
                                    <View style={[styles.flex1]}>
                                        <Text style={styles.tbodyTitle}>Öncelik </Text>
                                    </View>
                                    <View style={styles.flex1}>
                                        <Text style={data.priority === 1 ? styles.tbodyStatusSuccess : '' || data.priority === 2 ? styles.tbodyStatusWarning : '' || data.priority === 3 ? styles.tbodyStatusDanger : ''}>{data.priority_text}</Text>
                                    </View>
                                </View>
                                <View style={styles.mainContainerRight}></View>
                            </View>
                        </View>

                        <View style={styles.mainContainer}>
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.mainContainerLeft}>
                                    <View style={data.status === 3 ? styles.iconViewSuccess : '' || data.status === 4 ? styles.iconViewDanger : '' || data.status === 5 ? styles.iconViewWarning : '' || data.status === 2 ? styles.iconViewPrimary : ''}>
                                        <IconFa name="info" style={[
                                            data.status === 3 ? styles.iconSuccess : '' || data.status === 4 ? styles.iconDanger : '' || data.status === 5 ? styles.iconWarning : '' || data.status === 2 ? styles.iconPrimary : '',
                                             styles.fontSize12]} />
                                    </View>
                                </View>
                                <View style={styles.mainContainerCenter}>
                                    <View style={styles.flex1}>
                                        <Text style={styles.tbodyTitle}>Durum </Text>
                                    </View>
                                    <View style={styles.flex1}>
                                        <BadgeStatus status={data.status} text={data.status_text} badgeStyle={{ width: '30%' }} />
                                        {/* <Text style={data.status === 3 ? styles.tbodyStatusSuccess : '' || data.status === 4 ? styles.tbodyStatusDanger : '' || data.status === 5 ? styles.tbodyStatusWarning : '' || data.status === 2 ? styles.tbodyStatusDark : ''}>{data.status_text}</Text> */}
                                    </View>
                                </View>
                                <View style={styles.mainContainerRight}>
                                    <TouchableOpacity
                                        onPress={() => setStatusModalVisible(true)}>
                                        <View style={styles.iconViewDanger}>
                                            <IconFa name="edit" style={[styles.iconDanger, styles.fontSize12]} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.mainContainer}>
                            <View style={styles.mainContainerTbody}>
                                <View style={styles.mainContainerLeft}>
                                    <View style={styles.iconViewDanger}>
                                        <IconFa name="calendar" style={[styles.iconDanger, styles.fontSize12]} />
                                    </View>
                                </View>
                                <View style={styles.mainContainerCenter}>
                                    <View style={styles.flex1}>
                                        <Text style={styles.tbodyTitle}>Efor </Text>
                                    </View>
                                    <View style={styles.flex1}>
                                        <Text style={styles.homeTbodyTitle}>{data.duration_count}</Text>
                                    </View>
                                </View>
                                <View style={styles.mainContainerRight}>
                                    <TouchableOpacity
                                        onPress={() => setEforModalVisible(true)}>
                                        <View style={styles.iconViewDanger}>
                                            <IconFa name="edit" style={[styles.iconDanger, styles.fontSize12]} />
                                        </View>
                                    </TouchableOpacity>
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


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={statusModalVisible}
                    >
                        <View style={styles.centeredView2}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Durum Güncelle</Text>
                                <Pressable
                                    style={[styles.closeButton]}
                                    onPress={() => setStatusModalVisible(false)}>
                                    <IconFa name="times" color="#333" size={20} />
                                </Pressable>
                                <Dropdown
                                    label='Durum'
                                    placeholder="Durum Seçiniz"
                                    options={statusServiceResponse.data}
                                    optionLabel={'name'}
                                    optionValue={'id'}
                                    selectedValue={status}
                                    onValueChange={(value) => setStatus(value)}
                                    dropdownStyle={styles.dropInput}
                                    labelStyle={styles.label}
                                    dropdownContainerStyle={styles.dropContainer}
                                    selectedItemStyle={styles.dropItem}
                                    checkboxLabelStyle={{ color: '#333' }}
                                />

                                <Pressable
                                    style={[styles.buttonClose]}
                                    onPress={() => {
                                        setStatusModalVisible(!statusModalVisible),
                                            updateStatus()
                                    }}>
                                    <Text style={styles.textStyle}>Güncelle</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={eforModalVisible}
                    >
                        <View style={styles.centeredView2}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Efor Ekle</Text>
                                <Pressable
                                    style={[styles.closeButton]}
                                    onPress={() => setEforModalVisible(false)}>
                                    <IconFa name="times" color="#333" size={20} />
                                </Pressable>
                                <Dropdown
                                    label='Görev Durum'
                                    placeholder="Durum Seçiniz"
                                    options={statusServiceResponse.data}
                                    optionLabel={'name'}
                                    optionValue={'id'}
                                    selectedValue={status}
                                    onValueChange={(value) => setStatus(value)}
                                    dropdownStyle={styles.dropInput}
                                    labelStyle={styles.label}
                                    dropdownContainerStyle={styles.dropContainer}
                                    selectedItemStyle={styles.dropItem}
                                    checkboxLabelStyle={{ color: '#333' }}
                                />

                                <Text style={[styles.labelModal]}>Tarih</Text>
                                <TouchableOpacity style={styles.dateModalButton} onPress={() => setOpen(true)}>
                                    <Text style={styles.dateModalButtonText}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
                                    <View style={[styles.headerRight]}>
                                        <IconFa name="calendar" size={20} color="#9ea9ad" style={{ marginTop: -10 }} />
                                    </View>
                                </TouchableOpacity>

                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />


                                <Text style={styles.labelModal}> Süre</Text>
                                <TextInput
                                    placeholder="Süre"
                                    style={[styles.textColorBlack, styles.dateButton]}
                                    value={duration}
                                    onChangeText={(value) => setDuration(value)}
                                />


                                <Dropdown
                                    label='Süre Tipi'
                                    options={[
                                        { id: 1, name: 'Dakika' },
                                        { id: 2, name: 'Saat' },
                                    ]}
                                    optionLabel={'name'}
                                    optionValue={'id'}
                                    selectedValue={durationType}
                                    onValueChange={(value) => setDurationType(value)}
                                    dropdownStyle={styles.dropInput}
                                    labelStyle={styles.label}
                                    dropdownContainerStyle={styles.dropContainer}
                                    selectedItemStyle={styles.dropItem}
                                    checkboxLabelStyle={{ color: '#333' }}
                                />

                                <Text style={[styles.labelModal, { marginLeft: -200 }]}>Açıklama</Text>

                                <TextInput
                                    placeholder="Açıklama"
                                    editable
                                    multiline
                                    numberOfLines={4}
                                    style={[styles.textarea, styles.textColorBlack]}
                                    value={timeDescription}
                                    onChangeText={(value) => setTimeDescription(value)}
                                />

                                <Pressable
                                    style={[styles.buttonClose]}
                                    onPress={() => {
                                        setEforModalVisible(!eforModalVisible),
                                            setTimeTracking()
                                    }}>
                                    <Text style={styles.textStyle}>Kaydet</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default EditTask;