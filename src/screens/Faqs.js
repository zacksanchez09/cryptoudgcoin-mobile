import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from 'native-base';

import AppHeader from '../components/AppHeader';
import {FAQS_URL} from '../utils/API';
import {NeuView} from 'react-native-neu-element';

export default function FaqsScreen() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    /**
     * Get FAQs list.
     */
    async function getFaqs() {
      try {
        const response = await fetch(FAQS_URL);

        if (response.status === 200) {
          const result = await response.json();

          setFaqs(result);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getFaqs();
  });

  return (
    <Container>
      {/* Screen header */}
      <AppHeader title="FAQ" hasBack />

      <Text style={{ alignSelf:'center'}}>Preguntas frecuentes</Text>

      {/* Screen content */}
      <Content padder style={styles.content}>
        {faqs.map((faq, index) => (
          <View key={`faq-${index}`} style={styles.item}>
            <NeuView
              borderRadius={12}
              color="#FFFFFF"
              height={56}
              containerStyle={styles.title}
              style={styles.header}
              width={Dimensions.get('window').width - 15}>
              <Text style={styles.question}>{faq.question}</Text>
            </NeuView>

            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </Content>
    </Container>
  );
}

/**
 * FAQs screen styles.
 */
const styles = StyleSheet.create({
  // Screen content
  content: {backgroundColor: '#fff'},

  // FAQ item
  item: {marginBottom: 15},

  // FAQ header
  header: {marginBottom: 15},

  // FAQ title
  title: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  // FAQ question
  question: {fontSize: 16, fontWeight: 'bold'},

  // FAQ answer
  answer: {paddingHorizontal: 10, textAlign: 'justify'},
});
