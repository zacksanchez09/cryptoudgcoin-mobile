import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';
import ReceiveScreen from '../screens/Receive';

/**
 * Receive stack navigator.
 */
const ReceiveStack = createStackNavigator(
  {
    Receive: ReceiveScreen,
  },
  {
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },

    // Hide header in all screens.
    headerMode: 'none',
  },
);

export default ReceiveStack;
