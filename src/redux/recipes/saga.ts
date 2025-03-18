import {put, takeLatest, call, select} from 'redux-saga/effects';
import {apiCallFn} from '../../utils/apiCallFn';
import {API_STATUS} from '..//..//const//index';
import {recipesApi} from '../../const/apiUrl';
import {
  fetchRecipes,
  setCategorizedRecipesListState,
  setRecipesDataStatus,
  setRecipesListState,
} from './action';
import {categorizedRecipeListParser} from '../../utils/parser/categorizedRecipeListParser';

function* fetchRecipes$() {
  yield put(setRecipesDataStatus(API_STATUS.PENDING));
  try {
    const apiResponse = yield call(apiCallFn, recipesApi, {
      params: {
        limit: 0,
        select: 'id,name,image,tags',
      },
    });
    // console.log(apiResponse);
    yield put(setRecipesListState(apiResponse?.recipes));
    const categorizedRecipeList = yield call(
      categorizedRecipeListParser,
      apiResponse,
    );
    // console.log(categorizedRecipeList);
    yield put(setCategorizedRecipesListState(categorizedRecipeList));

    yield put(setRecipesDataStatus(API_STATUS.SUCCEEDED));
  } catch (error) {
    yield put(setRecipesDataStatus(API_STATUS.ERROR));
  }
  const state = yield select();
  // console.log(state);
}

export default function* rootSaga() {
  yield takeLatest(fetchRecipes, fetchRecipes$);
}
