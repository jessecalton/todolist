import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;
  const onLogout = () => {
    logout();
    // Clear Todos
  };
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>'sup {user && user.username}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          Logout
        </a>
      </li>
    </Fragment>
  );
  return (
    <div className='NavBar'>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default NavBar;
