import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from "react-modal";
import ServerForm from '../auth/ServerForm'

import './navbars.css';

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
    backgroundColor: "var(--darkgreen)",
    border: "none",
  },
};

Modal.setAppElement("#root");

const LeftNavBar = ({ authenticated, setAuthenticated }) => {
  const user = useSelector(state => state.session.user)
  const user_servers = useSelector(state => state.servers)
  console.log(user_servers)
  const [modalIsOpenLogin, setIsOpenLogin] = useState(false);

  function openModalServer() {
    setIsOpenLogin(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModalServer() {
    setIsOpenLogin(false);
  }


  function usersServers(){
    const ourServer = [];
    const values = Object.values(user_servers);
    for (let obj in values) {
      if (user !==null && values[obj].admin_id == user.id) {
        ourServer.push(values[obj])

      }
      console.log(ourServer);
      return ourServer;


    }
    newArray = usersServers();
    console.log(newArray[0]);
  }


  return (
    <nav className='leftnav'>
      <div className='leftnavdivlogo'>
          <NavLink to='/privatemessages'>
            <img className='echo_logo' src='../images/echo_logo.png' alt='logo'></img>
            <span>Private Messages</span>
          </NavLink>
      </div>
      <div className='leftnavdivlogo'>
        <NavLink to="/" exact={true} activeClassName="active">
          <img className='echo_logo' src='../images/echo_logo.png' alt='logo'></img>
        </NavLink>
      </div>

      <div className='leftnavdiv'>
        {
          user ?

            <>
              <div className='topnavdiv'>
                <button
                  className="ServerModalSubmit"
                  onClick={openModalServer}
                >
                  <i class="fas fa-plus-circle"></i>
                </button>
              </div>
              {
                newArray?.map((server) => (
                  <div className="servers_li">
                    <NavLink to={`/server/${server.id}`} className="servers_nav">
                      <img className='server_image' src={server.image ? server.image : 'https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj'}></img>
                      <br></br>
                      {server.name}
                    </NavLink>
                  </div>
                ))
              }
              <div>
                <Modal
                  isOpen={modalIsOpenLogin}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModalServer}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <ServerForm

                    setIsOpenLogin={setIsOpenLogin}
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                    closeModalLogin={closeModalServer}
                  />
                </Modal>
              </div>
            </> : " "
        }
      </div>

      <div className='leftnavdiv'>
        <NavLink to="/users" exact={true} activeClassName="active">
          <i class="far fa-compass"></i>
          {/* Currently brings to all users but we can fix that */}
        </NavLink>
      </div>
    </nav>
  );
}

export default LeftNavBar;
