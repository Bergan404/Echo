import React, { useState } from 'react';
import Modal from "react-modal";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
    backgroundColor: "white",
    border: "none",
  },
};

Modal.setAppElement("#root");

const NavBar = ({ authenticated, setAuthenticated }) => {
  const user = useSelector(state => state.session.user)
  console.log(user)

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
      <div className="navbarContainer">
        {
          user ? " ":
          <>
            {/* <div className='topnavdiv'>
              <NavLink to="/login" exact={true} activeClassName="active">
                    Login
              </NavLink>
            </div>
            <div className='topnavdiv'>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                    Sign Up
              </NavLink>
            </div> */}
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
            <div className='topnavdiv'>
              <LogoutButton />
            </div>: " "
        }
      </div>
    </nav>
  );
}

export default NavBar;
