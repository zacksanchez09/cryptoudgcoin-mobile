import React, {Component, createRef} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuButton} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import InputWrapper from '../components/InputWrapper';
import {NIP_URL} from '../utils/API';

export default class UpdateNIPScreen extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      id: '',
      old_nip: '',
      nip: '',
      new_nip: '',
    };

    // Create refs
    this.oldNIPRef = createRef();
    this.NIPRef = createRef();
    this.newNIPRef = createRef();

    // Bind methods
    this.getUserInfo = this.getUserInfo.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.focusOldNIP = this.focusOldNIP.bind(this);
    this.onSubmitOldNIP = this.onSubmitOldNIP.bind(this);
    this.focusNIP = this.focusNIP.bind(this);
    this.onSubmitNIP = this.onSubmitNIP.bind(this);
    this.focusNewNIP = this.focusNewNIP.bind(this);
    this.onSubmitNewNIP = this.onSubmitNewNIP.bind(this);
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
   * OnChangeText event.
   * @param {string} name - Input name.
   * @param {string} value - Input value.
   */
  onChangeText(name, value) {
    this.setState({[name]: value});
  }

  /**
   * Focus Old NIP.
   */
  focusOldNIP() {
    this.oldNIPRef.current.focus();
  }

  /**
   * OnSubmitEditing Old NIP input event.
   */
  onSubmitOldNIP() {
    this.focusNIP();
  }

  /**
   * Focus NIP.
   */
  focusNIP() {
    this.NIPRef.current.focus();
  }

  /**
   * OnSubmitEditing NIP input event.
   */
  onSubmitNIP() {
    this.focusNewNIP();
  }

  /**
   * Focus New NIP.
   */
  focusNewNIP() {
    this.newNIPRef.current.focus();
  }

  /**
   * OnSubmitEditing New NIP input event.
   */
  onSubmitNewNIP() {
    this.submit();
  }

  /**
   * OnPress Submit button.
   */
  async onPressSubmit() {
    this.submit();
  }

  /**
   * Submit Update NIP request.
   */
  async submit() {
    // Get form data
    const {id, old_nip, nip, new_nip} = this.state;

    // Validate form data
    if (old_nip === '') {
      Alert.alert(
        'Actualizar NIP',
        'Ingresa tu NIP anterior',
        [{text: 'OK', onPress: this.focusOldNIP}],
        {onDismiss: this.focusOldNIP},
      );
    } else if (nip === '') {
      Alert.alert(
        'Actualizar NIP',
        'Ingresa tu nueva NIP',
        [{text: 'OK', onPress: this.focusNIP}],
        {onDismiss: this.focusNIP},
      );
    } else if (new_nip === '') {
      Alert.alert(
        'Actualizar NIP',
        'Verifica tu nueva NIP',
        [{text: 'OK', onPress: this.focusNewNIP}],
        {onDismiss: this.focusNewNIP},
      );
    } else {
      try {
        // Send update NIP request
        const response = await fetch(NIP_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: id,
            old_nip,
            nip,
            new_nip,
          }),
        });

        if (response.status === 200) {
          // Get request result
          const result = await response.json();

          if (result.nip) {
            Alert.alert(
              'Actualizar NIP',
              'Tu NIP se ha actualizado correctamente.',
              [{text: 'OK', onPress: this.goBack}],
              {onDismiss: this.goBack},
            );
          } else {
            Alert.alert('Editar NIP', result.message);
          }
        }
      } catch (error) {
        Alert.alert(
          'Actualizar NIP',
          'Hubo un problema para guardar la nueva NIP, intente más tarde.',
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
        <AppHeader title="Cambiar mi NIP" hasBack />

        {/* Screen content */}

        <Content
          padder
          showsVerticalScrollIndicator={false}
          style={styles.content}>
          <View style={{marginHorizontal: 10, marginBottom: 15}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>Tu NIP inicial es:</Text> 0000
            </Text>

            <Text style={{textAlign: 'center'}}>
              Asegurate de cambiarlo antes de realizar tus operaciones
            </Text>
          </View>

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

          <InputWrapper label="Nuevo NIP">
            <View style={styles.wrapper}>
              <TextInput
                blurOnSubmit={false}
                keyboardType="numeric"
                maxLength={4}
                onChangeText={t => this.onChangeText('nip', t)}
                onSubmitEditing={this.onSubmitNIP}
                placeholder="Ingresa tu nuevo NIP"
                ref={this.NIPRef}
                returnKeyType="next"
                secureTextEntry={true}
                style={[styles.text, styles.input]}
                value={this.state.nip}
              />
            </View>
          </InputWrapper>

          {/* E-mail input */}
          <InputWrapper label="Confirmar nuevo NIP">
            <View style={styles.wrapper}>
              <TextInput
                blurOnSubmit={true}
                keyboardType="numeric"
                maxLength={4}
                onChangeText={t => this.onChangeText('new_nip', t)}
                onSubmitEditing={this.onSubmitNewNIP}
                placeholder="Verifica tu nuevo NIP"
                ref={this.newNIPRef}
                returnKeyType="done"
                secureTextEntry={true}
                style={[styles.text, styles.input]}
                value={this.state.new_nip}
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
            <Text style={[styles.text, styles.submit]}>Guardar NIP</Text>
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
