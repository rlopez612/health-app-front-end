import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  const { setUser } = props;
  setUser(null);
  sessionStorage.clear();
  return <Redirect to="/" />;
};

export default Logout;
