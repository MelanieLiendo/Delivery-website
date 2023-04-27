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
import Restaurant from './containers/Customers/Restaurant';
import Checkout from './containers/Customers/Checkout';
import Stripe from "./components/stripe";
import PaymentSuccess from "./containers/Customers/payment_success";
import PaymentError from "./containers/Customers/payment_error";



function App() {

  const [user, setUser] = useState(null);
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
    let decodedToken = jose.decodeJwt(token)
    setUser(decodedToken)
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
    <Navbar  isLoggedIn={isLoggedIn} logout={logout} user= {user}/>
    <Routes>
    <Route path="/" element={<Home isLoggedIn={isLoggedIn} logout={logout} user={user}/>} />
    <Route
    path="/login/:type"
    element ={ isLoggedIn ? <Navigate to='/' /> : <Login  login={login} /> } 
    />
    <Route
    path="/register/:type"
    element ={ isLoggedIn ? <Navigate to='/' /> : <Register/> } 
    /> 
    <Route path="/restaurant/:id" element={<Restaurant/>} />
    <Route path="/checkout" element={<Stripe user={user}/>} />
    <Route path="/payment/success" element={<PaymentSuccess user={user}/>}/>
    <Route path="/payment/error" element={<PaymentError />}/>

    </Routes>
    </Router>
  );
}

export default App;
