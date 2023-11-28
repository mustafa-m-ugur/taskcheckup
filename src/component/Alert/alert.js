import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../assets/style";

function AlertStatus(params) {

    if (params.status) {

        if (params.status === 3) {
            alertClass = styles.tbodyStatusSuccess;
            alertText = params.text;
        } else if (params.status === 4) {
            alertClass = styles.tbodyStatusDanger;
            alertText = params.text;
        } else if (params.status === 5) {
            alertClass = styles.tbodyStatusWarning;
            alertText = params.text;
        } else if (params.status === 2) {
            alertClass = styles.tbodyStatusDark;
            alertText = params.text;
        } else {
            alertClass = styles.tbodyStatusWarning;
            alertText = params.text;
        }

    } else {
        alertClass = styles.tbodyStatusWarning;
        alertText = params.text;
    }

    return (
        <View style={styles.flex1}>
            <Text style={[alertClass, styles.alertClass]}>{params.text}</Text>
        </View>

    );
};

export default AlertStatus;