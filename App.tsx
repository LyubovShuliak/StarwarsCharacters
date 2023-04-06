import './Interceptors';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import { HomeStack } from './src/stackNavigator';
StatusBar.setBackgroundColor('red');
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer fallback={<Text>Loading..</Text>}>
        <HomeStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
