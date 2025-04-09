import React, {useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {addNewCollection} from '../redux/collections/action';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {Add_New_Collection_Screen_Static_Data} from '../const';
import {FontNames} from '../const/fontNames';

const AddNewCollectionScreen = () => {
  const inputRef = useRef(null);
  const inputValue = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //   const collectionList = useSelector(
  //     state => state?.collections?.collectionList,
  //   );
  //   console.log(collectionList);

  const onHeaderLeftIconPress = () => {
    navigation.goBack();
  };

  const onClear = () => {
    inputRef.current?.clear();
    inputValue.current = null;
  };
  const onChangeText = text => {
    if (text === '') {
      inputValue.current = null;
    } else {
      inputValue.current = text;
    }
  };
  const onButtonPress = () => {
    if (inputValue.current) {
      dispatch(addNewCollection(inputValue.current));
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: Add_New_Collection_Screen_Static_Data.toastText,
        position: 'bottom',
        bottomOffset: 110,
      });
    }
    // console.log(inputValue.current);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader onLeftIconPress={onHeaderLeftIconPress} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            {Add_New_Collection_Screen_Static_Data.title}
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>
              {Add_New_Collection_Screen_Static_Data.subTitle}
            </Text>
            <InputBox
              placeholder={Add_New_Collection_Screen_Static_Data.placeholder}
              ref={inputRef}
              onClear={onClear}
              onChangeText={onChangeText}
            />
          </View>
        </View>
        <CustomButton
          title={Add_New_Collection_Screen_Static_Data.buttonTitle}
          onPress={onButtonPress}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  subtitle: {
    fontSize: 18,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 25.2,
  },
  buttonContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
});

export default AddNewCollectionScreen;
