import {createReducer} from '@reduxjs/toolkit';
import {setRecipeDetailsDataStatus, setRecipeDetailsState} from './action';

const initialState = {status: 'idle'};

const recipeDetailsReducer = createReducer(initialState, builder => {
  builder.addCase(setRecipeDetailsState, (state, action) => {
    if (action.payload) {
      state.data = action.payload;
    }
  });
  builder.addCase(setRecipeDetailsDataStatus, (state, action) => {
    if (action.payload) {
      state.status = action.payload;
    }
  });
});

export default recipeDetailsReducer;
