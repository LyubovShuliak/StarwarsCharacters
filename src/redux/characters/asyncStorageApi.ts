import AsyncStorage from '@react-native-async-storage/async-storage';

import { Fans } from '../types';
import { AsyncStorageData } from './characters.thunk';

export const storeData: (props: {
  props: { fans: Fans; favoritesUriList: string[] };
  key: string;
}) => void = ({ props, key }) => {
  try {
    const strigified = JSON.stringify(props);
    AsyncStorage.setItem(key, strigified);
  } catch (e) {
    console.log(e);
  }
};

export const getAsyncStorageData: (
  key: string
) => Promise<AsyncStorageData | null> = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null
      ? (JSON.parse(jsonValue) as AsyncStorageData)
      : null;
  } catch (e) {
    return null;
  }
};
