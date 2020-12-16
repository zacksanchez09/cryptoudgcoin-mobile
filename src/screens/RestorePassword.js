import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuButton, NeuView} from 'react-native-neu-element';

import AppHeader from '../components/AppHeader';
import InputWrapper from '../components/InputWrapper';
import Logo from '../components/Logo';
import {RESET_PASSWORD_URL} from '../utils/API';
import {EMAIL_REGEX} from '../utils/Constants';

export default class RestorePasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // E-mail
      email: '',
    };

    this.focusEmail = this.focusEmail.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.submit = this.submit.bind(this);
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
    this.submit();
  }

  /**
   * OnPress Submit button.
   */
  async onPressSubmit() {
    this.submit();
  }

  /**
   * Submit form request.
   */
  async submit() {
    // Validate form
    if (this.state.email === '') {
      Alert.alert(
        'Recuperar contraseña',
        'Ingresa tu correo electrónico',
        [{text: 'OK', onPress: this.focusEmail}],
        {onDismiss: this.focusEmail},
      );
    } else if (!EMAIL_REGEX.test(this.state.email)) {
      Alert.alert(
        'Recuperar contraseña',
        'Ingresa un correo electrónico válido',
        [{text: 'OK', onPress: this.focusEmail}],
        {onDismiss: this.focusEmail},
      );
    } else {
      try {
        const response = await fetch(RESET_PASSWORD_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: this.state.email}),
        });

        if (response.status === 200) {
          Alert.alert(
            'Recuperar contraseña',
            'Se ha enviado un correo para restablecer su contraseña',
            [{text: 'OK', onPress: () => this.props.navigation.pop()}],
            {onDismiss: () => this.props.navigation.pop()},
          );
        } else {
          Alert.alert(
            'Recuperar contraseña',
            'Ha ocurrido un problema para restaurar su contraseña. Intente más tarde.',
          );
        }

        // Validate if Login was successful
        /* if (result.token) {
          await AsyncStorage.setItem('token', result.token);

          // Redirect to Welcome screen.
          this.props.navigation.navigate('Bienvenido');
        }  */
      } catch (error) {
        // If request has failed, then show an alert.
        Alert.alert(
          'Recuperar contraseña',
          'Hubo un problema, intente más tarde.',
        );
        console.error(error);
      }
    }
  }

  render() {
    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="Recuperar contraseña" hasBack />

        {/* Screen content */}
        <Content padder style={styles.background}>
          {/* App logo */}
          <NeuView
            borderRadius={36}
            color="#FFFFFF"
            height={120}
            style={{alignSelf: 'center'}}
            width={120}>
            <Logo size={120} />
          </NeuView>

          {/* Email input */}
          <InputWrapper label="Correo electrónico">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={this.onChangeEmail}
                onSubmitEditing={this.onSubmitEmail}
                placeholder="Correo electrónico"
                ref={ref => (this.inputEmail = ref)}
                returnKeyType="done"
                style={[styles.text, styles.input]}
                value={this.state.email}
              />
            </View>
          </InputWrapper>

          {/* Submit form button */}
          <NeuButton
            borderRadius={24}
            color="#FFFFFF"
            height={48}
            onPress={this.onPressSubmit}
            style={styles.button}
            width={150}>
            <Text style={[styles.text, styles.submit]}>Recuperar</Text>
          </NeuButton>
        </Content>
      </Container>
    );
  }
}

/**
 * Restore password screen styles.
 */
const styles = StyleSheet.create({
  // Screen background
  background: {backgroundColor: '#fff'},

  // Input wrapper
  wrapper: {alignItems: 'center', flex: 1, flexDirection: 'row', height: 42},

  // Text color
  text: {color: '#2e3342', fontFamily: 'Heebo-Regular'},

  // Input
  input: {fontSize: 14, letterSpacing: 0.25, width: '100%'},

  // Submit button
  button: {alignSelf: 'center', marginTop: 25, marginBottom: 10},

  // Submit button text
  submit: {fontSize: 14, letterSpacing: 1.25},
});
