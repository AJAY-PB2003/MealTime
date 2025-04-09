import {createAction} from '@reduxjs/toolkit';

const removeFavoriteRecipe = createAction('@@favorite: REMOVE_FAVORITE_RECIPE');
const setFavoriteRecipeListState = createAction(
  '@@favorite: SET_FAVORITE_RECIPE_LIST_STATE',
);
const addFavoriteRecipe = createAction('@@favorite: ADD_FAVORITE_RECIPE');

export {removeFavoriteRecipe, addFavoriteRecipe, setFavoriteRecipeListState};
