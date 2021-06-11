import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './NavBarStyles';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectCurrentUser } from '../../store/auth/authSlice';

export default function ButtonAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector(selectCurrentUser());

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ color: 'white' }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.title}>
            {auth.currentUser.name ? auth.currentUser.name : ''}
          </Typography>
          <Link to="/public" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Public Todos</Button>
          </Link>
          <Link
            to={auth.currentUser.id ? '/' : '/login'}
            style={{ textDecoration: 'none', color: 'white' }}
            onClick={() => auth.currentUser.id && dispatch(logoutUser())}
          >
            <Button color="inherit">
              {auth.currentUser.id ? 'Logout' : 'Login'}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
