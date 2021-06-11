import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Paper, TextField } from '@material-ui/core';

import { addTodo } from '../../store/todos/todosSlice';
import useInputState from '../../hooks/useInputState';
import SwitchLabels from '../switch/Switch';
import {
  selectCurrentUser,
  removeUserAuthStatus,
} from '../../store/auth/authSlice';
import SnackBar from '../snackBar/SnackBar';

function TodoForm() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser());

  console.log();

  const [value, handleValue, reset] = useInputState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.currentUser.name)
      dispatch(addTodo({ ...value, name: e.target.name.value }));
    else dispatch(addTodo(value));

    reset();
  };

  const handleSuccessMessage = () => {
    if (user.currentUser.name)
      setTimeout(() => {
        dispatch(removeUserAuthStatus());
      }, 2000);

    const message = `Welcome ${user.currentUser.name} 😉`;

    return <SnackBar message={message} />;
  };

  return (
    <>
      {user.status.success && handleSuccessMessage()}

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
              user.currentUser.name ? user.currentUser.name : value?.name || ''
            }
            aria-describedby="my-helper-text"
            onChange={handleValue}
            fullWidth
            disabled={user.currentUser.name ? true : false}
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
