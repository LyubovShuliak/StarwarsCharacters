import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Character from './screens/Character';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false , headerStatusBarHeight: 0 }}   >
      <Stack.Screen name="Home" component={Home}  />
      <Stack.Screen name="Character" component={Character} />
    </Stack.Navigator>
  );
}
