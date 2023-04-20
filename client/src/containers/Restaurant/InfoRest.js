import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'
import ChangePass from './ChangePass'
import EditRest from './EditRest'; 

function InfoRest({user}) {
  const [data,setData]= useState({
    country:"", 
    city: "", 
    address: "", 
    restaurant: "", 
    name:"", 
    surname:"",
    phone:"", 
    email:"", 
    password:"",
    filter:""})

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () =>{
    setIsOpen(true);
  }


  const closeModal=() => {
    setIsOpen(false);
  }

  useEffect(
    () => {
  const restaurantInfo = async () => {
    try {
      const response = await axios.post(`${URL}/restaurant/restaurant`, {email:user.userEmail});
      setData({country:response.data.message.country, 
        city:response.data.message.city, 
        address:response.data.message.address, 
        restaurant:response.data.message.restaurant, 
        name:response.data.message.name, 
        surname:response.data.message.surname,
        phone:response.data.message.phone, 
        email:response.data.message.email, 
        filter:response.data.message.filter})

      console.log(response);
      }
    catch (error) {
      console.log(error);
    }
  };
  restaurantInfo()
},[]);

  return (
    <div>
      <button onClick={openModal}>Restaurant's Information</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        
        contentLabel="Example Modal"
      >
    <button onClick={closeModal}>Close</button>
    <h3>Country: {data.country} </h3>
    <h3>City:{data.city}</h3>
    <h3>Address: {data.address}</h3>
    <h3>Restaurant's Name:{data.restaurant}</h3>
    <h3>Name:{data.name}</h3>
    <h3>Surname:{data.surname}</h3>
    <h3>Phone:{data.phone}</h3>
    <h3>Email:{data.email}</h3>
    <h3>Filter:{data.filter}</h3>
    <ChangePass user={user}/>
    <EditRest user={user}/>
      </Modal>
    </div>
  );
}

export default InfoRest