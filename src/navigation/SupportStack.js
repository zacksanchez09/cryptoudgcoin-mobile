import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';

import SupportScreen from '../screens/Support';
import FaqsScreen from '../screens/Faqs';
import ContactUsScreen from '../screens/ContactUs';

/**
 * Support stack navigator.
 */
const SupportStack = createStackNavigator(
  {
    /**
     * Support screen.
     */
    Support: SupportScreen,

    Faqs: FaqsScreen,

    ContactUs: ContactUsScreen,
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

export default SupportStack;
