import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logout from './components/logout/Logout';
import NavBar from './components/nav-bar/NavBar';
import Login from './components/login/Login';
import Reservations from './components/reservations/Reservations';
import ProtectedRoute from './components/protected-route/ProtectedRoute';

const App = props => {
  const [user, setUser] = useState(null);

  return <BrowserRouter>
    <NavBar user={user} />
    <Switch>
      <Route exact path="/" render={() => <Login setUser={setUser} />} />
      <ProtectedRoute exact path="/reservations" user={user} render={() => <Reservations user={user} />} />
      <ProtectedRoute exact path="/logout" user={user} render={() => <Logout setUser={setUser} />} />
      <ProtectedRoute path="*" user={user} />
    </Switch>
  </BrowserRouter>
}
export default App;
