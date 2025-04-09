import React, {useState, useRef} from 'react';
import {StyleSheet, View, Alert, Text, Pressable} from 'react-native';
import MyHeader from '../components/MyHeader';
import IndexIndicator from '../components/IndexIndicator';
import {selectPreferenceSlideDataList} from '../const/selectPreferenceScreenData';
import Carousel from '../components/Carousel';
import CustomButton from '../components/CustomButton';
import {SCREEN_NAMES, Select_Preference_Static_Data} from '../const';
import SelectPreferenceSlide from '../components/SelectPreferenceSlide';
import {StackActions, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontNames} from '../const/fontNames';
import {useDispatch} from 'react-redux';
import {
  addEatingPreferences,
  setEatingPreferences,
} from '../redux/userData/action';

const SelectPreferenceScreen = () => {
  const [index, setIndex] = useState(0);
  const [selectedPreferences, setSelectedPreferences] = useState({});
  const carouselRef = useRef(null);
  const isReminderOn = useRef(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onHeaderLeftIconPress = () => {
    if (index && index <= selectPreferenceSlideDataList.length - 1) {
      const newIndex = index - 1;
      setIndex(newIndex);
      carouselRef?.current?.scrollToIndex({index: newIndex});
    } else {
      navigation.goBack();
    }
  };
  const onAlertButton = () => {
    navigation.popToTop();
    navigation.dispatch(StackActions.replace(SCREEN_NAMES.HOME_SCREEN));
  };

  const onContinuePress = () => {
    if (index >= selectPreferenceSlideDataList.length - 1) {
      // console.log(selectedPreferences);
      dispatch(setEatingPreferences(selectedPreferences));
      if (isReminderOn.current) {
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
        navigation.dispatch(StackActions.replace(SCREEN_NAMES.HOME_SCREEN));
      }
    } else {
      if (
        selectedPreferences[
          selectPreferenceSlideDataList[index]?.preferenceName
        ]?.length > 0 ||
        selectPreferenceSlideDataList[index]?.skipable
      ) {
        const newIndex = index + 1;
        setIndex(newIndex);
        carouselRef?.current?.scrollToIndex({index: newIndex});
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
    const newIndex = index + 1;
    setIndex(newIndex);
    carouselRef?.current?.scrollToIndex({index: newIndex});
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
      const newSelectedPreferences = {
        ...selectedPreferences,
        [preferenceName]: {
          ...(selectedPreferences[preferenceName] || []),
          [preferenceSubCategoryName]: {key: itemKey, text: itemName},
        },
      };
      setSelectedPreferences(newSelectedPreferences);
    } else {
      if (
        selectedPreferences[preferenceName]?.some(item => item.key === itemKey)
      ) {
        const newSelectedPreferences = {
          ...selectedPreferences,
          [preferenceName]:
            selectedPreferences[preferenceName]?.filter(
              item => item.text !== itemName,
            ) || [],
        };
        setSelectedPreferences(newSelectedPreferences);
      } else {
        const newSelectedPreferences = {
          ...selectedPreferences,
          [preferenceName]: [
            ...(selectedPreferences[preferenceName] || []),
            {key: itemKey, text: itemName},
          ],
        };
        setSelectedPreferences(newSelectedPreferences);
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
        <CustomButton
          onPress={onContinuePress}
          title={Select_Preference_Static_Data.buttonTitle}
          containerStyle={styles.buttonContainer}
        />
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
    fontFamily: FontNames.DM_Sans_Bold,
    // fontWeight: 700,
  },
  listContainer: {
    // marginTop: 16,
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
    fontFamily: FontNames.DM_Sans_Bold,
    // fontWeight: 700,
  },
  itemSubheading: {
    fontFamily: FontNames.DM_Sans_Regular,
    fontSize: 18,
    // fontWeight: 400,
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
    fontFamily: FontNames.DM_Sans_Bold,
    // fontWeight: 500,
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

export default SelectPreferenceScreen;
