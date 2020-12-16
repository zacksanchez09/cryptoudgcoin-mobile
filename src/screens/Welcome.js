import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button, Container, Content} from 'native-base';
import {NeuButton, NeuView} from 'react-native-neu-element';

import AppHeader from '../components/AppHeader';
import Logo from '../components/Logo';
import Colors from '../utils/Colors';

export default function WelcomeScreen({navigation}) {
  return (
    <Container>
      {/* Screen header */}
      <AppHeader hasTitle={false} />

      {/* Screen content */}
      <Content
        contentContainerStyle={styles.container}
        padder
        style={styles.background}>
        {/* App logo */}
        <NeuView
          borderRadius={42}
          height={149}
          color="#FFFFFF"
          style={styles.logo}
          width={149}>
          <Logo size={150} />
        </NeuView>

        {/* Sign up button */}
        <NeuButton
          borderRadius={24}
          color="#FFFFFF"
          height={48}
          onPress={() => navigation.navigate('SignUp')}
          style={{...styles.button, ...styles.register}}
          width={150}>
          <Text style={[styles.text, styles.sign_up]}>Crear cuenta</Text>
        </NeuButton>

        {/* Sign in button */}
        <Button
          onPress={() => navigation.navigate('SignIn')}
          style={{...styles.button, ...styles.transparent}}
          transparent>
          <Text style={[styles.text, styles.sign_in]}>Iniciar sesión</Text>
        </Button>
      </Content>
    </Container>
  );
}

/**
 * Welcome screen styles.
 */
const styles = StyleSheet.create({
  // Screen container
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  // Screen background
  background: {backgroundColor: Colors.background_primary},

  // Button
  button: {alignSelf: 'center'},

  // Register button
  register: {marginBottom: 60, marginTop: 60},

  // Text
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // Sign up button text
  sign_up: {fontSize: 16, letterSpacing: 1.25},

  // Transparent button
  transparent: {marginTop: 10},

  // Sign in button text
  sign_in: {color: Colors.primary, fontSize: 18, letterSpacing: 1.25},
});
