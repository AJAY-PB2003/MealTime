import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {CustomIcon} from './CustomIcon';
import {useTheme} from 'react-native-paper';

const MyHeader = props => {
  const theme = useTheme();
  const {
    onLeftIconPress,
    onRightIconPress,
    title,
    leftIconName = 'arrow-left',
    rightIconName,
    bgColor,
    iconColor = theme.colors.onTertiaryContainer,
  } = props;

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Pressable style={styles.leftIconContainer} onPress={onLeftIconPress}>
        <CustomIcon iconName={leftIconName} color={iconColor} />
      </Pressable>
      {title ? <Text style={styles.heading}> {title}</Text> : null}
      {rightIconName ? (
        <Pressable style={styles.rightIconContainer} onPress={onRightIconPress}>
          <CustomIcon iconName={rightIconName} color={iconColor} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 8,
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconContainer: {
    position: 'absolute',
    left: 16,
    alignSelf: 'center',
  },
  rightIconContainer: {
    position: 'absolute',
    right: 16,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 23,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
});

export default MyHeader;
