import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import AddFundsStack from './AddFundsStack';
import MainTab from './MainTab';
import ReceiveStack from './ReceiveStack';
import SecurityStack from './SecurityStack';
import SupportStack from './SupportStack';
import TradeStack from './TradeStack';
import TransferStack from './TransferStack';
import WalletInfoStack from './WalletInfoStack';
import WithdrawStack from './WithdrawStack';
import PDFScreen from '../screens/PDF';
import CardsScreen from '../screens/Cards';
import TransactionOxxoScreen from '../screens/OxxoPay';

/**
 * App stack navigator.
 */
const AppStack = createStackNavigator(
  {
    AddFundsStack,
    MainTab,
    ReceiveStack,
    SecurityStack,
    SupportStack,
    TradeStack,
    TransactionOxxo: TransactionOxxoScreen,
    TransferStack,
    WalletInfoStack,
    WithdrawStack,
    PDF: PDFScreen,
    Cards: CardsScreen,
  },
  {
    // Default navigation options
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },

    // Hide header in all screens by default.
    headerMode: 'none',

    // Navigator initial route
    initialRouteName: 'MainTab',
  },
);

export default AppStack;
