import React, {useState} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
  Text,
  Pressable,
  Switch,
} from 'react-native';
import {Select_Preference_Static_Data} from '../const';
import CustomDropdown from './CustomDropdown';
import {useTheme} from 'react-native-paper';

const SelectPreferenceSlide = ({
  item = {},
  onOptionPress,
  selectedPreferences,
  isReminderOn,
}) => {
  const {width} = useWindowDimensions();
  const theme = useTheme();
  const {
    viewType = '',
    title = '',
    itemArr = [],
    preferenceName = '',
    preferenceSubCategory = [],
  } = item;
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsSwitchEnabled(previousState => !previousState);
    isReminderOn.current = !isSwitchEnabled;
  };

  return (
    <View style={{width: width}}>
      <View style={styles.slide}>
        <Text style={styles.title}>{title}</Text>
        {viewType === Select_Preference_Static_Data.viewTypeNames?.DROPDOWN ? (
          <View style={styles.switchContainer}>
            <Text style={[styles.title, {fontSize: 20}]}>
              {Select_Preference_Static_Data.reminderText}
            </Text>
            <Switch
              trackColor={{
                false: theme.colors.primaryIconUnfocused,
                true: theme.colors.primaryIconFocused,
              }}
              thumbColor={theme.colors.onPrimary}
              ios_backgroundColor={theme.colors.primaryIconUnfocused}
              onValueChange={toggleSwitch}
              value={isSwitchEnabled}
            />
          </View>
        ) : null}
        <ScrollView style={styles.listContainer}>
          <View
            style={
              viewType === Select_Preference_Static_Data?.viewTypeNames?.CHIP
                ? styles.chipView
                : styles.listView
            }>
            {itemArr?.map((arrItem, arrItemIndex) => {
              // console.log('Dropdowns Rendered');
              if (
                viewType ===
                Select_Preference_Static_Data?.viewTypeNames?.DROPDOWN
              ) {
                return (
                  <View key={arrItem.key} style={{marginBottom: 14}}>
                    <CustomDropdown
                      data={arrItem.values}
                      selectedValue={
                        selectedPreferences[preferenceName]?.[
                          preferenceSubCategory[arrItemIndex]?.text
                        ]
                      }
                      onSelect={({key, text}) =>
                        onOptionPress(
                          preferenceName,
                          key,
                          text,
                          preferenceSubCategory[arrItemIndex].text,
                        )
                      }
                      iconName={Select_Preference_Static_Data.dropdown.iconName}
                      initialDropdownValue={
                        preferenceSubCategory[arrItemIndex].text
                      }
                    />
                  </View>
                );
              } else {
                return (
                  <Pressable
                    onPress={() =>
                      onOptionPress(preferenceName, arrItem?.key, arrItem?.text)
                    }
                    key={arrItem.key}
                    style={[
                      styles.item,
                      selectedPreferences?.[preferenceName]?.some(
                        listItem => listItem.key === arrItem?.key,
                      )
                        ? {
                            backgroundColor:
                              theme.colors.primaryContainerFocused,
                            borderColor: theme.colors.primaryContainer,
                          }
                        : {
                            backgroundColor:
                              theme.colors.primaryContainerUnfocused,
                            borderColor: theme.colors.secondaryContainer,
                          },
                    ]}>
                    <Text style={styles.itemHeading}>{arrItem?.text}</Text>
                    {arrItem?.subText ? (
                      <Text
                        style={[
                          styles.itemSubheading,
                          {
                            color: theme.colors.onSecondaryContainerSubheading,
                          },
                        ]}>
                        {arrItem?.subText}
                      </Text>
                    ) : null}
                  </Pressable>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'DMSans-Bold',
    fontWeight: 700,
  },
  listContainer: {
    marginTop: 32,
  },
  item: {
    borderWidth: 1,
    borderRadius: 16,
    // padding: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    // marginBottom: 12,
  },
  itemHeading: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    fontWeight: 700,
  },
  itemSubheading: {
    fontFamily: 'DMSans-Regular',
    fontSize: 18,
    fontWeight: 400,
    paddingTop: 4,
  },
  listView: {
    gap: 14,
  },
  chipView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SelectPreferenceSlide;
