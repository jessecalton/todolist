import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const Login = (props) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [loginError, setLoginError] = useState({ error: null });
  const [loginStatus, setLoginStatus] = useState({ authenticated: false });

  const { username, password } = user;
  const { error } = loginError;
  const { authenticated } = loginStatus;

  useEffect(() => {
    if (authenticated) {
      props.history.push('/');
    }

    if (error) {
      alert('That is not a user');
      setLoginError({ ...loginError, error: null });
    }
  }, [error, authenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', { username, password }, config);
      console.log(res.data);
      setAuthToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setLoginStatus({ ...loginStatus, authenticated: true });
    } catch (error) {
      setLoginError({ ...loginError, error: error });
    }
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
            NGL, we're gonna sell your data to Facebook.
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
