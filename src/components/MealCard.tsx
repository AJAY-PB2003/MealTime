import React, {useState} from 'react';
import {Pressable, StyleSheet, View, Text, Image} from 'react-native';
import {CustomIcon} from './CustomIcon';

import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {FontNames} from '../const/fontNames';
import {useTheme} from 'react-native-paper';
import {Meal_Card_Static_Data} from '../const';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const MealCard = props => {
  const {
    title,
    imgUrl,
    prepTime,
    rating,
    iconName,
    iconColor,
    onCardPress,
    onIconPress,
    imgHeight = 150,
    imgWidth = 150,
  } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const theme = useTheme();
  return (
    <Pressable onPress={onCardPress} style={{width: imgWidth}}>
      <View style={[styles.imgContainer, {width: imgWidth, height: imgHeight}]}>
        <ShimmerPlaceholder
          visible={imageLoaded}
          style={{width: imgWidth, height: imgHeight}}>
          <Image
            style={styles.img}
            width={imgWidth}
            height={imgHeight}
            src={imgUrl}
            resizeMode="stretch"
            onLoad={() => {
              setImageLoaded(true);
            }}
          />
        </ShimmerPlaceholder>
        <Pressable onPress={onIconPress} style={styles.icon}>
          <CustomIcon iconName={iconName} iconSize={16} color={iconColor} />
        </Pressable>
      </View>
      <View
        style={[
          styles.infoContainer,
          {
            backgroundColor: theme.colors.tertiaryContainer,
          },
        ]}>
        <View style={styles.subTitleContainer}>
          <CustomIcon
            iconName={Meal_Card_Static_Data.subtitleContainerLeftIcon}
            iconSize={15}
          />
          <Text style={styles.subTitle}>{`${prepTime} mins`}</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>{`${rating}`}</Text>
          <CustomIcon
            iconName={Meal_Card_Static_Data.subtitleContainerRightIcon}
            iconSize={15}
          />
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    // width: 150,
    // height: 150,
    borderRadius: 20,
  },
  img: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 14,
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 5,
  },
  title: {
    marginTop: 5,
    fontSize: 15,
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
  },
  subTitle: {
    fontSize: 13,
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
  },
  subTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});

export default MealCard;
