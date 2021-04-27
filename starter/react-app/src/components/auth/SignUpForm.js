import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import './forms.css'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("")
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password, image));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateImage = (e) => {
    setImage(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className='signup_form'>
      <div className='signup_div'>
        {/* <label>User Name</label> */}
        <input
          type="text"
          name="username"
          placeholder="User Name"
          onChange={updateUsername}
          value={username}
          className='singup_input'
        ></input>
      </div>
      <div className='signup_div'>
        {/* <label>Email</label> */}
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
          className='singup_input'
        ></input>
      </div>
      <div className='signup_div'>
        {/* <label>Image</label> */}
        <input
          type="text"
          name="image"
          placeholder="Image"
          onChange={updateImage}
          value={image}
          className='singup_input'
        ></input>
      </div>
      <div className='signup_div'>
        {/* <label>Password</label> */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updatePassword}
          value={password}
          className='singup_input'
        ></input>
      </div>
      <div className='signup_div'>
        {/* <label>Repeat Password</label> */}
        <input
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          className='singup_input'
        ></input>
      </div>
      <div className='signin'>
        <button className="signup-button" type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
