import {createAction} from '@reduxjs/toolkit';

const addFeedback = createAction('@@feedbacks: ADD_FEEDBACK');
const setFeedbackListState = createAction(
  '@@feedbacks: SET_FEEDBACK_LIST_STATE',
);

export {addFeedback, setFeedbackListState};
