import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuButton} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import InputWrapper from '../components/InputWrapper';
import {SIGN_UP_URL} from '../utils/API';
import {EMAIL_REGEX} from '../utils/Constants';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Name
      name: '',
      // Last name
      lastName: '',
      // E-mail
      email: '',
      // Password
      password: '',
      // Repeat password
      repeatPassword: '',
      // UDG Code
      udg_code: '',
      // Career
      career: '',
      // Phone
      phone: '',
    };

    this.focusName = this.focusName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.focusLastName = this.focusLastName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.focusEmail = this.focusEmail.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.focusPassword = this.focusPassword.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.focusRepeatPassword = this.focusRepeatPassword.bind(this);
    this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
    this.onSubmitRepeatPassword = this.onSubmitRepeatPassword.bind(this);
    this.focusUDG = this.focusUDG.bind(this);
    this.onChangeUDG = this.onChangeUDG.bind(this);
    this.onSubmitUDG = this.onSubmitUDG.bind(this);
    this.focusCareer = this.focusCareer.bind(this);
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onSubmitCareer = this.onSubmitCareer.bind(this);
    this.focusPhone = this.focusPhone.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmitPhone = this.onSubmitPhone.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.register = this.register.bind(this);
  }

  /**
   * Focus Name input.
   */
  focusName() {
    this.nameRef.focus();
  }

  /**
   * OnChangeText Name input event.
   * @param {string} name - New name value.
   */
  onChangeName(name) {
    this.setState({name});
  }

  /**
   * OnSubmitEditing Name input event.
   */
  onSubmitName() {
    this.focusLastName();
  }

  /**
   * Focus Last name input.
   */
  focusLastName() {
    this.lastNameRef.focus();
  }

  /**
   * OnChangeText Last name input event.
   * @param {string} lastName - New Last name value.
   */
  onChangeLastName(lastName) {
    this.setState({lastName});
  }

  /**
   * OnSubmitEditing Last name input event.
   */
  onSubmitLastName() {
    this.focusEmail();
  }

  /**
   * Focus E-mail input.
   */
  focusEmail() {
    this.emailRef.focus();
  }

  /**
   * OnChangeText E-mail input event.
   * @param {string} email - New e-mail value
   */
  onChangeEmail(email) {
    this.setState({email});
  }

  /**
   * OnSubmitEditing E-mail input event.
   */
  onSubmitEmail() {
    this.focusPassword();
  }

  /**
   * Focus Password input.
   */
  focusPassword() {
    this.passwordRef.focus();
  }

  /**
   * OnChangeText Password input event.
   * @param {string} password - New password value
   */
  onChangePassword(password) {
    this.setState({password});
  }

  /**
   * OnSubmitEditing Password input event.
   */
  onSubmitPassword() {
    this.focusRepeatPassword();
  }

  /**
   * Focus Repeat password input.
   */
  focusRepeatPassword() {
    this.repeatPasswordRef.focus();
  }

  /**
   * OnChangeText Repeat password input event.
   * @param {string} repeatPassword - New repeat password value.
   */
  onChangeRepeatPassword(repeatPassword) {
    this.setState({repeatPassword});
  }

  /**
   * OnSubmitEditing Password input event.
   */
  onSubmitRepeatPassword() {
    this.focusUDG();
  }

  /**
   * Focus UDG input.
   */
  focusUDG() {
    this.udgRef.focus();
  }

  /**
   * OnChangeText UDG input event.
   * @param {string} udg - New UDG value.
   */
  onChangeUDG(udg_code) {
    this.setState({udg_code});
  }

  /**
   * OnSubmitEditing UDG input event.
   */
  onSubmitUDG() {
    this.focusCareer();
  }

  /**
   * Focus Career input.
   */
  focusCareer() {
    this.careerRef.focus();
  }

  /**
   * OnChangeText Career input event.
   * @param {string} career - New career value.
   */
  onChangeCareer(career) {
    this.setState({career});
  }

  /**
   * OnSubmitEditing Career input event.
   */
  onSubmitCareer() {
    this.focusPhone();
  }

  /**
   * Focus Phone input.
   */
  focusPhone() {
    this.phoneRef.focus();
  }

  /**
   * OnChangeText Phone input event.
   * @param {string} phone - New phone value.
   */
  onChangePhone(phone) {
    this.setState({phone});
  }

  /**
   * OnSubmitEditing Phone input event.
   */
  onSubmitPhone() {
    this.register();
  }

  /**
   * OnPress Submit button.
   */
  async onPressSubmit() {
    this.register();
  }

  async register() {
    // Get form data
    const {
      name,
      lastName,
      email,
      password,
      repeatPassword,
      udg_code,
      career,
      phone,
    } = this.state;

    // Validate form data
    if (name === '') {
      Alert.alert(
        'Registro',
        'Ingresa tu nombre',
        [{text: 'OK', onPress: this.focusName}],
        {onDismiss: this.focusName},
      );
    } else if (lastName === '') {
      Alert.alert(
        'Registro',
        'Ingresa tus apellidos',
        [{text: 'OK', onPress: this.focusLastName}],
        {onDismiss: this.focusLastName},
      );
    } else if (email === '') {
      Alert.alert(
        'Registro',
        'Ingresa tu correo electrónico',
        [{text: 'OK', onPress: this.focusEmail}],
        {onDismiss: this.focusEmail},
      );
    } else if (!EMAIL_REGEX.test(email)) {
      Alert.alert(
        'Registro',
        'Ingresa un correo electrónico válido',
        [{text: 'OK', onPress: this.focusEmail}],
        {onDismiss: this.focusEmail},
      );
    } else if (password === '') {
      Alert.alert(
        'Registro',
        'Ingresa una contraseña',
        [{text: 'OK', onPress: this.focusPassword}],
        {onDismiss: this.focusPassword},
      );
    } else if (password.length < 5) {
      Alert.alert(
        'Registro',
        'Ingresa una contraseña más larga',
        [{text: 'OK', onPress: this.focusPassword}],
        {onDismiss: this.focusPassword},
      );
    } else if (repeatPassword === '') {
      Alert.alert(
        'Registro',
        'Confirma la contraseña ingresada',
        [{text: 'OK', onPress: this.focusRepeatPassword}],
        {onDismiss: this.focusRepeatPassword},
      );
    } else if (password !== repeatPassword) {
      Alert.alert(
        'Registro',
        'Las contraseñas ingresadas no coinciden',
        [{text: 'OK', onPress: this.focusPassword}],
        {onDismiss: this.focusPassword},
      );
    } else if (udg_code === '') {
      Alert.alert(
        'Registro',
        'Ingresa tu código UDG',
        [{text: 'OK', onPress: this.focusUDG}],
        {onDismiss: this.focusUDG},
      );
    } else if (career === '') {
      Alert.alert(
        'Registro',
        'Ingresa tu carrera',
        [{text: 'OK', onPress: this.focusCareer}],
        {onDismiss: this.focusCareer},
      );
    } else if (phone === '') {
      Alert.alert(
        'Registro',
        'Ingresa tu teléfono',
        [{text: 'OK', onPress: this.focusPhone}],
        {onDismiss: this.focusPhone},
      );
    } else {
      try {
        // Send Sign-up request
        const response = await fetch(SIGN_UP_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            last_name: lastName,
            email,
            password,
            c_password: repeatPassword,
            udg_code,
            career,
            phone,
          }),
        });

        // Get request result
        const result = await response.json();

        // Validate if Login was successful
        if (result.success) {
          const {token, user} = result.success;

          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user', JSON.stringify(user));

          // Redirect to Main screen.
          Alert.alert(
            'Registro',
            'El registro se ha completado con éxito.',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('Main'),
              },
            ],
            {onDismiss: () => this.props.navigation.navigate('Main')},
          );
        } else {
          Alert.alert(
            'Registro',
            'Hubo un problema al realizar el registro, intente más tarde.',
          );
          console.error(result);
        }
      } catch (error) {
        // If request has failed, then show an alert.
        Alert.alert(
          'Registro',
          'Hubo un problema al realizar el registro, intente más tarde.',
        );
        console.error(error);
      }
    }
  }

  render() {
    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="Registro" hasBack />

        {/* Screen content */}
        <Content
          padder
          showsVerticalScrollIndicator={false}
          style={styles.background}>
          {/* Name input */}
          <InputWrapper label="Nombre">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="words"
                blurOnSubmit={false}
                onChangeText={this.onChangeName}
                onSubmitEditing={this.onSubmitName}
                ref={ref => (this.nameRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.name}
              />
            </View>
          </InputWrapper>

          {/* Last name input */}
          <InputWrapper label="Apellidos">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="words"
                blurOnSubmit={false}
                onChangeText={this.onChangeLastName}
                onSubmitEditing={this.onSubmitLastName}
                ref={ref => (this.lastNameRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.lastName}
              />
            </View>
          </InputWrapper>

          {/* E-mail input */}
          <InputWrapper label="Correo electrónico">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="none"
                blurOnSubmit={false}
                keyboardType="email-address"
                onChangeText={this.onChangeEmail}
                onSubmitEditing={this.onSubmitEmail}
                ref={ref => (this.emailRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.email}
              />
            </View>
          </InputWrapper>

          {/* Password input */}
          <InputWrapper label="Contraseña">
            <View style={styles.wrapper}>
              <TextInput
                blurOnSubmit={false}
                onChangeText={this.onChangePassword}
                onSubmitEditing={this.onSubmitPassword}
                ref={ref => (this.passwordRef = ref)}
                returnKeyType="next"
                secureTextEntry
                style={[styles.text, styles.input]}
                value={this.state.password}
              />
            </View>
          </InputWrapper>

          {/* Repeat password input */}
          <InputWrapper label="Confirmar contraseña">
            <View style={styles.wrapper}>
              <TextInput
                blurOnSubmit={false}
                onChangeText={this.onChangeRepeatPassword}
                onSubmitEditing={this.onSubmitRepeatPassword}
                ref={ref => (this.repeatPasswordRef = ref)}
                returnKeyType="next"
                secureTextEntry
                style={[styles.text, styles.input]}
                value={this.state.repeatPassword}
              />
            </View>
          </InputWrapper>

          {/* UDG input */}
          <InputWrapper label="Código UDG">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="characters"
                autoCorrect={false}
                blurOnSubmit={false}
                keyboardType="default"
                onChangeText={this.onChangeUDG}
                onSubmitEditing={this.onSubmitUDG}
                ref={ref => (this.udgRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.udg_code}
              />
            </View>
          </InputWrapper>

          {/* Career input */}
          <InputWrapper label="Carrera">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="words"
                blurOnSubmit={false}
                onChangeText={this.onChangeCareer}
                onSubmitEditing={this.onChangeCareer}
                ref={ref => (this.careerRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.career}
              />
            </View>
          </InputWrapper>

          {/* Phone input */}
          <InputWrapper label="Teléfono">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="none"
                blurOnSubmit={true}
                keyboardType="number-pad"
                maxLength={14}
                onChangeText={this.onChangePhone}
                onSubmitEditing={this.onSubmitPhone}
                ref={ref => (this.phoneRef = ref)}
                returnKeyType="done"
                style={[styles.text, styles.input]}
                value={this.state.phone}
              />
            </View>
          </InputWrapper>

          {/* Sign up button */}
          <NeuButton
            borderRadius={24}
            color="#FFFFFF"
            height={48}
            onPress={this.onPressSubmit}
            style={styles.button}
            width={150}>
            <Text style={[styles.text, styles.submit]}>Registrarse</Text>
          </NeuButton>
        </Content>
      </Container>
    );
  }
}

/**
 * Sign up screen styles.
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
  button: {alignSelf: 'center', marginTop: 15, marginBottom: 10},

  // Submit button text
  submit: {fontSize: 14, letterSpacing: 1.25},

  // Transparent button
  transparent: {alignSelf: 'center'},
});
