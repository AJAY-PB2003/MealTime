import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import {useTheme} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {addNewNote} from '../redux/notes/action';
import {Notes_Screen_Static_Data} from '../const';
import {FontNames} from '../const/fontNames';

const NotesScreen = ({route}) => {
  const {recipeDetails} = route.params;
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notesList = useSelector(state => state?.notes?.notesList);
  //   console.log(notesList);
  const inputValue = useRef(null);

  const onHeaderLeftIconPress = () => {
    navigation.goBack();
  };
  const onChangeText = text => {
    if (text === '') {
      inputValue.current = null;
    } else {
      inputValue.current = text;
    }
  };
  const onCancelBtnPress = () => {
    navigation.goBack();
  };

  const onSaveBtnPress = () => {
    if (inputValue.current) {
      const noteObj = {
        key: `${recipeDetails?.title.replaceAll(' ', '').toLowerCase()}_${
          notesList.length + 1
        }`,
        recipeID: recipeDetails?.id,
        name: recipeDetails?.title,
        imgUrl: recipeDetails.imgUrl,
        note: inputValue.current,
      };
      dispatch(addNewNote(noteObj));
      Toast.show({
        type: 'success',
        text1: Notes_Screen_Static_Data.successToastText,
        position: 'bottom',
        bottomOffset: 110,
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: Notes_Screen_Static_Data.errorToastText,
        position: 'bottom',
        bottomOffset: 110,
      });
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader
        title={Notes_Screen_Static_Data.headerTitle}
        onLeftIconPress={onHeaderLeftIconPress}
      />
      <View
        style={[
          styles.container,
          {borderTopColor: theme.colors.primaryBorder},
        ]}>
        <TextInput
          placeholderTextColor={theme.colors.primaryIcon}
          style={[styles.inputBox, {color: theme.colors.onPrimaryContainer}]}
          placeholder={Notes_Screen_Static_Data.inputPlaceholder}
          multiline={true}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.buttonBar}>
        <CustomButton
          title={Notes_Screen_Static_Data.leftBtnTitle}
          bgColor={theme.colors.primaryContainerUnfocused}
          borderColor={theme.colors.primaryBorder}
          onPress={onCancelBtnPress}
          containerStyle={styles.buttonContainer}
        />
        <CustomButton
          title={Notes_Screen_Static_Data.rightBtnTitle}
          onPress={onSaveBtnPress}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    marginTop: 6,
    marginHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  inputBox: {
    fontSize: 18,
    // fontWeight: 400,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Regular,
    lineHeight: 25.2,
  },
  buttonBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
    marginVertical: 16,
  },
  buttonContainer: {
    flex: 1,
  },
});
export default NotesScreen;
