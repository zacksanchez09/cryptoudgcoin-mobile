import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Content} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AppHeader from '../../components/AppHeader';
import Option from '../../components/Option';
import Colors from '../../utils/Colors';

export default class TransferScreen extends React.Component {
  constructor(props) {
    super(props);

    this.onPressQR = this.onPressQR.bind(this);
  }

  /**
   * OnPress QR option event.
   */
  onPressQR() {
    this.props.navigation.navigate('TransferQR');
  }

  render() {
    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="Enviar" hasBack nested={true} />

        {/* Screen content */}
        <Content padder style={styles.content}>
          {/* Screen title */}
          <Text style={[styles.text, styles.title]}>Método de envío</Text>

          <Option
            icon={<AntDesign color={Colors.primary} name="qrcode" size={28} />}
            name="CryptoUDGCoin Transfer (Instantánea)"
            onPress={this.onPressQR}
          />
        </Content>
      </Container>
    );
  }
}

/**
 * Add fund screen styles.
 */
const styles = StyleSheet.create({
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

  // Image
  image: {alignSelf: 'center', tintColor: Colors.primary},
});
