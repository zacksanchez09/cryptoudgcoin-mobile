import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuView, NeuButton} from 'react-native-neu-element';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import LoadingIndicator from '../components/LoadingIndicator';
import InputWrapper from '../components/InputWrapper';
import Colors from '../utils/Colors';
import {getLogo} from '../utils/Constants';

export default class WalletScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading?
      isLoading: false,

      // Selected wallet
      wallet: {
        balance: '',
        created_at: '',
        decimal_places: 0,
        description: '',
        id: 0,
        name: '',
        slug: '',
        updated_at: '',
      },

      // URI
      uri: '89djhKUGYAATdsBIDA&Si&DS&ATasd',

      user: {},
    };

    this.getWallet = this.getWallet.bind(this);
  }

  componentDidMount() {
    this.getWallet();
  }

  async getWallet() {
    // Get selected wallet
    const wallet = this.props.navigation.getParam('wallet');
    const user = JSON.parse((await AsyncStorage.getItem('user')) || 'null');

    this.setState({wallet, user, isLoading: false});
  }

  render() {
    // Get screen state
    const {uri, user, wallet} = this.state;
    // Get wallet info
    const {id, balance, description, name, slug} = wallet;

    console.log(user.id);

    return (
      <Container>
        {/* Screen header */}
        <AppHeader hasBack nested={true} title="Información de la cartera" />

        {/* Screen content */}
        <Content padder style={styles.background}>
          {this.state.isLoading ? (
            <View style={styles.loading}>
              <LoadingIndicator />
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginBottom: 15,
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View style={{marginVertical: 5}}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: Colors.primary,
                          fontSize: 16,
                          letterSpacing: 0.5,
                        },
                      ]}>
                      Nombre de la cartera
                    </Text>

                    <Text
                      style={[styles.text, {fontSize: 16, letterSpacing: 0.5}]}>
                      {name === 'MXN'
                        ? 'Peso mexicano'
                        : name === 'UDGC'
                        ? 'CryptoUDGCoin'
                        : name}
                    </Text>
                  </View>

                  <View style={{marginVertical: 5}}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: Colors.primary,
                          fontSize: 16,
                          letterSpacing: 0.5,
                        },
                      ]}>
                      Tipo de cartera
                    </Text>

                    <Text
                      style={[styles.text, {fontSize: 16, letterSpacing: 0.5}]}>
                      Personal
                    </Text>
                  </View>
                </View>

                {user.id && (
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color: Colors.primary,
                          fontSize: 16,
                          letterSpacing: 0.5,
                          marginBottom: 10,
                          marginLeft: 20,
                        },
                      ]}>
                      Código QR
                    </Text>

                    <NeuView
                      borderRadius={12}
                      color="#FFFFFF"
                      containerStyle={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}
                      height={125}
                      style={{alignSelf: 'flex-end', marginRight: 15}}
                      width={125}>
                      <QRCode
                        backgroundColor="#FFF"
                        color="#2e3342"
                        size={100}
                        value={String(user.id) || ''}
                      />
                    </NeuView>
                  </View>
                )}
              </View>

              <InputWrapper label="Dirección de la cartera" height={48}>
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    height: 48,
                  }}>
                  <TextInput
                    editable={false}
                    style={[styles.text, {fontSize: 12, flex: 1}]}
                    value={uri}
                  />

                  <NeuButton
                    borderRadius={8}
                    color="#fcf9f0"
                    height={32}
                    onPress={this.onPressURI}
                    width={32}>
                    <Icon color="#9e9e9e" name="copy" size={18} />
                  </NeuButton>
                </View>
              </InputWrapper>

              <InputWrapper label="Saldo disponible">
                <TextInput
                  editable={false}
                  style={[styles.text, {flex: 1, height: 42}]}
                  value={balance}
                />

                <TextInput
                  editable={false}
                  style={[styles.text]}
                  value={name === 'MXN' ? name : description}
                />
              </InputWrapper>

              <View style={{marginHorizontal: 15, marginVertical: 5}}>
                <Text
                  style={[
                    styles.text,
                    {color: Colors.primary, fontSize: 16, letterSpacing: 0.55},
                  ]}>
                  Tipo de cambio
                </Text>

                <NeuView
                  borderRadius={24}
                  color="#FFFFFF"
                  height={120}
                  style={{marginVertical: 15}}
                  width={Dimensions.get('window').width - 45}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      height: 48,
                      justifyContent: 'center',
                      paddingLeft: 15,
                      paddingRight: 57,
                      borderBottomColor: '#9e9e9e',
                      borderBottomWidth: 0.75,
                    }}>
                    <Image
                      resizeMode="contain"
                      source={getLogo(
                        name === 'MXN'
                          ? name
                          : description === 'UDGC'
                          ? 'UDGC'
                          : name,
                      )}
                      style={{height: 32, width: 32, marginRight: 10}}
                    />

                    <TextInput
                      editable={false}
                      style={[styles.text, {flex: 1}]}
                      value="1.00"
                    />

                    <TextInput
                      editable={false}
                      style={[styles.text]}
                      value={
                        name === 'MXN'
                          ? name
                          : description === 'UDGC'
                          ? 'UDGC'
                          : name
                      }
                    />
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      height: 48,
                      justifyContent: 'center',
                      paddingLeft: 15,
                      paddingRight: 57,
                    }}>
                    <Image
                      resizeMode="contain"
                      source={getLogo('MXN')}
                      style={{height: 32, width: 32, marginRight: 10}}
                    />

                    <TextInput
                      editable={false}
                      style={[styles.text, {flex: 1}]}
                      value="1.00"
                    />

                    <TextInput
                      editable={false}
                      style={[styles.text]}
                      value={'MXN'}
                    />
                  </View>
                </NeuView>
              </View>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

/**
 * Wallet screen styles.
 */
const styles = StyleSheet.create({
  // Screen background
  background: {backgroundColor: '#FFF'},

  // Text
  text: {color: '#2e3342', fontFamily: 'Heebo-Regular'},
});
