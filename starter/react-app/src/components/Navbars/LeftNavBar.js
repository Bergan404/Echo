import React, { useState } from 'react';
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
    backgroundColor: "white",
    border: "none",
  },
};

Modal.setAppElement("#root");

const LeftNavBar = ({ authenticated, setAuthenticated }) => {
  const user = useSelector(state => state.session.user)
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


  return (
    <nav className='leftnav'>
      <div className='leftnavdivlogo'>
        <NavLink to="/" exact={true} activeClassName="active">
          <img className='echo_logo' src='../images/echo_logo.png' alt='logo'></img>
        </NavLink>
      </div>

      <div className='leftnavdiv'>
        {/* <NavLink to="/users" exact={true} activeClassName="active">
          <i class="fas fa-plus-circle"></i>
        </NavLink> */}
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
          </>: " "
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
