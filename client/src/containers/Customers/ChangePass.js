import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config' 

function ChangePass({user}) {
    const [passwords,setPasswords]= useState({actualPasswordInput:'', newPassword:'', newPassword2:''})
    const [message,setMessage]= useState('')

    console.log(user);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () =>{
    setIsOpen(true)
  }

  const closeModal=() => {
    setIsOpen(false)
  }

const handleChange = (e) => {setPasswords({...passwords,[e.target.name]:e.target.value})}

const handleSubmit = async (e) => {
        e.preventDefault()
         try{
             const response = await axios.post(`${URL}/customer/updatePassword`, {
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
      <button onClick={openModal}>Change your Password</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal">
        <section className='changePassword'>
        <button onClick={closeModal}>x</button>
        <form onSubmit={handleSubmit} onChange={handleChange}>

        <article className='gridChangePass'>
        <div className='changePassComponent'>
        <label>Actual Password</label>
        <input name='actualPasswordInput' type='password'/>
        </div>
        <div className='changePassComponent'>
        <label>New Password</label>
        <input name='newPassword' type='password'/>
        </div>
        <div className='changePassComponent'>
        <label>Repeat New Password</label>
        <input name='newPassword2' type='password'/>
        </div>
       </article>
       <button>Change</button>
       </form>
       <h3>{message}</h3>
       </section>
      </Modal>
    </div>
  );
}

export default ChangePass