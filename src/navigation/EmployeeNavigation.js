import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeList from '../screens/employee/index';
import EmployeeDetail from '../screens/employee/detail';
import routes from "./routes";
import FilterTask from '../screens/task/filter';

const Stack = createNativeStackNavigator();

function EmployeeNavigation() {
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

            <Stack.Screen name={routes.EMPLOYEE_LIST} component={EmployeeList}
                options={{
                    title: 'Çalışanlar',
                }}
            />

            <Stack.Screen name={routes.EMPLOYEE_DETAIL} component={EmployeeDetail}
                options={{
                    title: 'Detay',
                }}
            />

            <Stack.Screen name={routes.FILTER_TASK} component={FilterTask}
                options={{
                    title: ' ',
                }}
            />

        </Stack.Navigator>

    );
};

export default EmployeeNavigation;