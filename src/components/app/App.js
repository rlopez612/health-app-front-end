import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logout from '../logout/Logout';
import NavBar from '../nav-bar/NavBar';
import Login from '../login/Login';
import Reservations from '../reservations/Reservations';
import Reservation from '../reservation/Reservation';
import Rooms from '../rooms/Rooms';
import Room from '../room/Room';
import ProtectedRoute from '../protected-route/ProtectedRoute';

const App = props => {
  const [user, setUser] = useState(null);

  return <BrowserRouter>
    <NavBar user={user} />
    <Switch>
      <Route exact path="/" render={() => <Login setUser={setUser} />} />
      <ProtectedRoute exact path="/reservations" loggedIn={user} render={() => <Reservations user={user} />} />
      <ProtectedRoute exact path="/reservations/create" loggedIn={user} render={() => <Reservation user={user} />} />
      <ProtectedRoute exact path="/reservations/edit/:id" loggedIn={user} render={() => <Reservation user={user} />} />
      <ProtectedRoute exact path="/rooms" loggedIn={user} render={() => <Rooms user={user} />} />
      <ProtectedRoute exact path="/rooms/create" loggedIn={user} render={() => <Room user={user} />} />
      <ProtectedRoute exact path="/rooms/edit/:id" loggedIn={user} render={() => <Room user={user} />} />
      <ProtectedRoute exact path="/logout" loggedIn={user} render={() => <Logout setUser={setUser} />} />
      <ProtectedRoute path="*" user />
    </Switch>
  </BrowserRouter>
}
export default App;
