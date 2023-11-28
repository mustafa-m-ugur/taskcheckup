import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert, RefreshControl, ActivityIndicator, Modal, Pressable } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import services from "../../api/services";
import useApi from "../../api/useApi";
import routes from "../../navigation/routes";
import BackButton from "../../component/Header/BackButton";

function DetailNote({ navigation, route }) {
    const [data, setData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const getDetail = useApi(services.getNoteDetail);
    const updateNote = useApi(services.updateNote);

    const getData = async () => {
        let response = await getDetail.request(route.params.id);
        if (response.ok) {
            setData(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description ? response.data.description.replace(/<[^>]+>/g, '') : '');
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
        const serviceResponse = await updateNote.request(data.id, {
            title: title,
            description: description,
        });

        if (serviceResponse.ok) {
            Alert.alert(serviceResponse.message);
            navigation.navigate(routes.NOTE_DETAIL, { id: data.id });
        } else {
            Alert.alert(serviceResponse.message);
        }
    };


    if (getDetail.loading || updateNote.loading) {
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
                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <View style={styles.iconView}>
                                    <IconFa name="edit" size={20} color="#9ea9ad" />
                                </View>
                            </TouchableOpacity>
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
                                    <Text style={[styles.tbodyTitle, styles.mt10]}>{data.title} </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mainContainer}>
                        <View style={styles.mainContainerTbody}>
                            <View style={styles.mainContainerCenter}>
                                <View style={styles.flex1}>
                                    <Text style={[styles.tbodyTitle, { textAlign: 'center' }]}>Açıklama </Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.flex1, styles.mt10]}>
                            <Text style={styles.homeTbodyTitle}>
                                {stripped_description !== '' ? stripped_description : ''}
                            </Text>
                        </View>

                    </View>

                </View>

            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Düzenle</Text>
                        <Pressable
                            style={[styles.closeButton]}
                            onPress={() => setModalVisible(false)}>
                            <IconFa name="times" color="#333" size={20} />
                        </Pressable>


                        <Text style={styles.labelModal}> Başlık</Text>
                        <TextInput
                            placeholder="Başlık"
                            style={[styles.textColorBlack, styles.dateButton]}
                            value={title}
                            onChangeText={(value) => setTitle(value)}
                        />


                        <Text style={[styles.labelModal, { marginLeft: -200 }]}>Açıklama</Text>

                        <TextInput
                            placeholder="Açıklama"
                            editable
                            multiline
                            numberOfLines={4}
                            style={[styles.textarea, styles.textColorBlack]}
                            value={description}
                            onChangeText={(value) => setDescription(value)}
                        />

                        <Pressable
                            style={[styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible),
                                    handleUpdate()
                            }}>
                            <Text style={styles.textStyle}>Kaydet</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default DetailNote;