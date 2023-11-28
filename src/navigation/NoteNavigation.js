import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteList from '../screens/note/index';
import routes from "./routes";
import AddNote from '../screens/note/add';
import DetailNote from '../screens/note/detail';

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

            <Stack.Screen name={routes.NOTE_LIST} component={NoteList}
                options={{
                    title: 'Notlarım',
                }}
            />

            <Stack.Screen name={routes.NOTE_ADD} component={AddNote}
                options={{
                    title: 'Notlarım',
                }}
            />
            
            <Stack.Screen name={routes.NOTE_DETAIL} component={DetailNote}
                options={{
                    title: 'Notlarım',
                }}
            />

        </Stack.Navigator>

    );
};

export default NoteNavigation;