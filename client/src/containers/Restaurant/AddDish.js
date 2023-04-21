import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'

function AddDish({user, restaurantMenu}) {
    const [openClose, setOpenClose]= useState('')
    const [message,setMessage]= useState('')
    const [modalIsOpen, setIsOpen] = useState(false);

    const [data, setData] = useState({
      name: "",
      description:"",
      price: "",
      picture: "",
      category: "",
      })


      const handleChange = (e) =>{
        setData({...data,[e.target.name]:e.target.value})
    
      }
    const handleSubmit = async (e)=>{
      e.preventDefault()
      try{
          const response = await axios.post(`${URL}/menu/add`, {            
            email: user.userEmail,
            name: data.name,
            description: data.description,
            price: data.price,
            picture: data.picture,
            category: data.category
             })
             debugger
           if(response.data.message = "The dish was successfully added") {
restaurantMenu()
           }

          setMessage(response.data.message)
          setData({})
          setTimeout(() => {
            setMessage('');
          }, 3000);
          console.log(response)
      }
     
      catch(error){
          console.log(error);
      }

  }


    
  const openModal = () =>{
    setIsOpen(true);
    setOpenClose("open")
  }

  const closeModal=() => {
    setIsOpen(false);
    setOpenClose("close")
  }

  

  return (
    <div>
      <button onClick={openModal}>Add a dish</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal">
          <form onChange={handleChange} onSubmit={handleSubmit} >
            <label>Dish</label>
            <input name='name'/>
            <label>Description</label>
            <input name='description'/>
            <label>Price</label>
            <input name='price'/>
            <label>Picture</label>
            <input name='picture'/>
            <label>Category</label>
            <select name="category" defaultValue="starters">
            <option value="starters">Starters</option>
            <option value="main dishes">Main Dishes</option>            
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
          </select>
            <button>Add Dish</button>
            <h4>{message}</h4>
        </form>
        

    <button onClick={closeModal}>Close</button>
    </Modal>
    </div>
  )
}

export default AddDish