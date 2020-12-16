import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Content} from 'native-base';

import AppHeader from '../components/AppHeader';
import Option from '../components/Option';

export default function SupportScreen({navigation}) {
  return (
    <Container>
      {/* Screen header */}
      <AppHeader title="Soporte técnico" hasBack nested={true} />

      {/* Screen content */}
      <Content padder style={styles.content}>
        {/* Frequent questions option */}
        <Option
          name="(FAQ) Preguntas frecuentes"
          onPress={() => navigation.navigate('Faqs')}
        />

        {/* Contact us option */}
        <Option
          name="Contáctanos"
          onPress={() => navigation.navigate('ContactUs')}
        />
      </Content>
    </Container>
  );
}

/**
 * Add funds screen styles.
 */
const styles = StyleSheet.create({
  // Screen content
  content: {backgroundColor: '#fff'},
});
