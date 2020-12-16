import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Container, Content} from 'native-base';
import Pdf from 'react-native-pdf';

import AppHeader from '../components/AppHeader';

export default class PDFScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading?
      isLoading: true,
      // Quotation name
      name: '',
      // Quotation PDF URL.
      pdf: '',
    };

    this.getQuotation = this.getQuotation.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
  }

  componentDidMount() {
    this.getQuotation();
  }

  async getQuotation() {
    // Get quotation name
    const name = this.props.navigation.getParam('name');
    // Get quotation PDF
    const pdf = this.props.navigation.getParam('pdf');

    this.setState({name, pdf, isLoading: false});
  }

  /**
   * OnPress Back button event.
   */
  onPressBack() {
    this.props.navigation.goBack();
  }

  render() {
    // Get screen state
    const {isLoading, name, pdf} = this.state;

    return (
      <Container>
        {/* Screen header */}
        <AppHeader title={name} hasBack />

        {/* Screen content */}
        <Content contentContainerStyle={styles.content}>
          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator color="#00aeef" size="large" />
            </View>
          ) : (
            <Pdf
              source={{uri: pdf}}
              style={{height: '100%', width: '100%', flex: 1}}
            />
          )}
        </Content>
      </Container>
    );
  }
}

/**
 * Client Quotation PDF screen styles.
 */
const styles = StyleSheet.create({
  // Header
  header: {backgroundColor: '#000'},

  // Title
  title: {color: '#fff', fontFamily: 'Poppins Regular'},

  // Content container
  content: {flex: 1},

  // Loading container
  loading: {flex: 1, justifyContent: 'center'},
});
