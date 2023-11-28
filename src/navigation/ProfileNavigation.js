import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../screens/profile/edit';
import routes from "./routes";

const Stack = createNativeStackNavigator();

function ProfileNavigation() {
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

            <Stack.Screen name={routes.EDIT_PROFILE} component={EditProfile}
                options={{
                    title: 'Çalışanlar',
                }}
            />

        </Stack.Navigator>

    );
};

export default ProfileNavigation;