import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import Errors from './Errors';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, error, isAuthenticated, setErrors } = authContext;
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { username, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setErrors('Invalid username or password');
    } else {
      login({ username, password });
    }
  };

  return (
    <div className='formWidth'>
      <Errors errors={error} />
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
