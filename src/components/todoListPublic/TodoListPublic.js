import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { List, Typography } from '@material-ui/core';

import useStyles from '../todoList/TodoListStyles';
import TodoEdit from '../todoList/todo/TodoEdit';
import Todo from '../todoList/todo/Todo';
import useLocalStorage from '../../hooks/useLocalStorage';

function TodoListPublic() {
  const classes = useStyles();
  const [val, handleValue] = useLocalStorage('todos');
  const todos = useSelector((state) => state.entities.todos);

  useEffect(() => {
    handleValue(todos);
  }, [todos, handleValue]);

  return (
    <div style={{ marginTop: '4rem' }}>
      {todos.length ? (
        todos.map((todo) =>
          todo.editing ? (
            <List key={todo.id} className={classes.root}>
              <TodoEdit todo={todo} />
            </List>
          ) : (
            todo.public && (
              <List key={todo.id} className={classes.root}>
                <Todo todo={todo} />
              </List>
            )
          )
        )
      ) : (
        <Typography>
          Currently empty, add a todo and make it public 🤯
        </Typography>
      )}
    </div>
  );
}

export default TodoListPublic;
