import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Content} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AppHeader from '../../components/AppHeader';
import Option from '../../components/Option';
import Colors from '../../utils/Colors';

export default class WithdrawScreen extends React.Component {
  constructor(props) {
    super(props);

    this.onPressQR = this.onPressQR.bind(this);
  }

  /**
   * OnPress QR option event.
   */
  onPressQR() {
    this.props.navigation.navigate('WithdrawQR');
  }

  render() {
    return (
      <Container>
        {/* Screen header */}
        <AppHeader hasBack nested={true} title="Retirar" />

        {/* Screen content */}
        <Content
          contentContainerStyle={styles.container}
          padder
          style={styles.content}>
          {/* Screen title */}
          <Text style={[styles.text, styles.title]}>Método de retiro</Text>

          {/* Credit card option */}
          <Option
            icon={<AntDesign color={Colors.primary} name="qrcode" size={28} />}
            name="CryptoUDGCoin Withdraw (Instantánea)"
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
  // Screen container
  container: {flex: 1},

  // Screen content
  content: {backgroundColor: '#FFFFFF'},

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
  image: {alignSelf: 'center', tintColor: '#9e9e9e'},
});
