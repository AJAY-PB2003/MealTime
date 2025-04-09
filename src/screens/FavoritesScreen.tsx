import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MealCard from '../components/MealCard';
import {Favorite_Screen_Static_Data, SCREEN_NAMES} from '../const';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {removeFavoriteRecipe} from '../redux/favorites/action';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontNames} from '../const/fontNames';

const FavoritesScreen = () => {
  const {favoriteIcon, heading, emptyScreenText} = Favorite_Screen_Static_Data;
  const theme = useTheme();
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteRecipesList = useSelector(
    state => state?.favorites?.recipeList,
  );
  // console.log(favouritesList);
  const onCardPress = id => {
    navigation.navigate(SCREEN_NAMES.MEAL_DETAILS_SCREEN, {recipeId: id});
  };

  const onCardIconPress = item => {
    dispatch(removeFavoriteRecipe(item));
  };
  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <Text style={styles.heading}>{heading}</Text>
      {favoriteRecipesList?.length !== 0 ? (
        <ScrollView
          style={{width: width, height: height}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {favoriteRecipesList?.map((item, itemIndex) => {
              return (
                <View
                  key={item?.id}
                  style={{
                    width: 0.44 * width,
                    // height: 0.53 * width,
                    marginTop: 24,
                  }}>
                  <MealCard
                    title={item?.title}
                    imgUrl={item?.imgUrl}
                    prepTime={item?.preparationTime}
                    rating={item?.rating}
                    imgWidth={0.43 * width}
                    imgHeight={0.39 * width}
                    iconName={favoriteIcon}
                    iconColor={theme.colors.primaryError}
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
            {emptyScreenText}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    paddingTop: 16,
    marginHorizontal: 16,
    fontSize: 32,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 38.4,
    letterSpacing: -1.6,
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

export default FavoritesScreen;
