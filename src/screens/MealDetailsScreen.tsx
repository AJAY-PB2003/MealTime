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
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecipeDetails} from '../redux/recipeDetails/action';
import {
  API_STATUS,
  Feedback_Screen_Static_Data,
  Meal_Details_Screen_Bottom_Sheet_Keys,
  Meal_Details_Screen_Static_Data,
  SCREEN_NAMES,
} from '../const';
import MyHeader from '../components/MyHeader';
import {useTheme} from 'react-native-paper';
import {CustomIcon} from '../components/CustomIcon';
import WelcomeSlideScreen from './WelcomeSlideScreen';
import CustomButton from '../components/CustomButton';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import ShadowWrapper from '../components/ShadowWrapper';
import {useNavigation} from '@react-navigation/native';
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from '../redux/favorites/action';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBottomSheetHandle from '../components/CustomBottomSheetHandle';
import Toast from 'react-native-toast-message';
import {FontNames} from '../const/fontNames';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const MealDetailsScreen = ({route}) => {
  const recipeId = route?.params?.recipeId;
  const {width, height} = useWindowDimensions();
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();
  const recipeDetails = useSelector(state => state.recipeDetails?.data);
  const recipeDetailsStatus = useSelector(state => state.recipeDetails?.status);
  const feedbackList = useSelector(state => state?.feedbacks?.feedbackList);
  const notesList = useSelector(state => state?.notes?.notesList);
  const recipeNotesList = notesList?.filter(
    item => item?.recipeID === recipeId,
  );
  const [tabSelected, setTabSelected] = useState('tab1');
  // console.log(recipeNotesList);
  //  console.log(recipeId);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const feedback = feedbackList?.find(item => item?.key === recipeId);
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const onBSLeftIconPress = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setShowBottomSheet(false);
    }
  };

  const renderBSHandle = () => {
    return <CustomBottomSheetHandle onPress={onBSLeftIconPress} />;
  };

  const onBSItemPress = key => {
    setShowBottomSheet(false);
    bottomSheetRef.current?.close();
    switch (key) {
      case Meal_Details_Screen_Bottom_Sheet_Keys.COOKING_MODE:
        navigation.navigate(SCREEN_NAMES.INSTRUCTIONS_SCREEN);
        break;
      case Meal_Details_Screen_Bottom_Sheet_Keys.NOTES:
        navigation.navigate(SCREEN_NAMES.NOTES_SCREEN, {
          recipeDetails: recipeDetails,
        });
        break;
      case Meal_Details_Screen_Bottom_Sheet_Keys.FEEDBACK:
        navigation.navigate(SCREEN_NAMES.FEEDBACK_SCREEN, {
          recipeID: recipeDetails?.id,
          feedbackItem: feedback,
        });
        // if (feedbackList.some(item => item?.key === recipeDetails?.id)) {
        //   Toast.show({
        //     type: 'error',
        //     text1: Meal_Details_Screen_Static_Data.toastText,
        //     position: 'bottom',
        //     bottomOffset: 110,
        //   });
        // } else {
        //   navigation.navigate(SCREEN_NAMES.FEEDBACK_SCREEN, {
        //     recipeID: recipeDetails?.id,
        //   });
        // }
        break;
      case Meal_Details_Screen_Bottom_Sheet_Keys.ADD_TO_COLLECTIONS:
        navigation.navigate(SCREEN_NAMES.SAVE_TO_COLLECTION_SCREEN, {
          recipeDetails: recipeDetails,
        });
        break;
    }
  };

  const onFeedbackEditPress = () => {
    navigation.navigate(SCREEN_NAMES.FEEDBACK_SCREEN, {
      recipeID: recipeDetails?.id,
      feedbackItem: feedback,
    });
  };

  const favoriteRecipesList = useSelector(
    state => state?.favorites?.recipeList,
  );
  const isFavorite = favoriteRecipesList?.some(item => item?.id === recipeId);

  useEffect(() => {
    dispatch(fetchRecipeDetails(recipeId));
  }, [dispatch, recipeId]);

  const onHeaderLeftIconPress = () => {
    navigation.goBack();
  };
  const onHeaderRightIconPress = () => {
    setShowBottomSheet(true);
    bottomSheetRef.current?.expand();
  };

  const onTabPress = tabId => {
    setTabSelected(tabId);
  };
  const onLeftBottomButtonPress = () => {
    navigation.goBack();
  };
  const onRightBottomButtonPress = () => {
    navigation.navigate(SCREEN_NAMES.INSTRUCTIONS_SCREEN);
  };

  const onFavoriteIconPress = () => {
    if (isFavorite) {
      dispatch(removeFavoriteRecipe(recipeDetails));
    } else {
      dispatch(addFavoriteRecipe(recipeDetails));
    }
  };
  return recipeDetailsStatus === API_STATUS.SUCCEEDED ? (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <ScrollView
        style={[styles.scrollView]}
        bounces={false}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: width,
          }}>
          <ShimmerPlaceholder
            visible={imageLoaded}
            style={{width: width, height: width}}>
            <Image
              style={styles.image}
              src={`${recipeDetails.imgUrl}`}
              width={width}
              height={width}
              resizeMode="contain"
              onLoad={() => {
                setImageLoaded(true);
              }}
            />
          </ShimmerPlaceholder>

          <Pressable
            onPress={onHeaderLeftIconPress}
            style={[
              styles.headerLeftIcon,
              {
                backgroundColor: theme.colors.tertiary,
              },
            ]}>
            <CustomIcon
              iconName={Meal_Details_Screen_Static_Data.headerLeftIconName}
              iconSize={24}
            />
          </Pressable>
          <Pressable
            onPress={onHeaderRightIconPress}
            style={[
              styles.headerRightIcon,
              {
                backgroundColor: theme.colors.tertiary,
              },
            ]}>
            <CustomIcon
              iconName={Meal_Details_Screen_Static_Data.headerRightIconName}
              iconSize={24}
            />
          </Pressable>
        </View>

        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{recipeDetails.title}</Text>

            <Pressable onPress={onFavoriteIconPress}>
              <CustomIcon
                iconName={
                  isFavorite
                    ? Meal_Details_Screen_Static_Data.favoriteIcon
                    : Meal_Details_Screen_Static_Data.nonFavoriteIcon
                }
                iconSize={24}
                color={
                  isFavorite
                    ? theme.colors.primaryError
                    : theme.colors.onPrimaryContainer
                }
              />
            </Pressable>
          </View>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.onSecondaryContainerSubheading,
              },
            ]}>{`${recipeDetails.preparationTime} minutes • ${recipeDetails.servings} servings`}</Text>
          <View style={styles.tabsContainer}>
            {Meal_Details_Screen_Static_Data.tabNames?.map(tabItem => {
              return (
                <Pressable
                  key={tabItem?.id}
                  onPress={() => onTabPress(tabItem?.id)}
                  style={[
                    styles.tab,
                    {
                      backgroundColor:
                        tabSelected === tabItem?.id
                          ? theme.colors.primaryContainerFocused
                          : theme.colors.primaryContainerUnfocused,
                      borderColor:
                        tabSelected === tabItem?.id
                          ? theme.colors.primaryContainer
                          : theme.colors.secondaryContainer,
                    },
                  ]}>
                  <Text style={styles.tabTitle}>{tabItem?.title}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.listContainer}>
            {tabSelected === 'tab1'
              ? recipeDetails?.ingredients?.map((item, itemIndex) => {
                  return (
                    <View
                      key={item.key}
                      style={[
                        styles.ingredientItemContainer,
                        {
                          borderBottomWidth:
                            itemIndex === recipeDetails?.ingredients?.length - 1
                              ? 0
                              : 1,
                          borderBottomColor: theme.colors.primaryBorder,
                        },
                      ]}>
                      <Text style={styles.ingredientItem}>{item.name}</Text>
                    </View>
                  );
                })
              : recipeDetails?.instructions?.map((item, itemIndex) => {
                  return (
                    <View
                      key={item.key}
                      style={[
                        styles.instructionItemContainer,
                        {
                          borderBottomWidth:
                            item?.ins_No === recipeDetails?.instructions?.length
                              ? 0
                              : 1,

                          borderBottomColor: theme.colors.primaryBorder,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.instructionItem,
                          {color: theme.colors.primaryIcon},
                        ]}>
                        {item.ins_No}
                      </Text>
                      <Text style={styles.instructionItem}>{item.name}</Text>
                    </View>
                  );
                })}
          </View>
          {recipeNotesList?.length !== 0 ? (
            <View
              style={[
                styles.notesContainer,
                {
                  backgroundColor: theme.colors.primaryContainerFocused,
                },
              ]}>
              <Text style={styles.notesTitle}>
                {Meal_Details_Screen_Static_Data?.notesContainerTitle}
              </Text>
              {recipeNotesList?.map((item, itemIndex) => {
                return (
                  <View key={item?.key} style={styles.notesItemContainer}>
                    <Text
                      style={[
                        styles.noteIndex,
                        {
                          color: theme.colors.primaryIcon,
                        },
                      ]}>
                      {itemIndex + 1}
                    </Text>
                    <Text style={styles.noteText}>{item.note}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}
          {feedback ? (
            <View
              style={[
                styles.feedbackContainer,
                {backgroundColor: theme.colors.primaryContainerFocused},
              ]}>
              <Pressable
                style={styles.feedbackEditIcon}
                onPress={onFeedbackEditPress}>
                <CustomIcon
                  iconName={Meal_Details_Screen_Static_Data.feedbackEditIcon}
                  iconSize={24}
                />
              </Pressable>
              <Text style={styles.feedbackTtile}>
                {Meal_Details_Screen_Static_Data.feedbackContainerTitle}
              </Text>
              <View style={styles.feedbackStarContainer}>
                {Feedback_Screen_Static_Data.starList?.map(
                  (item, itemIndex) => {
                    const imgSrc =
                      itemIndex < feedback?.rating
                        ? require('../const/assets/focusedStar.png')
                        : require('../const/assets/unfocusedStar.png');
                    return <Image key={item?.key} source={imgSrc} width={10} />;
                  },
                )}
              </View>
              <Text style={styles.feedbackSubtitle}>{feedback?.feedback}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View
        style={[
          styles.btnContainer,
          {
            paddingBottom: bottom,
            backgroundColor: theme.colors.tertiaryContainer,
            // shadowColor: theme.colors.secondaryShadow,
          },
        ]}>
        <CustomButton
          title={Meal_Details_Screen_Static_Data.leftButtonTitle}
          bgColor={theme.colors.primaryContainerUnfocused}
          borderColor={theme.colors.primaryBorder}
          iconName={Meal_Details_Screen_Static_Data.leftButtonIcon}
          iconSize={24}
          iconColor={theme.colors.primaryIcon}
          onPress={onLeftBottomButtonPress}
        />
        <CustomButton
          title={Meal_Details_Screen_Static_Data.rightButtonTitle}
          onPress={onRightBottomButtonPress}
          containerStyle={{flex: 1}}
        />
      </View>
      {showBottomSheet ? (
        <View
          style={[
            styles.bsBackground,
            {
              backgroundColor: theme.colors.primaryBlurBackground,
              width: width,
              height: height,
            },
          ]}>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            handleComponent={renderBSHandle}>
            <BottomSheetView
              style={[styles.bsContainer, {paddingBottom: bottom}]}>
              {Meal_Details_Screen_Static_Data?.bottomSheetItems?.map(
                (item, itemIndex) => {
                  return (
                    <Pressable
                      style={[
                        styles.bsItem,
                        {
                          borderBottomWidth:
                            itemIndex ===
                            Meal_Details_Screen_Static_Data?.bottomSheetItems
                              .length -
                              1
                              ? 0
                              : 1,

                          borderBottomColor: theme.colors.primaryBorder,
                        },
                      ]}
                      key={item?.key}
                      onPress={() => onBSItemPress(item?.key)}>
                      <Image source={item?.img} height={24} width={24} />
                      <Text style={styles.bsItemTitle}>{item?.title}</Text>
                    </Pressable>
                  );
                },
              )}
            </BottomSheetView>
          </BottomSheet>
        </View>
      ) : null}
    </SafeAreaView>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  notesContainer: {
    marginVertical: 20,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 20,
  },
  notesTitle: {
    fontSize: 20,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    textAlign: 'center',
    marginBottom: 10,
  },
  notesItemContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 11,
  },
  noteIndex: {
    fontSize: 18,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    flexShrink: 1,
  },
  noteText: {
    fontSize: 18,
    // fontWeight: 400,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Regular,
    flexShrink: 1,
  },
  feedbackContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
  },
  feedbackEditIcon: {position: 'absolute', top: 16, right: 16},
  feedbackTtile: {
    fontSize: 20,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
  },
  feedbackStarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  feedbackSubtitle: {
    fontSize: 16,
    // fontWeight: 400,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Regular,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
  },
  image: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeftIcon: {
    borderRadius: 30,
    width: 44,
    padding: 10,
    position: 'absolute',
    top: 16,
    left: 16,
  },
  headerRightIcon: {
    borderRadius: 30,
    width: 44,
    padding: 10,
    position: 'absolute',
    top: 16,
    right: 16,
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
    fontSize: 30,
    // fontWeight: 700,
    // width: 0.82 * width,
    fontFamily: FontNames.DM_Sans_Bold,
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 18,
    // fontWeight: 400,
    paddingLeft: 16,
    paddingTop: 4,
    fontFamily: FontNames.DM_Sans_Bold,
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
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
  },
  listContainer: {
    marginTop: 10,
    marginHorizontal: 16,
    // marginBottom: 110,
  },
  ingredientItemContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  instructionItemContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    // justifyContent: 'center',
    flexDirection: 'row',
    gap: 11,
  },
  ingredientItem: {
    fontSize: 20,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
  },
  instructionItem: {
    fontSize: 20,
    // fontWeight: 700,
    // textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    flexShrink: 1,
  },
  btnContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // position: 'absolute',
    // zIndex: 1,
    // right: 0,
    // left: 0,
    // bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 20,
    flexDirection: 'row',
    gap: 12,
    // shadowOpacity: 1,
    // shadowOffset: {height: -10},
  },
  startCookingBtn: {
    flexGrow: 1,
  },
  bsBackground: {
    position: 'absolute',
    zIndex: 1,
  },

  bsContainer: {
    padding: 24,
    // paddingBottom: 10,
  },
  bsItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    gap: 12,
    alignItems: 'center',
  },
  bsItemTitle: {
    fontSize: 18,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 25.2,
  },
});

export default MealDetailsScreen;
