import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useLoginStyles from './LoginStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearStatusMessage,
  logUser,
  selectCurrentUser,
} from '../store/auth/authSlice';
import Message from '../components/message/Message';
import Loader from '../components/loader/Loader';
import { selectLoadingState } from '../store/loading/uiSlice';

export default function Login() {
  const classes = useLoginStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser());
  const loader = useSelector(selectLoadingState());
  const error = currentUser.status.error;

  useEffect(() => {
    //when mounting component, if error exists (because we are switchin very fast from another page that showed an error) we clean that error, cuz we dont wanna show it here
    if (error) dispatch(clearStatusMessage());
  }, []);

  useEffect(() => {
    if (currentUser.status.success) {
      history.push('/');
    }
  }, [currentUser.status, loader.isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    dispatch(logUser(user));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {loader.isLoading ? <Loader /> : <LockOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
            error={error === "This user doesn't exist"}
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
            error={error === 'Incorrect password'}
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
          <Grid container>
            <Grid item>
              <Link
                to="/register"
                variant="body2"
                style={{ textDecoration: 'none' }}
              >
                {"Don't have an account? Register 🤍"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
