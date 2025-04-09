import React, {useDebugValue, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import {useDispatch, useSelector} from 'react-redux';
import MealCard from '../components/MealCard';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import InputBox from '../components/InputBox';
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from '../redux/favorites/action';
import {filterRecipes, sortRecipes} from '../redux/recipes/action';
import {Recipe_Search_Screen_Static_Data, SCREEN_NAMES} from '../const';
import CustomDropdown from '../components/CustomDropdown';
import {FontNames} from '../const/fontNames';

const RecipeSearchScreen = () => {
  const {sortDropdownList} = Recipe_Search_Screen_Static_Data;
  const {width, height} = useWindowDimensions();
  const [selectedSortFilter, setSelectedSortFilter] = useState(null);
  const listRef = useRef(null);
  const filteredRecipesList = useSelector(
    state => state?.recipes?.filteredRecipesList,
  );
  const favoriteRecipesList = useSelector(
    state => state?.favorites?.recipeList,
  );
  // console.log(filteredRecipesList);
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const onClear = () => {
    inputRef?.current?.clear();
    listRef?.current?.scrollTo({x: 0, y: 0, animated: false});
    dispatch(filterRecipes(''));
    if (selectedSortFilter) {
      dispatch(
        sortRecipes({
          sortFilter: selectedSortFilter?.sortFilter,
          order: selectedSortFilter?.order,
        }),
      );
    }
  };
  const filterHandler = text => {
    // setSelectedSortFilter(null);
    listRef?.current?.scrollTo({x: 0, y: 0, animated: false});
    dispatch(filterRecipes(text));
    if (selectedSortFilter) {
      dispatch(
        sortRecipes({
          sortFilter: selectedSortFilter?.sortFilter,
          order: selectedSortFilter?.order,
        }),
      );
    }
  };

  const onSortItemPress = item => {
    listRef?.current?.scrollTo({x: 0, y: 0, animated: false});
    setSelectedSortFilter(item);
    dispatch(sortRecipes({sortFilter: item?.sortFilter, order: item?.order}));
  };
  const onHeaderLeftPress = () => {
    navigation.goBack();
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
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader onLeftIconPress={onHeaderLeftPress} />
      <View style={styles.searchBarContainer}>
        <InputBox
          ref={inputRef}
          placeholder={Recipe_Search_Screen_Static_Data.searchBarPlaceholder}
          onChangeText={filterHandler}
          onClear={onClear}
          isMultiline={false}
        />
        <CustomDropdown
          data={sortDropdownList}
          initialDropdownValue={
            Recipe_Search_Screen_Static_Data.initialDropdownValue
          }
          selectedValue={selectedSortFilter}
          iconName={Recipe_Search_Screen_Static_Data.dropdownIconName}
          onSelect={item => onSortItemPress(item)}
        />
      </View>
      {/* <Text style={styles.subHeading}>{'Sort by'}</Text> */}

      {filteredRecipesList?.length !== 0 ? (
        <ScrollView
          ref={listRef}
          style={{width: width}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {filteredRecipesList?.map((item, itemIndex) => {
              const isFavorite = favoriteRecipesList?.find(
                favoriteItem => favoriteItem?.id === item?.id,
              );
              return (
                <View
                  key={item?.id}
                  style={{
                    width: 0.44 * width,
                    // height: 0.6 * width,
                    marginBottom: 24,
                  }}>
                  <MealCard
                    title={item?.title}
                    imgUrl={item?.imgUrl}
                    prepTime={item?.preparationTime}
                    rating={item?.rating}
                    imgWidth={0.43 * width}
                    imgHeight={0.39 * width}
                    iconName={
                      isFavorite
                        ? Recipe_Search_Screen_Static_Data.favoriteIcon
                        : Recipe_Search_Screen_Static_Data.nonFavoriteIcon
                    }
                    iconColor={
                      isFavorite
                        ? theme.colors.primaryError
                        : theme.colors.primaryIcon
                    }
                    onIconPress={() => onCardIconPress(item)}
                    onCardPress={() => onCardPress(item?.id)}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={[styles.heading, {fontSize: 24}]}>
            {Recipe_Search_Screen_Static_Data.emptyContainerText}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginHorizontal: 16,
    fontSize: 32,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 38.4,
    letterSpacing: -1.6,
  },
  subHeading: {
    marginHorizontal: 16,
    alignSelf: 'flex-end',
    fontSize: 16,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 38.4,
    letterSpacing: -1.6,
  },
  searchBarContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
    gap: 14,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipeSearchScreen;
