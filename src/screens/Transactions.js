import React, {Component} from 'react';
import {NavigationEvents} from 'react-navigation';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuView} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import HistoryItem from '../components/HistoryItem';
import {HISTORY_URL} from '../utils/API';
import Colors from '../utils/Colors';

export default class TransactionsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading Transactions?
      isLoading: true,

      // User transactions
      transactions: [],
    };

    this.getTransactions = this.getTransactions.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  refresh() {
    this.setState({isLoading: true}, this.getTransactions);
  }

  /**
   * Get User transactions.
   */
  async getTransactions() {
    try {
      // Get user storaged info
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      // GET User transactions list request
      const response = await fetch(HISTORY_URL + user.id);

      if (response.status === 200) {
        // Get request result
        const result = await response.json();

        // Set transactions and stop loading indicator
        this.setState({transactions: result, isLoading: false});
      }
    } catch (error) {
      console.error('Fetch: ', error);
    }
  }

  async onPressItem(item) {
    if (item.concept.includes('Oxxo')) {
      this.props.navigation.navigate('TransactionOxxo', {item});
    } else {
      return null;
    }
  }

  render() {
    // Get screen state
    const {isLoading, transactions} = this.state;

    return (
      <Container>
        {/* Navigation events */}
        <NavigationEvents onDidFocus={this.refresh} />

        {/* Screen header */}
        <AppHeader title="Mis transacciones" />

        {/* Screen content */}
        <Content
          contentContainerStyle={styles.container}
          style={styles.background}>
          <FlatList
            data={transactions}
            keyExtractor={(_, index) => `history-${index}`}
            refreshControl={
              <RefreshControl
                colors={[Colors.primary, Colors.primary_text]}
                refreshing={isLoading}
                onRefresh={this.refresh}
              />
            }
            ListEmptyComponent={() =>
              !isLoading && (
                <NeuView
                  borderRadius={12}
                  color="#FFFFFF"
                  height={64}
                  style={styles.empty}
                  width={Dimensions.get('window').width - 75}>
                  <Text style={styles.text}>
                    No hay transacciones registradas
                  </Text>
                </NeuView>
              )
            }
            renderItem={({item}) => (
              <HistoryItem item={item} onPress={() => this.onPressItem(item)} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </Content>
      </Container>
    );
  }
}

/**
 * Transactions screen styles.
 */
const styles = StyleSheet.create({
  // Screen container
  container: {flex: 1},

  // Screen background
  background: {backgroundColor: '#fff'},

  // Loading indicator container
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  // Empty list info
  empty: {alignSelf: 'center', marginVertical: 10},

  // Text
  text: {
    color: '#2e3342',
    fontFamily: 'Heebo-Regular',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
