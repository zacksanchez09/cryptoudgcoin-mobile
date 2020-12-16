import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoading';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default AppContainer;
