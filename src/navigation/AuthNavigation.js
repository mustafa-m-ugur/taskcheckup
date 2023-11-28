import React, { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/login/Login";
import { useNavigation } from '@react-navigation/native';
import routes from "./routes";
import DrawerNavigation from './DrawerNavigation';
import asyncStorage from "../asyncStorage/index";

const Stack = createNativeStackNavigator();

function AuthNavigation() {

    const navigation = useNavigation();

    const [isLogin, setIsLogin] = useState(false);

    React.useEffect(() => {
        async function checkLogin() {
            const token = await asyncStorage.getToken();
            if (token) {
                setIsLogin(true);
                navigation.navigate(routes.HOME);
            }
        }
        checkLogin();
    }, []);

    return (
        <Stack.Navigator
            initialRouteName={isLogin ? routes.HOME : routes.LOGIN}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#38454a',
                },
                headerTintColor: '#fff',
                headerBackTitleVisible: false,
                headerBackTitle: ' ',
                headerShown: false,
            }}
        >

            <Stack.Screen name={routes.LOGIN} component={Login}
                options={({ route }) => ({
                    headerShown: false,
                    title: '',
                })}
            />

            <Stack.Screen
                name={routes.HOME}
                component={DrawerNavigation}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
};

export default AuthNavigation;