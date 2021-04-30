import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LeftNavBar from '../components/Navbars/LeftNavBar';
import UserDivs from '../components/HomePage/UserDivs'

function UsersList() {
  const allUsers = useSelector(state => state.users)

  return (
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div>
        <h1 className="all_users_h1">All Users: </h1>
        <div className="">
          {
            allUsers?.length && allUsers.map((user) => (
              <>
                <UserDivs user={user} />
              </>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default UsersList;
