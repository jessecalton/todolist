import React, { Fragment, useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import AuthContext from '../context/auth/authContext';

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;
  const onLogout = () => {
    logout();
    // TODO (not a pun): Clear Todos
  };
  const guestLinks = (
    <Fragment>
      <Nav.Link href='/login' eventKey='login'>
        Login
      </Nav.Link>

      <Nav.Link href='/register' eventKey='register'>
        Register
      </Nav.Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Nav.Item>'sup {user && user.username}</Nav.Item>
      <Nav.Link as='a' eventKey='logout' href='#!' onSelect={onLogout}>
        Logout
      </Nav.Link>
    </Fragment>
  );
  return (
    <div>
      <Navbar bg='light' variant='light' className='justify-content-end'>
        <Navbar.Brand className='mr-auto'>Ye Olde Todo List</Navbar.Brand>
        {isAuthenticated ? authLinks : guestLinks}
      </Navbar>
    </div>
  );
};

export default NavBar;
