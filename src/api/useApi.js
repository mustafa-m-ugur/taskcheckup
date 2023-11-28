import {useState} from 'react';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const useApi = apiFunc => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
      setLoading(true);
      const response = await apiFunc(...args);
      setError(!response.ok);
      if (!response.ok) {
        console.log('HATA ', response.data?.message);
        Alert.alert(response.data?.message);
      }
      setData(response.data?.data);
      setLoading(false);
      return {
        ok: response.ok,
        code: response.status,
        data: response.data?.data,
        message: response.data?.message,
      };
    }

    return {
      ok: false,
      code: 400,
      data: null,
      message: '',
    };
  };

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useApi;
