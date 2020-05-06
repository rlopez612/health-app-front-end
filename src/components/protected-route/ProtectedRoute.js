/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/**
 * @name ProtectedRoute
 * @description if user is logged in, show route, otherwise redirect to login
 * @param {*} props
 * @return
 */
const ProtectedRoute = (props) => {
  const { loggedIn } = props;

  // if user is present, show route
  if (loggedIn) {
    return <Route {...props} />;
  }
  // otherwise, redirect to login page
  return <Redirect to="/" />;
};

export default ProtectedRoute;
