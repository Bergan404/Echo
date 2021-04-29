import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftNavBar from '../components/Navbars/LeftNavBar';
import { findAllUsers } from '../store/all_users'
import { useSelector } from "react-redux";


function User({name}) {
  const allUsers = useSelector(state => state.users)

  console.log(allUsers, "-0-0-0-0-0-0-0-0-0-0-0-0--------")
  console.log(name)
  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong>
          <br></br>
          {name.id}
        </li>
        {/* <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li> */}
      </ul>
    </>
  );
}
export default User;
