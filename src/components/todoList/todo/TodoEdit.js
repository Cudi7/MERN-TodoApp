import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, ListItem, TextField } from '@material-ui/core';

import useInputState from '../../../hooks/useInputState';
import { addTodo, toggleEdit } from '../../../store/todos/todosSlice';

function TodoEdit(props) {
  const [value, handleValue] = useInputState('');

  const dispatch = useDispatch();
  const { todo } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(toggleEdit(todo.id));

    dispatch(addTodo({ id: todo.id, ...value }, 'isEditing'));
  };

  return (
    <>
      <ListItem role={undefined} dense button>
        <form onSubmit={handleSubmit}>
          <TextField
            name="description"
            value={value?.description || ''}
            margin="normal"
            label={todo.description}
            fullWidth
            onChange={handleValue}
            required
          />
          <Button variant="outlined" color="primary" type="submit">
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(toggleEdit(todo.id))}
          >
            Cancel
          </Button>
        </form>
      </ListItem>
    </>
  );
}

export default TodoEdit;
