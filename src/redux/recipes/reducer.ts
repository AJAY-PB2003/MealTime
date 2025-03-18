import {createReducer} from '@reduxjs/toolkit';
import {
  setCategorizedRecipesListState,
  setRecipesDataStatus,
  setRecipesListState,
} from './action';

const initialState = {status: 'idle'};

const recipesReducer = createReducer(initialState, builder => {
  builder.addCase(setRecipesListState, (state, action) => {
    if (action.payload) {
      state.recipesList = action.payload;
    }
  });
  builder.addCase(setRecipesDataStatus, (state, action) => {
    if (action.payload) {
      state.status = action.payload;
    }
  });
  builder.addCase(setCategorizedRecipesListState, (state, action) => {
    if (action.payload) {
      state.categorizedRecipesList = action.payload;
    }
  });
});

export default recipesReducer;
