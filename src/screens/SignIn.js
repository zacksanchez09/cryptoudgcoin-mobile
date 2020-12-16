import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Container, Content} from 'native-base';
import {NeuButton, NeuView} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import InputWrapper from '../components/InputWrapper';
import Logo from '../components/Logo';
import {SIGN_IN_URL} from '../utils/API';
import {EMAIL_REGEX} from '../utils/Constants';
import Colors from '../utils/Colors';

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // E-mail
      email: '',
      // Password
      password: '',
      // Token
      token: '',
    };

    this.getToken = this.getToken.bind(this);
    this.focusEmail = this.focusEmail.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.focusPassword = this.focusPassword.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onPressSignIn = this.onPressSignIn.bind(this);
    this.submit = this.submit.bind(this);
    this.onPressSignUp = this.onPressSignUp.bind(this);
    this.onPressForgotPassword = this.onPressForgotPassword.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  /**
   * Get user token.
   */
  async getToken() {
    // Get user stored info
    const userToken = await AsyncStorage.getItem('userToken');
    // Set user info into state
    console.log('Tokenizer: ', userToken);
    this.setState({token: userToken});
  }

  /**
   * Focus E-mail input.
   */
  focusEmail() {
    this.inputEmail.focus();
  }

  /**
   * OnChangeText Email input event.
   * @param {string} email - New Email value
   */
  onChangeEmail(email) {
    this.setState({email});
  }

  /**
   * OnSubmitEditing Email input event.
   */
  onSubmitEmail() {
    this.focusPassword();
  }

  /**
   * Focus Password input.
   */
  focusPassword() {
    this.inputPassword.focus();
  }

  /**
   * OnChangeText Password input event.
   * @param {string} password - New Password value
   */
  onChangePassword(password) {
    this.setState({password});
  }

  /**
   * OnSubmitEditing Password input event.
   */
  onSubmitPassword() {
    this.submit();
  }

  /**
   * OnPress Submit button event.
   */
  onPressSignIn() {
    this.submit();
  }

  /**
   * Submit Sign in request.
   */
  async submit() {
    // Get form data

    const {email, password, token} = this.state;

    // Validate form
    if (email === '') {
      Alert.alert(
        'Iniciar sesión',
        'Ingresa tu correo electrónico',
        [{text: 'OK', onPress: this.focusEmail}],
        {onDismiss: this.focusEmail},
      );
    } else if (!EMAIL_REGEX.test(email)) {
      Alert.alert(
        'Iniciar sesión',
        'Ingresa un correo electrónico válido',
        [{text: 'OK', onPress: this.focusEmail}],
        {onDismiss: this.focusEmail},
      );
    } else if (password === '') {
      Alert.alert(
        'Iniciar sesión',
        'Ingresa una contraseña',
        [{text: 'OK', onPress: this.focusPassword}],
        {onDismiss: this.focusPassword},
      );
    } else if (password.length < 5) {
      Alert.alert(
        'Iniciar sesión',
        'Ingresa una contraseña más larga',
        [{text: 'OK', onPress: this.focusPassword}],
        {onDismiss: this.focusPassword},
      );
    } else {
      try {
        // Send login request
        const response = await fetch(SIGN_IN_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password, token}),
        });

        if (response.status === 200) {
          // Get request result
          const result = await response.json();

          // Validate if Login was successful
          if (result.successToken) {
            await AsyncStorage.setItem('token', result.successToken);
            await AsyncStorage.setItem('user', JSON.stringify(result.user));

            // Redirect to Main screen.
            this.props.navigation.navigate('MainTab');
          } else {
            Alert.alert(
              'Inicio de sesión',
              'Hubo un problema para iniciar sesión, intente más tarde.',
            );
          }
        } else {
          Alert.alert(
            'Inicio de sesión',
            'Los datos ingresados no son correctos.',
          );
        }
      } catch (error) {
        // If request has failed, then show an alert.
        Alert.alert(
          'Inicio de sesión',
          'Hubo un problema para iniciar sesión, intente más tarde.',
        );
        // Alert.alert(error);
        console.error(error);
      }
    }
  }

  /**
   * OnPress Sign up button event.
   *
   * Redirects to Sign up screen.
   */
  onPressSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  /**
   * OnPress Forgot password button event.
   *
   * Redirects to Forgot password screen.
   */
  onPressForgotPassword() {
    this.props.navigation.navigate('RestorePassword');
  }

  render() {
    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="Inicio de sesión" hasBack />

        {/* Screen content */}
        <Content padder style={styles.background}>
          {/* App logo */}
          <NeuView
            borderRadius={36}
            height={120}
            color="#FFFFFF"
            style={{alignSelf: 'center'}}
            width={120}>
            <Logo size={120} />
          </NeuView>

          {/* Email input */}
          <InputWrapper label="Correo electrónico">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="none"
                blurOnSubmit={false}
                keyboardType="email-address"
                onChangeText={this.onChangeEmail}
                onSubmitEditing={this.onSubmitEmail}
                placeholder="Correo electrónico"
                ref={ref => (this.inputEmail = ref)}
                returnKeyType="next"
                selectionColor="rgba(29, 167, 255, 0.5)"
                style={[styles.text, styles.input]}
                textContentType="emailAddress"
                value={this.state.email}
              />
            </View>
          </InputWrapper>

          {/* Password input */}
          <InputWrapper label="Contraseña">
            <View style={styles.wrapper}>
              {/* Password input text */}
              <TextInput
                autoCapitalize="none"
                blurOnSubmit
                onChangeText={this.onChangePassword}
                onSubmitEditing={this.onSubmitPassword}
                placeholder="Contraseña"
                ref={ref => (this.inputPassword = ref)}
                returnKeyType="done"
                secureTextEntry
                selectionColor="rgba(29, 167, 255, 0.5)"
                style={[styles.text, styles.input]}
                value={this.state.password}
              />
            </View>
          </InputWrapper>

          {/* Sign in button */}
          <NeuButton
            borderRadius={24}
            color="#FFFFFF"
            height={48}
            onPress={this.onPressSignIn}
            style={styles.button}
            width={180}>
            <Text style={[styles.text, styles.submit]}>Iniciar sesión</Text>
          </NeuButton>

          {/* Sign up button */}
          <Button
            onPress={this.onPressSignUp}
            style={styles.transparent}
            transparent>
            <Text style={[styles.text, styles.other]}>¿No tienes cuenta?</Text>
          </Button>

          {/* Forgot password button */}
          <Button
            onPress={this.onPressForgotPassword}
            style={styles.transparent}
            transparent>
            <Text style={[styles.text, styles.other]}>
              ¿Olvidaste tu contraseña?
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

/**
 * Sign-in screen styles.
 */
const styles = StyleSheet.create({
  // Screen background
  background: {backgroundColor: Colors.background},

  // Input wrapper
  wrapper: {alignItems: 'center', flex: 1, flexDirection: 'row', height: 42},

  // Text
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // Input
  input: {fontSize: 14, letterSpacing: 0.25, width: '100%'},

  // Submit button
  button: {alignSelf: 'center', marginBottom: 10, marginTop: 15},

  // Submit button text
  submit: {fontSize: 14, letterSpacing: 1.25},

  // Transparent button
  transparent: {alignSelf: 'center'},

  // Other buttons
  other: {color: Colors.primary, fontSize: 14, letterSpacing: 1.25},
});
