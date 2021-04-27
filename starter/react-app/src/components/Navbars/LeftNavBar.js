import React from 'react';
import { NavLink } from 'react-router-dom';

import './navbars.css';

const LeftNavBar = () => {
  return (
    <nav className='leftnav'>
      <div className='leftnavdiv'>
        <NavLink to="/" exact={true} activeClassName="active">
          <img className='echo_logo' src='../images/echo_logo.png'></img>
        </NavLink>
      </div>
      <div className='leftnavdiv'>
        <NavLink to="/users" exact={true} activeClassName="active">
          Servers
          {/* Currently brings to all users but we can fix that */}
        </NavLink>
      </div>
    </nav>
  );
}

export default LeftNavBar;
