import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {TextInput, View, StyleSheet, Pressable, Text} from 'react-native';
import {CustomIcon} from './CustomIcon';
import {useTheme} from 'react-native-paper';

const InputBox = ({
  placeholder = null,
  onClear = undefined,
  onChangeText = undefined,
  onSubmit = undefined,
  ref,
  showClearIcon = true,
  isMultiline = true,
}) => {
  const inputRef = useRef(null);
  const theme = useTheme();

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef?.current?.focus();
    },
    clear() {
      inputRef?.current?.clear();
    },
  }));

  return (
    <View
      style={[
        searchBarStyles.searchBarContainer,
        {
          borderColor: theme.colors.primaryBorder,
          backgroundColor: theme.colors.tertiaryContainer,
        },
      ]}>
      <TextInput
        placeholderTextColor={theme.colors.primaryIcon}
        ref={inputRef}
        style={[
          searchBarStyles.textBar,
          {color: theme.colors.onPrimaryContainer},
        ]}
        placeholder={placeholder}
        autoCapitalize="none"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        multiline={isMultiline}
        numberOfLines={2}
        scrollEnabled={true}
      />
      {showClearIcon ? (
        <Pressable style={searchBarStyles.clearButton} onPress={onClear}>
          <CustomIcon
            iconName={'close'}
            color={theme.colors.onSecondaryContainerSubHeading}
            iconSize={23}
          />
        </Pressable>
      ) : null}
    </View>
  );
};

const searchBarStyles = StyleSheet.create({
  searchBarContainer: {
    // paddingTop: 5,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // flex:1
    borderWidth: 1,
    borderRadius: 16,
  },
  textBar: {
    // margin: 16,
    marginRight: 5,
    marginLeft: 20,
    paddingVertical: 16,
    flex: 1,
    fontSize: 17,
    // width:"90%"
  },
  clearButton: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputBox;
