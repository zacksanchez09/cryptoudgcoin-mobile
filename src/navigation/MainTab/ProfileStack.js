import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import EditUserScreen from '../../screens/EditUser';
import ProfileScreen from '../../screens/Profile';

/**
 * Profile stack navigator.
 */
const ProfileStack = createStackNavigator(
  {
    /**
     * Edit user info screen.
     */
    EditUser: EditUserScreen,

    /**
     * Profile screen.
     */
    Profile: ProfileScreen,
  },
  {
    // Default navigations options
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },

    // Hide header
    headerMode: 'none',

    // Initial route name
    initialRouteName: 'Profile',
  },
);

export default ProfileStack;
