import {createAction} from '@reduxjs/toolkit';

const setRecipeDetailsState = createAction(
  '@@recipeDetails: SET_RECIPE_DETAILS_STATE',
);
const setRecipeDetailsDataStatus = createAction(
  '@@recipeDetails: SET_RECIPE_DETAILS_DATA_STATUS',
);
const fetchRecipeDetails = createAction(
  '@@recipeDetails: FETCH_RECIPE_DETAILS',
);

export {setRecipeDetailsState, setRecipeDetailsDataStatus, fetchRecipeDetails};
