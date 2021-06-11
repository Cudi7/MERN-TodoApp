import React, { useEffect } from 'react';
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
  logUser,
  removeUserAuthStatus,
  selectCurrentUser,
} from '../store/auth/authSlice';
import ErrorMessage from '../components/error/ErrorMessage';

export default function Login() {
  const classes = useLoginStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser());

  useEffect(() => {
    if (currentUser.status.error) {
      setTimeout(() => {
        dispatch(removeUserAuthStatus());
      }, 4000);
    }
    if (currentUser.status.success) history.push('/');
  }, [currentUser.status]);

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
          <LockOutlinedIcon />
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
            error={currentUser.status.error === "This user doesn't exist"}
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
            error={currentUser.status.error === 'Incorrect password'}
          />

          {currentUser.status.error && (
            <ErrorMessage type="error" message={currentUser.status.error} />
          )}

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
