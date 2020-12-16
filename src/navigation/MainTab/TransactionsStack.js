import {createStackNavigator} from 'react-navigation-stack';

import TransactionsScreen from '../../screens/Transactions';

/**
 * Transactions Stack navigator.
 */
const TransactionsStack = createStackNavigator(
  {
    /**
     * Transactions screen
     */
    Transactions: TransactionsScreen,
  },
  {
    // Hide header in all screens
    headerMode: 'none',
  },
);

export default TransactionsStack;
