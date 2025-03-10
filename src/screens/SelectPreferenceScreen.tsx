import React, {useState, useRef} from 'react';
import {StyleSheet, View, Alert, Text, Pressable} from 'react-native';
import MyHeader from '../components/MyHeader';
import IndexIndicator from '../components/IndexIndicator';
import {selectPreferenceSlideDataList} from '../const/selectPreferenceScreenData';
import Carousel from '../components/Carousel';
import CustomButton from '../components/CustomButton';
import {SCREEN_NAMES, Select_Preference_Static_Data} from '../const';
import SelectPreferenceSlide from '../components/SelectPreferenceSlide';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';

const SelectPreferenceScreen = () => {
  const [index, setIndex] = useState(0);
  const [selectedPreferences, setSelectedPreferences] = useState({});
  const carouselRef = useRef(null);
  const isReminderOn = useRef(false);
  const navigation = useNavigation();

  const onHeaderLeftIconPress = () => {
    if (index === 0) {
      navigation.goBack();
    } else {
      setIndex(prevIndex => prevIndex - 1);
      if (carouselRef.current) {
        carouselRef.current.scrollToIndex({index: index - 1});
      }
    }
  };
  const onAlertButton = () => {
    navigation.popToTop();
    navigation.navigate(SCREEN_NAMES.MEAL_PLAN_SCREEN);
  };

  const onContinuePress = () => {
    if (index >= selectPreferenceSlideDataList.length - 1) {
      console.log(selectedPreferences);
      if (isReminderOn.current === true) {
        Alert.alert(
          Select_Preference_Static_Data.alert.title,
          Select_Preference_Static_Data.alert.message,
          [
            {
              text: Select_Preference_Static_Data.alert.leftButtonName,
              onPress: onAlertButton,
            },
            {
              text: Select_Preference_Static_Data.alert.rightButtonName,
              onPress: onAlertButton,
            },
          ],
        );
      } else {
        navigation.popToTop();
        navigation.navigate(SCREEN_NAMES.MEAL_PLAN_SCREEN);
      }
    } else {
      if (
        selectedPreferences[
          selectPreferenceSlideDataList[index]?.preferenceName
        ]?.length > 0 ||
        selectPreferenceSlideDataList[index]?.skipable
      ) {
        setIndex(prevIndex => prevIndex + 1);
        if (carouselRef.current) {
          carouselRef.current.scrollToIndex({index: index + 1});
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Please select atleast one item',
          position: 'bottom',
          bottomOffset: 110,
        });
      }
    }
  };
  const onSkipPress = () => {
    setIndex(prevIndex => prevIndex + 1);
    if (carouselRef.current) {
      carouselRef.current.scrollToIndex({index: index + 1});
    }
  };

  const onOptionPress = (
    preferenceName,
    itemKey,
    itemName,
    preferenceSubCategoryName,
  ) => {
    if (
      selectPreferenceSlideDataList[index]?.viewType ===
      Select_Preference_Static_Data.viewTypeNames.DROPDOWN
    ) {
      setSelectedPreferences(prevState => ({
        ...prevState,
        [preferenceName]: {
          ...(prevState[preferenceName] || []),
          [preferenceSubCategoryName]: {key: itemKey, text: itemName},
        },
      }));
    } else {
      if (
        selectedPreferences[preferenceName]?.some(item => item.key === itemKey)
      ) {
        setSelectedPreferences(prevState => ({
          ...prevState,
          [preferenceName]:
            prevState[preferenceName]?.filter(item => item.text !== itemName) ||
            [],
        }));
      } else {
        setSelectedPreferences(prevState => ({
          ...prevState,
          [preferenceName]: [
            ...(prevState[preferenceName] || []),
            {key: itemKey, text: itemName},
          ],
        }));
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <SelectPreferenceSlide
        item={item}
        onOptionPress={onOptionPress}
        selectedPreferences={selectedPreferences}
        isReminderOn={isReminderOn}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader
        leftIconName={Select_Preference_Static_Data.leftIconName}
        onLeftIconPress={onHeaderLeftIconPress}
      />
      <IndexIndicator index={index} dataList={selectPreferenceSlideDataList} />
      <Carousel
        dataList={selectPreferenceSlideDataList}
        renderItem={renderItem}
        ref={carouselRef}
        contentContainerStyle={{marginTop: 24}}
        activeIndex={index}
      />

      {selectPreferenceSlideDataList[index]?.skipable &&
      (selectedPreferences[selectPreferenceSlideDataList[index]?.preferenceName]
        ?.length === 0 ||
        !selectedPreferences[
          selectPreferenceSlideDataList[index]?.preferenceName
        ]) ? (
        <View style={[styles.buttonContainer]}>
          <Pressable onPress={onSkipPress}>
            <Text style={styles.pressableText}>
              {Select_Preference_Static_Data.pressableTitle}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={onContinuePress}
            title={Select_Preference_Static_Data.buttonTitle}
          />
        </View>
      )}
    </SafeAreaView>
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
    marginTop: 16,
  },
  listViewItem: {
    borderWidth: 1,
    borderRadius: 16,
    // padding: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
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
  chipViewItem: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    margin: 16,
  },
  pressableContainer: {
    // paddingTop: 16,
    paddingHorizontal: 16,
  },
  pressableText: {
    textAlign: 'center',
    fontFamily: 'DMSans-Bold',
    fontWeight: 500,
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

export default SelectPreferenceScreen;
