import React, { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome';
import Dropdown from 'react-native-input-select';
import DatePicker from 'react-native-date-picker';
import services from "../../api/services";
import getList from "../../api/getList";
import routes from "../../navigation/routes";
import useApi from "../../api/useApi";
import BackButton from "../../component/Header/BackButton";

function AddTask({ navigation, route }) {

  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [project, setProject] = React.useState('');
  const [employee, setEmployee] = React.useState();
  const [priority, setPriority] = React.useState();
  const [date, setDate] = useState(new Date());
  const [dateView, setDateView] = useState('');
  const [open, setOpen] = useState(false);

  let employeeServiceResponse = getList({
    service: services.getSelectEmployee
  });

  let projectServiceResponse = getList({
    service: services.getSelectProject
  });

  let priorityServiceResponse = getList({
    service: services.getPriority
  });

  const createTask = useApi(services.createTask);

  const checkInput = async () => {
    if (title == null || title == "") {
      Alert.alert("Hata", "Başlık boş bırakılamaz!");
    } else if (employee == null || employee == "") {
      Alert.alert("Hata", "Personel boş bırakılamaz!");
    } else if (priority == null || priority == "") {
      Alert.alert("Hata", "Öncelik boş bırakılamaz!");
    } else {

      const serviceResponse = await createTask.request({
        project_id: project ? project : '',
        employee_id: employee,
        priority: priority,
        title: title,
        end_date: dateView ? dateView : '',
        description: description ? description : '',
      });

      if (serviceResponse.ok) {
        Alert.alert(serviceResponse.message);
        navigation.navigate(routes.TASK_LIST);
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
              <Text style={[styles.employeeDetailInfoUpdateTitle, { color: '#fff', marginTop: 3, marginLeft: -15, }]}> Görev Ekle</Text>
            </View>
            <View style={styles.headerRight}>

            </View>
          </View>
        </View>

        <View style={styles.main}>

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

          <Text style={styles.label}> Başlık</Text>

          <TextInput
            placeholder="Başlık"
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <Text style={styles.label}>Görev Bitirme Tarihi</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setOpen(true)}>
            <Text style={styles.dateButtonText}>
              {
                dateView ? dateView.getDate() + "/" + (dateView.getMonth() + 1) + "/" + dateView.getFullYear() : "Tarih Seçiniz"
              }
              {/* {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} */}
            </Text>
            <View style={[styles.headerRight, styles.mt10]}>
              <IconFa name="calendar" size={20} color="#9ea9ad" />
            </View>
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
              setDateView(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
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
              createTask.loading ? <ActivityIndicator size={30} color="#900" /> : <TouchableOpacity style={styles.saveButton}
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

export default AddTask;