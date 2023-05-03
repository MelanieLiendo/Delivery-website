import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import {URL} from '../../config'
import Modal from 'react-modal'

function Restaurant({cart}) {
    let params = useParams()
    const [rest, setRest] = useState({})
    const [menu, setMenu] = useState([])   
    const [categories,setCategories]=useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dish, setDish] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [orders, setOrders]  = useState(JSON.parse(localStorage.getItem('orders')) || [])
    const [difRestaurant, setDifRestaurant]= useState(false)
    const [pictures, setPictures] = useState([])

useEffect(() => {
 
  const restaurant = async () => {
    try {
    const response = await axios.get(`${URL}/restaurant/${params.id}`); 
    setRest(response.data.message)
    }
    catch (error) {
    console.log(error);
    }
};

  const menu = async () => {
    try {
      const response = await axios.get(`${URL}/menu/${params.id}`) 
      setMenu(response.data.message)
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  };    
  restaurant()
  menu()
}, [])

useEffect(()=>{
  const findingCategories = () =>{

    menu.forEach((menu) => {
      if(!categories.includes(menu.category)) {
        setCategories([...categories,menu.category])}
    });
  } 
 if(menu.length > 0) {
  findingCategories()
 }
},[menu])

useEffect(()=>{
  localStorage.setItem('orders', JSON.stringify(orders))

},[orders])

  const openModal = () =>{
    setIsOpen(true);
  }

  const closeModal=() => {
    setIsOpen(false);
    setDish(null)
    setQuantity(1)
   
  }
  
useEffect(()=>{
  if(dish){
    setQuantity(1)
    openModal(true)}
},[dish])
  

const handleSum = () => {
  setQuantity(quantity+1)
}

const handleRes = () => {
  {quantity > 1 && setQuantity(quantity-1)}
}

const handleOrder = () =>{
setIsOpen(false);

let idx = orders.findIndex((order)=>order.name == dish.name)

if(idx != -1 && orders.length > 0) {
let temp = [...orders]
temp[idx].quantity += quantity
temp[idx].total += dish.price*quantity
setOrders(temp)
setMessage("The product was added to the cart successfully")
  setTimeout(() => {
    setMessage('');
  }, 3000);
} else {
  setOrders([...orders, { id_rest: dish.restaurant_id, picture: dish.picture, name: dish.name, description: dish.description, price: dish.price, quantity: quantity, total: dish.price*quantity}])
  setMessage("The product was added to the cart successfully")
  setTimeout(() => {
    setMessage('');
  }, 3000);
}
setDish(null)
}

useEffect(()=>{
  const cartVerification = ()=>{
    if(orders.length > 0){
      if (params.id != orders[0].id_rest)
      {setDifRestaurant(true)}
    }else{
      setDifRestaurant(false)
    }}
      cartVerification()
    },[orders])


  useEffect(() => {
    fetch_pictures();
  }, []);

  const fetch_pictures = async () => {
    try {
      const response = await axios.post(`${URL}/pictures/getMenusOfRestaurant`,{restaurant_id:rest._id}) 
      setPictures([ ...response.data.pictures ]);
      console.log(response.data.pictures);
    } catch (error) {
      debugger;
    }
  };

  return (
    <section className='restaurantPage'>
      <article className='infoRestDishes'>
      <h2>{rest.restaurant}</h2>
      <h3>{rest.address}</h3>
      </article>
      {difRestaurant && <h2>You have dishes from another restaurant in your cart.</h2>}
      <div className='categoryDishRestaurant'>
      {categories.map((categ)=>
      <article className='restaurantDishes'>  
      <h2>{categ}</h2>  
      {menu.map((meal)=>
      meal.category == categ &&
      <button onClick= {()=>setDish(meal)} disabled={orders.length>0 && difRestaurant}>
      <article className='dishInRestaurant'>
      <h3>{meal.picture}</h3>
      <div className='dishDetails'>
      <h3>{meal.name}</h3>
      <h3>{meal.description}</h3>
      </div>
      <h3>${meal.price}</h3>
      </article>
      </button>)}
      </article>
      )}
      </div>
      <h2>{message}</h2>
    {dish &&     <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>            

        <button onClick={closeModal}>Close</button>

        <h2>{dish.picture}</h2>
        <h2>{dish.name}</h2>
        <h2>{dish.description}</h2>
        <h2>${dish.price}</h2>
        <button onClick= {handleSum}>+</button>
        <h3>{quantity}</h3>
        <button onClick ={handleRes}>-</button>
        
        <button  onClick={handleOrder} >Add {quantity} for ${dish.price*quantity}</button>
      </Modal>}

    </section>
    
  )

}

export default Restaurant