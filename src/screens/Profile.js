import React, {Component} from 'react';
import {NavigationEvents} from 'react-navigation';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuBorderView} from 'react-native-neu-element';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import Option from '../components/Option';
import {PRIVACY_POLICY_URL, TERMS_AND_CONDITIONS_URL} from '../utils/API';
import Colors from '../utils/Colors';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };

    this.getInfo = this.getInfo.bind(this);
    this.onPressEditInfo = this.onPressEditInfo.bind(this);
    this.onPressCards = this.onPressCards.bind(this);
    this.onPressSecurity = this.onPressSecurity.bind(this);
    this.onPressSupport = this.onPressSupport.bind(this);
    this.onPressTerms = this.onPressTerms.bind(this);
    this.onPressPrivacy = this.onPressPrivacy.bind(this);
    this.onPressLogout = this.onPressLogout.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  /**
   * Get user info.
   */
  async getInfo() {
    // Get user stored info
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    // Set user info into state
    this.setState({user});
  }

  /**
   * OnPress Edit info button event.
   *
   * Redirect to Edit user info screen.
   */
  onPressEditInfo() {
    this.props.navigation.navigate('EditUser');
  }

  onPressCards() {
    this.props.navigation.navigate('Cards');
  }

  /**
   * OnPress Security option event.
   */
  onPressSecurity() {
    this.props.navigation.navigate('Security');
  }

  /**
   * OnPress Support option event.
   */
  onPressSupport() {
    this.props.navigation.navigate('Support');
  }

  onPressTerms() {
    this.props.navigation.navigate('PDF', {
      name: 'Terminos y condiciones',
      pdf: TERMS_AND_CONDITIONS_URL,
    });
  }

  onPressPrivacy() {
    this.props.navigation.navigate('PDF', {
      name: 'Politica de privacidad',
      pdf: PRIVACY_POLICY_URL,
    });
  }

  /**
   * OnPress Logout button event.
   */
  onPressLogout() {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar la sesión?',
      [{text: 'Cancelar', style: 'cancel'}, {text: 'OK', onPress: this.logout}],
    );
  }

  /**
   * Log out.
   */
  async logout() {
    // Remove user token from storage
    await AsyncStorage.removeItem('token');
    // Remove user info from storage
    await AsyncStorage.removeItem('user');
    // Redirect to Sign in screen
    this.props.navigation.navigate('SignIn');
  }

  render() {
    // Get screen state
    const {user} = this.state;

    return (
      <Container>
        {/* Navigation events */}
        <NavigationEvents onWillFocus={this.getInfo} />

        {/* Screen header */}
        <AppHeader title="Mi perfil" />

        {/* Screen content */}
        <Content style={styles.content}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            {/* User icon border */}
            <NeuBorderView
              borderRadius={12}
              borderWidth={12}
              color="#FFFFFF"
              containerStyle={styles.user}
              height={80}
              style={styles.border}
              width={80}>
              {/* User icon */}
              <MaterialCommunityIcons
                color="#d6b14b"
                name="account-circle"
                size={60}
                style={styles.icon}
              />
            </NeuBorderView>

            <View style={{justifyContent: 'center'}}>
              {/* User name */}
              <Text style={[styles.text, styles.name]}>
                {user.name} {user.last_name}
              </Text>

              {/* User email */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  color={Colors.primary}
                  name="email"
                  size={14}
                  style={{marginRight: 10}}
                />

                <Text style={[styles.text, styles.email]}>{user.email}</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  color={Colors.primary}
                  name="phone"
                  size={14}
                  style={{marginRight: 10}}
                />

                <Text style={[styles.text, {}]}>{user.phone}</Text>
              </View>
            </View>
          </View>

          {/* Settings option */}
          <View style={styles.options}>
            {/* Edit user info option */}
            <Option
              icon={
                <MaterialCommunityIcons
                  color={Colors.primary}
                  name="account-edit"
                  size={32}
                />
              }
              name="Editar mi información"
              onPress={this.onPressEditInfo}
            />

            {/* Security option */}
            <Option
              icon={
                <MaterialCommunityIcons
                  color={Colors.primary}
                  name="security"
                  size={28}
                />
              }
              name="Seguridad"
              onPress={this.onPressSecurity}
            />

            {/* My contacts option */}
            <Option
              icon={
                <FontAwesome
                  color={Colors.primary}
                  name="credit-card"
                  size={21}
                />
              }
              name="Mis tarjetas guardadas"
              onPress={this.onPressCards}
            />

            {/* Technical support option */}
            <Option
              icon={
                <MaterialCommunityIcons
                  color={Colors.primary}
                  name="help-circle"
                  size={28}
                />
              }
              name="Soporte técnico"
              onPress={this.onPressSupport}
            />

            {/* Terms and conditions option */}
            <Option
              icon={
                <MaterialCommunityIcons
                  color={Colors.primary}
                  name="file-check"
                  size={28}
                />
              }
              name="Terminos y condiciones"
              onPress={this.onPressTerms}
            />

            {/* Privacy policy option */}
            <Option
              icon={
                <MaterialCommunityIcons
                  color={Colors.primary}
                  name="incognito"
                  size={28}
                />
              }
              name="Politica de privacidad"
              onPress={this.onPressPrivacy}
            />

            {/* Logout option */}
            <Option
              icon={
                <MaterialCommunityIcons
                  color={Colors.primary}
                  name="logout"
                  size={28}
                />
              }
              name="Cerrar sesión"
              onPress={this.onPressLogout}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

/**
 * Profile screen styles.
 */
const styles = StyleSheet.create({
  // Screen content
  content: {backgroundColor: '#FFF'},

  // User border view
  border: {alignSelf: 'center', marginVertical: 10},

  // User icon container
  user: {alignItems: 'center', justifyContent: 'center'},

  // User icon
  icon: {alignSelf: 'center'},

  // Text
  text: {color: '#2e3342', fontFamily: 'Heebo-Regular', fontSize: 14},

  // User name
  name: {color: '#9e9e9e', fontSize: 16},

  // User email
  email: {},

  // Settings option
  options: {marginVertical: 10},
});
