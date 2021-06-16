import React from 'react';
import { useDispatch } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Divider, ListItem, Tooltip } from '@material-ui/core';

import {
  toggleComplete,
  toggleEdit,
  deleteTodo,
} from '../../../store/todos/todosSlice';
import SimpleModal from '../../modal/SimpleModal';

function Todo(props) {
  const dispatch = useDispatch();
  const { todo } = props;

  return (
    <>
      <ListItem
        role={undefined}
        dense
        button
        onClick={() => dispatch(toggleComplete(todo.id))}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': 1 }}
          />
        </ListItemIcon>
        <ListItemText primary={todo.description} secondary={todo.author} />
        <ListItemSecondaryAction>
          {todo.public ? (
            <SimpleModal btnType={'public'} id={todo.id} todo={todo} />
          ) : (
            <SimpleModal btnType={'private'} id={todo.id} todo={todo} />
          )}

          <Tooltip title="Edit">
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => dispatch(toggleEdit(todo.id))}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider light variant="middle" />
    </>
  );
}

export default Todo;
