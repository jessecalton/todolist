import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  useEffect(() => {
    logout();
  });
  return <Redirect to='/' />;
};

export default Logout;
