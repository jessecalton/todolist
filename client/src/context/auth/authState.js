import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'), // saved in browser
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  // state allows us to access anything in our state
  // dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  // setting our token to a global header within Axios
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      // This endpoint tells us if we are indeed a registered user
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
      // `res.data` is the actual user data
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  // Making a POST request to our server
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      // don't need to prepend with "localhost:5000" since we set the `proxy` value in our `package.json`
      // If returns a 400, our dispatch method doesn't run.
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      // the response is going to be the token
      loadUser();
      clearErrors();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem('token', res.data.token);
      loadUser();
      clearErrors();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Set Errors
  const setErrors = (errorMessage) =>
    dispatch({ type: AUTH_ERROR, payload: errorMessage });

  return (
    // `state` comes from `useReducer`
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        setErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
