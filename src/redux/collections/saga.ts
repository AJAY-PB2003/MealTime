import {put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  addNewCollection,
  addToCollection,
  removeCollectionItem,
  removeFromCollection,
  setCollectionListState,
} from './action';

function* addNewCollection$(action) {
  const state = yield select();
  const newCollectionList = [
    ...state?.collections?.collectionList,
    {
      key: action.payload.replaceAll(' ', '').toLowerCase(),
      title: action.payload,
      arr: [],
    },
  ];
  yield put(setCollectionListState(newCollectionList));
}

function* removeFromCollection$(action) {
  const state = yield select();
  const newCollectionList = state?.collections?.collectionList?.filter(
    item => item?.key !== action?.payload,
  );

  yield put(setCollectionListState(newCollectionList));
}

function* addToCollection$(action) {
  const state = yield select();
  const {key, collectionItem} = action.payload;

  const collectionIndex = state.collections?.collectionList?.findIndex(
    item => item?.key === key,
  );

  if (collectionIndex === -1) {
    // console.error('Collection not found');
    return;
  }

  const collection = state.collections.collectionList[collectionIndex];

  const itemExists = collection?.arr?.some(
    recipeItem => recipeItem?.id === collectionItem?.id,
  );

  if (!itemExists) {
    const updatedCollection = {
      ...collection,
      arr: [...collection.arr, collectionItem],
    };

    const newCollectionList = [
      ...state.collections.collectionList.slice(0, collectionIndex),
      updatedCollection,
      ...state.collections.collectionList.slice(collectionIndex + 1),
    ];

    yield put(setCollectionListState(newCollectionList));
  }
}

function* removeCollectionItem$(action) {
  const state = yield select();
  const {key, collectionItem} = action.payload;

  const collectionIndex = state.collections?.collectionList?.findIndex(
    item => item?.key === key,
  );

  if (collectionIndex === -1) {
    console.error('Collection not found');
    return;
  }

  const updatedCollection = {
    ...state.collections.collectionList[collectionIndex],
    arr: state.collections.collectionList[collectionIndex]?.arr?.filter(
      item => item?.id !== collectionItem?.id,
    ),
  };

  const newCollectionList = [
    ...state.collections.collectionList.slice(0, collectionIndex),
    updatedCollection,
    ...state.collections.collectionList.slice(collectionIndex + 1),
  ];

  yield put(setCollectionListState(newCollectionList));
}

export default function* rootSaga() {
  yield takeEvery(addNewCollection, addNewCollection$);
  yield takeEvery(removeFromCollection, removeFromCollection$);
  yield takeEvery(addToCollection, addToCollection$);
  yield takeEvery(removeCollectionItem, removeCollectionItem$);
}
