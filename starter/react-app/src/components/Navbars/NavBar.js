import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './navbars.css';

const NavBar = () => {
  return (
    <nav className='topnav'>
      <div className='topnavdiv'>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </div>
      <div className='topnavdiv'>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </div>
      <div className='topnavdiv'>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
