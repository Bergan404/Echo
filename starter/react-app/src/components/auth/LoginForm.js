import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";

import './forms.css'

const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
    // Redirect('/')
    history.push('/')
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login("bergan@aa.io","password"))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin} className='login_form'>
      <div className="Errors">
        {errors.map((error) => (
          <>
            <div>{error}</div>
            <br></br>
          </>
        ))}
      </div>
      <div className='login_div'>
        {/* <label htmlFor="email">Email</label> */}
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
          className='login_input'
        />
      </div>
      <div className='login_div'>
        {/* <label htmlFor="password">Password</label> */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
          className='login_input'
        />
      </div>
      <div className="login">
        <button className="login-button" type="submit">Login</button>
        <button className="login-demo" onClick={handleDemo} type="submit">Demo Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
