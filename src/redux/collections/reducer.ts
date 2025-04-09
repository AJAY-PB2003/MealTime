import {createReducer} from '@reduxjs/toolkit';
import {setCollectionListState} from './action';

const initialState = {
  collectionList: [],
};

const collectionsReducer = createReducer(initialState, builder => {
  builder.addCase(setCollectionListState, (state, action) => {
    if (action.payload) {
      state.collectionList = action.payload;
    }
  });
});

export default collectionsReducer;
