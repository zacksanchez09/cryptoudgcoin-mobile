import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import TransferScreen from '../screens/Transfer';
import TransferQRScreen from '../screens/Transfer/QR';

/**
 * Transfer stack navigator.
 */
const TransferStack = createStackNavigator(
  {
    /**
     * Transfer screen.
     */
    Transfer: TransferScreen,

    /**
     * Transfer QR screen.
     */
    TransferQR: TransferQRScreen,
  },
  {
    // Default navigation option
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },

    // Hide header
    headerMode: 'none',
  },
);

export default TransferStack;
