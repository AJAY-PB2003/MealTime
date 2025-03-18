import React from 'react';
import {Pressable, StyleSheet, View, Text, Image} from 'react-native';
import {CustomIcon} from './CustomIcon';

const MealCard = props => {
  const {title, imgUrl, iconName, iconColor, onCardPress, onIconPress} = props;
  return (
    <Pressable onPress={onCardPress} style={styles.card}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          width={150}
          height={150}
          src={imgUrl}
          //  resizeMode="contain"
        />
        <Pressable onPress={onIconPress} style={styles.icon}>
          <CustomIcon iconName={iconName} iconSize={16} color={iconColor} />
        </Pressable>
      </View>

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    // margin: 16,
    gap: 10,
    width: 150,
  },
  imgContainer: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  img: {
    borderRadius: 20,
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
  title: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily:'DMSans-Bold'
  },
});

export default MealCard;
