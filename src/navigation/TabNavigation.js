import React, { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TaskList from '../screens/task/index';
import DrawerNavigation from "./DrawerNavigation";
import EditProfile from "../screens/profile/edit";
import IconFa from 'react-native-vector-icons/FontAwesome5';
import routes from "./routes";
import ProjectList from '../screens/project/index';
import EmployeeList from '../screens/employee/index';
import NoteList from '../screens/note/index';
import TaskNavigation from "./TaskNavigation";
import FilterTask from "../screens/task/filter";

const Tab = createMaterialTopTabNavigator();

function TabNavigation() {

    return (
        <Tab.Navigator>

            <Tab.Screen name={routes.TASK_LIST} component={TaskNavigation} options={{
                title: 'Tümü',
                // headerShown: true,
            }} />


            <Tab.Screen name={routes.NOTE_LIST} component={NoteList} options={{
                title: 'Başlanmış Görevler',
                // headerShown: true,
            }} />

            <Tab.Screen name={routes.PROJECT_LIST} component={ProjectList} options={{
                title: 'Başlanmış Görevler',
                // headerShown: true,
            }} />

            <Tab.Screen name={routes.FILTER_TASK} component={FilterTask}
                options={
                    route => ({
                        title: 'Bekleyen Görevler',
                        project_id: '',
                        employee_id: '',
                        priority_id: '',
                        status_id: 5,
                        end_date: ''
                    })}
            />


        </Tab.Navigator>

    );
};

export default TabNavigation;