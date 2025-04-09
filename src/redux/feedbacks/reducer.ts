import {createReducer} from '@reduxjs/toolkit';
import {addNewFeedback, setFeedbackListState} from './action';

const initialState = {feedbackList: []};

const feedbackReducer = createReducer(initialState, builder => {
  builder.addCase(setFeedbackListState, (state, action) => {
    if (action.payload) {
      state.feedbackList = action.payload;
    }
  });
});

export default feedbackReducer;
