import React from 'react';
import {NavigationEvents} from 'react-navigation';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuView} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import ExchangeActions from '../components/ExchangeActions';
import LoadingIndicator from '../components/LoadingIndicator';
import WalletItem from '../components/WalletItem';
import {WALLETS_URL} from '../utils/API';
import {getLogo} from '../utils/Constants';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading User Wallets?
      isLoading: true,

      // User wallets
      wallets: [],

      // Selected coin filter
      coin: null,
    };

    this.onDidFocus = this.onDidFocus.bind(this);
    this.getWallets = this.getWallets.bind(this);
    this.onPressWallet = this.onPressWallet.bind(this);
    this.onPressInfo = this.onPressInfo.bind(this);
  }

  componentDidMount() {
    this.getWallets();
  }

  onDidFocus() {
    this.setState({isLoading: true, coin: null}, this.getWallets);
  }

  /**
   * Get User wallets.
   */
  async getWallets() {
    try {
      // Get user storaged info
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      // Send "Get user wallets" request
      const response = await fetch(WALLETS_URL + user.id);

      if (response.status === 200) {
        // Get request result
        const result = await response.json();

        // Update state
        this.setState({wallets: result, isLoading: false});
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      console.error('Fetch: ', error);
    }
  }

  /***
   * OnPress Wallet list item.
   */
  onPressWallet({item, index}, rowMap) {
    // Get list item key
    const key = `wallet-${index}`;

    // Check if the row is actually selected
    if (rowMap[key].currentTranslateX === 0) {
      // Set position
      // const position = item.name === 'MXN' ? -72 : -130;

      // Move selected row
      rowMap[key].manuallySwipeRow(-72);
    } else {
      // Close selected row
      rowMap[key].closeRow();
    }
  }

  /**
   * OnPress Wallet info button.
   * @param {*} wallet - Wallet item.
   */
  onPressInfo(wallet) {
    this.props.navigation.navigate('Wallet', {wallet});
  }

  render() {
    // Get screen state
    const {isLoading, wallets} = this.state;

    return (
      <Container>
        {/* Navigation events */}
        <NavigationEvents onDidFocus={this.onDidFocus} />

        {/* Screen header */}
        <AppHeader title="Inicio" />

        {/* Screen content */}
        <Content
          contentContainerStyle={styles.container}
          style={styles.background}>
          {/* Exchange actions */}
          <View>
            <ExchangeActions wallets={wallets} />
          </View>

          {/* My wallets list */}
          <Text style={[styles.text, styles.title]}>Mis carteras</Text>

          {isLoading ? (
            // Loading content
            <View style={styles.loading}>
              <LoadingIndicator />
            </View>
          ) : wallets.length > 0 ? (
            // Wallets list
            <FlatList
              data={wallets}
              keyExtractor={(_, index) => `wallet-${index}`}
              renderItem={({item}) => (
                <WalletItem
                  item={item}
                  logo={getLogo(item.name)}
                  onPress={() => this.onPressInfo(item)}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            // Empty list without active filter
            <NeuView
              borderRadius={12}
              color="#FFFFFF"
              height={64}
              style={styles.empty}
              width={Dimensions.get('window').width - 50}>
              <Text style={styles.text}>No hay carteras registradas</Text>
            </NeuView>
          )}
        </Content>
      </Container>
    );
  }
}

/**
 * Home screen styles.
 */
const styles = StyleSheet.create({
  // Screen container
  container: {flex: 1},

  // Screen background
  background: {backgroundColor: '#fff'},

  // Text
  text: {color: '#2e3342', fontFamily: 'Heebo-Regular'},

  // My wallets title
  title: {
    color: '#9e9e9e',
    fontFamily: 'Heebo-Medium',
    fontSize: 16,
    letterSpacing: 0.5,
    marginLeft: 15,
  },

  // Loading container
  loading: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },

  // Empty list
  empty: {alignSelf: 'center', marginTop: 10, marginBottom: 20},

  // Add wallet container
  add: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },

  // Add wallet message
  message: {flex: 1, marginRight: 10},

  // Create wallet message
  create: {fontSize: 14, letterSpacing: 0.25},

  // Add wallet button
  button: {alignSelf: 'center'},

  // Add wallet icon
  icon: {flexDirection: 'row', justifyContent: 'space-around'},
});
