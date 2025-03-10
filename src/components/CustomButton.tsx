import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {useTheme} from 'react-native-paper';

const CustomButton = props => {
  const theme = useTheme();
  const {
    title,
    onPress,
    bgColor = theme.colors.primaryButton,
    borderColor = theme.colors.primary,
    titleColor = theme.colors.onPrimaryButton,
  } = props;
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: bgColor,
          borderColor: borderColor,
        },
        styles.buttonContainer,
      ]}>
      <Text
        style={[
          {
            color: titleColor,
          },
          styles.buttonTitle,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  buttonTitle: {
    textAlign: 'center',
    fontFamily: 'DMSans-Bold',
    fontWeight: 700,
    fontSize: 18,
  },
});
