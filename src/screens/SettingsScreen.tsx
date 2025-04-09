import React from 'react';
import {Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {Text, View} from 'react-native';
import {CustomIcon} from '../components/CustomIcon';
import {useTheme} from 'react-native-paper';
import {
  Meal_Details_Screen_Static_Data,
  SCREEN_NAMES,
  Settings_Screen_Static_Data,
} from '../const';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontNames} from '../const/fontNames';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';

const SettingsScreen = () => {
  const {height} = useWindowDimensions();
  const theme = useTheme();
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(SCREEN_NAMES.EATING_PREFERNCES_SCREEN);
  };
  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <ScrollView
        style={[styles.container, {height: height}]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>
          {Settings_Screen_Static_Data.heading}
        </Text>
        <Image
          src={Settings_Screen_Static_Data.profileUrl}
          style={[styles.image, {borderColor: theme.colors.secondaryContainer}]}
        />

        <Text style={styles.name}>{Settings_Screen_Static_Data.name}</Text>
        <Text style={styles.mobileNo}>
          {Settings_Screen_Static_Data.mobileNo}
        </Text>
        <View style={styles.listContainer}>
          {Settings_Screen_Static_Data?.extraInfo?.map((item, itemIndex) => {
            return (
              <View
                style={[
                  styles.listItem,
                  {
                    borderBottomWidth:
                      itemIndex ===
                      Settings_Screen_Static_Data?.extraInfo.length - 1
                        ? 0
                        : 1,

                    borderBottomColor: theme.colors.primaryBorder,
                  },
                ]}
                key={item?.key}>
                <Text
                  style={[
                    styles.listItemName,
                    {
                      color: theme.colors.primaryIcon,
                    },
                  ]}>
                  {item?.name}
                </Text>
                <Text style={styles.listItemValue}>{item?.value}</Text>
              </View>
            );
          })}
        </View>
        <CustomButton
          onPress={onPress}
          title={Settings_Screen_Static_Data.buttonTitle}
          containerStyle={styles.buttonContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
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
  image: {
    borderRadius: 60,
    borderWidth: 4,
    alignSelf: 'center',
    marginTop: 22,
    width: 120,
    height: 120,
  },
  name: {
    marginTop: 16,
    fontSize: 24,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 25.2,
    textAlign: 'center',
  },
  mobileNo: {
    marginTop: 7,
    fontSize: 18,
    // fontWeight: 400,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Regular,
    lineHeight: 25.2,
    textAlign: 'center',
  },
  listContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },

  listItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listItemName: {
    fontSize: 18,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 25.2,
  },
  listItemValue: {
    fontSize: 18,
    // fontWeight: 400,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Regular,
    lineHeight: 25.2,
  },
  buttonContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default SettingsScreen;
