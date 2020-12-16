import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';

import AppHeader from '../components/AppHeader';
import Option from '../components/Option';

export default function SecurityScreen({navigation}) {
  return (
    <Container>
      {/* Screen header */}
      <AppHeader title="Seguridad" hasBack nested={true} />

      {/* Screen content */}
      <Content padder style={styles.content}>
        {/* Change electronic signature option */}
        <Option
          name="Cambiar mi NIP"
          onPress={() => navigation.navigate('UpdateNIP')}
        />

        {/* Change password option */}
        <Option
          name="Cambiar mi contraseña"
          onPress={() => navigation.navigate('ChangePassword')}
        />

        {/* Restore electronic signature option
            <Option name="Recuperar mi firma electrónica" />
          */}

        {/* Two-factor authentication option
            <Option name="Autenticación de doble factor" />
          */}
      </Content>
    </Container>
  );
}

/**
 * Add funds screen styles.
 */
const styles = StyleSheet.create({
  // Screen container
  container: {flex: 1},

  // Screen content
  content: {backgroundColor: '#fff'},
});
