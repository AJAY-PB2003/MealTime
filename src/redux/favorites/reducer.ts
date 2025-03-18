import {createReducer} from '@reduxjs/toolkit';
import {addFavoriteRecipe, removeFavoriteRecipe} from './action';

const initialState = {recipeList: []};

const favoriteReducer = createReducer(initialState, builder => {
  builder.addCase(addFavoriteRecipe, (state, action) => {
    if (action.payload) {
      state.recipeList.push(action.payload);
    }
  });
  builder.addCase(removeFavoriteRecipe, (state, action) => {
    if (action.payload) {
      state.recipeList = state.recipeList?.filter(
        item => item?.id !== action.payload?.id,
      );
    }
    // console.log(state);
    // console.log(state.status);
  });
});

export default favoriteReducer;
