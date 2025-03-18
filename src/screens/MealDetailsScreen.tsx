import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  Pressable,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecipeDetails} from '../redux/recipeDetails/action';
import {API_STATUS, Meal_Details_Screen_Static_Data} from '../const';
import MyHeader from '../components/MyHeader';
import {useTheme} from 'react-native-paper';
import {CustomIcon} from '../components/CustomIcon';
import WelcomeSlideScreen from './WelcomeSlideScreen';
import CustomButton from '../components/CustomButton';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import ShadowWrapper from '../components/ShadowWrapper';

const MealDetailsScreen = ({route}) => {
  const recipeId = route?.params?.recipeId;
  const {width, height} = useWindowDimensions();
  const theme = useTheme();
  const recipeDetails = useSelector(state => state.recipeDetails?.data);
  const recipeDetailsStatus = useSelector(state => state.recipeDetails?.status);
  console.log(recipeDetails);
  //  console.log(recipeId);
  const dispatch = useDispatch();
  const [imageScrolled, setImageScrolled] = useState(false);
  const ref = useRef(null);
  const scrollRef = useRef(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(fetchRecipeDetails(recipeId));
  }, [dispatch, recipeId]);
  return recipeDetailsStatus === API_STATUS.SUCCEEDED ? (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <Image
        style={styles.image}
        src={`${recipeDetails.imgUrl}`}
        width={width}
        height={width}
        resizeMode="contain"
      />

      <ScrollView
        style={[
          styles.scrollView,
          {
            zIndex: 10,
          },
        ]}
        bounces={false}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        // onScroll={({nativeEvent}) => {
        //   ref.current = nativeEvent.contentOffset.y;

        //   if (ref.current >= (width - insets.top) / 2 && !imageScrolled) {
        //     setImageScrolled(true);
        //     // scrollRef.current.scrollTo({y: width - 16});
        //   } else if (ref.current < (width - insets.top) / 2 && imageScrolled) {
        //     setImageScrolled(false);
        //     // scrollRef.current.scrollTo({y: 0});
        //   }
        // }}
      >
        <View style={{height: width - insets.top, paddingHorizontal: 16}}>
          <Pressable
            style={{
              backgroundColor: 'white',
              borderRadius: 30,
              width: 44,
              padding: 10,
            }}>
            <CustomIcon iconName={'close'} iconSize={24} />
          </Pressable>
        </View>
        <View style={{backgroundColor: '#FFFFFF', borderRadius: 20}}>
          <View style={[styles.titleContainer]}>
            <Text style={styles.title}>{recipeDetails.title}</Text>

            <Pressable style={{}}>
              <CustomIcon iconName={'heart-outline'} iconSize={24} />
            </Pressable>
          </View>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.onSecondaryContainerSubheading,
              },
            ]}>{`${recipeDetails.cookingTime} minutes • ${recipeDetails.servings} servings`}</Text>
          <View style={styles.tabsContainer}>
            {Meal_Details_Screen_Static_Data.tabNames?.map(tabItem => {
              return (
                <Pressable
                  key={tabItem?.id}
                  style={[
                    styles.tab,
                    {
                      backgroundColor: theme.colors.primaryContainerUnfocused,
                      borderColor: theme.colors.primaryBorder,
                    },
                  ]}>
                  <Text style={styles.tabTitle}>{tabItem?.title}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={{marginTop: 10, marginHorizontal: 16}}>
            {recipeDetails?.ingredients?.map((item, itemIndex) => {
              return (
                <View
                  key={item.key}
                  style={[
                    styles.listItemContainer,
                    {
                      borderBottomColor: theme.colors.primaryBorder,
                    },
                  ]}>
                  <Text style={styles.listItem}>{item.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: 112,
          width: width,
          borderRadius: 20,
          position: 'absolute',
          zIndex: 10,
          bottom: 0,
          backgroundColor: theme.colors.tertiaryContainer,
          paddingHorizontal: 28,
          paddingTop: 20,
          flexDirection: 'row',
          gap: 12,
          shadowColor: theme.colors.secondaryShadow,
          shadowOpacity: 1,
          shadowOffset: {height: -10},
        }}>
        <View>
          <CustomButton
            title={'Cooked?'}
            bgColor={theme.colors.primaryContainerUnfocused}
            borderColor={theme.colors.primaryBorder}
            iconName={'check-circle-outline'}
            iconSize={24}
            iconColor={theme.colors.primaryIcon}
          />
        </View>
        <View style={{flexGrow: 1}}>
          <CustomButton title={'Start Cooking'} />
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <Text> Meal Details Screen</Text>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 110,
  },
  image: {
    // borderRadius: 20,
    position: 'absolute',
    // zIndex:-10,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingTop: 24,
    marginHorizontal: 16,
    // width:width-32,
    justifyContent: 'space-between',
    // flexWrap:'wrap'
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    // width: 0.82 * width,
    fontFamily: 'DMSans-Bold',
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 400,
    paddingLeft: 16,
    paddingTop: 4,
    fontFamily: 'DMSans-Bold',
  },
  tabsContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    // width: width,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'DMSans-Bold',
  },
  listItemContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  listItem: {
    fontSize: 24,
    fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: 'DMSans-Bold',
  },
});

export default MealDetailsScreen;
