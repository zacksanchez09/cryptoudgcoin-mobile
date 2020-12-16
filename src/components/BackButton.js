import React from 'react';
import {withNavigation} from 'react-navigation';
import {Platform} from 'react-native';
import {NeuButton} from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * AppHeader Back button component.
 */
function BackButton({navigation, nested = false, goHome = false}) {
  return (
    <NeuButton
      borderRadius={8}
      color="#FFFFFF"
      height={38}
      onPress={() => {
        if (nested) {
          if (goHome) {
            navigation.popToTop();
          } else {
            navigation.pop();
          }
        } else {
          navigation.goBack();
        }
      }}
      width={38}>
      <Icon
        color="#9e9e9e"
        name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
        size={21}
      />
    </NeuButton>
  );
}

export default withNavigation(BackButton);
