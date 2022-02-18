// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';
import NavBar from '../nav-bar/NavBar';
import NotFound from '../not-found/NotFound';
import PatientsPage from '../patients/PatientsPage';
import PatientDetails from '../patientDetails/PatientDetails';
import EncounterForm from '../patients/patient/EncounterForm';
import PatientForm from '../patients/patient/PatientForm';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <NavBar />

    <Switch>
      <Route
        exact
        path="/"
        render={() => <PatientsPage />}
      />
      <Route
        exact
        path="/patients/create"
        render={() => <PatientForm />}
      />
      <Route
        exact
        path="/patients/edit/:id"
        render={() => <PatientForm />}
      />
      <Route
        exact
        path="/patients/:patientId/encounters"
        render={() => <EncounterForm />}
      />
      <Route
        exact
        path="/patients/:patientId/encounters/:encounterId"
        render={() => <EncounterForm />}
      />
      <Route
        exact
        path="/patients/:id"
        render={() => <PatientDetails />}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);
export default App;
