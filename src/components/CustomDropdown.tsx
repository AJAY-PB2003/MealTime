import React, {useState, useRef} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, Modal} from 'react-native';
import {useTheme} from 'react-native-paper';
import {CustomIcon} from './CustomIcon';
import {Select_Preference_Static_Data} from '../const';

const CustomDropdown = ({data, onSelect, iconName, initialDropdownValue}) => {
  const theme = useTheme();
  const dropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

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
    setSelectedValue(item.text);
    onSelect(item);
    setDropdownVisible(false);
  };
  const renderItem = ({item}) => {
    return (
      <Pressable
        style={[
          selectedValue === item.text
            ? {backgroundColor: theme.colors.primary}
            : {backgroundColor: theme.colors.primaryContainerFocused},
          styles.option,
          {borderBottomColor: theme.colors.onPrimaryContainer},
        ]}
        onPress={() => handleSelect(item)}>
        <Text style={styles.optionText}>{item.text}</Text>
      </Pressable>
    );
  };

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
        <Text style={styles.buttonText}>
          {selectedValue || `Select ${initialDropdownValue}`}
        </Text>
        <CustomIcon
          iconName={iconName}
          iconSize={24}
          color={theme.colors.onSecondaryContainerHeading}
        />
      </Pressable>
      {isDropdownVisible ? (
        <Modal visible={isDropdownVisible} transparent animationType="none">
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
              <View style={styles.optionHeader}>
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
              </View>
              <FlatList
                data={data}
                keyExtractor={item => item.key}
                renderItem={renderItem}
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
    fontFamily: 'DMSans-Regular',
    fontWeight: 400,
  },
  dropdown: {
    marginTop: 1,
    marginHorizontal: 16,
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {width: 3, height: 2},
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
    fontFamily: 'DMSans-Bold',
    fontWeight: 500,
  },
  optionHeaderIcon: {
    position: 'absolute',
    right: 15,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    // borderBottomWidth: 0.3,
  },
  optionText: {
    fontSize: 18,
  },
});

export default CustomDropdown;
