import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

const ShadowWrapper = ({
  children,
  shadowColor,
  shadowOffset_Height = 0,
  shadowOffset_Width = 0,
  shadowRadius = 0,
  shadowOpacity = 1,
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        shadowOpacity: shadowOpacity,
        shadowRadius: shadowRadius,
        shadowOffset: {width: shadowOffset_Width, height: shadowOffset_Height},
        shadowColor: shadowColor ?? theme.colors.primaryShadow,
      }}>
      {children}
    </View>
  );
};

export default ShadowWrapper;
