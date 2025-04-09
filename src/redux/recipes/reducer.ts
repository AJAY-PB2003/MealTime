import {createReducer} from '@reduxjs/toolkit';
import {
  setCategorizedRecipesListState,
  setFilteredRecipesListState,
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
  builder.addCase(setFilteredRecipesListState, (state, action) => {
    if (action.payload) {
      state.filteredRecipesList = action.payload;
    }
    // console.log(state);
    // console.log(state.status);
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
