import React from 'react';
import {
  View,
  Pressable,
  useWindowDimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Text} from '@react-navigation/elements';
import {BOTTOM_TAB} from '../const';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FontNames} from '../const/fontNames';

const MyTabBar = ({state, descriptors, navigation, onTabPress}) => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const {bottom} = useSafeAreaInsets();

  //   console.log(state.routes);

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          width: width,
          paddingBottom: bottom,
          backgroundColor: colors.tertiary,
        },
      ]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          // console.log(route.name);
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => onTabPress({navigation, route, isFocused});

          return (
            <Pressable key={index} onPress={onPress} style={styles.tabBarItem}>
              <Image
                source={BOTTOM_TAB[route.name].imgPath}
                tintColor={
                  isFocused
                    ? colors.tertiaryIconFocused
                    : colors.tertiaryIconUnfocused
                }
                width={24}
                height={24}
              />

              <Text
                style={[
                  styles.text,
                  {
                    color: isFocused
                      ? colors.tertiaryIconFocused
                      : colors.tertiaryIconUnfocused,
                  },
                ]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingHorizontal: 35.5,
    // paddingTop: 10,
    // marginBottom:10
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  tabBarItem: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: FontNames.DM_Sans_Bold,
  },
});

export default MyTabBar;
