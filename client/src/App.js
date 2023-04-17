import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar.js";
import { URL } from "./config";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  useEffect(
    () => {
      const verify_tokenCustomer = async () => {
        try {
          if (!token) {
            setIsLoggedIn(false)}
          else {
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`${URL}/Customer/verify_token`);
          return response.data.ok ? login(token) : logout();
          }
        } catch (error) {
          console.log(error);
        }
      };
      const verify_tokenRestaurant = async () => {
        try {
          if (!token) {
            setIsLoggedIn(false)}
          else {
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`${URL}/Restaurant/verify_token`);
          return response.data.ok ? login(token) : logout();
          }
        } catch (error) {
          console.log(error);
        }
      };
      verify_tokenCustomer();
      verify_tokenRestaurant();
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
    path="/Customer/login"
    element ={ isLoggedIn ? <Navigate to='/homeCustomer' /> : <Login login={login} /> } 
    />
    <Route
    path="/Customer/register"
    element ={ isLoggedIn ? <Navigate to='/homeCustomer' /> : <Register/> } 
    />
    <Route
    path="/Restaurant/login"
    element ={ isLoggedIn ? <Navigate to='/homeRestaurant' /> : <Login login={login} /> } 
    />
    <Route
    path="/Restaurant/register"
    element ={ isLoggedIn ? <Navigate to='/homeRestaurant' /> : <Register/> } 
    />
    </Routes>
    </Router>
  );
}

export default App;
