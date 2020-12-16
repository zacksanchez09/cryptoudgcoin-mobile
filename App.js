import 'react-native-gesture-handler';
import React, {Component, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import AsyncStorage from '@react-native-community/async-storage';

import AppContainer from './src/navigation';

GoogleSignin.configure({
  webClientId:
    '165077947323-b8sl5617028g4b4o34a5ebbhioqa7k6e.apps.googleusercontent.com',
  iosClientId:
    '165077947323-61t93c9888i8t40jni5alp9l6qr9g0m4.apps.googleusercontent.com',
});


export default class App extends Component {
  constructor(props) {
    super(props);
    OneSignal.setLogLevel(6, 0);

  OneSignal.addEventListener('received', this.onReceived);
  OneSignal.addEventListener('opened', this.onOpened);
  OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  async onIds(device) {
    console.log('Device info: ', device);
    console.log('User ID: ', device.userId);

    await AsyncStorage.setItem('userToken', device.userId);
  }

render (){
  return (
    <View style={styles.container}>
      <AppContainer />
    </View>
  );
 }
}

/**
 * App styles.
 */
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});

// Disable yellow box
console.disableYellowBox = true;
