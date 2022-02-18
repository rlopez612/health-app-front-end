import React, { useState } from 'react';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';
import NavBar from '../nav-bar/NavBar';
import Login from '../login/Login';
import Reservations from '../reservations/Reservations';
import Reservation from '../reservation/Reservation';
import RoomTypes from '../room-types/RoomTypes';
import RoomType from '../room-type/RoomType';
import NotFound from '../not-found/NotFound';
import Patients from '../patients/Patients';
import Patient from '../patients/patient/PatientForm';
import PatientDetails from '../patientDetails/PatientDetails';

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
          path="/patients"
          loggedIn={user}
          render={() => <Patients />}
        />
        <Route
          exact
          path="/reservations/create"
          loggedIn={user}
          render={() => <Reservation user={user} />}
        />
        <Route
          exact
          path="/patients/create"
          render={() => <Patient />}
        />
        <Route
          exact
          path="/patients/edit/:id"
          loggedIn={user}
          render={() => <Patient user={user} />}
        />
        <Route
          exact
          path="/room-types"
          loggedIn={user}
          render={() => <RoomTypes />}
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
          path="/patients/:id"
          loggedIn={user}
          render={() => <PatientDetails />}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
