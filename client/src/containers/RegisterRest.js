import React, {useState} from 'react'
import axios from 'axios';
import { URL } from '../config';
import {useNavigate} from 'react-router-dom'

function ResgisterRest() {
  const [message,setMessage]= useState('')
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
    password2:"", 
    filter:""})

    const navigate = useNavigate()

     const handleSubmit = async (e)=>{
         e.preventDefault()
         try{
             const response = await axios.post(`${URL}/restaurant/register`, {
                 country:data.country, 
                 city:data.city, 
                 address:data.address, 
                 restaurant:data.restaurant, 
                 name:data.name, 
                 surname:data.surname,
                 phone:data.phone, 
                 email:data.email.toLowerCase(), 
                 password:data.password, 
                 password2:data.password2, 
                 filter:data.filter
                })

             setMessage(response.data.message)
             console.log(response)

             if (response.data.ok) {
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
            <label>Country</label>
            <input name='country'/>
            <label>City</label>
            <input name='city'/>
            <label>Address</label>
            <input name='address'/>
            <label>Restaurant Name</label>
            <input name='restaurant'/>
            <label>Name</label>
            <input name='name'/>
            <label>Surname</label>
            <input name='surname'/>
            <label>Phone</label>
            <input name='phone'/>
            <label>Email</label>
            <input name='email'/>
            <label>Password</label>
            <input name='password'/>
            <label>Repeat Password</label>
            <input name='password2'/>
            <label>Filter</label>
            <input name='filter'/>
            <button>Register</button>
            <div><h4>{message}</h4></div>
        </form>
  )
}

export default ResgisterRest