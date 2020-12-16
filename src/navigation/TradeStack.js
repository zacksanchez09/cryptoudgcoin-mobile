import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import TradeScreen from '../screens/Trade';

/**
 * Trade stack navigator.
 */
const TradeStack = createStackNavigator(
  {
    /**
     * Trade screen.
     */
    Trade: TradeScreen,
  },
  {
    // Default navigation options.
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },

    // Hide header in all screens.
    headerMode: 'none',
  },
);

export default TradeStack;
