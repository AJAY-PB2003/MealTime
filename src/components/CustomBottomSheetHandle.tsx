import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {CustomIcon} from './CustomIcon';
import {useTheme} from 'react-native-paper';

const CustomBottomSheetHandle = props => {
  const theme = useTheme();
  const {
    iconName = 'close',
    iconSize = 24,
    iconColor = theme.colors.primaryIcon,
    onPress,
  } = props;
  return (
    <Pressable onPress={onPress} style={styles.iconContainer}>
      <CustomIcon iconName={iconName} iconSize={iconSize} color={iconColor} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default CustomBottomSheetHandle;
