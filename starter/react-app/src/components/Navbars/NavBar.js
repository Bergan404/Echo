import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './navbars.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  console.log(user)

  return (
    <nav className='topnav'>
      {
        user ? " ":
        <>
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
        </>
      }
      {
        user ?
          <div className='topnavdiv'>
            <LogoutButton />
          </div>: " "
      }
    </nav>
  );
}

export default NavBar;
