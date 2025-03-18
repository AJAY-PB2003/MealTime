// import { counterReducer } from './reducers';
import favoriteReducer from './favorites/reducer';
import recipeDetailsReducer from './recipeDetails/reducer';
import recipesReducer from './recipes/reducer';

export default {
  recipeDetails: recipeDetailsReducer,
  recipes: recipesReducer,
  favorites: favoriteReducer,
};
