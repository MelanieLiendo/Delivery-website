import React, {useState} from 'react'
import axios from 'axios';
import { URL } from '../../config';
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
    filter:[],
    picture:""})

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
                 filter:data.filter,
                 picture:data.picture
                })

             setMessage(response.data.message)
             console.log(response)

             if (response.data.ok) {
				setTimeout(() => {
					navigate('/login/restaurant');
				}, 2000);
         }}
        
         catch(error){
             console.log(error);
         }

     }

    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
        }


    const handleClick = (e) =>{
        setData({...data,  filter:[...data.filter, e.target.value]})

    }   


    const deleteFilter = (filtro) =>{
        let index = data.filter.findIndex(ele => ele === filtro)
        let temporary = ({...data, ...data.filter.splice(index, 1)})
        setData(temporary)
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
            <button onClick={handleClick} disabled={data.filter.length >= 3 || data.filter.includes("Gluten Free")} value= "Gluten Free">Gluten Free</button>
            <button onClick={handleClick} disabled={data.filter.length >= 3 || data.filter.includes("Pizza")}  value= "Pizza">Pizza</button>
            <button onClick={handleClick} disabled={data.filter.length >= 3 || data.filter.includes("Sushi")}  value= "Sushi">Sushi</button>
            <button onClick={handleClick} disabled={data.filter.length >= 3 || data.filter.includes("Vegetarian")}  value= "Vegetarian">Vegetarian</button>
            <button onClick={handleClick} disabled={data.filter.length >= 3 || data.filter.includes("Vegan")}  value= "Vegan">Vegan</button>
            <button onClick={handleClick} disabled={data.filter.length >= 3 || data.filter.includes("Healthy")}  value= "Healthy">Healthy</button>
            <button onClick={handleClick} disabled={data.filter.length >= 3 || data.filter.includes("Fast Food")}  value= "Fast Food">Fast Food</button>
            <button onClick={handleClick} disabled={data.filter.length >= 3 || data.filter.includes("Hamburger")}  value= "Hamburger">Hamburger</button>
            <button onClick={handleClick} disabled={data.filter.length >= 3 || data.filter.includes("Breakfast")}  value= "Breakfast">Breakfast</button>
            <input name='filter'/>
            <label>Picture</label>
            <input name='picture'/>
            <button>Register</button>
            <div><h4>{message}</h4></div>
           {data.filter.map(filtro=><div><p>{filtro}</p><button onClick = {deleteFilter} >x</button></div>)}
        </form>
  )
}

export default ResgisterRest