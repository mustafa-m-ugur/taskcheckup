import { create } from 'apisauce';
import asyncStorage from '../asyncStorage/index';
import BaseConfig from '../config/BaseConfig';

const apiClient = create({
    baseURL: BaseConfig.ApiUrl + BaseConfig.ApiVersion,
    // baseURL: 'https://pms.cmdtech.com.tr',
    proxy: true,
});
apiClient.addAsyncRequestTransform(async request => {
    request.headers['Content-Type'] = 'application/json';
    let token = await asyncStorage.getToken();
    request.headers.Authorization = 'Bearer ' + token;
});

export default apiClient;
