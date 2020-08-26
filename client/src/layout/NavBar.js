import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='NavBar'>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
