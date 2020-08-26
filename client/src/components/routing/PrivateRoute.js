import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    authorized: false,
    loading: true,
  });
  const { authorized, loading } = isLoggedIn;
  const getAuthToken = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      setIsLoggedIn({ authorized: true, loading: false });
    } catch (error) {
      console.log(error);
      setIsLoggedIn({ authorized: false, loading: false });
    }
  };

  useEffect(() => {
    getAuthToken();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        !authorized && !loading ? (
          <Redirect to='/login' />
        ) : (
          // Else, render whatever the component is, and any extra props
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
