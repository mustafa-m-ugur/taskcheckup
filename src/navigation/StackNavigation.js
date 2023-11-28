import React, { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/index';
import TaskList from '../screens/task/index';
import FilterTask from '../screens/task/filter';
import AddTask from "../screens/task/add";
import EditTask from "../screens/task/edit";
import EditProfile from "../screens/profile/edit";
import routes from "./routes";

const Stack = createNativeStackNavigator();

function StackNavigation() {
    return (
        <Stack.Navigator
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

            {/* <Stack.Screen name="Login" component={Login} /> */}

            <Stack.Screen name=" " component={HomeScreen} options={{
                title: ' ',
                headerShown: false,
            }} />

            <Stack.Screen name="TaskList" component={TaskList} options={{
                title: ' ',
            }}
            // options={
            //     route => ({
            //         title: route.route.params.title,
            //     })}
            />

            <Stack.Screen name="AddTask" component={AddTask}
                options={{
                    title: 'Görev Ekle',
                }}
            />

            <Stack.Screen name={routes.EDIT_PROFILE} component={EditProfile}
                options={{
                    title: ' ',
                }}
            />

            <Stack.Screen name="FilterTask" component={FilterTask}
                options={{
                    title: ' ',
                }}
            />

            <Stack.Screen name="EditTask" component={EditTask}
                options={{
                    title: ' ',
                }}
            />

        </Stack.Navigator>

    );
};

export default StackNavigation;