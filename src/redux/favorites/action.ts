import {createAction} from '@reduxjs/toolkit';

const removeFavoriteRecipe = createAction('@@favorite: REMOVE_FAVORITE_RECIPE');
const addFavoriteRecipe = createAction('@@favorite: ADD_FAVORITE_RECIPE');

export {removeFavoriteRecipe, addFavoriteRecipe};
