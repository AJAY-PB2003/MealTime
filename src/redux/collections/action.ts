import {createAction} from '@reduxjs/toolkit';

const setCollectionListState = createAction(
  '@@collections: SET_COLLECTION_LIST_STATE',
);
const addNewCollection = createAction('@@collections: ADD_NEW_COLLECTION');
const addToCollection = createAction('@@collections: ADD_TO_COLLECTION');
const removeCollectionItem = createAction(
  '@@collections: REMOVE_COLLECTION_ITEM',
);
const removeFromCollection = createAction(
  '@@collections: REMOVE_FROM_COLLECTION',
);

export {
  addNewCollection,
  addToCollection,
  removeCollectionItem,
  removeFromCollection,
  setCollectionListState,
};
