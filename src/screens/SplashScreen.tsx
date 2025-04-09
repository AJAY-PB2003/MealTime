import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const SplashScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.tertiaryContainer,
        },
      ]}>
      <Image source={require('../const/assets/logo.png')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
