import {createReducer} from '@reduxjs/toolkit';
import {addNewNote} from './action';

const initialState = {notesList: []};

const notesReducer = createReducer(initialState, builder => {
  builder.addCase(addNewNote, (state, action) => {
    if (action.payload) {
      state.notesList.push(action.payload);
    }
  });
});

export default notesReducer;
