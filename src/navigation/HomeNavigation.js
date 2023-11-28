import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/index';
import routes from "./routes";
import EditTask from "../screens/task/edit";

const Stack = createNativeStackNavigator();

function HomeNavigation() {
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

            <Stack.Screen
                name={routes.HOME_DRAWER}
                component={HomeScreen}
                options={{
                    title: 'Ana Sayfa',
                }}
            />

            <Stack.Screen name={routes.EDIT_TASK} component={EditTask}
                options={{
                    title: ' ',
                }}
            />

        </Stack.Navigator>

    );
};

export default HomeNavigation;