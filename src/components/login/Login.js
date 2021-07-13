import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../form/Form';
import Input from '../input/Input';
import Spinner from '../spinner/Spinner';
import HttpHelper from '../../utils/HttpHelper';
import styles from './Login.module.css';

/**
 * @name Login
 * @description  contains login form and redirect
 * @param {*} props setUser
 * @return component
 */

const Login = ({ setUser }) => {
  const history = useHistory();
  // form inputs state
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  // invalid login credentials state
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  // loading state for showing spinner
  const [loading, setLoading] = useState(false);

  /**
   * @name handleChange
   * @description updates input state on change and resets credentials errors
   * @param {event} event change event
   * @param {string} input changed input
   */
  const handleChange = (event, input) => {
    // reset credential error when user reattempts
    if (invalidCredentials) {
      setInvalidCredentials(false);
    }
    setCredentials({ ...credentials, [input]: event.target.value });
  };

  /**
 * @name handleFormSubmit
 * @description submits credentials to api, redirects if successful, shows error otherwise
 * @param {event} event submit event
 */
  const handleFormSubmit = (event) => {
    // need to prevent default submit behavior of form
    event.preventDefault();
    // toggle spinner while api call in progress
    setLoading(true);

    // post to login on api
    HttpHelper('/login', 'POST', credentials)
      .then((response) => {
        // if status code is 2xx
        if (response.ok) {
          return response.json();
        }
        // otherwise throw error and move into catch block
        throw new Error('Invalid email or password');
      })
      .then((data) => {
        // set token in storage
        sessionStorage.setItem('token', data.token);
        // parse JWT for payload containing the user email and role
        const user = JSON.parse(atob(data.token.split('.')[1]));
        // save the user to session storage
        sessionStorage.setItem('user', JSON.stringify({ email: user.sub, role: user.roles }));
        // update user state in App component to show a valid user
        setUser({ email: user.sub, role: user.roles });
        // redirect to reservations page
        history.push('/reservations');
      })
      .catch(() => {
        setLoading(false);
        // show error message for fail
        setInvalidCredentials(true);
      });
  };

  return (
    <div className={styles.home}>
      <Form title="Login" action="Login" onSubmit={handleFormSubmit}>
        {invalidCredentials && <p>Invalid email or password</p>}

        <Input type="email" label="Email" onChange={(event) => handleChange(event, 'email')} />

        <Input type="password" label="Password" onChange={(event) => handleChange(event, 'password')} />
      </Form>
      {loading && <Spinner />}
    </div>
  );
};

export default Login;
