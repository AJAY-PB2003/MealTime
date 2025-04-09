import React, {useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import {useTheme} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {addNewNote} from '../redux/notes/action';
import InputBox from '../components/InputBox';
import {addFeedback, addNewFeedback} from '../redux/feedbacks/action';
import {Feedback_Screen_Static_Data} from '../const';
import {FontNames} from '../const/fontNames';

const FeedbackScreen = ({route}) => {
  const {recipeID, feedbackItem} = route.params;
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //   const notesList = useSelector(state => state?.notes?.notesList);
  //   console.log(notesList);
  const initialInputValue = feedbackItem?.feedback ?? null;
  const initialRatingValue = feedbackItem?.rating ?? 0;
  // console.log(feedbackItem);
  const inputValue = useRef(initialInputValue);

  const [ratingCount, setRatingCount] = useState(initialRatingValue);

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

  const onSendBtnPress = () => {
    if (inputValue.current && ratingCount !== 0) {
      const feedbackObj = {
        key: recipeID,
        feedback: inputValue.current,
        rating: ratingCount,
      };
      dispatch(addFeedback(feedbackObj));
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: Feedback_Screen_Static_Data.successToastText,
        position: 'bottom',
        bottomOffset: 110,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: Feedback_Screen_Static_Data.errorToastText,
        position: 'bottom',
        bottomOffset: 110,
      });
    }
  };
  const onStarPress = count => {
    setRatingCount(count);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader
        title={Feedback_Screen_Static_Data.headerTitle}
        onLeftIconPress={onHeaderLeftIconPress}
      />
      <View
        style={[
          styles.container,
          {borderTopColor: theme.colors.primaryBorder},
        ]}>
        <View>
          <Text style={styles.heading}>
            {Feedback_Screen_Static_Data.starBoxLabel}
          </Text>
          <View style={styles.ratingBar}>
            {Feedback_Screen_Static_Data.starList?.map((item, itemIndex) => {
              const imgSrc =
                itemIndex < ratingCount
                  ? require('../const/assets/focusedStar.png')
                  : require('../const/assets/unfocusedStar.png');
              return (
                <Pressable
                  onPress={() => onStarPress(itemIndex + 1)}
                  key={item?.key}>
                  <Image source={imgSrc} />
                </Pressable>
              );
            })}
          </View>
        </View>
        <View style={styles.feedbackContainer}>
          <Text style={styles.heading}>
            {Feedback_Screen_Static_Data.commentInputBoxLabel}
          </Text>
          <TextInput
            placeholderTextColor={theme.colors.primaryIcon}
            style={[
              styles.textInput,
              {
                color: theme.colors.onPrimaryContainer,
                backgroundColor: theme.colors.tertiaryContainer,
                borderColor: theme.colors.primaryBorder,
                height: 120,
              },
            ]}
            multiline={true}
            defaultValue={initialInputValue}
            placeholder={Feedback_Screen_Static_Data.commentInputBoxPlaceholder}
            onChangeText={onChangeText}
            numberOfLines={2}
          />
        </View>
      </View>
      <CustomButton
        title={Feedback_Screen_Static_Data.buttonTitle}
        onPress={onSendBtnPress}
        containerStyle={styles.buttonContainer}
      />
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
    gap: 42,
  },
  heading: {
    fontSize: 18,
    // fontWeight: 700,
    textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Bold,
    lineHeight: 25.2,
  },
  ratingBar: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
    marginTop: 24,
  },
  feedbackContainer: {
    gap: 8,
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    fontSize: 18,
    // fontWeight: 400,
    // textAlignVertical: 'center',
    fontFamily: FontNames.DM_Sans_Regular,
    lineHeight: 25.2,
  },

  buttonContainer: {
    margin: 16,
  },
});
export default FeedbackScreen;
