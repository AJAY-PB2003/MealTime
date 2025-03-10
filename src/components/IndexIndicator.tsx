import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';

const IndexIndicator = props => {
  const theme = useTheme();
  const {dataList, index} = props;

  return (
    <View style={styles.container}>
      {dataList?.map((_dataListItem, dataListIndex) => {
        return (
          <View
            key={_dataListItem.key}
            style={[
              styles.chips,
              dataListIndex <= index
                ? {backgroundColor: theme.colors.secondaryIconFocused}
                : {backgroundColor: theme.colors.secondaryIconUnfocused},
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: 16,
    marginTop: 16,
  },
  chips: {
    flex: 1,
    height: 12,
    borderRadius: 30,
  },
});

export default IndexIndicator;
