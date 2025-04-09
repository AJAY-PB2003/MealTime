import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import IndexIndicator from '../components/IndexIndicator';
import Carousel from '../components/Carousel';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CustomBottomSheetHandle from '../components/CustomBottomSheetHandle';
import {Instructions_Screen_Static_Data, SCREEN_NAMES} from '../const';
import InstructionsConfirmQuitComponent from '../components/InstructionsConfirmQuitComponent';
import {FontNames} from '../const/fontNames';
import {CustomIcon} from '../components/CustomIcon';

const InstructionsScreen = () => {
  const {width, height} = useWindowDimensions();
  const theme = useTheme();
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation();
  const {
    bSHeading,
    bSSubHeading,
    bSButtonTitle,
    leftButtonIcon,
    rightButtonTitle,
  } = Instructions_Screen_Static_Data;
  const instructionsList = useSelector(
    state => state.recipeDetails?.data?.instructions,
  );
  const preparationTime = useSelector(
    state => state?.recipeDetails?.data?.preparationTime,
  );
  const [index, setIndex] = useState(0);
  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  const carouselRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const confirmQuitScreenBSRef = useRef(null);
  useEffect(() => {
    bottomSheetRef?.current?.expand();
  }, []);
  // console.log('Component Re-Render');
  const perInstructionTime = (preparationTime / instructionsList.length) * 60;
  const [timer, setTimer] = useState(perInstructionTime);

  // useEffect(() => {
  //   if (bottomSheetShown) {
  //     let interval = setInterval(() => {
  //       setTimer(prev => (prev > 0 ? prev - 1 : 0));
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }

  //   // console.log('Inside timer useEffect');
  // }, [bottomSheetShown]);

  // useEffect(() => {
  //   if (bottomSheetShown) {
  //     setTimer(perInstructionTime);
  //     // console.log('Inside Interval useEffect');

  //     let interval = setInterval(() => {
  //       if (index < instructionsList.length - 1) {
  //         const newIndex = index + 1;
  //         setIndex(newIndex);
  //         carouselRef?.current?.scrollToIndex({index: newIndex});
  //       } else {
  //         navigation.goBack();
  //       }
  //     }, perInstructionTime * 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [
  //   index,
  //   perInstructionTime,
  //   instructionsList,
  //   navigation,
  //   bottomSheetShown,
  // ]);

  useEffect(() => {
    if (bottomSheetShown) {
      setTimer(perInstructionTime);
      // console.log('Inside Interval useEffect');
      const timerInterval = setInterval(() => {
        setTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const instructionTimeinterval = setInterval(() => {
        if (index < instructionsList.length - 1) {
          const newIndex = index + 1;
          setIndex(newIndex);
          carouselRef?.current?.scrollToIndex({index: newIndex});
        } else {
          navigation.goBack();
        }
      }, perInstructionTime * 1000);

      return () => {
        clearInterval(timerInterval);
        clearInterval(instructionTimeinterval);
      };
    }
  }, [
    index,
    perInstructionTime,
    instructionsList,
    navigation,
    bottomSheetShown,
  ]);
  const onBSPress = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    setBottomSheetShown(true);
  };

  const renderBSHandle = () => {
    return <CustomBottomSheetHandle onPress={onBSPress} />;
  };

  const renderConfirmQuitBSHandle = () => {
    return null;
  };

  const onCQBSHeaderPress = () => {
    confirmQuitScreenBSRef?.current?.close();
  };

  const onCQBSLeavePress = () => {
    navigation.goBack();
  };

  const onCQBSContinuePress = () => {
    confirmQuitScreenBSRef?.current?.close();
  };
  const onCQBSItemPress = ins_No => {
    const newIndex = ins_No - 1;
    setIndex(newIndex);
    carouselRef?.current?.scrollToIndex({index: newIndex, animated: false});
    confirmQuitScreenBSRef?.current?.close();
  };

  const onHeaderLeftIconPress = () => {
    if (index && index <= instructionsList?.length - 1) {
      const newIndex = index - 1;
      setIndex(newIndex);
      carouselRef?.current?.scrollToIndex({index: newIndex});
    } else {
      navigation.goBack();
    }
  };
  const onLeftBottomButtonPress = () => {
    confirmQuitScreenBSRef?.current?.expand();
  };
  const onRightBottomButtonPress = () => {
    if (index < instructionsList?.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      carouselRef?.current?.scrollToIndex({index: newIndex});
    } else {
      navigation.goBack();
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={[{width: width}, styles.slideContainer]}>
        <ScrollView style={styles.itemContainer}>
          <View style={styles.instructionSlideTitleContainer}>
            <Text style={styles.heading}>
              {item.ins_No < 10 ? `0${item.ins_No}` : item.ins_No}
            </Text>
            <View style={styles.timerContainer}>
              <CustomIcon
                iconName={Instructions_Screen_Static_Data.cookingIcon}
                iconSize={30}
              />
              <Text style={styles.subHeading}>
                {timer % 60 >= 10
                  ? `${Math.floor(timer / 60)}:${timer % 60}`
                  : `${Math.floor(timer / 60)}:0${timer % 60}`}
              </Text>
            </View>
          </View>
          <Text style={styles.subHeading}>{item.name}</Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader onLeftIconPress={onHeaderLeftIconPress} />
      <IndexIndicator index={index} dataList={instructionsList} />
      <Carousel
        dataList={instructionsList}
        renderItem={renderItem}
        ref={carouselRef}
        contentContainerStyle={{marginTop: 24}}
        activeIndex={index}
        // isScrollable={true}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          bgColor={theme.colors.primaryContainerUnfocused}
          borderColor={theme.colors.primaryBorder}
          iconName={leftButtonIcon}
          iconSize={24}
          iconColor={theme.colors.onPrimaryContainer}
          onPress={onLeftBottomButtonPress}
        />
        <CustomButton
          title={rightButtonTitle}
          onPress={onRightBottomButtonPress}
          containerStyle={{flexGrow: 1}}
        />
      </View>
      <BottomSheet
        ref={confirmQuitScreenBSRef}
        index={-1}
        handleComponent={null}>
        <BottomSheetView style={{flex: 1, height: height}}>
          <InstructionsConfirmQuitComponent
            instructionsList={instructionsList}
            onHeaderLeftPress={onCQBSHeaderPress}
            onContinuePress={onCQBSContinuePress}
            onLeavePress={onCQBSLeavePress}
            onItemPress={onCQBSItemPress}
          />
        </BottomSheetView>
      </BottomSheet>
      {bottomSheetShown ? null : (
        <View
          style={{
            backgroundColor: theme.colors.primaryBlurBackground,
            position: 'absolute',
            zIndex: 1,
            width: width,
            height: height,
          }}>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            handleComponent={renderBSHandle}>
            <BottomSheetView
              style={[styles.bSContainer, {paddingBottom: bottom}]}>
              <Image
                source={require('../const/assets/hand_Logo.png')}
                width={64}
                height={64}
              />
              <View style={styles.bSTextContainer}>
                <Text style={styles.bSHeading}>{bSHeading}</Text>
                <Text
                  style={[
                    styles.bSSubHeading,
                    {color: theme.colors.onSecondaryContainerSubheading},
                  ]}>
                  {bSSubHeading}
                </Text>
              </View>
              <CustomButton title={bSButtonTitle} onPress={onBSPress} />
            </BottomSheetView>
          </BottomSheet>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    gap: 20,
  },
  instructionSlideTitleContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: 100,
  },
  heading: {
    fontSize: 64,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    // lineHeight:51.2,
    letterSpacing: -1.6,
  },
  subHeading: {
    fontSize: 32,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 38.4,
    letterSpacing: -1.6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bSContainer: {
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 10,
    gap: 16,
  },
  bSTextContainer: {
    gap: 14,
    marginBottom: 16,
  },
  bSHeading: {
    fontSize: 32,
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 38.1,
    letterSpacing: -1.6,
  },
  bSSubHeading: {
    fontSize: 18,
    // fontWeight: 400,
    // marginRight: 32,
    fontFamily: FontNames.DM_Sans_Regular,
    lineHeight: 25.2,
  },
});

export default InstructionsScreen;
