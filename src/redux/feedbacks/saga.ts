import {put, select, takeLatest} from 'redux-saga/effects';
import {addFeedback, setFeedbackListState} from './action';

function* addFeedback$(action) {
  const state = yield select();
  const feedbackIndex = state?.feedbacks?.feedbackList?.findIndex(
    item => item?.key === action.payload?.key,
  );
  if (feedbackIndex !== -1 || undefined) {
    const newFeedbackList = [
      ...state?.feedbacks?.feedbackList?.slice(0, feedbackIndex),
      action.payload,
      ...state?.feedbacks?.feedbackList?.slice(feedbackIndex + 1),
    ];
    yield put(setFeedbackListState(newFeedbackList));
  } else {
    const newFeedbackList = [...state?.feedbacks?.feedbackList, action.payload];
    yield put(setFeedbackListState(newFeedbackList));
  }
}

export default function* rootSaga() {
  yield takeLatest(addFeedback, addFeedback$);
}
