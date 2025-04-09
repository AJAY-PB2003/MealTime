import React, {useState, useRef} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, Modal} from 'react-native';
import {useTheme} from 'react-native-paper';
import {CustomIcon} from './CustomIcon';
import {Select_Preference_Static_Data} from '../const';
import {FontNames} from '../const/fontNames';

const CustomDropdown = ({
  data,
  onSelect,
  iconName,
  initialDropdownValue,
  selectedValue,
}) => {
  const theme = useTheme();
  const dropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    isDropdownVisible ? setDropdownVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    if (dropdownButton.current) {
      dropdownButton.current.measureInWindow((x, y, w, h) => {
        setDropdownTop(y);
      });
    }
    setDropdownVisible(true);
  };
  const handleSelect = item => {
    onSelect(item);
    setDropdownVisible(false);
  };
  const renderItem = ({item}) => {
    return (
      <Pressable
        style={[
          styles.option,
          {
            backgroundColor:
              selectedValue?.key === item.key
                ? theme.colors.primaryContainerFocused
                : theme.colors.primaryContainerUnfocused,
            borderBottomColor: theme.colors.primaryBorder,
          },
        ]}
        onPress={() => handleSelect(item)}>
        <Text style={styles.optionText}>{item.text}</Text>
      </Pressable>
    );
  };
  const dropdownText = selectedValue?.text || `Select ${initialDropdownValue}`;

  return (
    <>
      <Pressable
        style={[
          styles.button,
          {
            borderColor: theme.colors.secondaryContainer,
            backgroundColor: theme.colors.tertiary,
          },
        ]}
        ref={dropdownButton}
        onPress={toggleDropdown}>
        <Text style={styles.buttonText}>{dropdownText}</Text>
        <CustomIcon
          iconName={iconName}
          iconSize={24}
          color={theme.colors.onSecondaryContainerHeading}
        />
      </Pressable>
      {isDropdownVisible ? (
        <Modal
          visible={isDropdownVisible}
          transparent={true}
          animationType="none">
          <Pressable style={{flex: 1}} onPressOut={toggleDropdown}>
            <View
              style={[
                styles.dropdown,
                {
                  shadowColor: theme.colors.primaryShadow,
                  borderColor: theme.colors.onPrimaryContainer,
                  top: dropdownTop,
                },
              ]}>
              {/* <View style={styles.optionHeader}>
                <Text style={styles.optionHeaderText}>
                  {initialDropdownValue}
                </Text>
                <Pressable
                  onPress={toggleDropdown}
                  style={styles.optionHeaderIcon}>
                  <CustomIcon
                    iconName={
                      Select_Preference_Static_Data.dropdown
                        .dropdownHeaderIconName
                    }
                    iconSize={24}
                    color={theme.colors.onTertiary}
                  />
                </Pressable>
              </View> */}
              <FlatList
                data={data}
                keyExtractor={item => item.key}
                renderItem={renderItem}
                bounces={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </Pressable>
        </Modal>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FontNames.DM_Sans_Regular,
    // fontWeight: 400,
  },
  dropdown: {
    height: 270,
    marginTop: 1,
    marginHorizontal: 16,
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {width: 1, height: 1},
  },
  optionHeader: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',

    alignItems: 'center',
  },
  optionHeaderText: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontFamily: FontNames.DM_Sans_Bold,
    // fontWeight: 500,
  },
  optionHeaderIcon: {
    position: 'absolute',
    right: 15,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 18,
  },
});

export default CustomDropdown;
