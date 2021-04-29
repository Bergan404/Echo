import React, { useState, useEffect } from 'react';
import * as sessionActions from "../../store/session";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { findAllServers } from '../../store/servers'
import { findAllUsers } from '../../store/all_users'
import LeftNavBar from '../../components/Navbars/LeftNavBar';
import Modal from "react-modal";
import User from '../User'
import UserDivs from './UserDivs'
// import UsersList from '../UsersList'


import './homepage.css'

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.8)",
    zIndex: 5,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "var(--darkgreen)",
    border: "none",
  },
};

Modal.setAppElement("#root");

export default function Home({ authenticated, setAuthenticated }) {
  const dispatch = useDispatch();

  const servers = useSelector(state => state.servers)
  const allUsers = useSelector(state => state.users)
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);

  function openModalUsers() {
    setIsOpenLogin(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModalUsers() {
    setIsOpenLogin(false);
  }

  useEffect(async () => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    await dispatch(findAllServers())
    await dispatch(findAllUsers())
  }, [dispatch])

  return (
    <div className='outer_container'>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div className='users_servers'>
        <img className='banner' src='https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5'></img>
        <div className='users_container'>
          <h2 className='user_h2'><NavLink to="/users" exact={true} activeClassName="active" className='user_a'>
            Users
            {/* Currently brings to all users but we can fix that */}
          </NavLink></h2>
          <div className="ten-servers">
            {
              allUsers?.length && allUsers.slice(0, 10).map((user) => (
                <>
                  <UserDivs user={user} />
                </>
              ))
            }
          </div>
        </div>

        <div className='server_container'>
          <h2 className='server_h2'><NavLink to="/servers" exact={true} activeClassName="active" className='user_a'>
            Servers
          </NavLink></h2>
          <div className="ten-servers">
            {
              servers?.length && servers.slice(0, 10).map((server) => (
                <div className="servers_li">
                  <NavLink to={`/server/${server.id}`} className="servers_nav">
                    <img className='server_image' src={server.image ? server.image : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"}></img>
                    <br></br>
                    <p>{server.name}</p>
                  </NavLink>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
