import React, {Component, createRef} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuButton} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import InputWrapper from '../components/InputWrapper';
import {CHANGE_PASSWORD_URL, NIP_URL} from '../utils/API';

export default class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      id: '',
      old_password: '',
      password: '',
      new_password: '',
    };

    // Create refs
    this.oldPasswordRef = createRef();
    this.passwordRef = createRef();
    this.newPasswordRef = createRef();

    // Bind methods
    this.getUserInfo = this.getUserInfo.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.focusOldPassword = this.focusOldPassword.bind(this);
    this.onSubmitOldPassword = this.onSubmitOldPassword.bind(this);
    this.focusPassword = this.focusPassword.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.focusNewPassword = this.focusNewPassword.bind(this);
    this.onSubmitNewPassword = this.onSubmitNewPassword.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  /**
   * Get user info.
   */
  async getUserInfo() {
    const user = JSON.parse((await AsyncStorage.getItem('user')) || 'null');

    this.setState({id: user.id});
  }

  /**
   * OnChangeText event.
   * @param {string} name - Input name.
   * @param {string} value - Input value.
   */
  onChangeText(name, value) {
    this.setState({[name]: value});
  }

  /**
   * Focus Old Password.
   */
  focusOldPassword() {
    this.oldPasswordRef.current.focus();
  }

  /**
   * OnSubmitEditing Old Password input event.
   */
  onSubmitOldPassword() {
    this.focusPassword();
  }

  /**
   * Focus Password.
   */
  focusPassword() {
    this.passwordRef.current.focus();
  }
  /**
   * OnSubmitEditing Password input event.
   */
  onSubmitPassword() {
    this.focusNewPassword();
  }

  /**
   * Focus New Password.
   */
  focusNewPassword() {
    this.newPasswordRef.current.focus();
  }

  /**
   * OnSubmitEditing New Password input event.
   */
  onSubmitNewPassword() {
    this.submit();
  }

  /**
   * OnPress Submit button.
   */
  async onPressSubmit() {
    this.submit();
  }

  /**
   * Submit Update Password request.
   */
  async submit() {
    // Get form data
    const {id, old_password, password, new_password} = this.state;

    // Validate form data
    /*if (old_password === '') {
      Alert.alert(
        'Cambiar contraseña',
        'Ingresa tu contraseña anterior',
        [{text: 'OK', onPress: this.focusOldPassword}],
        {onDismiss: this.focusOldPassword},
      );
    } else */
    if (password === '') {
      Alert.alert(
        'Cambiar contraseña',
        'Ingresa tu nueva contraseña',
        [{text: 'OK', onPress: this.focusPassword}],
        {onDismiss: this.focusPassword},
      );
    } else if (new_password === '') {
      Alert.alert(
        'Cambiar contraseña',
        'Verifica tu nueva contraseña',
        [{text: 'OK', onPress: this.focusNewPassword}],
        {onDismiss: this.focusNewPassword},
      );
    } else {
      try {
        // Send update NIP request
        const response = await fetch(CHANGE_PASSWORD_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: id,
            password,
            new_password,
          }),
        });

        if (response.status === 200) {
          // Get request result
          const result = await response.json();

          if (result.nip) {
            Alert.alert(
              'Cambiar contraseña',
              'Tu contraseña se ha actualizado correctamente.',
              [{text: 'OK', onPress: this.goBack}],
              {onDismiss: this.goBack},
            );
          } else {
            Alert.alert('Cambiar contraseña', result.message);
          }
        }
      } catch (error) {
        Alert.alert(
          'Cambiar contraseña',
          'Hubo un problema para guardar la nueva contraseña, intente más tarde.',
        );
      }
    }
  }

  /**
   * Go back.
   */
  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="Cambiar mi contraseña" hasBack />

        {/* Screen content */}

        <Content
          padder
          showsVerticalScrollIndicator={false}
          style={styles.content}>
          {/*
          <InputWrapper label="NIP Actual">
            <View style={styles.wrapper}>
              <TextInput
                blurOnSubmit={false}
                maxLength={4}
                keyboardType="numeric"
                onChangeText={t => this.onChangeText('old_nip', t)}
                onSubmitEditing={this.onSubmitOldNIP}
                placeholder="Ingresa tu NIP actual"
                ref={this.oldNIPRef}
                returnKeyType="next"
                secureTextEntry={true}
                style={[styles.text, styles.input]}
                value={this.state.old_nip}
              />
            </View>
          </InputWrapper>
          */}

          <InputWrapper label="Contraseña">
            <View style={styles.wrapper}>
              <TextInput
                blurOnSubmit={false}
                onChangeText={t => this.onChangeText('password', t)}
                onSubmitEditing={this.onSubmitPassword}
                placeholder="Ingresa tu nueva contraseña"
                ref={this.passwordRef}
                returnKeyType="next"
                secureTextEntry={true}
                style={[styles.text, styles.input]}
                value={this.state.password}
              />
            </View>
          </InputWrapper>

          {/* E-mail input */}
          <InputWrapper label="Confirmar contraseña">
            <View style={styles.wrapper}>
              <TextInput
                blurOnSubmit={true}
                onChangeText={t => this.onChangeText('new_password', t)}
                onSubmitEditing={this.onSubmitNewPassword}
                placeholder="Verifica tu contraseña"
                ref={this.newPasswordRef}
                returnKeyType="done"
                secureTextEntry={true}
                style={[styles.text, styles.input]}
                value={this.state.new_password}
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
            width={200}>
            <Text style={[styles.text, styles.submit]}>Cambiar contraseña</Text>
          </NeuButton>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  // Screen content
  content: {backgroundColor: '#fff'},

  // Input wrapper
  wrapper: {alignItems: 'center', flex: 1, flexDirection: 'row', height: 42},

  // Text color
  text: {color: '#2e3342', fontFamily: 'Heebo-Regular'},

  // Input
  input: {fontSize: 16, letterSpacing: 0.5, width: '100%'},

  // Submit button
  button: {alignSelf: 'center', marginTop: 15, marginBottom: 10},

  // Submit button text
  submit: {fontSize: 14, letterSpacing: 1.25},
});
