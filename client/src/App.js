import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar.js";
import { URL } from "./config";
import RegisterCust from './containers/RegisterCust';
import ResgisterRest from './containers/ResgisterRest';

function App() {

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
          return response.data.ok ? login(token) : logout();
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      verify_token();
    },
    [token]
    );

  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
    <Navbar  isLoggedIn={isLoggedIn}/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/homeCustomer" element={<HomeCustomer/>} />
    <Route path="/homeRestaurant" element={<HomeRestaurant/>} />
    <Route
    path="/customer/login"
    element ={ isLoggedIn ? <Navigate to='/homeCustomer' /> : <LoginCust login={login} /> } 
    />
    <Route
    path="/customer/register"
    element ={ isLoggedIn ? <Navigate to='/homeCustomer' /> : <RegisterCust/> } 
    />
    <Route
    path="/restaurant/login"
    element ={ isLoggedIn ? <Navigate to='/homeRestaurant' /> : <LoginRest login={login} /> } 
    />
    <Route
    path="/restaurant/register"
    element ={ isLoggedIn ? <Navigate to='/homeRestaurant' /> : <RegisterRest/> } 
    />
    </Routes>
    </Router>
  );
}

export default App;
