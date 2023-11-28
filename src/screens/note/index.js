import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import services from "../../api/services";
import useApi from "../../api/useApi";
import AlertStatus from "../../component/Alert/alert";
import ActionButton from 'react-native-action-button';

function NoteList({ navigation, route }) {

    const [data, setData] = useState([]);
    const [oldData, setOldData] = useState([]);

    const serviceResponse = useApi(services.getNote);

    const getData = async () => {
        let response = await serviceResponse.request();
        if (response.ok) {
            setData(response.data);
            setOldData(response.data);
        }
    };

    const [refresh, setRefresh] = useState(serviceResponse.loading);

    const onRefresh = () => {
        getData();
    };

    useEffect(() => {
        onRefresh();
        setTimeout(() => {
            setRefresh(serviceResponse.loading);
        }, 2000);
    }, []);

    const searchFilterFunction = (text) => {
        if (text) {
            let newData = data.filter(function (item) {
                let itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                let textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(newData);
        } else {
            setData(oldData);
        }
    }

    if (serviceResponse.loading) {
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

                <View style={[styles.headerHome, {height: 60,}]}>
                    <View style={styles.headerTop}>
                        <View style={styles.searchContainer}>
                            <TextInput style={[styles.searchInput]} placeholder="Ara..." placeholderTextColor="#8d8d8d"
                                //onKeyPress={(e) => searchFilterFunction(e.nativeEvent.text)}
                                onChangeText={(text) => searchFilterFunction(text)}
                            />
                            <TouchableOpacity style={{
                                position: 'absolute',
                                top: 10,
                                right: 20,
                            }}>
                                <IconFa name="search" size={20} color="#ababab" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                {
                    data.length < 1 ? <AlertStatus text="Data Bulunamadı." /> :
                        data.map((data, index) => (
                            <TouchableOpacity style={[styles.mainContainer, { padding: 0 }]}
                                onPress={() => navigation.navigate('DetailNote', { id: data.id })}
                            >
                                <View style={styles.mainContainerTbody}>
                                    <View style={{ backgroundColor: '#38454a', flex: 0.1, }}></View>

                                    <View style={[styles.mainContainerCenter, { padding: 10, }]}>
                                        <View style={styles.flex1}>
                                            <Text style={[styles.tbodyTitle, styles.mt10, { fontSize: 13 }]}>{data.title}</Text>
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

            <View style={{ flex: 0.2, marginTop: -130, }}>
                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => navigation.navigate('AddNote')}></ActionButton>
            </View>
        </SafeAreaView>
    );
};

export default NoteList;