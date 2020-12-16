import React from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuButton} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import InputWrapper from '../components/InputWrapper';
import {CONTACT_FORM} from '../utils/API';

export default class ContactUsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onSubmitSubject = this.onSubmitSubject.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
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
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    this.setState({id: user.id});
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
    this.subjectRef.focus();
  }

  onChangeSubject(subject) {
    this.setState({subject});
  }

  /**
   * OnSubmitEditing RFC input event.
   */
  onSubmitSubject() {
    this.messageRef.focus();
  }

  onChangeMessage(message) {
    this.setState({message});
  }

  onSubmitMessage() {
    this.submit();
  }

  /**
   * OnPress Submit button.
   */
  async onPressSubmit() {
    this.submit();
  }

  async submit() {
    // Get form data
    const {name, email, subject, message} = this.state;

    // Validate form data
    if (name === '') {
      Alert.alert(
        'Contáctanos',
        'Ingresa tu nombre',
        [{text: 'OK', onPress: () => this.nameRef.focus()}],
        {onDismiss: () => this.nameRef.focus()},
      );
    } else if (email === '') {
      Alert.alert(
        'Contáctanos',
        'Ingresa tu correo electrónico',
        [{text: 'OK', onPress: () => this.emailRef.focus()}],
        {onDismiss: () => this.emailRef.focus()},
      );
    } else if (subject === '') {
      Alert.alert(
        'Contáctanos',
        'Ingresa el asunto',
        [{text: 'OK', onPress: () => this.subjectRef.focus()}],
        {onDismiss: () => this.subjectRef.focus()},
      );
    } else if (message === '') {
      Alert.alert(
        'Contáctanos',
        'Ingresa el mensaje',
        [{text: 'OK', onPress: () => this.messageRef.focus()}],
        {onDismiss: () => this.messageRef.focus()},
      );
    } else {
      try {
        // Send Contact Form request
        const response = await fetch(CONTACT_FORM, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message,
          }),
        });

        if (response.status === 200) {
          // Get request result
          const result = await response.json();

          // Validate if Login was successful
          if (result) {
            // Redirect to Main screen.
            Alert.alert(
              'Contáctanos',
              'Tu mensaje se ha enviado correctamente. Nos pondremos en contacto contigo a la brevedad. Gracias.',
              [{text: 'OK', onPress: this.goBack}],
              {onDismiss: this.goBack},
            );
          } else {
            Alert.alert('Contáctanos', result.message);
          }
        }
      } catch (error) {
        Alert.alert(
          'Contáctanos',
          'Hubo un problema al enviar el mensaje, intente más tarde.',
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
        <AppHeader title="Contáctanos" hasBack />

        <Content
          padder
          showsVerticalScrollIndicator={false}
          style={styles.content}>
          {/* Screen content */}
          <Text style={{textAlign: 'center', marginBottom: 10}}>
            Escríbenos tus dudas, con gusto las resolveremos.
          </Text>

          {/* Name input */}
          <InputWrapper label="Nombre">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="words"
                blurOnSubmit={false}
                onChangeText={this.onChangeName}
                onSubmitEditing={this.onSubmitName}
                placeholder="Ingresa tu nombre"
                ref={ref => (this.nameRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.name}
              />
            </View>
          </InputWrapper>

          {/* E-mail input */}
          <InputWrapper label="Correo electrónico">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize={false}
                blurOnSubmit={false}
                onChangeText={this.onChangeEmail}
                onSubmitEditing={this.onSubmitEmail}
                placeholder="Ingresa tu correo electrónico"
                ref={ref => (this.emailRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.email}
              />
            </View>
          </InputWrapper>

          <InputWrapper label="Asunto">
            <View style={styles.wrapper}>
              <TextInput
                autoCapitalize="none"
                blurOnSubmit={false}
                onChangeText={this.onChangeSubject}
                onSubmitEditing={this.onSubmitSubject}
                placeholder="Ingresa el asunto"
                ref={ref => (this.subjectRef = ref)}
                returnKeyType="next"
                style={[styles.text, styles.input]}
                value={this.state.subject}
              />
            </View>
          </InputWrapper>

          <InputWrapper height={84} label="Mensaje">
            <View style={{height: '100%', width: '100%'}}>
              <TextInput
                autoCapitalize="none"
                blurOnSubmit={true}
                multiline
                onChangeText={this.onChangeMessage}
                onSubmitEditing={this.onSubmitMessage}
                placeholder="Ingresa el mensaje"
                ref={ref => (this.messageRef = ref)}
                returnKeyType="done"
                style={[styles.text, styles.input]}
                value={this.state.message}
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
            <Text style={[styles.text, styles.submit]}>Enviar mensaje</Text>
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
