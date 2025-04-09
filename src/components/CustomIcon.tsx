import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CustomIcon = props => {
  const {iconName, iconSize = 30, color} = props;

  return <Icon name={iconName} style={{fontSize: iconSize, color}} />;
};
