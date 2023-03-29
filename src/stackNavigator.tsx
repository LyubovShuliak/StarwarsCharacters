import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Character from './screens/Character';
import {RootStackParamList} from './types';
import {useLayoutEffect} from 'react';
import {useAppDispatch} from './redux/store';
import {getFavoritesFromAsyncStorage} from './redux/characters/characters.thunk';
import {FAVS_ASYNC_STORAGE_KEY} from './constants';

const Stack = createStackNavigator<RootStackParamList>();

export function HomeStack() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getFavoritesFromAsyncStorage(FAVS_ASYNC_STORAGE_KEY));
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, headerStatusBarHeight: 0}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Character" component={Character} />
    </Stack.Navigator>
  );
}
