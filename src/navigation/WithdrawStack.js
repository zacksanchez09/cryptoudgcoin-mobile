import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import WithdrawScreen from '../screens/Withdraw';
import WithdrawQRScreen from '../screens/Withdraw/QR';

/**
 * Withdraw stack navigator.
 */
const WithdrawStack = createStackNavigator(
  {
    /**
     * Withdraw screen.
     */
    Withdraw: WithdrawScreen,

    /**
     * Withdraw QR screen.
     */
    WithdrawQR: WithdrawQRScreen,
  },
  {
    // Default navigation options
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
    // Hide header
    headerMode: 'none',
  },
);

export default WithdrawStack;
