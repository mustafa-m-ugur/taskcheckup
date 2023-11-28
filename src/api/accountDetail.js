import React, { useState, useEffect } from "react";
import AsyncStorage from "../asyncStorage/index";

function accountDetail(){
    const [user, setuser] = useState(null);

    const getUser = async () => {
        const _user = await AsyncStorage.getUser();
        if (_user) {
            setuser(_user);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return { user };
}

export default accountDetail;