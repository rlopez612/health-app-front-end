import React, { useState } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch
} from 'react-router-dom';
import Logout from '../logout/Logout';
import NavBar from '../nav-bar/NavBar';
import Login from '../login/Login';
import Reservations from '../reservations/Reservations';
import Reservation from '../reservation/Reservation';
import RoomTypes from '../room-types/RoomTypes';
import RoomType from '../room-type/RoomType';
import NotFound from '../not-found/NotFound';

/**
 * @name App
 * @returns component
 */
const App = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  return (
    <BrowserRouter>
      <NavBar user={user} />

      <Switch>
        <Route exact path="/" render={() => <Login setUser={setUser} />} />
        <Route
          exact
          path="/reservations"
          loggedIn={user}
          render={() => <Reservations />}
        />
        <Route
          exact
          path="/reservations/create"
          loggedIn={user}
          render={() => <Reservation user={user} />}
        />
        <Route
          exact
          path="/reservations/edit/:id"
          loggedIn={user}
          render={() => <Reservation user={user} />}
        />
        <Route
          exact
          path="/room-types"
          loggedIn={user}
          render={() => (
            user.role === 'manager' ? <RoomTypes /> : <Redirect to="/reservations" />
          )}
        />
        <Route
          exact
          path="/room-types/create"
          loggedIn={user}
          render={() => <RoomType user={user} />}
        />
        <Route
          exact
          path="/room-types/edit/:id"
          loggedIn={user}
          render={() => <RoomType user={user} />}
        />
        <Route
          exact
          path="/logout"
          loggedIn={user}
          render={() => <Logout setUser={setUser} />}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
