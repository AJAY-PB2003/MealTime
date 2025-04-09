import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import {FontNames} from '../const/fontNames';
import {Eating_Preference_Screen_Static_Data} from '../const';

const EatingPreferencesScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const eatingPreferences = useSelector(
    state => state?.userData?.eatingPreferences,
  );
  const onHeaderLeftPress = () => {
    navigation.goBack();
  };
  // console.log(eatingPreferences);
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader
        onLeftIconPress={onHeaderLeftPress}
        title={Eating_Preference_Screen_Static_Data.headerTitle}
      />
      <ScrollView
        style={styles.scrollView}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {eatingPreferences?.Diet && eatingPreferences?.Diet?.length !== 0 ? (
          <>
            <Text style={styles.preferenceHeading}>
              {Eating_Preference_Screen_Static_Data.dietText}
            </Text>
            <View style={styles.itemsContainer}>
              {eatingPreferences?.Diet?.map((item, itemIndex) => {
                return (
                  <View
                    key={item?.key}
                    style={[
                      styles.item,
                      {
                        backgroundColor: theme.colors.primaryContainerUnfocused,
                        borderColor: theme.colors.secondaryContainer,
                      },
                    ]}>
                    <Text style={styles.itemText}>{item?.text}</Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : null}
        {eatingPreferences?.Allergies &&
        eatingPreferences?.Allergies?.length !== 0 ? (
          <>
            <Text style={styles.preferenceHeading}>
              {Eating_Preference_Screen_Static_Data.allergiesText}
            </Text>
            <View style={styles.itemsContainer}>
              {eatingPreferences?.Allergies?.map((item, itemIndex) => {
                return (
                  <View
                    key={item?.key}
                    style={[
                      styles.item,
                      {
                        backgroundColor: theme.colors.primaryContainerUnfocused,
                        borderColor: theme.colors.secondaryContainer,
                      },
                    ]}>
                    <Text style={styles.itemText}>{item?.text}</Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : null}
        {eatingPreferences?.Dislikes &&
        eatingPreferences?.Dislikes?.length !== 0 ? (
          <>
            <Text style={styles.preferenceHeading}>
              {Eating_Preference_Screen_Static_Data.dislikesText}
            </Text>
            <View style={styles.itemsContainer}>
              {eatingPreferences?.Dislikes?.map((item, itemIndex) => {
                return (
                  <View
                    key={item?.key}
                    style={[
                      styles.item,
                      {
                        backgroundColor: theme.colors.primaryContainerUnfocused,
                        borderColor: theme.colors.secondaryContainer,
                      },
                    ]}>
                    <Text style={styles.itemText}>{item?.text}</Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : null}
        {eatingPreferences?.Servings &&
        eatingPreferences?.Servings?.length !== 0 ? (
          <>
            <Text style={styles.preferenceHeading}>
              {Eating_Preference_Screen_Static_Data.servingsText}
            </Text>
            <View style={styles.itemsContainer}>
              {eatingPreferences?.Servings?.map((item, itemIndex) => {
                return (
                  <View
                    key={item?.key}
                    style={[
                      styles.item,
                      {
                        backgroundColor: theme.colors.primaryContainerUnfocused,
                        borderColor: theme.colors.secondaryContainer,
                      },
                    ]}>
                    <Text style={styles.itemText}>{item?.text}</Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {marginHorizontal: 16, marginTop: 10},
  preferenceHeading: {
    marginTop: 16,
    fontSize: 26,
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    marginBottom: 10,
  },
  item: {
    borderWidth: 2,
    borderRadius: 16,
    // padding: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  itemText: {
    fontSize: 15,
    fontFamily: FontNames.DM_Sans_Bold,
    // fontWeight: 700,
  },
});

export default EatingPreferencesScreen;
