import {all} from 'redux-saga/effects';
import recipesSaga from './recipes/saga';
import recipeDetailsSaga from './recipeDetails/saga';
import favoritesSaga from './favorites/saga';
import collectionsSaga from './collections/saga';
import feedbackSaga from './feedbacks/saga';

export default function* rootSaga(): Generator {
  yield all([
    recipesSaga(),
    recipeDetailsSaga(),
    favoritesSaga(),
    collectionsSaga(),
    feedbackSaga(),
  ]);
  // yield recipesSaga();
}
