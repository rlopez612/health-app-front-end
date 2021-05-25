import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * @name Logout
 * @description clears seesion storage and redirects to login
 * @param {*} props setUser
 * @return component
 */
const Logout = ({ setUser }) => {
  useEffect(() => {
    setUser(null);
  }, [setUser]);
  sessionStorage.clear();
  return <Redirect to="/" />;
};

export default Logout;
