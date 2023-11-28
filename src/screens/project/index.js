import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Pressable, Modal, RefreshControl } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons';
import services from "../../api/services";
import getList from "../../api/getList";
import Dropdown from 'react-native-input-select';
import BadgeIcon from "../../component/Badge/BadgeIcon";
import AlertStatus from "../../component/Alert/alert";

function ProjectList({ navigation, route }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = React.useState('');

    let serviceResponse = getList({
        service: services.getProject,
        status_id: status,
    });

    let statusServiceResponse = getList({
        service: services.getStatus
    });

    const [refresh, setRefresh] = useState(serviceResponse.loading);

    const onRefresh = () => {
        serviceResponse.onRefresh();
    };

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
                                            setModalVisible(!modalVisible),
                                                filter(),
                                                navigation.navigate('ProjectList')
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
                    </View>

                    {
                        serviceResponse.data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                            serviceResponse.data.map((data, index) => (
                                <TouchableOpacity style={styles.mainContainer}
                                    onPress={() => navigation.navigate('ProjectDetail', { id: data.id })}
                                >
                                    <View style={styles.mainContainerTbody}>
                                        <View style={styles.containerLeft}>
                                            <BadgeIcon status={data.status} />
                                        </View>
                                        <View style={[styles.mainContainerCenter, { marginLeft: 20, }]}>

                                            <View style={styles.flex1}>
                                                <Text style={[styles.tbodyTitle]}>{data.name}</Text>
                                            </View>

                                            {
                                                data.duration ? <View style={styles.flex1}>
                                                    <Text style={styles.tbodyDate}><Text style={styles.fwBold}>Yenileme Tarihi / Kalan Süre:</Text> {data.duration}</Text>
                                                </View> : null
                                            }

                                            {
                                                data.end_date ? <View style={styles.flex1}>
                                                    <Text style={styles.tbodyDate}><Text style={styles.fwBold}>Teslim Tarihi:</Text> {data.end_date}</Text>
                                                </View> : null
                                            }

                                            {
                                                data.customer_full_name ? <View style={styles.flex1}>
                                                    <Text style={styles.tbodyDate}><Text style={styles.fwBold}>Müşteri Adı:</Text> {data.customer_full_name}</Text>
                                                </View> : null
                                            }

                                            {
                                                data.customer_company_name ? <View style={styles.flex1}>
                                                    <Text style={styles.tbodyDate}><Text style={styles.fwBold}>Firma:</Text> {data.customer_company_name}</Text>
                                                </View> : null
                                            }

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

export default ProjectList;