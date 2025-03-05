import React from 'react';
import {View, Text} from 'react-native';

const toastConfig = {
  error: ({text1, text2}) => (
    <View
      style={{
        height: 52,
        // width: '80%',
        backgroundColor: '#FEF3F2',
        borderColor: '#D92D20',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
      }}>
      {text1 ? (
        <Text style={{color: '#D92D20', fontWeight: 'bold'}}>{text1}</Text>
      ) : null}
      {text2 ? <Text style={{color: 'white'}}>{text2}</Text> : null}
    </View>
  ),
  success: ({text1, text2}) => (
    <View
      style={{
        height: 52,
        // width: '80%',
        backgroundColor: '#FEF3F2',
        borderColor: 'green',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
      }}>
      {text1 ? (
        <Text style={{color: '#329930', fontWeight: 'bold'}}>{text1}</Text>
      ) : null}
      {text2 ? <Text style={{color: 'white'}}>{text2}</Text> : null}
    </View>
  ),
};

export default toastConfig;
