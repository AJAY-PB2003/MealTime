import {createReducer} from '@reduxjs/toolkit';
import {setFavoriteRecipeListState} from './action';

const initialState = {recipeList: []};

const favoriteReducer = createReducer(initialState, builder => {
  builder.addCase(setFavoriteRecipeListState, (state, action) => {
    if (action.payload) {
      state.recipeList = action.payload;
    }
  });
});

export default favoriteReducer;
