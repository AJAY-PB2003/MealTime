import {put, select, takeLatest} from 'redux-saga/effects';
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
  setFavoriteRecipeListState,
} from './action';

function* addFavoriteRecipe$(action) {
  const state = yield select();
  const newRecipeList = [...state?.favorites?.recipeList, action.payload];
  yield put(setFavoriteRecipeListState(newRecipeList));
}
function* removeFavoriteRecipe$(action) {
  const state = yield select();
  const newRecipeList = state?.favorites?.recipeList?.filter(
    item => item?.id !== action.payload?.id,
  );
  yield put(setFavoriteRecipeListState(newRecipeList));
}

export default function* rootSaga() {
  yield takeLatest(addFavoriteRecipe, addFavoriteRecipe$);
  yield takeLatest(removeFavoriteRecipe, removeFavoriteRecipe$);
}
