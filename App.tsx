import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';
import { HomeStack } from './src/stackNavigator';

const App = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        fallback={<Text>Loading..</Text>}
      >
        <HomeStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
