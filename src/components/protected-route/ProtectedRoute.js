import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = props => {
  const { user } = props;
  if (user) {
    return <Route {...props} />
  }
  return <Redirect to="/" />;
}

export default ProtectedRoute;