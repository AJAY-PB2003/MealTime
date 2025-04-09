import React, {useRef} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {Meal_Plan_Screen_Static_Data, SCREEN_NAMES} from '../const';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromCollection} from '../redux/collections/action';
import {CustomIcon} from '../components/CustomIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontNames} from '../const/fontNames';

const MealPlanScreen = () => {
  const {width} = useWindowDimensions();
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const collectionList = useSelector(
    state => state?.collections?.collectionList,
  );
  const firstTimeMealRef = useRef(true);
  // console.log(collectionList);
  const onAddNewCollectionBtnPress = () => {
    navigation.navigate(SCREEN_NAMES.ADD_NEW_COLLECTION_SCREEN);
  };
  const onBuildFirstMealPress = () => {
    navigation.navigate(SCREEN_NAMES.SELECT_MEAL_PLAN_SCREEN, {
      firstTimeMeal: firstTimeMealRef.current,
    });
    firstTimeMealRef.current = false;
  };
  const onBuildMealPress = () => {
    navigation.navigate(SCREEN_NAMES.SELECT_MEAL_PLAN_SCREEN);
  };

  const onItemPress = collectionKey => {
    navigation.navigate(SCREEN_NAMES.COLLECTION_ITEMS_SCREEN, {
      collectionKey: collectionKey,
    });
  };
  const onItemDeletePress = key => {
    dispatch(removeFromCollection(key));
  };
  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      {collectionList?.length !== 0 ? (
        <View
          style={{justifyContent: 'space-between', flex: 1, paddingTop: 16}}>
          <Text style={styles.title}>Collections</Text>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {collectionList?.length !== 0 ? (
              <View style={styles.listContainer}>
                {collectionList?.map((item, itemIndex) => {
                  // const isSelected = selectedCollection === item?.key;
                  return (
                    <View
                      key={item?.key}
                      style={[
                        styles.card,
                        {
                          borderColor: theme.colors.primaryBorder,
                          backgroundColor:
                            theme.colors.primaryContainerUnfocused,
                        },
                      ]}>
                      <Pressable
                        style={styles.cardTextContainer}
                        onPress={() => onItemPress(item?.key)}>
                        <Text style={styles.cardTitle}>{item?.title}</Text>
                        <Text
                          style={[
                            styles.cardSubtitle,
                            {
                              color:
                                theme.colors.onSecondaryContainerSubheading,
                            },
                          ]}>{`${item?.arr?.length} Recipes`}</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => onItemDeletePress(item?.key)}
                        style={styles.iconContainer}>
                        <CustomIcon
                          iconName={
                            Meal_Plan_Screen_Static_Data.collectionItemIcon
                          }
                          iconSize={24}
                          color={theme.colors.primaryIcon}
                        />
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </ScrollView>
          <CustomButton
            onPress={onAddNewCollectionBtnPress}
            title={Meal_Plan_Screen_Static_Data.addNewCollectionBtnTitle}
            bgColor={theme.colors.tertiaryContainer}
            borderColor={theme.colors.primaryBorder}
            iconName={Meal_Plan_Screen_Static_Data.addNewCollectionBtnIcon}
            iconSize={24}
            iconColor={theme.colors.primaryIcon}
            containerStyle={styles.addNewCollectionButton}
          />
          <CustomButton
            title={Meal_Plan_Screen_Static_Data.buildMealPlanBtnTitle}
            onPress={onBuildMealPress}
            containerStyle={{margin: 16}}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.heading,
                {color: theme.colors.onSecondaryContainerHeading},
              ]}>
              {Meal_Plan_Screen_Static_Data.heading}
            </Text>
            <Text
              style={[
                styles.subheading,
                {color: theme.colors.onSecondaryContainerSubheading},
              ]}>
              {Meal_Plan_Screen_Static_Data.subheading}
            </Text>
          </View>
          <CustomButton
            title={Meal_Plan_Screen_Static_Data.buttonTitle}
            onPress={onBuildFirstMealPress}
            containerStyle={{width: width - 32}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    gap: 24,
  },
  textContainer: {
    marginHorizontal: 36,
    gap: 12,
  },
  heading: {
    fontSize: 32,
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    fontFamily: FontNames.DM_Sans_Regular,
    // fontWeight: 400,
    textAlign: 'center',
  },

  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 38.4,
    letterSpacing: -1.6,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    // fontWeight: 400,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Regular,
    lineHeight: 25.2,
    paddingLeft: 16,
    paddingTop: 6,
  },
  addNewCollectionButton: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  addButtonContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  listContainer: {
    marginTop: 16,
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  cardTextContainer: {
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: 24,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 28.8,
  },
  cardSubtitle: {
    fontSize: 18,
    // fontWeight: 400,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Regular,
    lineHeight: 25.2,
  },
  iconContainer: {
    // width: 20,
    // height: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealPlanScreen;
