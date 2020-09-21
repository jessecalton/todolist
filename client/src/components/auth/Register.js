import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import Errors from './Errors';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({
    username: '',
    password: '',
    password2: '',
  });

  const { register, isAuthenticated, error, setErrors } = authContext;

  const { username, password, password2 } = user;

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
    if (username === '' || password === '' || password2 === '') {
      setErrors('Plz add a password');
    } else if (password !== password2) {
      setErrors("Passwords don't match");
    } else {
      register({ username, password });
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
          <Form.Text className='text-muted'>
            Passwords are stored in a .txt file
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password Confirmation'
            name='password2'
            value={password2}
            onChange={onChange}
          />
          <Form.Text className='text-muted'>Don't sign up</Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
