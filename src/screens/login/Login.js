import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { loginStyles } from '../../assets/loginStyle';
import IconFa from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import routes from '../../navigation/routes';
import useApi from '../../api/useApi';
import services from '../../api/services';
import AsyncStorage from '../../asyncStorage/index';
import { Linking } from 'react-native';

const Login = () => {
  const navigation = useNavigation();

  const loginApi = useApi(services.login);
  const getContactInfo = useApi(services.account);

  const [email, setEmail] = React.useState('');
  const [pass, setPassword] = React.useState('');

  const handleLogin = async () => {
    const res = await loginApi.request({
      email: email,
      password: pass,
    });
    if (res.ok) {
      const { access_token, token } = res.data;
      if (access_token) {
        await AsyncStorage.storeToken(access_token);
        const _contactInfo = await getContactInfo.request();
        if (_contactInfo.ok) {
          await AsyncStorage.storeUser(_contactInfo.data);
        }
        navigation.navigate(routes.HOME);
      } else {
        Alert.alert(res.message);
      }

    }
  };

  const checkInput = () => {
    if (email.length < 1) {
      Alert.alert('Email Zorunlu');
    } else if (pass.length < 1) {
      Alert.alert('Şifre Zorunlu');
    } else {
      handleLogin();
    }
  };

  const myIcon = <IconFa name="rocket" size={30} color="#900" />;

  return (
    <SafeAreaView style={loginStyles.loginBody}>
      <ScrollView>

        <View style={loginStyles.loginHeader}>
          <Image
            style={loginStyles.logo}
            source={{
              uri: 'https://taskcheckup.com/assets_web/images/logo-white.png',
            }}
          />
        </View>

        <View style={loginStyles.mainLogin}>
          <View style={loginStyles.loginTitles}>
            <Text style={loginStyles.loginTitle}> Hoşgeldiniz !</Text>
            <Text style={loginStyles.loginText}>
              Task CheckUp'a devam etmek için oturum açın.
            </Text>
          </View>

          <Text style={loginStyles.loginLabel}> E-Posta</Text>

          <TextInput
            placeholder="E-Posta *"
            style={loginStyles.loginInput}
            onChangeText={newEmail => setEmail(newEmail)}
            value={email}
          />

          <Text style={loginStyles.loginLabel}>Şifre</Text>

          <TextInput
            secureTextEntry
            placeholder="Şifre *"
            style={loginStyles.loginInput}
            onChangeText={newPassword => setPassword(newPassword)}
            value={pass}
          />
        </View>

        <View style={loginStyles.loginButtons}>
          {
            loginApi.loading ? <ActivityIndicator size={30} color="#900" /> : <TouchableOpacity
              style={loginStyles.loginButton}
              onPress={() => {
                checkInput();
              }}>
              <Text style={loginStyles.loginButtonText}>Giriş Yap</Text>
            </TouchableOpacity>
          }
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity onPress={() => Linking.openURL('https://taskcheckup.com/fiyatlar')}>
              <Text style={[loginStyles.loginText, { color: '#6691e7' }]}>
                <Text style={{ color: '#878a99' }}>Üye Değilmisiniz</Text> Hemen Üye Ol
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={loginStyles.loginFooter}>
        <Text style={loginStyles.loginFooterText}>
          © 2023 CMD TECHNOLOGY Yazılımıdır.
        </Text>
      </View>

    </SafeAreaView>
  );
}

export default Login;