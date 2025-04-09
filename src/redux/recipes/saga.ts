import {put, takeLatest, call, select} from 'redux-saga/effects';
import {apiCallFn} from '../../utils/apiCallFn';
import {API_STATUS, Sorting_Order_Names} from '..//..//const//index';
import {recipesApi} from '../../const/apiUrl';
import {
  fetchRecipes,
  filterRecipes,
  setCategorizedRecipesListState,
  setFilteredRecipesListState,
  setRecipesDataStatus,
  setRecipesListState,
  sortRecipes,
} from './action';
import {categorizedRecipeListParser} from '../../utils/parser/categorizedRecipeListParser';
import {recipesListParser} from '../../utils/parser/recipesListParser';

function* fetchRecipes$() {
  yield put(setRecipesDataStatus(API_STATUS.PENDING));
  try {
    const apiResponse = yield call(apiCallFn, recipesApi, {
      params: {
        limit: 0,
        // select: 'id,name,image,tags',
      },
    });
    // console.log(apiResponse);
    const recipesList = yield call(recipesListParser, apiResponse.recipes);
    // console.log(recipesList);
    yield put(setRecipesListState(recipesList));
    yield put(setFilteredRecipesListState(recipesList));

    const categorizedRecipeList = yield call(
      categorizedRecipeListParser,
      recipesList,
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

function* filterRecipes$(action) {
  const state = yield select();
  const text = action.payload;
  //   console.log(text);
  const filteredData = yield state.recipes.recipesList?.filter(item =>
    item.title.toLowerCase().startsWith(text?.toLowerCase()),
  );
  yield put(setFilteredRecipesListState(filteredData));
}

function* sortRecipes$(action) {
  const state = yield select();
  const {sortFilter, order} = action.payload;
  const filteredData = yield state.recipes.filteredRecipesList
    ?.slice()
    .sort((item1, item2) => {
      const value1 = item1?.[sortFilter];
      const value2 = item2?.[sortFilter];

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        if (order === Sorting_Order_Names.ASCENDING) {
          return value1.localeCompare(value2);
        } else {
          return value2.localeCompare(value1);
        }
      }
      if (order === Sorting_Order_Names.ASCENDING) {
        return value1 - value2;
      } else {
        return value2 - value1;
      }
      // For numeric values
    });
  yield put(setFilteredRecipesListState(filteredData));
}

export default function* rootSaga() {
  yield takeLatest(fetchRecipes, fetchRecipes$);
  yield takeLatest(filterRecipes, filterRecipes$);
  yield takeLatest(sortRecipes, sortRecipes$);
}
