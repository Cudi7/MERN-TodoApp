import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { List, Typography } from '@material-ui/core';

import useStyles from '../todoList/TodoListStyles';
import TodoPublic from '../todoList/todo/TodoPublic';
import {
  selectPublicTodos,
  displayPublicTodos,
} from '../../store/todos/todosSlice';

function TodoListPublic() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const publicTodos = useSelector(selectPublicTodos());

  useEffect(() => {
    dispatch(displayPublicTodos());
  }, []);

  return (
    <div style={{ marginTop: '4rem' }}>
      {publicTodos.length > 0 && !publicTodos.error ? (
        publicTodos.map((todo) => (
          <List key={todo.id} className={classes.root}>
            <TodoPublic todo={todo} />
          </List>
        ))
      ) : (
        <Typography>{publicTodos.error}</Typography> //{todos.error}
      )}
    </div>
  );
}

export default TodoListPublic;
