import React from 'react';
import { StyleSheet, Image, View, Dimensions, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import accountDetail from "../api/accountDetail";

const { width } = Dimensions.get('screen');
const CustomDrawer = props => {
    let user = accountDetail();

    return (
        <DrawerContentScrollView {...props}>
            <View style={{
                height: 150,
                backgroundColor: '#38454a',
                marginTop: -55,
            }}>
                <View style={styles.iconUserView}>
                    <Text style={styles.iconUser}>{user.user ? user.user.first_name.charAt(0).toUpperCase() : ''}{user.user ? user.user.last_name.charAt(0).toUpperCase() : ''}</Text>
                </View>
            </View>
            <View style={styles.drawerListWrapper}>
                <DrawerItemList {...props} />
            </View>
            {/* <View style={styles.imgBack}>
                <Image source={{
                    uri: 'https://www.taskcheckup.com/assets_web/images/logo.png',
                }} style={styles.userImg} />
            </View> */}
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    userImg1: {
        width: 110,
        height: 110,
        borderRadius: 110 / 2,
        position: 'absolute',
        left: width / 2 - 110,
        bottom: -110 / 2,
        borderWidth: 4,
        borderColor: '#fff',
    },
    userImg: {
        width: '90%',
        height: '10%',
        padding: 20,
        marginTop: 20,
        // borderBottomWidth: 4,
        // borderColor: '#333',
        // borderRadius: 110 / 2,
        // borderWidth: 4,
        // borderColor: '#fff',
    },
    imgBack: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#f3f6f9',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -250,
        // top: 700,
    },
    drawerListWrapper: {
        marginTop: 65,
    },
    iconUserView: {
        width: 110,
        height: 110,
        borderRadius: 110 / 2,
        position: 'absolute',
        left: width / 2 - 110,
        bottom: -110 / 2,
        backgroundColor: '#f3f6f9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconUser: {
        color: '#6c96e7',
        fontSize: 40,
    },
});