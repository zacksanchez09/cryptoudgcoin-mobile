import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import WalletScreen from '../screens/Wallet';

/**
 * Wallet info stack navigator.
 */
const WalletInfoStack = createStackNavigator(
  {
    Wallet: WalletScreen,
  },
  {
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },

    // Hide header in all screens.
    headerMode: 'none',
  },
);

export default WalletInfoStack;
