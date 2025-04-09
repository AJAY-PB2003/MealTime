import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import Carousel from '../components/Carousel';
import {welcomeSlideDataList} from '../const/welcomeSlideScreenData';
import CustomButton from '../components/CustomButton';
import {SCREEN_NAMES, WELCOME_SLIDE_Static_Data} from '../const';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {FontNames} from '../const/fontNames';

const WelcomeSlideScreen = () => {
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const currentIndexRef = useRef(index);
  currentIndexRef.current = index;
  const carouselRef = useRef(null);
  const navigation = useNavigation();

  const onHeaderLeftIconPress = () => {
    if (index && index <= welcomeSlideDataList.length - 1) {
      const newIndex = index - 1;
      // setIndex(newIndex);
      carouselRef?.current?.scrollToIndex({index: newIndex, animated: true});
    }
  };

  const onContinuePress = () => {
    if (index >= welcomeSlideDataList.length - 1) {
      navigation.navigate(SCREEN_NAMES.SELECT_PREFERENCE_SCREEN);
    } else {
      const newIndex = index + 1;
      // setIndex(newIndex);
      carouselRef?.current?.scrollToIndex({index: newIndex});
    }
  };

  const onSkipPress = () => {
    navigation.navigate(SCREEN_NAMES.SELECT_PREFERENCE_SCREEN);
  };

  const renderItemImages = ({item}) => {
    // console.log(item);
    return (
      <View
        style={{
          width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={item.imgPath}
          style={{
            width: height / 3,
            height: height / 3,
            // height: width - 64,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <MyHeader
          leftIconName={index ? WELCOME_SLIDE_Static_Data.leftIconName : null}
          onLeftIconPress={index ? onHeaderLeftIconPress : undefined}
        />

        <View style={styles.container}>
          <Carousel
            dataList={welcomeSlideDataList}
            renderItem={renderItemImages}
            contentContainerStyle={{marginVertical: 8}}
            currentIndexRef={currentIndexRef}
            ref={carouselRef}
            isScrollable={true}
            showPagination={true}
            onActiveIndexChange={setIndex}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {welcomeSlideDataList[index]?.title}
            </Text>
            <Text style={styles.subtitle}>
              {welcomeSlideDataList[index]?.subtitle}
            </Text>
          </View>
          <CustomButton
            title={WELCOME_SLIDE_Static_Data.buttonTitle}
            onPress={onContinuePress}
            containerStyle={[
              {
                width: width - 32,
              },
              styles.buttonContainer,
            ]}
          />
          <Pressable onPress={onSkipPress} style={styles.pressableContainer}>
            <Text style={styles.pressableText}>
              {WELCOME_SLIDE_Static_Data.pressableTitle}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pagination: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 44,
  },
  paginationDot: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    marginHorizontal: 6,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 15,
  },
  textContainer: {
    height: 163,
    //   backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 32,
    gap: 12,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 40,
    // fontWeight: 700,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 5,
    fontFamily: FontNames.DM_Sans_Regular,
    lineHeight: 27,
    // fontWeight: 400,
    color: 'grey',
  },
  buttonContainer: {
    marginTop: 39,
  },
  pressableContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  pressableText: {
    textAlign: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    // fontWeight: 500,
    lineHeight: 27,
    fontSize: 18,
  },
});

export default WelcomeSlideScreen;
