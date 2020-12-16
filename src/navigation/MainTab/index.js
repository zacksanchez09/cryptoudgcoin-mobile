import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image, StyleSheet} from 'react-native';
import {NeuView} from 'react-native-neu-element';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './HomeStack';
import PricesStack from './PricesStack';
import TransactionsStack from './TransactionsStack';
import ProfileStack from './ProfileStack';
import {APP_LOGO} from '../../utils/Constants';

/**
 * Main tab navigator.
 */
const MainTab = createBottomTabNavigator(
  {
    /**
     * Home stack navigator.
     */
    HomeStack: {
      // Navigator screen
      screen: HomeStack,
      // Navigation options
      navigationOptions: {
        // Tab bar label
        tabBarLabel: 'Inicio',
        // Tab bar icon
        tabBarIcon: ({focused, tintColor}) => (
          <NeuView
            borderRadius={12}
            color="#FFFFFF"
            containerStyle={styles.container}
            height={40}
            inset={focused}
            width={40}>
            <Image
              resizeMode="contain"
              source={APP_LOGO}
              style={[styles.button, {tintColor}]}
            />
          </NeuView>
        ),
      },
    },

    /**
     * Market stack navigator.
     */
    TransactionsStack: {
      // Navigator screen
      screen: TransactionsStack,
      // Navigation options
      navigationOptions: {
        // Tab bar label
        tabBarLabel: 'Transacciones',
        // Tab bar icon
        tabBarIcon: ({focused, tintColor}) => (
          <NeuView
            borderRadius={12}
            color="#FFFFFF"
            containerStyle={styles.container}
            height={40}
            inset={focused}
            width={40}>
            <FontAwesome5 color={tintColor} name="history" size={24} />
          </NeuView>
        ),
      },
    },

    /**
     * Prices stack navigator.
     */
    PricesStack: {
      // Navigator screen
      screen: PricesStack,
      // Navigation options
      navigationOptions: {
        // Tab bar label
        tabBarLabel: 'Cryptomonedas',
        // Tab bar icon
        tabBarIcon: ({focused, tintColor}) => (
          <NeuView
            borderRadius={12}
            color="#FFFFFF"
            containerStyle={styles.container}
            height={40}
            inset={focused}
            width={40}>
            <FontAwesome5 color={tintColor} name="coins" size={24} />
          </NeuView>
        ),
      },
    },

    /**
     * Profile stack navigator.
     */
    ProfileStack: {
      // Navigator screen
      screen: ProfileStack,
      // Navigation options
      navigationOptions: {
        // Tab bar label
        tabBarLabel: 'Perfil',
        // Tab bar icon
        tabBarIcon: ({focused, tintColor}) => (
          <NeuView
            borderRadius={12}
            color="#FFFFFF"
            containerStyle={styles.container}
            height={40}
            inset={focused}
            width={40}>
            <MaterialCommunityIcons
              color={tintColor}
              name="account"
              size={28}
            />
          </NeuView>
        ),
      },
    },
  },
  {
    // Navigator initial route name
    initialRouteName: 'HomeStack',

    // Default navigation options
    defaultNavigationOptions: {
      // Hide tab bar label
      tabBarLabel: null,
    },

    // Tab bar options
    tabBarOptions: {
      // Enable animations
      animationEnabled: true,
      // Active background
      activeBackgroundColor: '#FFF',
      // Active tint color
      activeTintColor: '#d6b14b',
      // Inactive background color
      inactiveBackgroundColor: '#FFF',
      // Inactive tint color
      inactiveTintColor: '#9e9e9e',
      // Hide label
      showLabel: false,
      // Tab bar styles
      style: {
        backgroundColor: '#fff',
        borderTopColor: '#fff',
        height: 56,
      },
    },
  },
);

/**
 * Main tab navigator styles.
 */
const styles = StyleSheet.create({
  // Button container
  container: {alignItems: 'center', justifyContent: 'center'},

  // Button
  button: {alignSelf: 'center', height: 28, width: 28},
});

export default MainTab;
