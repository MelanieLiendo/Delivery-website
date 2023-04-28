import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'
import ChangePass from './ChangePass'
import { useNavigate } from 'react-router-dom';
import iconoPersona from '../../images/iconoPersona.png'

function InfoCust({user, logout}) {
  const [data,setData]= useState({
    address: "", 
    name:"", 
    email:"", 
    password:""})

  const navigate = useNavigate()
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

    const deleteAccount = async ()=>{
      try{
        const response = await axios.post(`${URL}/customer/remove`,{email:data.email})
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
      <div className='iconosNavBar'>
      <button onClick={openModal}>Customer's Info</button>
      </div>
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
    <button onClick={deleteAccount}>Delete your account</button>

      </Modal>
    </div>
  );
}

export default InfoCust