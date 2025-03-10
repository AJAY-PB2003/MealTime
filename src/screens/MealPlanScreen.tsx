import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import {Meal_Plan_Screen_Static_Data} from '../const';
import {useTheme} from 'react-native-paper';

const MealPlanScreen = () => {
  const {width} = useWindowDimensions();
  const theme = useTheme();
  return (
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
      <View style={{width: width - 32}}>
        <CustomButton title={Meal_Plan_Screen_Static_Data.buttonTitle} />
      </View>
    </View>
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
    fontWeight: 700,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    fontFamily: 'DMSans-Regular',
    fontWeight: 400,
    textAlign: 'center',
  },
});

export default MealPlanScreen;
