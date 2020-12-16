import React, {Component} from 'react';
import {Dimensions, Image, Linking, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from 'native-base';

import AppHeader from '../../components/AppHeader';
import OxxoPay from '../../assets/images/OXXO-PAY.jpg';

class OxxoPayScreen extends Component {
  constructor(props) {
    super(props);

    this.onPressFind = this.onPressFind.bind(this);
  }

  onPressFind() {
    Linking.openURL('https://www.google.com.mx/maps/search/oxxo/');
  }

  render() {
    const oxxo_pay = this.props.navigation.getParam('oxxo_pay');

    const {charges, line_items} = oxxo_pay.order;

    const {unit_price} = line_items.data['0'];

    const {reference} = charges.data['0'].payment_method;

    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="OXXO Pay" hasBack nested goHome />

        {/* Screen content */}
        <Content style={styles.content}>
          {/* Notice */}
          <View style={styles.notice}>
            <Text style={styles.notice_text}>
              Ficha digital, no es necesario imprimir.
            </Text>
          </View>

          <View style={styles.info}>
            <View style={styles.section}>
              <Image
                resizeMode="contain"
                source={OxxoPay}
                style={styles.logo}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.title}>Monto a pagar</Text>

              <View style={styles.payment}>
                <Text style={styles.amount}>
                  $ {(parseFloat(unit_price) / 100).toFixed(2) || '0.00'}
                </Text>

                <Text style={styles.currency}> MXN</Text>
              </View>

              <Text style={styles.note}>
                OXXO cobrará una comisión adicional al momento de realizar el
                pago.
              </Text>
            </View>
          </View>

          <View style={styles.reference}>
            <Text style={styles.title}>Referencia</Text>

            <View style={styles.input}>
              <Text selectable style={styles.value}>
                {reference || '000000000000000000'}
              </Text>
            </View>
          </View>

          <View style={styles.instructions}>
            <Text style={styles.instructions_title}>Instrucciones</Text>

            <Text style={styles.list}>
              1. Acude a la tienda OXXO más cercana.{' '}
              <Text onPress={this.onPressFind} style={styles.link}>
                Encuéntrala aquí
              </Text>
            </Text>

            <Text style={styles.list}>
              2. Indica en caja que quieres realizar un pago de{' '}
              <Text style={styles.bold}>OXXOPay</Text>.
            </Text>

            <Text style={styles.list}>
              3. Dicta al cajero el número de referencia en esta ficha para que
              tecleé directamete en la pantalla de venta.
            </Text>

            <Text style={styles.list}>
              4. Realiza el pago correspondiente con dinero en efectivo.
            </Text>

            <Text style={styles.list}>
              5. Al confirmar tu pago, el cajero te entregará un comprobante
              impreso.{' '}
              <Text style={styles.bold}>
                En el podrás verificar que se haya realizado correctamente.
              </Text>{' '}
              Conserva este comprobante de pago.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.text}>
              Al completar estos pasos recibirás un correo de{' '}
              <Text style={styles.bold}>CryptoUDGCoin</Text> confirmando tu
              pago.
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

/**
 * Recharges screen styles.
 */
const styles = StyleSheet.create({
  // Screen background
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },

  // Screen container
  container: {flex: 1},

  // Screen header
  header: {backgroundColor: 'transparent'},

  // Screen content
  content: {backgroundColor: '#FFF', flex: 1},

  // Notice
  notice: {
    alignSelf: 'center',
    backgroundColor: '#000',
    padding: 10,
    width: '90%',
  },

  // Notice text
  notice_text: {
    color: '#FFF',
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // Info
  info: {flexDirection: 'row', justifyContent: 'space-evenly'},

  // Info section
  section: {justifyContent: 'center', flex: 1},

  // Logo
  logo: {
    alignSelf: 'center',
    height: 100,
    width: Dimensions.get('window').width / 3,
  },

  // Title
  title: {
    color: '#3e455b',
    fontSize: 12,
    textTransform: 'uppercase',
  },

  // Payment section
  payment: {flexDirection: 'row', alignItems: 'flex-start'},

  // Amount
  amount: {fontSize: 21, fontWeight: 'bold'},

  // Currency
  currency: {fontSize: 11, fontWeight: 'bold', margin: 2.5},

  // Note
  note: {color: '#3e455b', fontStyle: 'italic', fontSize: 10},

  // Reference section
  reference: {alignSelf: 'center', width: '90%'},

  // Reference input
  input: {
    backgroundColor: '#f8f9fa',
    borderColor: '#c9c9cc',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 5,
    padding: 10,
  },

  // Reference value
  value: {textAlign: 'center', fontSize: 21, fontWeight: 'bold'},

  // Instructions section
  instructions: {borderTopColor: '#c9c9cc', borderTopWidth: 1, padding: 20},

  // Instructions title
  instructions_title: {
    color: '#3e455b',
    fontSize: 12,
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  // Instructions list item
  list: {fontSize: 12, marginBottom: 5},

  // Link
  link: {color: '#00b5bd', textDecorationLine: 'underline'},

  // Bold
  bold: {fontWeight: 'bold'},

  // Footer
  footer: {
    borderColor: '#00a24f',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 20,
  },

  // Footer text
  text: {color: '#00a24f', fontSize: 12},
});

export default OxxoPayScreen;
