import AsyncStorage from '@react-native-async-storage/async-storage';
import {Fans} from '../types';

export const storeData: (props: {
  props: {fans: Fans; favsUriList: string[]};
  key: string;
}) => void = async ({props, key}) => {
  try {
    const strigified = JSON.stringify(props);
    await AsyncStorage.setItem(key, strigified);
  } catch (e) {
    // saving error
  }
};

export const getAsyncStorageData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return {};
  }
};
