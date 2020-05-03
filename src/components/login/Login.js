import React from 'react';
import Form from '../form/Form';
import Input from '../input/Input';
import { useHistory } from 'react-router-dom';

const Login = props => {
  const history = useHistory();
  const { setUser } = props;

  const handleFormSubmit = event => {
    event.preventDefault();
    console.log('call API');
    sessionStorage.setItem('token', 'token here');
    setUser({ user: 'email@email', role: 'manager' });
    history.push('/reservations');
  }

  return <Form title="Login" onSubmit={handleFormSubmit}>
    <Input type="email" label="Email" />
    <Input type="password" label="Password" />
  </Form>
}

export default Login;