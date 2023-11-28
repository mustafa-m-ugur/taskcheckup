import { useState, useEffect } from 'react';
import useApi from "../api/useApi";

function getList(params) {
    const [data, setData] = useState([]);
    const getServiceData = useApi(params.service);

    const getData = async () => {
        let response = await getServiceData.request(params);
        if (response.ok) {
            const datas = [...response.data];
            setData(datas);
        }
    };


    const onRefresh = () => {
        getData();
    };

    useEffect(() => {
        onRefresh();
    }, []);


    return {
        data: data,
        loading: getServiceData.loading,
        error: getServiceData.error,
        onRefresh: onRefresh,
    };

}
export default getList;