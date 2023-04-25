import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'

function EditDish({user,dishName}) {
    const [message,setMessage]= useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [changeDetails, setChangeDetails]=useState(false);
    const [infoMenu, setInfoMenu] = useState({
            email: "",
            name:"",
            description: "",
            price:"",
            picture: "",
            category: ""
    })
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
          const response = await axios.post(`${URL}/menu/dish`, {name:dishName});
          setInfoMenu({
            email: user.userEmail,
            name:dishName,
            description:response.data.message.description,
            price:response.data.message.price,
            picture: response.data.message.picture,
            category: response.data.message.category
          })
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
          debugger
            const response = await axios.post(`${URL}/menu/update`, {            
              email: user.userEmail,
              name: dishName,
              newName:data.name,
              newDescription: data.description,
              newPrice: data.price,
              newPicture: data.picture,
              newCategory: data.category
               })
  
            setMessage(response.data.message)
            setTimeout(() => {
              setMessage('');
            }, 4000);
            console.log(data)
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
            <label>Dish</label> <input name="name" defaultValue={dishName} disabled={!changeDetails}/> 
            <label>Description</label> <input name="description" defaultValue={infoMenu.description} disabled={!changeDetails}/>
            <label>Price</label> <input name="price" defaultValue={infoMenu.price} disabled={!changeDetails}/>
            <label>Picture</label> <input name="picture" defaultValue={infoMenu.picture} disabled={!changeDetails}/>
            <label>Category</label> 
            <select name="category" defaultValue={infoMenu.category} disabled={!changeDetails}>
            <option disabled selected value> -- select an option -- </option>
            <option value="starters">Starters</option>
            <option value="main dishes">Main Dishes</option>            
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
            </select>
          <button type="submit" name="Save Changes" onClick={changeButton} disabled={!changeDetails}>Save Changes</button>
            {!changeDetails && <h3>{message}</h3>}   
        </form>
        <button name="Edit" onClick={changeButton} disabled={changeDetails}>Edit</button>
        

    <button onClick={closeModal}>Close</button>
    </Modal>
    </div>
  )
}

export default EditDish