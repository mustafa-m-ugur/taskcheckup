import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationList from '../screens/notification/index';
import routes from "./routes";
import EditTask from "../screens/task/edit";

const Stack = createNativeStackNavigator();

function NoteNavigation() {
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

            <Stack.Screen name={routes.NOTIFICATION_LIST} component={NotificationList}
                options={{
                    title: 'Bildirimler',
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

export default NoteNavigation;