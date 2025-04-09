import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import {useTheme} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {CustomIcon} from '../components/CustomIcon';
import {Pressable} from 'react-native';
import {Save_To_Collection_Screen_Static_Data, SCREEN_NAMES} from '../const';
import {addToCollection} from '../redux/collections/action';
import Toast from 'react-native-toast-message';
import {FontNames} from '../const/fontNames';

const SaveToCollectionScreen = ({route}) => {
  const {recipeDetails} = route.params;
  //   console.log(recipeDetails);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const collectionList = useSelector(
    state => state?.collections?.collectionList,
  );
  //   console.log(collectionList);

  const [selectedCollection, setSelectedCollection] = useState(null);
  const onHeaderLeftIconPress = () => {
    navigation.goBack();
  };
  const onAddNewCollectionBtnPress = () => {
    navigation.navigate(SCREEN_NAMES.ADD_NEW_COLLECTION_SCREEN);
  };
  const onItemPress = key => {
    if (selectedCollection === key) {
      setSelectedCollection(null);
    } else {
      setSelectedCollection(key);
    }
  };
  const onAddBtnPress = () => {
    if (selectedCollection) {
      dispatch(
        addToCollection({
          key: selectedCollection,
          collectionItem: recipeDetails,
        }),
      );
      Toast.show({
        type: 'success',
        text1: Save_To_Collection_Screen_Static_Data.successToastText,
        position: 'bottom',
        bottomOffset: 110,
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: Save_To_Collection_Screen_Static_Data.errorToastText,
        position: 'bottom',
        bottomOffset: 110,
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.contentContainer}>
        <MyHeader onLeftIconPress={onHeaderLeftIconPress} />
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Text style={styles.title}>
            {Save_To_Collection_Screen_Static_Data.title}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {color: theme.colors.onSecondaryContainerSubheading},
            ]}>
            {Save_To_Collection_Screen_Static_Data.subTitle}
          </Text>
          {collectionList?.length !== 0 ? (
            <View style={styles.listContainer}>
              {collectionList?.map((item, itemIndex) => {
                const isSelected = selectedCollection === item?.key;
                return (
                  <Pressable
                    key={item?.key}
                    style={[
                      styles.card,
                      {
                        borderColor: isSelected
                          ? theme.colors.primary
                          : theme.colors.primaryBorder,
                        backgroundColor: isSelected
                          ? theme.colors.primaryContainerFocused
                          : theme.colors.primaryContainerUnfocused,
                      },
                    ]}
                    onPress={() => onItemPress(item?.key)}>
                    <View>
                      <Text style={styles.cardTitle}>{item?.title}</Text>
                      <Text
                        style={[
                          styles.cardSubtitle,
                          {color: theme.colors.onSecondaryContainerSubheading},
                        ]}>{`${item?.arr?.length} Recipes`}</Text>
                    </View>
                    <View
                      style={[
                        styles.checkbox,
                        {
                          borderWidth: isSelected ? 0 : 1,
                          borderColor: theme.colors.primaryBorder,
                          backgroundColor: isSelected
                            ? theme.colors.primary
                            : theme.colors.primaryContainerUnfocused,
                        },
                      ]}>
                      {isSelected ? (
                        <CustomIcon
                          iconName={
                            Save_To_Collection_Screen_Static_Data.collectionItemIcon
                          }
                          iconSize={13}
                          color={theme.colors.tertiary}
                        />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
          <CustomButton
            onPress={onAddNewCollectionBtnPress}
            title={Save_To_Collection_Screen_Static_Data.addCollectionBtnTitle}
            bgColor={theme.colors.tertiaryContainer}
            borderColor={theme.colors.primaryBorder}
            iconName={
              Save_To_Collection_Screen_Static_Data.addCollectionBtnIcon
            }
            iconSize={24}
            iconColor={theme.colors.primaryIcon}
            containerStyle={styles.addNewCollectionButton}
          />
        </ScrollView>
      </View>
      <CustomButton
        title={Save_To_Collection_Screen_Static_Data.addItemBtnTitle}
        onPress={onAddBtnPress}
        containerStyle={styles.addButtonContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    // marginTop: 16,
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
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SaveToCollectionScreen;
