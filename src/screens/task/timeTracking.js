import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Pressable, Modal, RefreshControl, FlatList } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import Dropdown from 'react-native-input-select';
import DatePicker from 'react-native-date-picker';
import services from "../../api/services";
import getList from "../../api/getList";
import BadgeIcon from "../../component/Badge/BadgeIcon";
import AlertStatus from "../../component/Alert/alert";
import BackButton from "../../component/Header/BackButton";

function TimeTracking({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [project, setProject] = React.useState('');
    const [employee, setEmployee] = React.useState('');
    const [end_date, setEndDate] = React.useState(new Date());
    const [start_date, setStartDate] = React.useState(new Date());
    const [startOpen, setStartOpen] = React.useState(false);
    const [endOpen, setEndOpen] = React.useState(false);

    let serviceResponse = getList({
        service: services.getTimeTracking,
        employee_id: employee,
        project_id: project,
        start_date: start_date.toISOString().slice(0, 10),
        end_date: end_date.toISOString().slice(0, 10),
    });

    let employeeServiceResponse = getList({
        service: services.getSelectEmployee
    });

    let projectServiceResponse = getList({
        service: services.getSelectProject
    });

    const [refresh, setRefresh] = useState(serviceResponse.loading);

    const onRefresh = () => {
        serviceResponse.onRefresh();
        employeeServiceResponse.onRefresh();
        projectServiceResponse.onRefresh();
    };

    useEffect(() => {
        setTimeout(() => {
            setRefresh(serviceResponse.loading);
        }, 2000);
    }, []);

    function filter() {
        onRefresh();
    }

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

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View style={styles.centeredView2}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Filtreler</Text>
                                    <Pressable
                                        style={[styles.closeButton]}
                                        onPress={() => setModalVisible(false)}>
                                        <IconFa name="times" color="#333" size={20} />
                                    </Pressable>
                                    <View style={{ width: '100%' }}>

                                        <Text style={[styles.label, { marginBottom: 10, }]}>Başlangıç Tarihi</Text>
                                        <TouchableOpacity style={[styles.dateButton, { marginLeft: 10, }]} onPress={() => setStartOpen(true)}>
                                            <Text style={styles.dateButtonText}>{start_date.getDate()}/{start_date.getMonth() + 1}/{start_date.getFullYear()}</Text>
                                            <View style={styles.headerRight}>
                                                <IconFa name="calendar" size={20} color="#9ea9ad" style={{ marginTop: -10 }} />
                                            </View>
                                        </TouchableOpacity>

                                        <DatePicker
                                            modal
                                            open={startOpen}
                                            date={start_date}
                                            onConfirm={(start_date) => {
                                                setStartOpen(false)
                                                setStartDate(start_date)
                                            }}
                                            onCancel={() => {
                                                setStartOpen(false)
                                            }}
                                        />


                                        <Text style={[styles.label, { marginBottom: 10, }]}>Bitiş Tarihi</Text>
                                        <TouchableOpacity style={[styles.dateButton, { marginLeft: 10, }]} onPress={() => setEndOpen(true)}>
                                            <Text style={styles.dateButtonText}>{end_date.getDate()}/{end_date.getMonth() + 1}/{end_date.getFullYear()}</Text>
                                            <View style={styles.headerRight}>
                                                <IconFa name="calendar" size={20} color="#9ea9ad" style={{ marginTop: -10 }} />
                                            </View>
                                        </TouchableOpacity>

                                        <DatePicker
                                            modal
                                            open={endOpen}
                                            date={end_date}
                                            onConfirm={(end_date) => {
                                                setEndOpen(false)
                                                setEndDate(end_date)
                                            }}
                                            onCancel={() => {
                                                setEndOpen(false)
                                            }}
                                        />

                                        <Dropdown
                                            label="Projeler"
                                            placeholder="Proje Seçiniz"
                                            options={projectServiceResponse.data}
                                            optionLabel={'name'}
                                            optionValue={'id'}
                                            selectedValue={project}
                                            onValueChange={(value) => setProject(value)}
                                            dropdownStyle={styles.dropInput}
                                            labelStyle={styles.label}
                                            dropdownContainerStyle={styles.dropContainer}
                                            selectedItemStyle={styles.dropItem}
                                            checkboxLabelStyle={{ color: '#333' }}
                                        />

                                        <Dropdown
                                            label="Personeller"
                                            placeholder="Personel Seçiniz"
                                            options={employeeServiceResponse.data}
                                            optionLabel={'name'}
                                            optionValue={'id'}
                                            selectedValue={employee}
                                            onValueChange={(value) => setEmployee(value)}
                                            dropdownStyle={styles.dropInput}
                                            labelStyle={styles.label}
                                            dropdownContainerStyle={styles.dropContainer}
                                            selectedItemStyle={styles.dropItem}
                                            checkboxLabelStyle={{ color: '#333' }}
                                        />
                                    </View>

                                    <Pressable
                                        style={[styles.buttonClose]}
                                        onPress={() => {
                                            setModalVisible(!modalVisible),
                                                filter()
                                            navigation.navigate('TimeTracking', {
                                                project_id: project,
                                                employee_id: employee,
                                                start_date: start_date,
                                                end_date: end_date,
                                            })
                                        }}>
                                        <Text style={styles.textStyle}>Filtrele</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>

                        <Pressable
                            style={[styles.button, styles.mainContainer]}
                            onPress={() => setModalVisible(true)}>
                            <Text style={styles.textStyle}><IconFa name="filter" color="#333" /> Filtreler</Text>
                        </Pressable>


                        {
                            serviceResponse.data.length < 1 ? '' :
                                <View style={[styles.flex1, { width: '94%', marginBottom: 10, }]}>
                                    <Text style={[styles.tbodyStatusSuccess, styles.alertClass]}>TOPLAM EFOR : {serviceResponse.data[0].total} Saat {serviceResponse.data[0].minute} Dakika</Text>
                                </View>
                        }


                    </View>
                    {
                        serviceResponse.data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                            serviceResponse.data.map((data, index) => (
                                console.log(data.duration_count),
                                <TouchableOpacity style={styles.mainContainer}
                                    onPress={() => navigation.navigate('EditTask', { id: data.id })}
                                >
                                    <View style={styles.mainContainerTbody}>
                                        <View style={styles.containerCenter}>
                                            <View style={styles.flex1}>
                                                <Text style={[styles.tbodyNumber, styles.fwBold]}>Personel: {data.employee_name}</Text>
                                            </View>
                                            <View style={styles.flex1}>
                                                <Text style={[styles.tbodyTitle, data.status === 3 ? styles.delText : '']}>{data.task_title}</Text>
                                            </View>

                                            {data.end_date ? (
                                                <View style={styles.flex1}>
                                                    <Text style={styles.tbodyDate}>Tarih: {data.date}</Text>
                                                </View>
                                            ) : ''}

                                        </View>

                                        <View style={[styles.containerRight, { alignItems: 'flex-end', marginTop: 20, }]}>
                                            <View style={styles.flex1}>
                                                <Text style={styles.tbodyDate}>Çalışılan Süre:<Text style={styles.fwBold}>{data.duration_text}</Text></Text>
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

export default TimeTracking;