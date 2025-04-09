import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {useTheme} from 'react-native-paper';
import {CustomIcon} from './CustomIcon';

const CustomButton = props => {
  const theme = useTheme();
  const {
    title,
    onPress,
    bgColor = theme.colors.primaryButton,
    borderColor = theme.colors.primary,
    titleColor = theme.colors.onPrimaryButton,
    iconName,
    iconColor,
    iconSize,
    containerStyle,
  } = props;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: bgColor,
          borderColor: borderColor,
        },
        containerStyle,
      ]}>
      {iconName ? (
        <CustomIcon iconName={iconName} iconSize={iconSize} color={iconColor} />
      ) : null}

      {title ? (
        <Text
          style={[
            {
              color: titleColor,
            },
            styles.buttonTitle,
          ]}>
          {title}
        </Text>
      ) : null}
    </Pressable>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  buttonTitle: {
    textAlign: 'center',
    fontFamily: 'DMSans-Bold',
    // fontWeight: 700,
    fontSize: 18,
  },
});
