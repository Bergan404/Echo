import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftNavBar from '../components/Navbars/LeftNavBar';
import { findAllUsers } from '../store/all_users'
import { useSelector } from "react-redux";

import './index.css'


function Profile({ user }) {
  const allUsers = useSelector(state => state.users)

  return (
    <div className="profile">
        <div className="profile_input">
            <strong>Username:</strong>
            <br></br>
            {user.username}
        </div>
        <div className="profile_input">
            <strong>User Id:</strong>
            <br></br>
            #{user.id}
        </div>
        <div className="profile_input">
            <strong>Email:</strong>
            <br></br>
            {user.email}
        </div>
        <button className="profile_delete">Delete Account</button>
    </div>
  );
}
export default Profile;
