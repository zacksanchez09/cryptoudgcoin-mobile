/**
 * @format
 */
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
OneSignal.init('e537d8f0-0cca-4ef7-b103-9a1e553bf3a7');
OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

AppRegistry.registerComponent(appName, () => App);
