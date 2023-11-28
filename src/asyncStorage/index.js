import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'TASKCHECKUP1234';
const refreshKey = 'RefreshToken';
const userKey = 'userKey';

const storeToken = async authToken => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(authToken));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getToken = async () => {
  try {
    const data = await AsyncStorage.getItem(key);
    let storageData = null;
    if (data) {
      storageData = JSON.parse(data);
    }
    return storageData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const removeToken = () => {
  AsyncStorage.removeItem(key).then(
    res => {},
    err => {
      console.log(err);
    },
  );
};

const removeUser = () => {
  AsyncStorage.removeItem(userKey).then(
    res => {},
    err => {
      console.log(err);
    },
  );
};

const storeRefreshToken = async authToken => {
  try {
    return await AsyncStorage.setItem(refreshKey, JSON.stringify(authToken));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getRefreshToken = async () => {
  try {
    const data = await AsyncStorage.getItem(refreshKey);
    let storageData = null;
    if (data) {
      storageData = JSON.parse(data);
    }
    return storageData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const storeUser = async user => {
  try {
    return await AsyncStorage.setItem(userKey, JSON.stringify(user));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUser = async () => {
  try {
    const data = await AsyncStorage.getItem(userKey);
    let storageData = null;
    if (data) {
      storageData = JSON.parse(data);
    }
    return storageData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  storeToken,
  removeToken,
  getToken,
  storeRefreshToken,
  getRefreshToken,
  storeUser,
  getUser,
  removeUser
};
