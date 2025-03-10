import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';

const Carousel = props => {
  const {
    renderItem,
    currentIndexRef,
    ref,
    contentContainerStyle,
    dataList,
    isScrollable,
    showPagination = false,
    onActiveIndexChange,
  } = props;
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  // console.log('Inside Carousel');

  const onScroll = ({nativeEvent}) => {
    const slideSize = nativeEvent.layoutMeasurement.width;
    const newIndex = nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(newIndex);
    const distance = Math.abs(roundIndex - newIndex);
    const isNoMansLand = distance > 0.6;

    if (
      roundIndex !== currentIndexRef?.current &&
      !isNoMansLand &&
      roundIndex < dataList.length &&
      roundIndex >= 0
    ) {
      setIndex(roundIndex);
      if (onActiveIndexChange) {
        onActiveIndexChange(roundIndex);
      }
    }
  };

  return (
    <>
      <FlatList
        data={dataList}
        renderItem={renderItem}
        ref={ref}
        keyExtractor={item => item.key}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={isScrollable ? onScroll : undefined}
        scrollEnabled={isScrollable ? true : false}
        contentContainerStyle={contentContainerStyle}
      />
      {showPagination ? (
        <View style={styles.pagination} pointerEvents="none">
          {dataList.map((_dataListItem, dataListIndex) => {
            //   console.log(data.id);
            return (
              <View
                key={_dataListItem.key}
                style={[
                  styles.paginationDot,
                  index === dataListIndex
                    ? {backgroundColor: theme.colors.primaryIconFocused}
                    : {backgroundColor: theme.colors.primaryIconUnfocused},
                ]}
              />
            );
          })}
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  pagination: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 44,
  },
  paginationDot: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    marginHorizontal: 6,
  },
});

export default Carousel;
