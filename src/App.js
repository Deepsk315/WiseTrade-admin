import './assets/css/bootstrap.min.css';
import './assets/css/style.scss';

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { clearCurrentProfile } from './actions/profileActions';
import Users from './pages/Users';
import jwt from 'jsonwebtoken';


// if (localStorage.jwtToken) {
//   setAuthToken(localStorage.jwtToken);
//   const decoded = jwt_decode(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(decoded));
//
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     store.dispatch(logoutUser());
//     store.dispatch(clearCurrentProfile());
//     window.location.href = '/login';
//   }
// }

const token = window.localStorage.getItem('web3_japan_admin_token')
if (token) {
  setAuthToken(token)
}


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!token)

 //THIS USEEFFECT IS BEING USED TO CHECK USER LOKIN TOKEN , AND IF TOKEN IS MALFORMED OR DOESNT EXIST , IT WILL SET THE LOGOUT RELATES STATES AND CALL LOGOUT
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        const currentTime = Date.now() / 1000;
  
        // if (decodedToken.exp > currentTime) {
        //   console.log('token is still active');
        // }

         if(decodedToken.exp <= currentTime || decodedToken == null) {
          console.log('token has expired or malformed');
          onLogout();
          setAuthToken('');
          localStorage.removeItem('web3_japan_admin_token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        onLogout()
        setAuthToken('');
        localStorage.removeItem('web3_japan_admin_token');
      }
    }
  }, [token]);

  useEffect(() => {
    if (process) {
      console.log("no error")
    } else {
      console.log("first")
    }
  }, [])

  const onLogin = () => {
    setIsLoggedIn(true)
  }

  const onLogout = () => {
    setIsLoggedIn(false)
  }


  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Switch>
          <Route exact path="/login">
            <Login onLogin={onLogin} />
          </Route>
          <Redirect to="/login" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login">
            <Redirect to="/users" />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          <Layout onLogout={onLogout}>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/users" >
              <Users />
            </Route>
          </Layout>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;