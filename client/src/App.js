import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar.js";
import { URL } from "./config";
import Register from './containers/Register';
import * as jose from "jose"
import Home from './containers/Home';
import Login from './containers/Login';

function App() {

  const [userType, setUserType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  useEffect(
    () => {
      const verify_token = async () => {
        try {
          if (!token) {
            setIsLoggedIn(false)}
          else {
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`${URL}/verify_token`);
          let decodedToken = jose.decodeJwt(token)

          return response.data.ok ? login(token, decodedToken.userType) : logout();
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      verify_token();
    },
    [token]
    );

  const login = (token, userType) => {
    localStorage.setItem("token", JSON.stringify(token));
    setUserType(userType)
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
    <Navbar  isLoggedIn={isLoggedIn} userType = {userType} setUserType={setUserType}/>
    <Routes>
    <Route path="/" element={<Home isLoggedIn={isLoggedIn} userType = {userType} setUserType={setUserType}/>} />
    <Route
    path="/login"
    element ={ isLoggedIn ? <Navigate to='/' /> : <Login userType = {userType} login={login} /> } 
    />
    <Route
    path="/register"
    element ={ isLoggedIn ? <Navigate to='/' /> : <Register userType = {userType}/> } 
    />
    </Routes>
    </Router>
  );
}

export default App;
