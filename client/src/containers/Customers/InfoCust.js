import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'
import ChangePass from './ChangePass'

function InfoCust({user}) {
  const [data,setData]= useState({
    address: "", 
    name:"", 
    email:"", 
    password:""})

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
  const customerInfo = async () => {
    try {
      const response = await axios.post(`${URL}/customer/customer`, {email:user.userEmail});
      setData({ 
        address:response.data.message[0].address, 
        name:response.data.message[0].name, 
        email:response.data.message[0].email, 
        })

      console.log(response);
      }
    catch (error) {
      console.log(error);
    }
  };
  customerInfo()
},[]);

    const changeButton = ()=>{
      setChangeDetails(!changeDetails)
    }

    const handleChange=(e)=>{
      setData({...data,[e.target.name]:e.target.value})}

    const handleSubmit= async(e)=>{
      e.preventDefault()
      try {
        const response = await axios.post(`${URL}/customer/update`,{
          newAddress:data.address, 
          newName:data.name,  
          email:data.email, })
          
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
      <button onClick={openModal}>Customer's Information</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>

    <button onClick={closeModal}>Close</button>

    <form onChange={handleChange} onSubmit={handleSubmit}>
    <label>Address:</label> <input name="address" defaultValue={data.address} disabled={!changeDetails}/>
    <label>Name:</label> <input name="name" defaultValue= {data.name} disabled={!changeDetails}/>
    <label>Email:{data.email}</label> 
    <button name={changeDetails? "Save Changes":"Edit"} onClick={changeButton} >{changeDetails?"Save Changes": "Edit"}</button>
    {!changeDetails && <h3>{message}</h3>}
    </form>
    <ChangePass user={user}/>

      </Modal>
    </div>
  );
}

export default InfoCust