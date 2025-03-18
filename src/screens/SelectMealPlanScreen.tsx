import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

const SelectMealPlanScreen = () => {
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
  const theme = useTheme();
  const bottomSheetRef = useRef(null);
  const screenRef = useRef(null);

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
  const dataLoaded = recipeDataStatus === API_STATUS.SUCCEEDED ? true : false;

  // console.log(categorizedRecipesData);
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (dataLoaded) {
      bottomSheetRef?.current?.expand();
    }
  }, [dataLoaded]);

  const onBSPress = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  const renderBSHandle = () => {
    return <CustomBottomSheetHandle onPress={onBSPress} />;
  };

  const onHeaderLeftIconPress = () => {
    navigation.goBack();
  };

  const onHeaderRightIconPress = () => {};

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
        title={item?.name}
        imgUrl={item?.image}
        iconName={isFavorite ? favoriteIcon : nonFavoriteIcon}
        iconColor={
          isFavorite
            ? theme.colors.primaryError
            : theme.colors.onPrimaryContainer
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
        onRightIconPress={onHeaderRightIconPress}
        rightIconName={headerRightIcon}
      />
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
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        handleComponent={renderBSHandle}>
        <BottomSheetView style={styles.bSContainer}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  heading: {
    marginLeft: 16,
    marginTop: 24,
    fontSize: 32,
    // fontWeight: 700,
    fontFamily: 'DMSans-Bold',
    letterSpacing:-1.8
  },
  subHeadingShimmer: {
    marginLeft: 16,
    marginBottom: 14,
    marginTop: 27,
  },
  subHeading: {
    fontSize: 24,
    fontWeight: 700,

    fontFamily: 'DMSans-Bold',
  },
  bSContainer: {
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 64,
  },
  bSTextContainer: {
    gap: 14,
    marginBottom: 32,
  },
  bSHeading: {
    fontSize: 31,
    fontWeight: 700,
    fontFamily: 'DMSans-Bold',
    letterSpacing:-1.6

  },
  bSSubHeading: {
    fontSize: 18,
    fontWeight: 400,
    marginRight: 32,
    fontFamily: 'DMSans-Regular',

  },
});
export default SelectMealPlanScreen;
