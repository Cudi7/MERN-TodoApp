import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import List from '@material-ui/core/List';

import useStyles from './TodoListStyles';
import Todo from './todo/Todo';
import TodoEdit from './todo/TodoEdit';
import useLocalStorage from '../../hooks/useLocalStorage';
import empty from '../../images/empty.jpg';

function TodoList() {
  const classes = useStyles();
  const [val, handleValue] = useLocalStorage('todos');
  const todos = useSelector((state) => state.entities.todos);

  useEffect(() => {
    handleValue(todos);
  }, [todos, handleValue]);

  return (
    <List className={classes.root}>
      {todos.length ? (
        todos.map((todo) =>
          todo.editing ? (
            <TodoEdit key={todo.id} todo={todo} />
          ) : (
            <Todo key={todo.id} todo={todo} />
          )
        )
      ) : (
        <div>
          {' '}
          <img src={empty} alt="empty" style={{ width: '100%' }} />
        </div>
      )}
    </List>
  );
}

export default TodoList;
