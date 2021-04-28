import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LeftNavBar from '../components/Navbars/LeftNavBar';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.slice(0, 10).map((user) => {
    return (
      <div key={user.id} className="users_li">
        <NavLink className="users_nav" to={`/users/${user.id}`}>
          <img className='user_image' src={user.image ? user.image : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"}></img>
          <br></br>
          <p>{user.username}</p>
        </NavLink>
      </div>
    );
  });

  return (
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div>
        <h1 className="all_users_h1">All Users: </h1>
        <div className="ten-servers">
            {userComponents}
          </div>
      </div>
    </div>
  );
}

export default UsersList;
