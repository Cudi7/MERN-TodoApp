import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider, ListItem, Tooltip } from '@material-ui/core';

import {
  deleteTodo,
  displayPublicTodos,
  togglePublic,
} from '../../../store/todos/todosSlice';
import SimpleModal from '../../modal/SimpleModal';
import { selectCurrentUser } from '../../../store/auth/authSlice';

function TodoPublic(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser());
  const { todo } = props;

  const handleDelete = () => {
    dispatch(deleteTodo(todo));
  };

  return (
    <>
      <ListItem role={undefined} dense button>
        <ListItemText primary={todo.description} secondary={todo.name} />
        {currentUser.user.id && currentUser.user.id === todo.userId && (
          <ListItemSecondaryAction>
            {todo.public ? (
              <SimpleModal btnType={'public'} id={todo.id} todo={todo} />
            ) : (
              <SimpleModal btnType={'private'} id={todo.id} todo={todo} />
            )}

            <Tooltip title="Delete">
              <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Divider light variant="middle" />
    </>
  );
}

export default TodoPublic;
