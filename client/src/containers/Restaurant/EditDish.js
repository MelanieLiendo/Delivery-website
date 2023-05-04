import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'
import UploadImages from '../../components/Uploadimages';

function EditDish({user,dishName,restaurantMenu,findingCategories}) {

  const [message,setMessage]= useState('')
  const [modalIsOpen, setIsOpen] = useState(false);
  const [changeDetails, setChangeDetails]=useState(false);
  let picReference = "dish"
  const [rest, setRest] = useState({
          id: "",
          email: "",
          name: "",
  })
  const [imageLink, setImageLink] =useState("")
  const [infoMenu, setInfoMenu] = useState(null)
    
  useEffect(() => {
    const menuInfo = async () => {
      debugger
      try {
        const response = await axios.post(`${URL}/menu/dish`, {name:dishName});
        console.log(response)
        setInfoMenu({
          email: user.userEmail,
          name:dishName,
          description:response.data.message.description,
          price:response.data.message.price,
          picture: response.data.message.picture,
          category: response.data.message.category,
          id: response.data.message._id
        })
      }catch (error) {
        console.log(error);
      }
    };

    const restaurant = async () => {
      debugger
      try {        
        const response = await axios.post(`${URL}/restaurant/restaurant`,{
          email:user.userEmail});
        setRest({
          email: response.data.message.email,
          id: response.data.message._id,

        })
        console.log(rest)
      }
      catch (error) {
        console.log(error);
      }
    };
    if(!rest.id || !rest.email) {
      restaurant();   
    }
    
   if(!infoMenu){
    menuInfo()

   }
  },[]);

    const changeButton = ()=>{
        setChangeDetails(!changeDetails)
      }

    const handleChange = (e) =>{
      setInfoMenu({...infoMenu,[e.target.name]:e.target.value})}

      const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const response = await axios.post(`${URL}/menu/update`, {            
              email: user.userEmail,
              name: dishName,
              newName:infoMenu.name,
              newDescription: infoMenu.description,
              newPrice: infoMenu.price,
              newPicture: infoMenu.picture,
              newCategory: infoMenu.category
               })
  
            setMessage(response.data.message)
            changeButton()
            restaurantMenu()
            findingCategories()

            setTimeout(() => {
              setMessage('');
            }, 4000);
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
            <label>Description</label> <input name="description" defaultValue={infoMenu && infoMenu.description} disabled={!changeDetails}/>
            <label>Price</label> <input name="price" defaultValue={infoMenu && infoMenu.price} disabled={!changeDetails}/>
            <label>Picture</label> <UploadImages infoMenu={infoMenu} rest={rest} setImageLink={setImageLink} changeDetails={changeDetails} picReference={picReference}/> <button >{imageLink}X</button>
            <label>Category</label> 
            <select name="category" defaultValue={infoMenu && infoMenu.category} disabled={!changeDetails}>
            <option disabled selected value> -- select an option -- </option>
            <option value="starters">Starters</option>
            <option value="main dishes">Main Dishes</option>            
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
            </select>
          <button type="submit" name="Save Changes" disabled={!changeDetails}>Save Changes</button>
            {!changeDetails && <h3>{message}</h3>}   
        </form>
        <button name="Edit" onClick={changeButton} disabled={changeDetails}>Edit</button>
        

    <button onClick={closeModal}>Close</button>
    </Modal>
    </div>
  )
}

export default EditDish