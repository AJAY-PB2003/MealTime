import {createAction} from '@reduxjs/toolkit';

const setRecipesListState = createAction('@@recipes: SET_RECIPES_LIST_STATE');
const setFilteredRecipesListState = createAction(
  '@@recipes: SET_FILTERED_RECIPES_LIST_STATE',
);
const setCategorizedRecipesListState = createAction(
  '@@recipes: SET_CATEGORIZED_RECIPES_LIST_STATE',
);
const setRecipesDataStatus = createAction('@@recipes: SET_RECIPES_DATA_STATUS');
const fetchRecipes = createAction('@@recipes: FETCH_RECIPES');
const filterRecipes = createAction('@@recipes: FILTER_RECIPES');
const sortRecipes = createAction('@@recipes: SORT_RECIPES');

// const deleteRecipe = createAction('@@recipe: DELETE_RECIPE');

export {
  setCategorizedRecipesListState,
  setFilteredRecipesListState,
  setRecipesDataStatus,
  setRecipesListState,
  fetchRecipes,
  filterRecipes,
  sortRecipes,
  // deleteRecipe,
};
