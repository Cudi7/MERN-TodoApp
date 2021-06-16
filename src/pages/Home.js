import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import NavBar from '../components/navBar/NavBar';
import TodoForm from '../components/todoForm/TodoForm';
import TodoList from '../components/todoList/TodoList';
import TodoListPublic from '../components/todoListPublic/TodoListPublic';
import Login from './Login';
import Register from './Register';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/auth/authSlice';

function Home() {
  const currentUser = useSelector(selectCurrentUser());

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <NavBar />
          <CssBaseline />
          <Container fixed>
            <TodoForm />
            <TodoList />
          </Container>
        </Route>

        <Route exact path="/login">
          {currentUser.status.success ? (
            <Redirect to="/" />
          ) : (
            <>
              {' '}
              <NavBar />
              <Login />
            </>
          )}
        </Route>
        <Route exact path="/register">
          {currentUser.status.success ? (
            <Redirect to="/" />
          ) : (
            <>
              {' '}
              <NavBar />
              <Register />
            </>
          )}
        </Route>

        <Route exact path="/public">
          <NavBar />
          <CssBaseline />
          <Container fixed>
            <TodoListPublic />
          </Container>
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Home;
