import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import AddFundsScreen from '../screens/AddFunds';
import AddFundsCardScreen from '../screens/AddFunds/Card';
import AddFundsOxxoScreen from '../screens/AddFunds/Oxxo';
import OxxoPayScreen from '../screens/AddFunds/OxxoPay';

/**
 * Add funds stack navigator.
 */
const AddFundsStack = createStackNavigator(
  {
    /**
     * Add funds screen.
     */
    AddFunds: AddFundsScreen,

    /**
     * Add funds via card screen.
     */
    AddFundsCard: AddFundsCardScreen,

    /**
     * Add funds via OXXO screen.
     */
    AddFundsOxxo: AddFundsOxxoScreen,

    /**
     * Oxxo pay info screen.
     */
    AddFundsOxxoPay: OxxoPayScreen,
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

export default AddFundsStack;
