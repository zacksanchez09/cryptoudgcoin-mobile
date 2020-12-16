import React from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuButton} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import InputWrapper from '../components/InputWrapper';
import {EDIT_INFO_URL} from '../utils/API';
import {EMAIL_REGEX} from '../utils/Constants';

export default class EditUserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      lastName: '',
      email: '',
      udg_code: '',
      career: '',
      phone: '',
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onChangeUDG = this.onChangeUDG.bind(this);
    this.onSubmitUDG = this.onSubmitUDG.bind(this);
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onSubmitCareer = this.onSubmitCareer.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmitPhone = this.onSubmitPhone.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  /**
   * Get user info.
   */
  async getUserInfo() {
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    this.setState({
      id: user.id,
      name: user.name,
      lastName: user.last_name,
      email: user.email,
      udg_code: user.udg_code,
      career: user.career,
      phone: user.phone,
    });
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
    this.lastNameRef.focus();
  }

  /**
   * OnChangeText Last name input event.
   * @param {string} lastName - New name value.
   */
  onChangeLastName(lastName) {
    this.setState({lastName});
  }

  /**
   * OnSubmitEditing Last name input event.
   */
  onSubmitLastName() {
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
    this.udgRef.focus();
  }

  onChangeUDG(udg_code) {
    this.setState({udg_code});
  }

  /**
   * OnSubmitEditing RFC input event.
   */
  onSubmitUDG() {
    this.careerRef.focus();
  }

  onChangeCareer(career) {
    this.setState({career});
  }

  onSubmitCareer() {
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
    this.edit();
  }

  /**
   * OnPress Submit button.
   */
  async onPressSubmit() {
    this.edit();
  }

  async edit() {
    // Get form data
    const {id, name, lastName, email, udg_code, career, phone} = this.state;

    // Validate form data
    if (name === '') {
      Alert.alert(
        'Editar información',
        'Ingresa tu nombre',
        [{text: 'OK', onPress: () => this.nameRef.focus()}],
        {onDismiss: () => this.nameRef.focus()},
      );
    } else if (lastName === '') {
      Alert.alert(
        'Editar información',
        'Ingresa tus apellidos',
        [{text: 'OK', onPress: () => this.lastNameRef.focus()}],
        {onDismiss: () => this.lastNameRef.focus()},
      );
    } else if (email === '') {
      Alert.alert(
        'Editar información',
        'Ingresa tu correo electrónico',
        [{text: 'OK', onPress: () => this.emailRef.focus()}],
        {onDismiss: () => this.emailRef.focus()},
      );
    } else if (!EMAIL_REGEX.test(email)) {
      Alert.alert(
        'Editar información',
        'Ingresa un correo electrónico válido',
        [{text: 'OK', onPress: () => this.emailRef.focus()}],
        {onDismiss: () => this.emailRef.focus()},
      );
    } else if (udg_code === '') {
      Alert.alert(
        'Editar información',
        'Ingresa tu código UDG',
        [{text: 'OK', onPress: () => this.udgRef.focus()}],
        {onDismiss: () => this.udgRef.focus()},
      );
    } else if (career === '') {
      Alert.alert(
        'Editar información',
        'Ingresa tu carrera',
        [{text: 'OK', onPress: () => this.careerRef.focus()}],
        {onDismiss: () => this.careerRef.focus()},
      );
    } else if (phone === '') {
      Alert.alert(
        'Editar información',
        'Ingresa tu teléfono',
        [{text: 'OK', onPress: () => this.phoneRef.focus()}],
        {onDismiss: () => this.phoneRef.focus()},
      );
    } else {
      try {
        // Send Sign-up request
        const response = await fetch(EDIT_INFO_URL + id, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            last_name: lastName,
            email,
            udg_code,
            career,
            phone,
          }),
        });

        // Get request result
        const result = await response.json();

        // Validate if Login was successful
        if (result.user) {
          const {user} = result;

          await AsyncStorage.setItem('user', JSON.stringify(user));

          // Redirect to Main screen.
          Alert.alert(
            'Editar información',
            'Los cambios fueron guardados éxitosamente',
            [{text: 'OK', onPress: this.goBack}],
            {onDismiss: this.goBack},
          );
        } else {
          console.error(result);

          Alert.alert(
            'Editar información',
            'Hubo un problema para guardar los cambios, intente más tarde.',
          );
        }
      } catch (error) {
        console.error(error);

        Alert.alert(
          'Editar información',
          'Hubo un problema para guardar los cambios, intente más tarde.',
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
        <AppHeader title="Editar mi información" hasBack />

        {/* Screen content */}
        <Content
          padder
          showsVerticalScrollIndicator={false}
          style={styles.content}>
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

          {/* RFC input */}
          <InputWrapper label="Código UDG">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="characters"
                blurOnSubmit={false}
                keyboardType="name-phone-pad"
                onChangeText={this.onChangeUDG}
                onSubmitEditing={this.onChangeUDG}
                ref={ref => (this.udgRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.udg_code}
              />
            </View>
          </InputWrapper>

          <InputWrapper label="Carrera">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="sentences"
                blurOnSubmit={false}
                onChangeText={this.onChangeCareer}
                onSubmitEditing={this.onSubmitCareer}
                ref={ref => (this.careerRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.career}
              />
            </View>
          </InputWrapper>

          {/* Phone input label */}
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

          {/* Submit form button */}
          <NeuButton
            borderRadius={24}
            color="#FFFFFF"
            height={48}
            onPress={this.onPressSubmit}
            style={styles.button}
            width={200}>
            <Text style={[styles.text, styles.submit]}>Guardar cambios</Text>
          </NeuButton>
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
