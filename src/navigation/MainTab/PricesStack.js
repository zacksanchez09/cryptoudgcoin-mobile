import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';

import PricesScreen from '../../screens/Prices';
import CoinScreen from '../../screens/Coin';

/**
 * Prices stack navigator.
 */
const PricesStack = createStackNavigator(
  {
    Prices: PricesScreen,
    Coin: CoinScreen,
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    },
  },
);

export default PricesStack;
