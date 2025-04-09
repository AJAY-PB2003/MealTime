import React from 'react';
import {
  View,
  Text,
  // FlatList,
  useWindowDimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyHeader from './MyHeader';
import {useTheme} from 'react-native-paper';
import CustomButton from './CustomButton';
import {CustomIcon} from './CustomIcon';
import {Instruction_Confirm_Quit_Static_Data} from '../const';
import {FontNames} from '../const/fontNames';
import {FlatList} from 'react-native-gesture-handler';

const InstructionsConfirmQuitComponent = ({
  instructionsList,
  onHeaderLeftPress,
  onItemPress,
  onLeavePress,
  onContinuePress,
}) => {
  const {width} = useWindowDimensions();
  const theme = useTheme();
  //   const {instructionsList} = route?.params;
  //   console.log(instructionsList);

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => onItemPress(item.ins_No)}
        style={[
          styles.listItem,
          {
            borderBottomWidth: item?.ins_No === instructionsList.length ? 0 : 1,
            borderBottomColor: theme.colors.primaryBorder,
            borderBottomColor: theme.colors.primaryBorder,
          },
        ]}>
        <View style={styles.itemTextContainer}>
          <Text
            style={[
              styles.itemIndex,
              {
                color: theme.colors.primaryIcon,
              },
            ]}>
            {item.ins_No}
          </Text>
          <Text style={styles.itemTitle}>{item.name}</Text>
        </View>
        <View style={styles.itemIconContainer}>
          <CustomIcon
            iconName={Instruction_Confirm_Quit_Static_Data?.itemIconName}
            color={theme.colors.primaryIcon}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <MyHeader onLeftIconPress={onHeaderLeftPress} />
      <FlatList
        data={instructionsList}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{width: width}}
      />
      <View style={[styles.leaveCookingModeBtn, {width: width}]}>
        <CustomButton
          title={Instruction_Confirm_Quit_Static_Data?.leaveBtnTitle}
          bgColor={theme.colors.primaryContainerUnfocused}
          borderColor={theme.colors.primaryBorder}
          onPress={onLeavePress}
        />
        <CustomButton
          title={Instruction_Confirm_Quit_Static_Data?.continueBtnTitle}
          onPress={onContinuePress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    // gap: 20,
    // marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  itemTextContainer: {
    gap: 6,
    flexDirection: 'row',
    flexShrink: 1,
  },
  itemIndex: {
    fontSize: 20,
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 24,
  },
  itemTitle: {
    fontSize: 20,
    // fontWeight: 700,
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 24,
    flexShrink: 1,
  },

  itemIconContainer: {
    justifyContent: 'center',
    width: 57,
    alignItems: 'flex-end',
  },
  leaveCookingModeBtn: {
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default InstructionsConfirmQuitComponent;
