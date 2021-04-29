import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbars/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import Home from './components/HomePage/index'
import Server from './components/Server'
import ServerList from './components/ServerList'
import PrivateMessages from './components/PrivateMessages'
import Creators from './components/Navbars/Creators'


function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/creators" exact={true}>
          <Creators />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path='/servers' exact={true}>
          <ServerList />
        </Route>
        <Route path="/server/:serverId" exact={true}>
          <Server />
        </Route>
        <Route path='/privatemessages' exact={true}>
          <PrivateMessages />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
