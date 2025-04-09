import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Collection_Items_Screen_Static_Data, SCREEN_NAMES} from '../const';
import {ScrollView} from 'react-native';
import MealCard from '../components/MealCard';
import {removeCollectionItem} from '../redux/collections/action';
import {FontNames} from '../const/fontNames';
import CustomButton from '../components/CustomButton';

const CollectionItemsScreen = ({route}) => {
  const {collectionKey} = route?.params;
  //   console.log(collection);
  const collectionList = useSelector(
    state => state?.collections?.collectionList,
  );
  const collection = collectionList.find(item => item?.key === collectionKey);
  // console.log(collection);

  // const {favoriteIcon, heading, emptyScreenText} = Favorite_Screen_Static_Data;
  const theme = useTheme();
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const favoriteRecipesList = useSelector(
  //   state => state?.favorites?.recipeList,
  // );
  // console.log(favouritesList);
  const onHeaderLeftPress = () => {
    navigation.goBack();
  };
  const onCardPress = id => {
    navigation.navigate(SCREEN_NAMES.MEAL_DETAILS_SCREEN, {recipeId: id});
  };

  const onCardIconPress = item => {
    dispatch(
      removeCollectionItem({key: collection?.key, collectionItem: item}),
    );
  };
  const onAddItemsPress = () => {
    navigation.navigate(SCREEN_NAMES.SELECT_MEAL_PLAN_SCREEN);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader onLeftIconPress={onHeaderLeftPress} />
      <Text style={styles.heading}>{collection?.title}</Text>
      {collection?.arr?.length !== 0 ? (
        <ScrollView
          style={{width: width, height: height}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.listContainer}>
            {collection?.arr?.map((arrItem, itemIndex) => {
              return (
                <View
                  key={arrItem?.id}
                  style={{
                    width: 0.44 * width,
                    // height: 0.53 * width,
                    marginTop: 24,
                  }}>
                  <MealCard
                    title={arrItem?.title}
                    imgUrl={arrItem?.imgUrl}
                    prepTime={arrItem?.preparationTime}
                    rating={arrItem?.rating}
                    imgWidth={0.43 * width}
                    imgHeight={0.39 * width}
                    iconName={Collection_Items_Screen_Static_Data.cardIconName}
                    // iconColor={theme.colors.primaryError}
                    onIconPress={() => onCardIconPress(arrItem)}
                    onCardPress={() => onCardPress(arrItem?.id)}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyListContainer}>
          <CustomButton
            title={Collection_Items_Screen_Static_Data.emptyContainerText}
            iconName={Collection_Items_Screen_Static_Data.emptyContainerBtnIcon}
            iconSize={24}
            onPress={onAddItemsPress}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  heading: {
    // marginTop: 16,
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

export default CollectionItemsScreen;
