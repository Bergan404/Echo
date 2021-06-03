import React, { useState, useEffect } from 'react';
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { findAllServers } from '../../store/servers'
import { findAllUsers } from '../../store/all_users'
import LeftNavBar from '../../components/Navbars/LeftNavBar';
import UserDivs from './UserDivs'
// import UsersList from '../UsersList'
import header from '../Echo-header.png'
import defaultImage from '../default-echo-photo1.png'
import Modal from "react-modal";
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'

import './homepage.css'

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
    backgroundColor: 'var(--darkgreen)',
    border: "none",
  },
};

export default function Home() {
  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.servers)
  const allUsers = useSelector(state => state.users)
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
  const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
  function openModalLogin() {
    setIsOpenLogin(true);
  }

  function openModalSignUp() {
    setIsOpenSignUp(true);
  }



  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModalLogin() {
    setIsOpenLogin(false);
  }

  function closeModalSignUp() {
    setIsOpenSignUp(false);
  }


  useEffect(async () => {
    await dispatch(findAllServers())
    await dispatch(findAllUsers())
  }, [dispatch])

  let clickHandler = (e) => {
    if (user) {
      history.push(`/server/${e.target.id}`)
    } else {
      openModalLogin()
    }
  }

  return (
    <div className='outer_container'>
      <Modal
                  isOpen={modalIsOpenLogin}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModalLogin}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <LoginForm
                    setIsOpenLogin={setIsOpenLogin}
                    // authenticated={authenticated}
                    // setAuthenticated={setAuthenticated}
                    openModalSignUp={openModalSignUp}
                    closeModalLogin={closeModalLogin}
                  />
      </Modal>
      <Modal
                  isOpen={
                    // authenticated === true
                    //   ? false :
                       modalIsOpenSignUp
                  }
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModalSignUp}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <SignUpForm
                    // authenticated={authenticated}
                    // setAuthenticated={setAuthenticated}
                    closeModalSignUp={closeModalSignUp}
                    openModalLogin={openModalLogin}
                  />
                </Modal>
      <div className='left'>
        <LeftNavBar />
      </div>
      <div className='users_servers'>
        <img className='banner' src={header}></img>
        <div className='users_container'>
          <h2 className='user_h2'><NavLink to="/users" exact={true} activeClassName="active" className='user_a'>
            Users
            {/* Currently brings to all users but we can fix that */}
          </NavLink></h2>
          <div className="ten-servers">
            {
              allUsers?.length && allUsers.slice(0, 10).map((user) => (
                <div key={user.id}>
                  <UserDivs user={user}  />
                </div>
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
                <div onClick={clickHandler} id={server.id} key={server.id} className="servers_li">
                  <NavLink to={`/server/${server.id}`} className="servers_nav">
                    <img className='server_image' src={server.image ? server.image : {defaultImage}} alt="server_image"></img>
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
