import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import SecuritySreen from '../screens/Security';
import UpdateNIPScreen from '../screens/UpdateNip';
import ChangePasswordScreen from '../screens/ChangePassword';

/**
 * Security stack navigator.
 */
const SecurityStack = createStackNavigator(
  {
    /**
     * Security screen.
     */
    Security: SecuritySreen,

    UpdateNIP: UpdateNIPScreen,

    ChangePassword: ChangePasswordScreen,
  },
  {
    // Default navigation options
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },

    // Hide header in all screens.
    headerMode: 'none',
  },
);

export default SecurityStack;
