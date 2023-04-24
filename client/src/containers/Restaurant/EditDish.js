import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'

function EditDish({user}) {
    const [message,setMessage]= useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [changeDetails, setChangeDetails]=useState(false);

    const [data, setData] = useState({
      name: "",
      description:"",
      price: "",
      picture: "",
      category: "",
      })

      useEffect(
        () => {
      const menuInfo = async () => {
        try {
          const response = await axios.post(`${URL}/menu/restaurant`, {email:user.userEmail});
          setData(response.data.message)
          }
        catch (error) {
          console.log(error);
        }
      };
      menuInfo()
    },[]);

    const changeButton = ()=>{
        setChangeDetails(!changeDetails)
      }

    const handleChange = (e) =>{
      setData({...data,[e.target.name]:e.target.value})}

    const handleSubmit = async (e)=>{
      e.preventDefault()
      try{
          const response = await axios.post(`${URL}/menu/edit`, {            
            email: user.userEmail,
            name: data.name,
            description: data.description,
            price: data.price,
            picture: data.picture,
            category: data.category
             })

          setMessage(response.data.message)
          setData({})
          setTimeout(() => {
            setMessage('');
          }, 4000);
          console.log(response)
      }
     
      catch(error){
          console.log(error);
      }}

  const openModal = () =>{
    setIsOpen(true);
  }

  const closeModal=() => {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Edit</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>
          <form onChange={handleChange} onSubmit={handleSubmit} >
            <label>Dish</label> <input name="name" defaultValue={data.name} disabled={!changeDetails}/> 
            <label>Description</label> <input name="description" defaultValue={data.description} disabled={!changeDetails}/>
            <label>Price</label> <input name="price" defaultValue={data.price} disabled={!changeDetails}/>
            <label>Picture</label> <input name="picture" defaultValue={data.picture} disabled={!changeDetails}/>
            <label>Category</label> 
            <select name="category" defaultValue={data.category} disabled={!changeDetails}>
            <option disabled selected value> -- select an option -- </option>
            <option value="starters">Starters</option>
            <option value="main dishes">Main Dishes</option>            
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
            </select>
            <button name={changeDetails? "Save Changes":"Edit"} onClick={changeButton} >{changeDetails?"Save Changes": "Edit"}</button>
            {!changeDetails && <h3>{message}</h3>}
        </form>
        

    <button onClick={closeModal}>Close</button>
    </Modal>
    </div>
  )
}

export default EditDish