import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../assets/style";


function BadgeStatus(params) {

    if (params.status) {

        if (params.status === 3) {
            badgeClass = styles.tbodyStatusSuccess;
        } else if (params.status === 4) {
            badgeClass = styles.tbodyStatusDanger;
        } else if (params.status === 5) {
            badgeClass = styles.tbodyStatusWarning;
        } else if (params.status === 2) {
            badgeClass = styles.tbodyStatusDark;
        } else {
            badgeClass = styles.tbodyStatusWarning;
        }

    } else {
        badgeClass = styles.tbodyStatusWarning;
    }

    if (params.badgeStyle) {
        badgeStyle = params.badgeStyle;
    }

    return (
        <Text style={[badgeClass, badgeStyle]}>{params.text}</Text>
    );
};

export default BadgeStatus;