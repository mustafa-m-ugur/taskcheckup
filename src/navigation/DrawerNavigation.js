import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from "../assets/style";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFa from 'react-native-vector-icons/FontAwesome5';
import CustomDrawer from './CustomDrawer';
import routes from "./routes";
import { useNavigation } from '@react-navigation/native';
import TaskNavigation from "./TaskNavigation";
import HomeNavigation from "./HomeNavigation";
import ProjectNavigation from "./ProjectNavigation";
import NoteNavigation from "./NoteNavigation";
import EmployeeNavigation from "./EmployeeNavigation";
import ProfileNavigation from "./ProfileNavigation";
import accountDetail from "../api/accountDetail";
import asyncStorage from "../asyncStorage/index";
import NotificationNavigation from "./NotificationNavigation";
import services from "../api/services";
import getList from "../api/getList";

const Drawer = createDrawerNavigator();

function logoutApp() {
    const navigation = useNavigation();

    asyncStorage.removeToken();
    navigation.navigate(routes.LOGIN);
}

function DrawerNavigation({ route }) {

    const navigation = useNavigation();
    let user = accountDetail();

    let notifyServiceResponse = getList({
        service: services.getNotification,
    });

    if (notifyServiceResponse.data.length > 0) {
        notifyCount = notifyServiceResponse.data[0].count;
    } else {
        notifyCount = 0;
    }

    const updateNotify = () => {
        notifyServiceResponse.onRefresh();
    }

    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            drawerContentOptions={{
                drawerActiveBackgroundColor: '#333',
                itemStyle: {
                    backgroundColor: '#ddd',
                },
            }}
            screenOptions={{
                headerTitle: ' ',
                headerBackTitle: ' ',
                drawerActiveBackgroundColor: '#38454a',
                drawerActiveTintColor: '#fff',
                drawerLabelStyle: {
                    marginLeft: -20,
                },
                headerStyle: {
                    backgroundColor: '#38454a',
                },
                headerRight: () => (
                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('NotificationList'),
                                    updateNotify();
                            }}>
                            <Icon name="notifications-outline" size={20} color="#f3f6f9" style={{ marginTop: -10 }} />
                            {user.user ? notifyCount > 0 ? (
                                <View style={styles.badgeStyleHeaderIcon}>
                                    <Text style={styles.whiteText}>{notifyCount}</Text>
                                </View>
                            ) : false : false}
                        </TouchableOpacity>
                    </View>
                ),
                headerTitle: () => (
                    <View style={styles.headerCenter}>
                        <View style={[styles.logoView]}>
                            <Image
                                style={styles.logoHeader}
                                source={{
                                    uri: 'https://www.cmdtech.com.tr/assets_web/images/logo-white.png',
                                }}
                            />
                        </View>
                    </View>
                ),
            }}>

            <Drawer.Screen
                name={routes.HOME}
                component={HomeNavigation}
                options={{
                    title: 'Ana Sayfa',
                    drawerIcon: ({ focused, color, size }) => (
                        <IconFa name="home" size={18} color={color} />
                    ),
                }}
            />

            {user.user && user.user.roles.tasks_index ? <Drawer.Screen
                name={routes.TASK_LIST}
                component={TaskNavigation}
                options={{
                    title: 'Görevler',
                    drawerIcon: ({ focused, color, size }) => (
                        <IconFa name="edit" size={18} color={color} />
                    ),
                }}
            /> : false
            }

            {user.user && user.user.roles.projects_index ? <Drawer.Screen
                name={routes.PROJECT_LIST}
                component={ProjectNavigation}
                options={{
                    title: 'Projelerim',
                    drawerIcon: ({ focused, color, size }) => (
                        <IconFa name="lightbulb" size={18} color={color} />
                    ),
                }}
            /> : false
            }

            {user.user && user.user.roles.notes_index ? <Drawer.Screen
                name={routes.NOTE_LIST}
                component={NoteNavigation}
                options={{
                    title: 'Notlarım',
                    drawerIcon: ({ focused, color, size }) => (
                        <IconFa name="file-alt" size={18} color={color} />
                    ),
                }}
            /> : false
            }

            {user.user && user.user.roles.employees_index ? <Drawer.Screen
                name={routes.EMPLOYEE_LIST}
                component={EmployeeNavigation}
                options={{
                    title: 'Çalışanlar',
                    drawerIcon: ({ focused, color, size }) => (
                        <IconFa name="user-circle" size={18} color={color} />
                    ),
                }}
            /> : false
            }

            {user.user && user.user.roles.accounts_edit ? <Drawer.Screen
                name={routes.EDIT_PROFILE}
                component={ProfileNavigation}
                options={{
                    title: 'Hesabım',
                    drawerIcon: ({ focused, color, size }) => (
                        <IconFa name="user" size={18} color={color} />
                    ),
                }}
            /> : false
            }

            <Drawer.Screen
                name={routes.NOTIFICATION_LIST}
                component={NotificationNavigation}
                options={{
                    title: 'Bildirimler',
                    drawerIcon: ({ focused, color, size }) => (
                        <View>
                            <Icon name="notifications-outline" size={18} color={color} />
                            {user.user ? notifyCount > 0 ? (
                                <View style={styles.badgeStyleDrawerMenu}>
                                    <Text style={styles.whiteText}>{notifyCount}</Text>
                                </View>
                            ) : false : false}
                        </View>
                    ),

                }}
            />

            <Drawer.Screen
                name={routes.LOGOUT}
                component={logoutApp}
                options={{
                    title: 'Çıkış Yap',
                    drawerIcon: ({ focused, color, size }) => (
                        <IconFa name="sign-out-alt" size={18} color={color} />
                    ),
                }}
            />


        </Drawer.Navigator>

    );
};

export default DrawerNavigation;