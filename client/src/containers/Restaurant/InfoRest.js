import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'
import ChangePass from './ChangePass'

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

  const [changeDetails, setChangeDetails]=useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [openClose, setOpenClose]= useState('')

  const openModal = () =>{
    setIsOpen(true);
    setOpenClose("open")
  }

  const closeModal=() => {
    setIsOpen(false);
    setOpenClose("close")
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

    const changeButton = ()=>{
      setChangeDetails(!changeDetails)
    }

    const handleChange=(e)=>{
      setData({...data,[e.target.name]:e.target.value})}

    const handleSubmit= async(e)=>{
      e.preventDefault()
      try {
        const response = await axios.post(`${URL}/restaurant/update`,{
          newCountry:data.country, 
          newCity:data.city, 
          newAddress:data.address, 
          newRestaurant:data.restaurant, 
          newName:data.name, 
          newSurname:data.surname,
          newPhone:data.phone, 
          email:data.email, 
          newFilter:data.filter})
          
        setMessage(response.data.message)
        }
      catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
       setMessage('');
       },[openClose])

  return (
    <div>
      <button onClick={openModal}>Restaurant's Information</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal">

    <button onClick={closeModal}>Close</button>

    <form onChange={handleChange} onSubmit={handleSubmit}>
    <label>Country:</label> <input name="country" value={data.country} disabled={!changeDetails}/> 
    <label>City:</label> <input name="city" defaultValue={data.city} disabled={!changeDetails}/> 
    <label>Address:</label> <input name="address" defaultValue={data.address} disabled={!changeDetails}/>
    <label>Restaurant's name:</label> <input name="restaurant" defaultValue= {data.restaurant} disabled={!changeDetails}/>
    <label>Name:</label> <input name="name" defaultValue= {data.name} disabled={!changeDetails}/>
    <label>Surname:</label> <input name="surname" defaultValue= {data.surname} disabled={!changeDetails}/>
    <label>Phone:</label><input name="phone" defaultValue= {data.phone} disabled={!changeDetails}/>
    <label>Email:{data.email}</label> 
    <label>Filter:</label><input name="filter"defaultValue = {data.filter} disabled={!changeDetails}/>
    <button name={changeDetails? "Save Changes":"Edit"} onClick={changeButton} >{changeDetails?"Save Changes": "Edit"}</button>
    {!changeDetails && <h3>{message}</h3>}
    </form>
    <ChangePass user={user}/>

      </Modal>
    </div>
  );
}

export default InfoRest