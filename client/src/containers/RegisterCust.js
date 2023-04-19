import React, {useState} from 'react'
import axios from 'axios';
import { URL } from '../config';
import {useNavigate} from 'react-router-dom'

function RegisterCust(props) {

    const [message,setMessage]= useState('')
    const [data,setData]= useState({email:'', name:'', password:'', password2:''})
    const navigate = useNavigate()

     const handleSubmit = async (e)=>{
         e.preventDefault()
         try{
            debugger
             const response = await axios.post(`${URL}/customer/register`, {
                 email:data.email.toLowerCase(),
                 name:data.name,
                 password:data.password,
                 password2:data.password2})
                
debugger
             setMessage(response.message.message)


             if (response.message.ok) {
				setTimeout(() => {
					navigate('/login');
				}, 2000);
         }}
        
         catch(error){
             console.log(error);
         }

     }

    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
        }

  return (
        <form onSubmit={handleSubmit} onChange={handleChange}>
            <label>Email</label>
            <input name='email'/>
            <label>Name</label>
            <input name='name'/>
            <label>Password</label>
            <input name='password'/>
            <label>Repeat Password</label>
            <input name='password2'/>
            <button>Register</button>
            <h4>{message}</h4>
        </form>
  )
}

export default RegisterCust