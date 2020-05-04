import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../form/Form';
import Input from '../input/Input';

const managerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZW1haWxAZW1haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.GHygfygr8SVvlnI055DfBR7qedDrwxkL3yKfPMat5uM';
const employeeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZW1haWxAZW1haWwuY29tIiwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNTE2MjM5MDIyfQ.04VMt3lfTAMSwfS1vGPuh_93dV-rpntVNQOOtBgzf3M';

const Login = (props) => {
  const history = useHistory();
  const { setUser } = props;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('call API');

    sessionStorage.setItem('token', managerToken);
    const user = JSON.parse(atob(managerToken.split('.')[1]));
    setUser({ email: user.user, role: user.role });
    history.push('/reservations');
  };

  return (
    <Form title="Login" action="Login" onSubmit={handleFormSubmit}>
      <Input type="email" label="Email" />
      <Input type="password" label="Password" />
    </Form>
  );
};

export default Login;
