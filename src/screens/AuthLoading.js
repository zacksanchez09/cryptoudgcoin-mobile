import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Colors from '../utils/Colors';

export default function AuthLoadingScreen({navigation}) {
  useEffect(() => {
    async function bootstrap() {
      // Get user token
      const token = await AsyncStorage.getItem('token');

      // Check if user token exists
      if (token) {
        // Redirect to App navigator.
        navigation.navigate('App');
      } else {
        // Redirect to Auth navigator.
        navigation.navigate('Auth');
      }
    }

    bootstrap();
  });

  return (
    <View style={styles.container}>
      {/* Status bar */}
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle={Platform.select({
          android: 'light-content',
          ios: 'dark-content',
        })}
      />

      {/* App logo */}
      <Image
        resizeMode="contain"
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        width={Dimensions.get('window').width - 100}
      />
    </View>
  );
}

/**
 * AuthLoading screen styles.
 */
const styles = StyleSheet.create({
  // Container
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },

  // App logo
  logo: {alignSelf: 'center', marginVertical: 10},
});
