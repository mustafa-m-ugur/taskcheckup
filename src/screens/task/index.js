import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Pressable, Modal, RefreshControl, FlatList } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import services from "../../api/services";
import getList from "../../api/getList";
import Dropdown from 'react-native-input-select';
import BadgeIcon from "../../component/Badge/BadgeIcon";
import ActionButton from 'react-native-action-button';
import AlertStatus from "../../component/Alert/alert";
import { Tab, TabView } from '@rneui/themed';

function TaskList({ navigation, route }) {

    if (route.params && route.params.filter) {
        navigation.navigate('FilterTask', {
            project_id: route.params.project_id,
            employee_id: route.params.employee_id,
            priority_id: route.params.priority_id,
            status_id: route.params.status_id,
            end_date: route.params.end_date,
        });
    }


    const [modalVisible, setModalVisible] = useState(false);
    const [project, setProject] = React.useState('');
    const [employee, setEmployee] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [index, setIndex] = React.useState(0);

    let serviceResponse = getList({
        service: services.getTask,
        status_id: '',
        employee_id: '',
        project_id: '',
        priority_id: '',
        end_date: '',
    });

    let todoServiceResponse = getList({
        service: services.getTask,
        status_id: 5,
        employee_id: '',
        project_id: '',
        priority_id: '',
        end_date: '',
    });

    let inProgressServiceResponse = getList({
        service: services.getTask,
        status_id: 2,
        employee_id: '',
        project_id: '',
        priority_id: '',
        end_date: '',
    });

    let doneServiceResponse = getList({
        service: services.getTask,
        status_id: 3,
        employee_id: '',
        project_id: '',
        priority_id: '',
        end_date: '',
    });

    let statusServiceResponse = getList({
        service: services.getStatus
    });

    let employeeServiceResponse = getList({
        service: services.getSelectEmployee
    });

    let projectServiceResponse = getList({
        service: services.getSelectProject
    });

    let priorityServiceResponse = getList({
        service: services.getPriority
    });

    const [refresh, setRefresh] = useState(serviceResponse.loading);

    const onRefresh = () => {
        serviceResponse.onRefresh();
        todoServiceResponse.onRefresh();
        inProgressServiceResponse.onRefresh();
        doneServiceResponse.onRefresh();
        projectServiceResponse.onRefresh();
        employeeServiceResponse.onRefresh();
    };


    if (serviceResponse.loading) {
        return (
            <ActivityIndicator style={{ flex: 1 }} />
        );
    }

    return (
        <SafeAreaView style={styles.body}>
            <Tab
                value={index}
                scrollable={true}
                onChange={(e) => setIndex(e)}
                disableIndicator={true}
                buttonStyle={[styles.filterButton, styles.buttonShadow]}
                style={[styles.mb10, { marginTop: 20, }]}
            >
                <Tab.Item
                    title="Tümü"
                    titleStyle={(active) => ([active ? styles.filterButtonTextActive : styles.filterButtonText])}
                    buttonStyle={(active) => ([active ? styles.filterButtonActive : styles.filterButton])}
                />
                <Tab.Item
                    title="Beklemede"
                    titleStyle={(active) => ([active ? styles.filterButtonTextActive : styles.filterButtonText])}
                    buttonStyle={(active) => ([active ? styles.filterButtonActive : styles.filterButton])}
                />
                <Tab.Item
                    title="Başlandı"
                    titleStyle={(active) => ([active ? styles.filterButtonTextActive : styles.filterButtonText])}
                    buttonStyle={(active) => ([active ? styles.filterButtonActive : styles.filterButton])}
                />
                <Tab.Item
                    title="Tamamlandı"
                    titleStyle={(active) => ([active ? styles.filterButtonTextActive : styles.filterButtonText])}
                    buttonStyle={(active) => ([active ? styles.filterButtonActive : styles.filterButton])}
                />
            </Tab>


            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    <ScrollView style={styles.grayBackground}
                        refreshControl={
                            <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
                        }>

                        {
                            serviceResponse.data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                                serviceResponse.data.map((data, index) => (
                                    <TouchableOpacity style={[styles.mainContainer, styles.buttonShadow]}
                                        onPress={() => navigation.navigate('EditTask', { id: data.id })}
                                    >
                                        <View style={styles.mainContainerTbody}>
                                            <View style={[styles.containerLeft]}>
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
                </TabView.Item>

                <TabView.Item style={{ width: '100%' }}>
                    <ScrollView style={styles.grayBackground}
                        refreshControl={
                            <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
                        }>

                        {
                            todoServiceResponse.data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                                todoServiceResponse.data.map((data, index) => (
                                    <TouchableOpacity style={[styles.mainContainer, styles.buttonShadow]}
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
                </TabView.Item>

                <TabView.Item style={{ width: '100%' }}>
                    <ScrollView style={styles.grayBackground}
                        refreshControl={
                            <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
                        }>

                        {
                            inProgressServiceResponse.data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                                inProgressServiceResponse.data.map((data, index) => (
                                    <TouchableOpacity style={[styles.mainContainer, styles.buttonShadow]}
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
                </TabView.Item>

                <TabView.Item style={{ width: '100%' }}>
                    <ScrollView style={{ flex: 1 }}
                        refreshControl={
                            <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
                        }>
                        {
                            doneServiceResponse.data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                                doneServiceResponse.data.map((data, index) => (
                                    <TouchableOpacity style={[styles.mainContainer, styles.buttonShadow]}
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
                </TabView.Item>

            </TabView>

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


                            <Text style={[styles.label, styles.mb10]}> Öncelik </Text>

                            <Dropdown
                                label=''
                                placeholder="Öncelik Seçiniz"
                                options={priorityServiceResponse.data}
                                optionLabel={'name'}
                                optionValue={'id'}
                                selectedValue={priority}
                                onValueChange={(value) => setPriority(value)}
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
                                    navigation.navigate('FilterTask', {
                                        project_id: project,
                                        employee_id: employee,
                                        priority_id: priority,
                                        status_id: status,
                                    })
                            }}>
                            <Text style={styles.textStyle}>Filtrele</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>



            <View style={{ flex: 0.1, marginTop: -130, }}>
                <ActionButton buttonColor="rgba(231,76,60,1)" spacing={15} >
                    <ActionButton.Item buttonColor='#333' title="Filtreler" onPress={() => setModalVisible(true)}>
                        <IconFa name="filter" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#9b59b6' title="Görev Ekle" onPress={() => navigation.navigate('AddTask')}>
                        <IconFa name="plus" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Eforlar" onPress={() => navigation.navigate('TimeTracking')}>
                        <IconFa name="clock" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>

        </SafeAreaView>

    );

};

export default TaskList;