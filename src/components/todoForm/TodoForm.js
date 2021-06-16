import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Paper, TextField } from '@material-ui/core';

import {
  addTodo,
  selectTodos,
  togglePublic,
} from '../../store/todos/todosSlice';
import useInputState from '../../hooks/useInputState';
import SwitchLabels from '../switch/Switch';
import { selectCurrentUser } from '../../store/auth/authSlice';
import Message from '../message/Message';

function TodoForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser());
  const todos = useSelector(selectTodos());

  const [newTodo, setNewTodo] = useState(false);
  const firstRender = useRef(false);

  const [value, handleValue, reset] = useInputState('');

  useEffect(() => {
    /*every time we add a new todo, we check if the last added todo its public, if it is,
    we dispatch togglePublic, and that dispatch function, does a post request to the publicTodos database schema.
    Also, we are using useRef, because we only want this to fire once the user adds a todo, and not, on the first mounting*/
    if (firstRender.current && newTodo) {
      const currentTodo = todos[todos.length - 1];
      console.log(currentTodo);

      if (currentTodo.public) {
        dispatch(
          togglePublic({
            todo: { ...currentTodo },
            id: currentUser.user.id,
            publicFromForm: true,
          })
        );
      }

      setNewTodo(false);
    }
    firstRender.current = true;
  }, [newTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser.user.name)
      dispatch(addTodo({ ...value, name: e.target.name.value }));
    else dispatch(addTodo(value));

    setNewTodo(true);

    reset();
  };

  const handleSuccessMessage = () => {
    if (currentUser.user.name) {
      const message = `Welcome ${currentUser.user.name} 😉`;

      return <Message message={message} type="success" />;
    }
  };

  return (
    <>
      {currentUser.status.success && handleSuccessMessage()}

      <Paper
        style={{
          margin: '1rem auto',
          padding: '0.5rem 1rem',
          width: '100%',
          maxWidth: '700px',
        }}
      >
        <form onSubmit={handleSubmit} align="center">
          <TextField
            label="Name"
            id="my-name"
            name="name"
            value={
              currentUser.user.name ? currentUser.user.name : value?.name || ''
            }
            aria-describedby="my-helper-text"
            onChange={handleValue}
            fullWidth
            disabled={currentUser.user.name ? true : false}
          />
          <TextField
            name="description"
            value={value?.description || ''}
            margin="normal"
            label="Add New Todo"
            fullWidth
            onChange={handleValue}
            required
          />
          <SwitchLabels handleValue={handleValue} value={value} />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default TodoForm;
