import {put, takeLatest, call, select, takeEvery} from 'redux-saga/effects';
import {apiCallFn} from '../../utils/apiCallFn';
import {API_STATUS} from '..//..//const//index';
import {recipesApi} from '../../const/apiUrl';
import {
  fetchRecipeDetails,
  setRecipeDetailsDataStatus,
  setRecipeDetailsState,
} from './action';
import {recipeDetailsParser} from '../../utils/parser/recipeDetailsParser';

function* fetchRecipeDetails$(action) {
  // console.log('fetch Recipe Details calling',action);
  yield put(setRecipeDetailsDataStatus(API_STATUS.PENDING));
  try {
    const apiResponse = yield call(
      apiCallFn,
      `${recipesApi}/${action?.payload}`,
    );
    // console.log(apiResponse);
    const recipeDetails = yield call(recipeDetailsParser, apiResponse);
    // console.log(recipeDetails);
    yield put(setRecipeDetailsState(recipeDetails));

    yield put(setRecipeDetailsDataStatus(API_STATUS.SUCCEEDED));
  } catch (error) {
    yield put(setRecipeDetailsDataStatus(API_STATUS.ERROR));
  }
  //   const state = yield select();
  // console.log(state);
}

export default function* rootSaga() {
  yield takeLatest(fetchRecipeDetails, fetchRecipeDetails$);
}
