import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons'; 
Icon.loadFont();


import Colors from '../../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
    
  );
};

export default CustomHeaderButton;