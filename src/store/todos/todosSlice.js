import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addedTodo: (state, action) => {
      state.push({
        id: uuid(),
        author: action.payload.name || 'anonymous',
        description: action.payload.description,
        completed: false,
        public: action.payload.public || false,
      });
    },
    toggledCompleted: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);

      state[index].completed = !state[index].completed;
    },
    toggledEditing: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);

      state[index].editing = !state[index].editing;
    },
    toggledPublic: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);

      state[index].public = !state[index].public;
    },
    editedTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);

      state[index].description = action.payload.description;
    },
    deletedTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);

      state.splice(index, 1);
    },
  },
});

export const {
  addedTodo,
  editedTodo,
  toggledCompleted,
  deletedTodo,
  toggledEditing,
  toggledPublic,
} = todosSlice.actions;

export default todosSlice.reducer;

export const addTodo = (data, isEditing) => (dispatch) => {
  !isEditing
    ? dispatch({ type: addedTodo.type, payload: data })
    : dispatch({ type: editedTodo.type, payload: data });
};

export const toggleComplete = (data) => (dispatch) => {
  dispatch({ type: toggledCompleted.type, payload: data });
};

export const toggleEdit = (data) => (dispatch) => {
  dispatch({
    type: toggledEditing.type,
    payload: data,
  });
};

export const deleteTodo = (data) => (dispatch) => {
  dispatch({ type: deletedTodo.type, payload: data });
};

export const togglePublic = (data) => (dispatch) => {
  dispatch({ type: toggledPublic.type, payload: data });
};
