import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LeftNavBar from '../components/Navbars/LeftNavBar';
import UserDivs from '../components/HomePage/UserDivs'

function UsersList() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("/api/users/");
  //     const responseData = await response.json();
  //     setUsers(responseData.users);
  //   }
  //   fetchData();
  // }, []);

  // const userComponents = users.map((user) => {
  //   return (
  //     <div key={user.id} className="users_li">
  //       <NavLink className="users_nav" to={`/users/${user.id}`}>
  //         <img className='user_image' src={user.image ? user.image : "../images/default-echo-photo1.png"}></img>
  //         <br></br>
  //         <p>{user.username}</p>
  //       </NavLink>
  //     </div>
  //   );
  // });
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
