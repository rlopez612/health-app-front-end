import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logout from './components/logout/Logout';
import NavBar from './components/nav-bar/NavBar';

const App = props => {
  const [user, setUser] = useState({ token: null, role: null });

  useEffect(() =>
    setUser({
      token: sessionStorage.getItem('token'),
      role: sessionStorage.getItem('role')
    }), []
  );

  return <BrowserRouter>
    <NavBar loggedIn={user.token} role={user.role} />
    <Switch>
      <Route exact path="/">
      </Route>
      <Route exact path="/logout" component={Logout}>
      </Route>
      <Route path="*"></Route>
    </Switch>
  </BrowserRouter>
}
export default App;
