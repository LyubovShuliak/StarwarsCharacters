import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import React, { useEffect } from 'react';

import { FAVS_ASYNC_STORAGE_KEY } from './constants';
import { getFavoritesFromAsyncStorage } from './redux/characters/characters.thunk';
import { useAppDispatch } from './redux/store';
import Character from './screens/Character';
import Home from './screens/Home';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function HomeStack() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axiosRetry(axios, {
      retries: 3,
      retryDelay: retryCount => retryCount * 3000,
    });

    dispatch(getFavoritesFromAsyncStorage(FAVS_ASYNC_STORAGE_KEY));
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStatusBarHeight: 0,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Character" component={Character} />
    </Stack.Navigator>
  );
}
