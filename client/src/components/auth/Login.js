import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { username, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/auth', { username, password }, config);
    console.log(res.data);
    setAuthToken(res.data.token);
  };

  const onSubmit = async (e, user) => {
    e.preventDefault();
    if (username === '' || password === '') {
      console.log('Invalid username or password');
    }
    login();
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            name='username'
            value={username}
            onChange={onChange}
          />
          <Form.Text className='text-muted'>
            We will sell your data to Facebook.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
