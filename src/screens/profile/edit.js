import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, RefreshControl, ActivityIndicator, Alert } from "react-native";
import { styles } from "../../assets/style";
import BackButton from "../../component/Header/BackButton";
import routes from "../../navigation/routes";
import useApi from "../../api/useApi";
import services from "../../api/services";

function EditProfile({ navigation, route }) {

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [gsm, setGsm] = useState('');

    const getDetail = useApi(services.account);
    const updateAccount = useApi(services.updateAccount);

    const getData = async () => {
        let response = await getDetail.request();
        if (response.ok) {
            setEmail(response.data.email);
            setPassword(response.data.password);
            setGsm(response.data.gsm);
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
        const serviceResponse = await updateAccount.request({
            email: email,
            password: pass,
            gsm: gsm,
        });

        if (serviceResponse.ok) {
            Alert.alert(serviceResponse.message);
            navigation.navigate(routes.EDIT_PROFILE);
        } else {
            Alert.alert(serviceResponse.message);
        }
    };


    if (getDetail.loading || updateAccount.loading) {
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

                    <View style={[styles.headerHome, { height: 60, }]}>
                        <View style={styles.headerTop}>
                            <View style={[styles.headerLeft]}>
                                {BackButton(navigation)}
                            </View>
                            <View style={styles.headerCenter}>
                                <Text style={[styles.employeeDetailInfoUpdateTitle, { color: '#fff', marginTop: 3, marginLeft: -15, }]}> Bilgileri Güncelle</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>
                    </View>

                    <View style={styles.main}>

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
                                updateAccount.loading ? <ActivityIndicator size={30} color="#900" /> : <TouchableOpacity style={styles.saveButton}
                                    onPress={() => {
                                        handleUpdate();
                                    }}
                                >
                                    <Text style={styles.buttonText}>Kaydet</Text>
                                </TouchableOpacity>
                            }


                        </View>


                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default EditProfile;