import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * @name Logout
 * @description clears seesion storage and redirects to login
 * @param {*} props setUser
 * @return component
 */
const Logout = ({ setUser }) => {
  setUser(null);
  sessionStorage.clear();
  return <Redirect to="/" />;
};

export default Logout;
