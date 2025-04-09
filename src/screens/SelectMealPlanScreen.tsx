import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  useWindowDimensions,
  Image,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecipes} from '../redux/recipes/action';
import MyHeader from '../components/MyHeader';
import {
  API_STATUS,
  SCREEN_NAMES,
  Select_Meal_Plan_Screen_StaticData,
} from '../const';
import MealCard from '../components/MealCard';
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from '../redux/favorites/action';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

import {mockSelectMealScreenData} from '../const/mockSelectMealScreenData';
import CustomButton from '../components/CustomButton';
import CustomBottomSheetHandle from '../components/CustomBottomSheetHandle';
import {useTheme} from 'react-native-paper';
import {FontNames} from '../const/fontNames';

const SelectMealPlanScreen = ({route}) => {
  const firstTimeMeal = route?.params?.firstTimeMeal ?? false;
  const {bottom} = useSafeAreaInsets();
  // console.log(firstTimeMeal);
  const {
    favoriteIcon,
    nonFavoriteIcon,
    headerLeftIcon,
    headerRightIcon,
    title,
    bSHeading,
    bSSubHeading,
    bSButtonTitle,
  } = Select_Meal_Plan_Screen_StaticData;
  const {width, height} = useWindowDimensions();
  const theme = useTheme();
  const bottomSheetRef = useRef(null);
  const screenRef = useRef(null);
  const [bottomSheetShown, setBottomSheetShown] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categorizedRecipesData = useSelector(
    state => state?.recipes?.categorizedRecipesList,
  );
  const favoriteRecipesList = useSelector(
    state => state?.favorites?.recipeList,
  );
  // console.log(favoriteRecipesList);
  const recipeDataStatus = useSelector(state => state?.recipes?.status);
  // console.log(recipeDataStatus);
  const dataLoaded = recipeDataStatus === API_STATUS.SUCCEEDED ? true : false;

  // console.log(categorizedRecipesData);
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (dataLoaded && firstTimeMeal) {
      setBottomSheetShown(false);
      bottomSheetRef?.current?.expand();
    }
  }, [dataLoaded, firstTimeMeal]);

  const onTryAgainPress = () => {
    dispatch(fetchRecipes());
  };

  const onBSPress = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setBottomSheetShown(true);
    }
  };

  const renderBSHandle = () => {
    return <CustomBottomSheetHandle onPress={onBSPress} />;
  };

  const onHeaderLeftIconPress = () => {
    navigation.goBack();
  };

  const onHeaderRightIconPress = () => {
    navigation.navigate(SCREEN_NAMES.RECIPE_SEARCH_SCREEN);
  };

  const onCardPress = id => {
    navigation.navigate(SCREEN_NAMES.MEAL_DETAILS_SCREEN, {recipeId: id});
  };

  const onCardIconPress = item => {
    if (
      favoriteRecipesList?.find(favoriteItem => favoriteItem?.id === item?.id)
    ) {
      dispatch(removeFavoriteRecipe(item));
    } else {
      dispatch(addFavoriteRecipe(item));
    }
  };

  const renderShimmerItem = () => {
    return (
      <ShimmerPlaceholder style={{width: 150, height: 180}} visible={false} />
    );
  };

  const renderItem = ({item}) => {
    const isFavorite = favoriteRecipesList?.find(
      favoriteItem => favoriteItem?.id === item?.id,
    );
    return (
      <MealCard
        title={item?.title}
        imgUrl={item?.imgUrl}
        prepTime={item?.preparationTime}
        rating={item?.rating}
        iconName={isFavorite ? favoriteIcon : nonFavoriteIcon}
        iconColor={
          isFavorite ? theme.colors.primaryError : theme.colors.primaryIcon
        }
        onIconPress={() => onCardIconPress(item)}
        onCardPress={() => onCardPress(item?.id)}
      />
    );
  };

  return (
    <SafeAreaView ref={screenRef} style={{flex: 1}}>
      <MyHeader
        leftIconName={headerLeftIcon}
        onLeftIconPress={onHeaderLeftIconPress}
        onRightIconPress={
          recipeDataStatus === API_STATUS.ERROR
            ? undefined
            : onHeaderRightIconPress
        }
        rightIconName={
          recipeDataStatus === API_STATUS.ERROR ? null : headerRightIcon
        }
      />

      {recipeDataStatus === API_STATUS.ERROR ? (
        <View style={styles.errorContainer}>
          <Text style={styles.subHeading}>
            {Select_Meal_Plan_Screen_StaticData.errorText}
          </Text>
          <CustomButton
            title={Select_Meal_Plan_Screen_StaticData.errorBtnText}
            onPress={onTryAgainPress}
          />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>{title}</Text>
          {(categorizedRecipesData ?? mockSelectMealScreenData)?.map(
            (categorizedListItem, categorizedListIndex) => {
              return (
                <View key={categorizedListItem?.key}>
                  <ShimmerPlaceholder
                    style={styles.subHeadingShimmer}
                    visible={dataLoaded}>
                    <Text style={styles.subHeading}>
                      {categorizedListItem.title}
                    </Text>
                  </ShimmerPlaceholder>
                  <FlatList
                    data={categorizedListItem?.data}
                    keyExtractor={item => item?.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={dataLoaded ? renderItem : renderShimmerItem}
                    contentContainerStyle={{gap: 16, paddingHorizontal: 16}}
                  />
                </View>
              );
            },
          )}
        </ScrollView>
      )}

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
              style={[styles.bSContainer, {paddingBottom: bottom + 10}]}>
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
  container: {
    // marginTop: 10,
    marginBottom: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  heading: {
    marginLeft: 16,
    // marginTop: 24,
    fontSize: 32,
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
    letterSpacing: -1.8,
  },
  subHeadingShimmer: {
    marginLeft: 16,
    marginBottom: 14,
    marginTop: 27,
  },
  subHeading: {
    fontSize: 24,
    // fontWeight: 700,

    fontFamily: FontNames.DM_Sans_Bold,
  },
  bSContainer: {
    paddingHorizontal: 28,
    paddingTop: 36,
    // paddingBottom: 40,
  },
  bSTextContainer: {
    gap: 14,
    marginBottom: 28,
  },
  bSHeading: {
    fontSize: 28,
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
    letterSpacing: -1.6,
    // textAlign:'center'
  },
  bSSubHeading: {
    fontSize: 18,
    // fontWeight: 400,
    // marginRight: 32,
    fontFamily: FontNames.DM_Sans_Regular,
    // textAlign:'center'
  },
});
export default SelectMealPlanScreen;
