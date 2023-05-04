import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'
import ChangePass from './ChangePass'
import { useNavigate } from 'react-router-dom';
import UploadImages from '../../components/Uploadimages';

function InfoRest({user, logout}) {
  const navigate = useNavigate()
  const [imageLinkRest, setImageLinkRest] =useState("")
  const [picReference, setPicReference] = useState("restaurant")
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
    filter:[],
  picture:""})

  const [changeDetails, setChangeDetails]=useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

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
        filter:response.data.message.filter,
        picture:response.data.message.picture
      })
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
          newFilter:data.filter,
        picture:data.picture
        })
        setMessage(response.data.message)
        changeButton()

        if (message == response.data.message) {
          setTimeout(() => {
            setMessage('');
          }, 4000);
           }

        }
      catch (error) {
        console.log(error);
      }
    }
   

    const handleClick = (e) =>{
      setData({...data,  filter:[...data.filter, e.target.value]})
    }   

    const deleteFilter = (filtro) =>{
      let index = data.filter.findIndex(ele => ele === filtro)
      let temporary = ({...data, ...data.filter.splice(index, 1)})
      setData(temporary)
    }

    const deleteAccount = async ()=>{
      try{
        const response = await axios.post(`${URL}/restaurant/remove`,{email:data.email})
        if (response.data.ok) {
          logout()
          setTimeout(() => {
            navigate('/');
            alert(response.data.message)
          }, 1000);
           }}
      catch(error){
        console.log(error);
      }
    }

  return (
    <div>
      <button onClick={openModal}>Restaurant's Information</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>

    <button onClick={closeModal}>Close</button>

    <form onChange={handleChange} onSubmit={handleSubmit}>
    <label>Country:</label> <input name="country" defaultValue={data.country} disabled={!changeDetails}/> 
    <label>City:</label> <input name="city" defaultValue={data.city} disabled={!changeDetails}/> 
    <label>Address:</label> <input name="address" defaultValue={data.address} disabled={!changeDetails}/>
    <label>Restaurant's name:</label> <input name="restaurant" defaultValue= {data.restaurant} disabled={!changeDetails}/>
    <label>Name:</label> <input name="name" defaultValue= {data.name} disabled={!changeDetails}/>
    <label>Surname:</label> <input name="surname" defaultValue= {data.surname} disabled={!changeDetails}/>
    <label>Phone:</label><input name="phone" defaultValue= {data.phone} disabled={!changeDetails}/>
    <label>Email:{data.email}</label> 
    <label>Filter:</label>
    <button onClick={handleClick} disabled={!changeDetails || data.filter.length >= 3 || data.filter.includes("Gluten Free")} value= "Gluten Free">Gluten Free</button>
    <button onClick={handleClick} disabled={!changeDetails || data.filter.length >= 3 || data.filter.includes("Pizza")}  value= "Pizza">Pizza</button>
    <button onClick={handleClick} disabled={!changeDetails || data.filter.length >= 3 || data.filter.includes("Sushi")}  value= "Sushi">Sushi</button>
    <button onClick={handleClick} disabled={!changeDetails || data.filter.length >= 3 || data.filter.includes("Vegetarian")}  value= "Vegetarian">Vegetarian</button>
    <button onClick={handleClick} disabled={!changeDetails || data.filter.length >= 3 || data.filter.includes("Vegan")}  value= "Vegan">Vegan</button>
    <button onClick={handleClick} disabled={!changeDetails || data.filter.length >= 3 || data.filter.includes("Healthy")}  value= "Healthy">Healthy</button>
    <button onClick={handleClick} disabled={!changeDetails || data.filter.length >= 3 || data.filter.includes("Fast Food")}  value= "Fast Food">Fast Food</button>
    <button onClick={handleClick} disabled={!changeDetails || data.filter.length >= 3 || data.filter.includes("Hamburger")}  value= "Hamburger">Hamburger</button>
    <button onClick={handleClick} disabled={!changeDetails || data.filter.length >= 3 || data.filter.includes("Breakfast")}  value= "Breakfast">Breakfast</button>
    <label>Picture:</label> <UploadImages user={user} setImageLinkRest={setImageLinkRest} changeDetails={changeDetails} picReference={picReference}/>  <button >{imageLink}X</button>
    {data.filter.map(filtro=><div><p>{filtro}</p><button onClick = {deleteFilter} >x</button></div>)}
    <button  type="submit" name="Save Changes" disabled={!changeDetails}>Save Changes</button>
    {!changeDetails && <h3>{message}</h3>}  
    </form>
    <button name="Edit" onClick={changeButton} disabled={changeDetails}>Edit</button> 
    <ChangePass user={user} changeDetails={changeDetails}/>
    <button onClick={deleteAccount}>Delete account</button>

      </Modal>
    </div>
  );
}

export default InfoRest