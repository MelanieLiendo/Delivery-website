import React, {useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import {URL} from '../../config'

function HomeCust({user}) {
  const [address,setAddress]= useState({address:''})

  useEffect(
    () => {
  const customerAddress = async () => {
    try {
      const response = await axios.post(`${URL}/customer/customer`, {email:user.userEmail});
      setAddress({address:response.data.message[0].address});
      console.log(response);}
    catch (error) {
      console.log(error);
    }
  };
  customerAddress()
},[]);

  return (
    <div>
      <h2>Delivering to {address.address}</h2>
      <input type="text" placeholder="Search.."/>
      <button type="submit"></button>
      <NavLink to='/customer/explorer'>Explore all our options</NavLink>
    </div>
  )
}

export default HomeCust