import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import {URL} from '../../config'
import Modal from 'react-modal'
import Orders from './Orders';


function Restaurant() {
    let params = useParams()
    const [rest, setRest] = useState({})
    const [menu, setMenu] = useState([])   
    const [categories,setCategories]=useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dish, setDish] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [orders, setOrders]  = useState(localStorage.getItem('orderKey')|| [])

  
  useEffect( () => {

    const restaurant = async () => {
        try {
        const response = await axios.get(`${URL}/restaurant/${params.id}`); 
        setRest(response.data.message)
        }
        catch (error) {
        console.log(error);
        }
    };


  restaurant()
},[]);

useEffect(() => {
 
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
  localStorage.setItem('orderKey', JSON.stringify(orders))
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
  openModal(true)
}
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
} else {
  setOrders([...orders, {picture: dish.picture, name: dish.name, description: dish.description, price: dish.price, quantity: quantity, total: dish.price*quantity}])
}
setDish(null)

}

  const deleteCart = (order) =>{
    setOrders([])
  } 


  return (
    <div>
      <h2>{rest.restaurant}</h2>

      {categories.map((categ)=>
      <section>  
      <h2>{categ}</h2>  
      {menu.map((meal)=>
      meal.category == categ &&
      <button onClick= {()=>setDish(meal)}>
      <article>
      <h3>{meal.name}</h3>
      <h3>{meal.picture}</h3>
      <h3>{meal.description}</h3>
      <h3>${meal.price}</h3>
      </article>
      </button>)}
      </section>
      )}
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
 

      <section className= "carrito">
        <h2>Cart</h2>
        {orders.length > 0 &&
          <>
            {orders.map((order)=>(
              <>
              <h2>{order.quantity}x</h2>
              <h2>{order.name}</h2>
              <h2>$ {order.total}</h2>
              </>
            ))} 
            <button onClick= {deleteCart} >Delete cart</button>
            <button>Order {orders.reduce((total,acc)=>(total + acc.quantity),0)} for ${orders.reduce((total,acc)=>(total +(acc.price * acc.quantity)),0)}</button>

          </>
        }
      </section>

    </div>
    
  )
}

export default Restaurant