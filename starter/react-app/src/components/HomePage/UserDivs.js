import React, { useState, useEffect } from 'react';
import User from '../User'
import Modal from "react-modal";

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

export default function UserDivs({ user, authenticated, setAuthenticated }) {
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


  return (
    <div key={user.id} className="users_li">
      <button
        className="UserModalSubmit"
        onClick={openModalUsers}
      >
        <img className='user_image' src={user.image ? user.image : "https://yt3.ggpht.com/ytc/AAUvwniEUaBNWbH9Pk7A1cmIBdxnYt0YYrgNKx5h8grSMA=s900-c-k-c0x00ffffff-no-rj"}></img>
        <br></br>
        <p>{user.username}</p>
      </button>
      <Modal
        isOpen={modalIsOpenLogin}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModalUsers}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <User
          user={user}
          setIsOpenLogin={setIsOpenLogin}
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          closeModalLogin={closeModalUsers}
        />
      </Modal>
    </div>
  )
}
