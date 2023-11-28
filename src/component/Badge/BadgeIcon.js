import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../assets/style";
import IconMa from 'react-native-vector-icons/MaterialCommunityIcons';


function BadgeStatus(params) {

    if (params.status) {

        if (params.status === 3) {
            badgeClass = styles.iconViewSuccess;
            iconClass = styles.iconSuccess;
            iconName = 'check';
        } else if (params.status === 4) {
            badgeClass = styles.iconViewDanger;
            iconClass = styles.iconDanger;
            iconName = 'eye';
        } else if (params.status === 5) {
            badgeClass = styles.iconViewWarning;
            iconClass = styles.iconWarning;
            iconName = 'timer-sand';
        } else if (params.status === 2) {
            badgeClass = styles.iconViewDark;
            iconClass = styles.iconDark;
            iconName = 'pencil';
        } else {
            badgeClass = styles.iconViewWarning;
            iconClass = styles.iconWarning;
            iconName = 'timer-sand';
        }

    }

    return (
        <View style={badgeClass}>
            <IconMa name={iconName} style={iconClass} />
        </View>
    );
};

export default BadgeStatus;