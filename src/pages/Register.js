import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import useRegisterStyles from './RegisterStyles';
import {
  clearStatusMessage,
  registerUser,
  selectCurrentUser,
} from '../store/auth/authSlice';
import Message from '../components/message/Message';
import useInputState from '../hooks/useInputState';
import { selectLoadingState } from '../store/loading/uiSlice';
import Loader from '../components/loader/Loader';

export default function Register() {
  const classes = useRegisterStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser());
  const loader = useSelector(selectLoadingState());
  const [value, handleValue, reset] = useInputState('');
  const error = currentUser.status.error;

  useEffect(() => {
    //when mounting component, if error exists (because we are switchin very fast from another page that showed an error) we clean that error, cuz we dont wanna show it here
    if (error) dispatch(clearStatusMessage());
  }, []);

  useEffect(() => {
    if (error) {
      reset();
    }
  }, [currentUser.status, loader.isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {loader.isLoading ? <Loader /> : <LockOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={error === 'User already exists'}
            value={value?.email || ''}
            onChange={handleValue}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {error && <Message type="error" message={error} />}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
