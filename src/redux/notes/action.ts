import {createAction} from '@reduxjs/toolkit';

const addNewNote = createAction('@@notes: ADD_NEW_NOTE');

export {addNewNote};
