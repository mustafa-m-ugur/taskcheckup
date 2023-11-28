import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#f3f6f9',
        //backgroundColor: '#38454a',
        justifyContent: 'space-between',
    },

    grayBackground: {

    },

    logoViewHome: {
        flex: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    logoHome: {
        width: '30%',
        height: '20%',
    },

    logoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: '50%',
    },

    logo: {
        width: '100%',
        height: '50%',
    },

    logoHeader: {
        width: 170,
        height: 30,
        marginTop: -20,
    },

    header: {
        flex: 1,
        backgroundColor: '#38454a',
        height: 70,
        flexDirection: 'column',
    },

    headerHome: {
        flex: 1,
        backgroundColor: '#38454a',
        height: 100,
    },

    headerTop: {
        flexDirection: 'row',
    },

    main: {
        flex: 5,
        backgroundColor: '#fff',
        margin: 10,
    },

    footer: {
        backgroundColor: '#333',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },

    box: {
        color: '#333',
    },
    headerText: {
        color: '#fff',
    },

    headerLeft: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 10,
        marginTop: 20,
    },

    headerCenter: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 20,
    },

    headerRight: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 20,
    },

    footerText: {
        color: '#fff'
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ddd',
        color: '#333',
    },

    label: {
        fontSize: 15,
        color: '#333',
        marginLeft: 12,
        marginTop: 12,
    },

    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
    },

    button: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#333',
        marginBottom: 30,
        marginTop: 20,
        width: '94%',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 15,
        color: '#fff'
    },

    dropInput: {
        width: '94%',
        marginLeft: 10,
        padding: 0,
        borderColor: '#ddd',
        backgroundColor: 'transparent',
        color: '#333',
    },

    dropContainer: {
        marginBottom: 5,
    },

    dropItem: {
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent',
        color: '#333',
    },

    textarea: {
        width: '94%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingLeft: 5,
        borderRadius: 8,
    },

    dateModalButton: {
        width: '94%',
        borderWidth: 1,
        borderColor: '#ddd',
        height: 40,
        borderRadius: 8,
        flexDirection: 'row',
        //marginBottom: 20,
        paddingLeft: 5,
    },

    dateModalButtonText: {
        fontSize: 15,
        color: '#333',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 5,
    },

    dateButton: {
        width: '94%',
        borderWidth: 1,
        borderColor: '#ddd',
        height: 40,
        borderRadius: 8,
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: 12,
        marginTop: 10,
    },

    dateButtonText: {
        fontSize: 15,
        color: '#333',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 5,
    },

    blockContainer: {
        flexDirection: 'row',
        backgroundColor: '#f3f6f9',
        margin: 10,
    },

    pageLeft: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    pageRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    fwBold: {
        fontWeight: 'bold',
    },

    headButtonBlue: {
        padding: 10,
        backgroundColor: '#6691e7',
        marginTop: 10,
        alignItems: 'center',
        width: '49%'
    },

    headButtonText: {
        fontSize: 12,
        color: '#fff'
    },

    headButtonRed: {
        padding: 10,
        // marginTop: 10,
        // marginLeft: 5,
        backgroundColor: '#ed5e5e',
        alignItems: 'center',
        width: 100
    },

    mainContainer: {
        padding: 10,
        flex: 5,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },

    flex1: {
        flex: 1,
    },

    tbodyTitle: {
        fontSize: 15,
        paddingBottom: 10,
        color: '#333',
    },

    tbodyNumber: {
        marginBottom: 5,
        fontSize: 10,
        color: '#999'
    },

    tbodyDate: {
        fontSize: 10,
        color: '#999'
    },

    tbodyStatusSuccess: {
        width: '25%',
        color: '#13c56b',
        padding: 5,
        backgroundColor: '#eaf9f1',
        borderColor: '#eaf9f1',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 10,
        textAlign: 'center',
        marginTop: 10,
    },

    tbodyStatusDanger: {
        width: '25%',
        color: '#ed5e5e',
        padding: 5,
        backgroundColor: '#fdf0f0',
        borderColor: '#fdf0f0',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 10,
        textAlign: 'center',
        marginTop: 10,
    },

    tbodyStatusWarning: {
        width: '25%',
        color: '#e8bc52',
        padding: 5,
        backgroundColor: '#fcf8ef',
        borderColor: '#fcf8ef',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 10,
        textAlign: 'center',
        marginTop: 10,
    },

    tbodyStatusDark: {
        width: '25%',
        color: '#fff',
        padding: 5,
        backgroundColor: '#363d48',
        borderColor: '#363d48',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 10,
        textAlign: 'center',
        marginTop: 10,
    },

    mainContainerTbody: {
        flexDirection: 'row',
    },

    containerLeft: {
        flex: 0.1,
        justifyContent: 'center',
    },

    containerRight: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
    },

    iconViewSuccess: {
        width: 30,
        height: 30,
        backgroundColor: '#eaf9f1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    iconSuccess: {
        color: '#13c56b',
        fontSize: 20,
    },

    iconViewWarning: {
        width: 30,
        height: 30,
        backgroundColor: '#fcf8ef',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    iconWarning: {
        color: '#e8bc52',
        fontSize: 20,
    },

    iconViewDark: {
        width: 30,
        height: 30,
        backgroundColor: '#363d48',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    iconDark: {
        color: '#f1f1f1',
        fontSize: 20,
    },


    iconViewDanger: {
        width: 30,
        height: 30,
        backgroundColor: '#fdf0f0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    iconDanger: {
        color: '#ed5e5e',
        fontSize: 20,
        //textDecorationLine: 'line-through'
    },

    iconViewPrimary: {
        width: 30,
        height: 30,
        backgroundColor: '#e5ecfb',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

    },

    iconPrimary: {
        color: '#6c96e7',
        fontSize: 20,
    },

    checkIcon: {
        color: '#6c96e7',
        fontSize: 20,
    },

    homeTbodyTitle: {
        fontSize: 13,
        color: '#878a99',
        marginBottom: 10,
    },

    HomeTbodyNumber: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
        textAlign: 'center'
    },

    HomeTbodyUrl: {
        fontSize: 13,
        color: '#878a99',
        marginBottom: 10,
    },

    homeContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 10,
        height: 70,
    },

    headLeft: {
        padding: 10,
        marginLeft: 5,
        alignItems: 'flex-start',
        width: '50%'
    },

    headLeftText: {
        fontSize: 15,
        // fontWeight: 'bold'
    },

    homeButtonRed: {
        padding: 10,
        backgroundColor: '#ed5e5e',
        alignItems: 'flex-end',

    },

    mainHomeContainer: {
        position: 'absolute',
        top: '5%',
        width: '100%',
    },

    marginTopView: {
        marginTop: 110,
    },

    profileMainContainer: {
        padding: 10,
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,
    },

    iconUserView: {
        width: 70,
        height: 70,
        marginBottom: 10,
        marginTop: -30,
        backgroundColor: '#f3f6f9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },

    iconUser: {
        color: '#6c96e7',
        fontSize: 30,
    },

    buttonProfile: {
        padding: 10,
        backgroundColor: '#f3f6f9',
        marginTop: 10,
        alignItems: 'center',
        width: 100,
        borderRadius: 10
    },

    buttonHomeCard: {
        padding: 10,
        backgroundColor: '#f3f6f9',
        alignItems: 'center',
        width: 150,
        borderRadius: 10,
        fontSize: 10,
    },

    buttonProfileText: {
        fontSize: 12,
        color: '#8ba8c6cc'
    },

    delText: {
        textDecorationLine: 'line-through'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    centeredView2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: '#33333359'
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    button: {
        borderRadius: 8,
        padding: 10,
        // elevation: 2,
        width: '94%',
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'transparent',
        padding: 10,
        borderWidth: 1,
        width: '93%',
        borderRadius: 8,
        marginTop: 10,
        textAlign: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
    },
    textStyle: {
        color: '#333',
        // fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    homeCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    fontSize10: {
        fontSize: 10,
    },

    fontSize12: {
        fontSize: 12,
    },

    centerText: {
        textAlign: 'center',
    },

    whiteText: {
        textAlign: 'center',
        color: '#fff',
    },

    paddingBottom10: {
        paddingBottom: 10,
    },

    mainCardRed: {
        backgroundColor: '#ed5e5e',
    },

    mainCardBlue: {
        backgroundColor: '#6c96e7',
    },

    mainCardDark: {
        backgroundColor: '#363d48',
    },

    mainCardGreen: {
        backgroundColor: '#13c56b',
    },

    mainCard: {
        padding: 10,
        flex: 5,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
    },

    mainContainerLeft: {
        flex: 0.2,
        justifyContent: 'center',
    },

    mainContainerCenter: {
        flex: 1,
        justifyContent: 'center',
    },

    mainContainerRight: {
        flex: 0.2,
        justifyContent: 'center',
    },

    iconRight: {
        width: 30,
        height: 30,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius: 5,
    },

    mt10: {
        marginTop: 10,
    },

    mb10: {
        marginBottom: 10,
    },

    employeeDetailInfoUpdateTitle: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold',
    },

    closeButton: {
        position: 'absolute',
        right: 15,
        top: 10,
    },

    labelModal: {
        fontSize: 15,
        color: '#333',
        marginTop: 12,
        marginBottom: 12,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: -230,
    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

    alertClass: {
        width: '94%',
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },

    backButton: {
        paddingLeft: 15,
        width: '100%',
        alignItems: 'flex-start',
        //padding: 20,
    },


    // buttons: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: '#333',
    // },

    justifyContentCenter: {
        justifyContent: 'center',
    },

    alignItemsCenter: {
        alignItems: 'center',
    },

    saveButton: {
        backgroundColor: '#38454a',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
    },

    filterButtonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    filterButton: {
        padding: -10,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
        height: 35,
    },

    filterButtonText: {
        fontSize: 14,
        color: '#8ba8c6cc'
    },

    buttonShadow: {
        shadowColor: 'rgba(0, 0, 0, 0.20)',
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },

    filterButtonActive: {
        padding: -10,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#38454a',
        marginLeft: 5,
        marginRight: 5,
        height: 35,
    },

    filterButtonTextActive: {
        fontSize: 13,
        color: '#fff'
    },

    textColorBlack: {
        color: '#333',
    },

    flexDirectionRow: {
        flexDirection: 'row',
    },

    taskCardLeft: {
        backgroundColor: '#38454a',
        flex: 0.1,
        width: 3,
        height: 80,
        position: 'absolute',
        left: -10,
        top: -25,
    },

    searchContainer: {
        //padding: 10,
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        color: '#333',
    },

    searchInput: {
        height: 40,
        padding: 10,
        color: '#333'
    },

    notificationCard: {
        borderBottomWidth: 1,
        borderBottomColor: '#f3f6f9',
        padding: 10
    },

    notificationCardBackground: {
        backgroundColor: '#f3f6f9',
    },

    badgeStyleDrawerMenu: {
        backgroundColor: '#f00',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 20,
        height: 20,
        textAlign: 'center',
        position: 'absolute',
        top: 0,
        left: 100,
        fontSize: 12,
        lineHeight: 20,
    },

    badgeStyleHeaderIcon: {
        backgroundColor: '#f00',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 20,
        height: 20,
        textAlign: 'center',
        position: 'absolute',
        top: -20,
        right: -10,
        fontSize: 12,
        lineHeight: 20,

    },

    loginCenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    loginModalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 55,
        alignItems: 'center',
        elevation: 5,
        width: '100%',
        height: '100%',
    },

    loginCloseButton: {
        position: 'relative',
        right: -170,
        top: -40,
    },
})