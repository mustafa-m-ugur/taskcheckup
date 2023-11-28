import React, { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator } from "react-native";
import { styles } from "../../assets/style";
import services from "../../api/services";
import routes from "../../navigation/routes";
import useApi from "../../api/useApi";
import BackButton from "../../component/Header/BackButton";

function AddNote({ navigation, route }) {

    const [title, setTitle] = React.useState();
    const [description, setDescription] = React.useState();

    const createNote = useApi(services.createNote);

    const checkInput = async () => {
        if (title == null || title == "") {
            Alert.alert("Hata", "Başlık boş bırakılamaz!");
        } else {

            const serviceResponse = await createNote.request({
                title: title,
                description: description ? description : '',
            });

            if (serviceResponse.ok) {
                Alert.alert(serviceResponse.message);
                navigation.navigate(routes.NOTE_LIST);
            } else {
                Alert.alert(serviceResponse.message);
            }

        }
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView style={styles.grayBackground}>
                <View style={[styles.headerHome, { height: 60, }]}>
                    <View style={styles.headerTop}>
                        <View style={[styles.headerLeft]}>
                            {BackButton(navigation)}
                        </View>
                        <View style={styles.headerCenter}>
                            <Text style={[styles.employeeDetailInfoUpdateTitle, { color: '#fff', marginTop: 3, marginLeft: -15, }]}> Not Ekle</Text>
                        </View>
                        <View style={styles.headerRight}>

                        </View>
                    </View>
                </View>

                <View style={styles.main}>

                    <Text style={styles.label}> Başlık</Text>
                    <TextInput
                        placeholder="Başlık"
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />

                    <Text style={styles.label}>Açıklama</Text>
                    <TextInput
                        placeholder="Açıklama"
                        editable
                        multiline
                        numberOfLines={4}
                        style={[styles.textarea, styles.textColorBlack, styles.mt10, { marginLeft: 12 }]}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />

                    <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.mb10, styles.mt10]}>
                        {
                            createNote.loading ? <ActivityIndicator size={30} color="#900" /> : <TouchableOpacity style={styles.saveButton}
                                onPress={() => {
                                    checkInput();
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
};

export default AddNote;