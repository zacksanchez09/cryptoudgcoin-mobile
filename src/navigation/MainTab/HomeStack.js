import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import HomeScreen from '../../screens/Home';

/**
 * Home stack navigator.
 */
const HomeStack = createStackNavigator(
  {
    /**
     * Home screen.
     */
    Home: HomeScreen,
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

export default HomeStack;
