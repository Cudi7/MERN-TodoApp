import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import BlockIcon from '@material-ui/icons/Block';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { Box, Button, IconButton, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { togglePublic } from '../../store/todos/todosSlice';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.5)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SimpleModal({ btnType, id }) {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState({ type: '', isOpen: false });
  const [btnAction, setBtnAction] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const todoType = open.type === 'public' ? 'public' : 'private';
  const todoChange = open.type === 'public' ? 'private' : 'public';

  const handleOpen = (type) => setOpen({ type, isOpen: true });
  const handleClose = () => setOpen({ ...open, isOpen: false });

  const handleBtnAction = () => {
    setBtnAction(true);
    handleClose();
  };

  useEffect(() => {
    btnAction && dispatch(togglePublic(id));
    setBtnAction(false);
  }, [btnAction, id, dispatch]);

  const body = (
    <>
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Hi🖐🏽 I'm a {todoType} todo.</h2>
        <p id="simple-modal-description">
          Do you wish to change it to {todoChange}?
        </p>
        <Box style={{ marginTop: '1rem' }}>
          <Button
            variant="contained"
            style={{ marginRight: '1rem' }}
            onClick={handleClose}
          >
            Never Mind
          </Button>
          <Button variant="contained" color="primary" onClick={handleBtnAction}>
            Sure I do!
          </Button>
        </Box>
      </div>
    </>
  );

  return (
    <>
      {btnType === 'public' ? (
        <Tooltip title="Public">
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => handleOpen('public')}
          >
            <EmojiPeopleIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Private">
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => handleOpen('private')}
          >
            <BlockIcon />
          </IconButton>
        </Tooltip>
      )}
      <Modal
        open={open.isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

export default SimpleModal;
