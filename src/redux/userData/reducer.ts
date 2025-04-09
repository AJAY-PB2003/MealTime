import {createReducer} from '@reduxjs/toolkit';
import {setEatingPreferences} from './action';

const initialState = {};

const userDataReducer = createReducer(initialState, builder => {
  builder.addCase(setEatingPreferences, (state, action) => {
    if (action.payload) {
      state.eatingPreferences = action.payload;
    }
  });
});

export default userDataReducer;
