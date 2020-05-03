import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = props => {
  const { loggedIn } = props;
  if (loggedIn) {
    return <Route {...props} />
  }
  return <Redirect to="/" />;
}

export default ProtectedRoute;