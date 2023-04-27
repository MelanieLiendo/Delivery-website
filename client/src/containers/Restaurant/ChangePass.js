import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config' 

function ChangePass({user, changeDetails}) {
    const [passwords,setPasswords]= useState({actualPasswordInput:'', newPassword:'', newPassword2:''})
    const [message,setMessage]= useState('')
    const [openClose, setOpenClose]= useState('')

    console.log(user);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () =>{
    setIsOpen(true);
    setOpenClose('open')
  }

  const closeModal=() => {
    setIsOpen(false);
    setOpenClose('close')
  }

const handleChange = (e) => {setPasswords({...passwords,[e.target.name]:e.target.value})}

const handleSubmit = async (e) => {
        e.preventDefault()
         try{
             const response = await axios.post(`${URL}/restaurant/updatePassword`, {
                email:user.userEmail,
                actualPasswordInput:passwords.actualPasswordInput,
                newPassword:passwords.newPassword,
                newPassword2:passwords.newPassword2})
             setMessage(response.data.message)
             if (message == response.data.message) {
              setTimeout(() => {
                setMessage('');
              }, 4000);
               }
            }
             
         catch(error){
             console.log(error);
         }}

  return (
    <div>
      <button onClick={openModal} disabled={changeDetails}>Change your Password</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal">

        <button onClick={closeModal}>Close</button>

        <form onSubmit={handleSubmit} onChange={handleChange}>
        <label>Actual Password:</label><input type='password' name='actualPasswordInput'/>
        <label>New Password:</label><input type='password' name='newPassword'/>
        <label>Repeat New Password:</label><input type='password' name='newPassword2'/>
       <button>Change</button>
       </form>
       <h3>{message}</h3>
      </Modal>
    </div>
  );
}

export default ChangePass