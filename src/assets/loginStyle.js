import { StyleSheet } from "react-native"

export const loginStyles = StyleSheet.create({
    loginBody: {
        flex: 1,
        backgroundColor: '#38454a',
    },
    mainLogin: {
        flex: 1,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
    },

    loginInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ddd',
        color: '#333',
    },

    loginLabel: {
        fontSize: 15,
        color: '#333',
        marginLeft: 12,
        marginTop: 12,
    },

    loginButtons: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
    },

    loginButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#13c56b',
        marginBottom: 30,
        marginTop: 20,
        width: '94%',
        alignItems: 'center',
    },

    loginButtonText: {
        fontSize: 15,
        color: '#fff'
    },

    loginHeader: {
        marginTop: 30,
        flex: 0,
        backgroundColor: '#7299e9',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        marginLeft: 10,
        marginRight: 10,
    },

    loginTitles: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10,
        alignItems: 'center',
    },

    loginTitle: {
        color: '#7299e9',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },

    loginText: {
        color: '#878a99',
        fontSize: 13,
        textAlign: 'center',
    },

    loginFooter: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },

    loginFooterText: {
        color: '#9ca2a4',
        fontSize: 10,
    },

    logo: {
        width: '90%',
        height: 50,
    },

})