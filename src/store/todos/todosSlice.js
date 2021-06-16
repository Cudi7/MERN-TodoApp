import { createSelector, createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';
import apiHelper from '../../utils/apiHelper';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
    publicTodos: [],
  },
  reducers: {
    addedTodo: (state, action) => {
      state.list.push({
        id: uuid(),
        author: action.payload.name || 'anonymous',
        description: action.payload.description,
        completed: false,
        public: action.payload.public || false,
      });
    },
    toggledCompleted: (state, action) => {
      const index = state.list.findIndex((todo) => todo.id === action.payload);

      state.list[index].completed = !state.list[index].completed;
    },
    toggledEditing: (state, action) => {
      const index = state.list.findIndex((todo) => todo.id === action.payload);

      state.list[index].editing = !state.list[index].editing;
    },
    toggledPublic: (state, action) => {
      const index = state.list.findIndex((todo) => todo.id === action.payload);

      state.list[index].public = !state.list[index].public;
    },
    editedTodo: (state, action) => {
      const index = state.list.findIndex(
        (todo) => todo.id === action.payload.id
      );

      state.list[index].description = action.payload.description;
    },
    deletedTodo: (state, action) => {
      const index = state.list.findIndex((todo) => todo.id === action.payload);

      state.list.splice(index, 1);
    },
    publicTodosDisplayed: (state, action) => {
      state.publicTodos = action.payload.publicTodos;
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
  publicTodosDisplayed,
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
  //we are only passing the string with the ID
  if (typeof data === 'string') {
    dispatch({ type: deletedTodo.type, payload: data });
  } else {
    //we are  passing the object with the ID, in this case we also delete from publicDatabase if exists
    dispatch({ type: deletedTodo.type, payload: data.todoId });

    const userId = data.userId;
    const todoId = data.todoId;
    const name = data.name;
    const description = data.description;

    const publicTodo = {
      userId,
      name,
      description,
      todoId: todoId,
    };

    apiHelper({
      data: publicTodo,
      url: `https://todo-rc.herokuapp.com/public/delete/${todoId}`,
      method: 'delete',
      dispatch,
    });
  }
};

export const togglePublic = (data) => async (dispatch) => {
  const userId = data.id;
  const todoId = data.todo.id || data.todo.todoId;
  const isNotPublic = data.todo.public;
  const name = data.todo.author || data.todo.name;
  const description = data.todo.description;

  const publicTodo = {
    userId,
    name,
    description,
    todoId: todoId,
    public: true,
  };
  if (data.publicFromForm) {
    apiHelper({
      data: publicTodo,
      url: 'https://todo-rc.herokuapp.com/public/new',
      method: 'post',
    });
  } else {
    //We are toggling, so, first it wasn't public, we need to make it public and post a new one
    if (isNotPublic === false) {
      apiHelper({
        data: publicTodo,
        url: 'https://todo-rc.herokuapp.com/public/new',
        method: 'post',
      });
    }

    if (isNotPublic === true) {
      //we are toggling, so, first it was public, now it becomes private, so, we need to delete the todo
      apiHelper({
        data: publicTodo,
        url: `https://todo-rc.herokuapp.com/public/delete/${todoId}`,
        method: 'delete',
        dispatch,
      });
    }
  }
  //avoid auto toggle when creating a newtodo with the public switch checked as true
  if (!data.publicFromForm)
    dispatch({ type: toggledPublic.type, payload: todoId });
};

export const displayPublicTodos = () => async (dispatch, getState) => {
  try {
    const data = await fetch('https://todo-rc.herokuapp.com/public');
    const response = await data.json();

    dispatch({
      type: publicTodosDisplayed.type,
      payload: { publicTodos: response },
    });
  } catch (error) {
    dispatch({
      type: publicTodosDisplayed.type,
      payload: { publicTodos: error.message },
    });
  }
};

export const selectTodos = (state) =>
  createSelector(
    (state) => state.entities.todos.list, //input
    (list) => list //output
  );

export const selectPublicTodos = (state) =>
  createSelector(
    (state) => state.entities.todos.publicTodos, //input
    (publicTodos) => {
      if (!publicTodos.error) {
        return publicTodos.map((el) => ({
          ...el,
          public: el.public ? el.public : true,
        })); //output
      } else {
        return publicTodos; //output
      }
    }
  );
