import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Content} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppHeader from '../../components/AppHeader';
import Option from '../../components/Option';
import Colors from '../../utils/Colors';

export default function AddFundsScreen({navigation}) {
  return (
    <Container>
      {/* Screen header */}
      <AppHeader title="Depositar" hasBack nested={true} />

      {/* Screen content */}
      <Content padder style={styles.content}>
        {/* Screen title */}
        <Text style={[styles.text, styles.title]}>Método de fondeo</Text>

        {/* Credit/Debit card option */}
        <Option
          icon={
            <FontAwesome color={Colors.primary} name="credit-card" size={21} />
          }
          name="Tarjeta de crédito o débito"
          onPress={() => navigation.navigate('AddFundsCard')}
        />

        {/* Authorized store option */}
        <Option
          icon={
            <MaterialCommunityIcons
              color={Colors.primary}
              name="shopping"
              size={28}
            />
          }
          name="OXXO"
          onPress={() => navigation.navigate('AddFundsOxxo')}
        />
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

  // Text style
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // Title
  title: {
    color: Colors.secondary_text,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginLeft: 15,
    marginBottom: 10,
  },
});
