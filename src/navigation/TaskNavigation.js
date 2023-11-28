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
import TimeTracking from "../screens/task/timeTracking";
import routes from "./routes";

const Stack = createNativeStackNavigator();

function TaskNavigation() {
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

            <Stack.Screen name={routes.TASK_LIST} component={TaskList}
                options={{
                    title: 'Görev Listesi',
                }} />

            <Stack.Screen name={routes.ADD_TASK} component={AddTask}
                options={{
                    title: 'Görev Ekle',
                }}
            />

            <Stack.Screen name={routes.FILTER_TASK} component={FilterTask}
                options={{
                    title: ' ',
                }}
            />

            <Stack.Screen name={routes.EDIT_TASK} component={EditTask}
                options={{
                    title: ' ',
                }}
            />

            <Stack.Screen name={routes.TIME_TRACKING} component={TimeTracking}
                options={{
                    title: ' ',
                }}
            />

        </Stack.Navigator>

    );
};

export default TaskNavigation;