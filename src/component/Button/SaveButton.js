import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "../../assets/style";
import IconFa from 'react-native-vector-icons/FontAwesome5';

function BackButton(navigation) {

    return (
        <TouchableOpacity style={[styles.backButton]} onPress={() => navigation.goBack()}>
            <IconFa name="chevron-left" size={20} color="#9ea9ad" />
        </TouchableOpacity>

    );
};

export default BackButton;