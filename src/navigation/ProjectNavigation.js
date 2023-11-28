import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectList from '../screens/project/index';
import routes from "./routes";
import ProjectDetail from "../screens/project/detail";
import EmployeeDetail from '../screens/employee/detail';

const Stack = createNativeStackNavigator();

function ProjectNavigation() {
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

            <Stack.Screen name={routes.PROJECT_LIST} component={ProjectList}
                options={{
                    title: 'Proje Listesi',
                }}
            />

            <Stack.Screen name={routes.PROJECT_DETAIL} component={ProjectDetail}
                options={{
                    title: 'Proje Listesi',
                }}
            />

            <Stack.Screen name={routes.EMPLOYEE_DETAIL} component={EmployeeDetail}
                options={{
                    title: 'Detay',
                }}
            />

        </Stack.Navigator>

    );
};

export default ProjectNavigation;