// import { counterReducer } from './reducers';
import collectionsReducer from './collections/reducer';
import favoriteReducer from './favorites/reducer';
import feedbackReducer from './feedbacks/reducer';
import notesReducer from './notes/reducer';
import recipeDetailsReducer from './recipeDetails/reducer';
import recipesReducer from './recipes/reducer';
import userDataReducer from './userData/reducer';

export default {
  recipeDetails: recipeDetailsReducer,
  recipes: recipesReducer,
  favorites: favoriteReducer,
  collections: collectionsReducer,
  notes: notesReducer,
  feedbacks: feedbackReducer,
  userData: userDataReducer,
};
