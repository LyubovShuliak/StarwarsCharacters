import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';

import { FAVS_ASYNC_STORAGE_KEY } from './constants';
import { getFavoritesFromAsyncStorage } from './redux/characters/characters.thunk';
import { useAppDispatch } from './redux/store';
import Character from './screens/Character';
import Home from './screens/Home';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function HomeStack() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getFavoritesFromAsyncStorage(FAVS_ASYNC_STORAGE_KEY));
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerStatusBarHeight: 0 }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Character" component={Character} />
    </Stack.Navigator>
  );
}
