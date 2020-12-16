import React from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import {NeuButton, NeuView} from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

import Colors from '../utils/Colors';

export default function HistoryItem({item, onPress = null}) {
  return (
    <NeuButton
      borderRadius={12}
      color="#FFFFFF"
      containerStyle={styles.content}
      noPressEffect={!onPress}
      onPress={onPress}
      height={64}
      style={styles.container}
      width={Dimensions.get('window').width - 30}>
      <View style={styles.row}>
        <Icon
          color={Colors.primary}
          name={item.type === 'deposit' ? 'pluscircleo' : 'minuscircleo'}
          size={32}
          style={styles.icon}
        />

        <View>
          <Text style={[styles.text, styles.type]}>
            {item.concept === null ? 'No hay concepto' : item.concept}
          </Text>

          <Text style={[styles.text, styles.date]}>
            {moment(item.created_at).format('HH:mm:ss DD/MM/YYYY')}
          </Text>
        </View>
      </View>

      <View>
        <Text style={[styles.text, styles.amount]}>
          {item.amount < 0
            ? `- $${item.amount.substring(1, item.amount.length)}`
            : `$${item.amount}`}
        </Text>

        <Text style={[styles.text, styles.status]}>
          {item.confirmed ? 'Confirmada' : 'Pendiente'}
        </Text>
      </View>
    </NeuButton>
  );
}

/**
 * History list item component styles.
 */
const styles = StyleSheet.create({
  // Container
  container: {alignSelf: 'center', marginVertical: 7.5},

  // Content container
  content: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },

  // Row container
  row: {alignItems: 'center', flexDirection: 'row'},

  // Icon
  icon: {marginRight: 15},

  // Text
  text: {fontFamily: 'Heebo-Regular'},

  // History type
  type: {color: Colors.primary_text, fontWeight: 'bold'},

  // History date
  date: {color: Colors.secondary_text, fontSize: 12},

  // History amount
  amount: {color: Colors.primary_text, fontWeight: 'bold', textAlign: 'right'},

  // History status
  status: {color: Colors.secondary_text, textAlign: 'right'},
});
