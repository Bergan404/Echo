import React, { useState } from 'react';
import Modal from "react-modal";
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
// import LoginFormModal from '../Modals/index'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'

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
    backgroundColor: 'var(--darkgreen)',
    border: "none",
  },
};

Modal.setAppElement("#root");

const NavBar = ({ authenticated, setAuthenticated }) => {
  const user = useSelector(state => state.session.user)

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


  return (
    <nav className='topnav'>
      <div className='navbarLeft'>
        <h2>Creators</h2>
      </div>
      <div className='navbarCenter'>
        <h2>Echo</h2>
      </div>
      <div className="navbarContainer">
        {
          user ? " " :
            <>
              <div className='topnavdiv'>
                <button
                  className="LoginModalSubmit"
                  onClick={openModalLogin}
                >
                  Login
                </button>
              </div>
              <div>
                <Modal
                  isOpen={modalIsOpenLogin}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModalLogin}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <LoginForm
                    setIsOpenLogin={setIsOpenLogin}
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                    openModalSignUp={openModalSignUp}
                    closeModalLogin={closeModalLogin}
                  />
                </Modal>
              </div>
              <div className='topnavdiv'>
                <button
                  className="SignUpModalSubmit"
                  onClick={openModalSignUp}
                >
                  Sign Up
                </button>
              </div>
              <div>
                <Modal
                  isOpen={
                    authenticated === true
                      ? false
                      : modalIsOpenSignUp
                  }
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModalSignUp}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <SignUpForm
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                    closeModalSignUp={closeModalSignUp}
                    openModalLogin={openModalLogin}
                  />
                </Modal>
              </div>
            </>
        }
        {
          user ?
            <div className='topnavdiv_foruser'>
              <img src={user.image ? user.image : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"} className='profile_picture'></img>
              <LogoutButton />
            </div> : " "
        }
      </div>
    </nav>
  );
}

export default NavBar;
