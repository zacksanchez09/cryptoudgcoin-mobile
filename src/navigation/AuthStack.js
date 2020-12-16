import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import WelcomeScreen from '../screens/Welcome';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import RestorePasswordScreen from '../screens/RestorePassword';

export default createStackNavigator(
  {
    Welcome: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    RestorePassword: RestorePasswordScreen,
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
);
