import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config' 

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

    const [passwords,setPasswords]= useState({newPassword:'', newPassword2:''})
    const [message,setMessage]= useState('')

    console.log(user);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () =>{setIsOpen(true);}

  const closeModal=() => {setIsOpen(false);}

const handleChange = (e) => {setPasswords({...passwords,[e.target.name]:e.target.value})}

// NOS QUEDAMOS ACA, NOS DA ERROR EL CAMBIO DE CONTRASEÑA. CHEQUEAR EL BACKEND PORQUE PARECE QUE DA FALSE LA FUNCION DE CHANGE. 
const handleSubmit = async (e) => {
        e.preventDefault()
         try{
             const response = await axios.post(`${URL}/restaurant/updatePassword`, {
                newPassword:passwords.newPassword,
                newPassword2:passwords.newPassword2})

             setMessage(response.data.message)
             console.log(response)
         }
         catch(error){
             console.log(error);
         }

}

  return (
    <div>
      <button onClick={openModal}>Change your Password</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal">

        <button onClick={closeModal}>Close</button>

        <form onSubmit={handleSubmit} onChange={handleChange}>
        <label>New Password:</label><input  name='newPassword'/>
        <label>Repeat New Password:</label><input name='newPassword2'/>
       <button >Change</button>
       </form>
       {/* <h3>{message}</h3> */}
      </Modal>
    </div>
  );
}

export default InfoRest