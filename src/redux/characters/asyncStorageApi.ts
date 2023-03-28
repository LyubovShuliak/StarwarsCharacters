import AsyncStorage from '@react-native-async-storage/async-storage';
import {Fans} from '../types';
import {FAVS_ASYNC_STORAGE_KEY} from '../../constants';

export const storeData = async (value: Fans) => {
  try {
    const strigified = JSON.stringify(value);
    await AsyncStorage.setItem(FAVS_ASYNC_STORAGE_KEY, strigified);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return {};
  }
};
