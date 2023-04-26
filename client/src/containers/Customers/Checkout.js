import { useState, useEffect } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../config'
import axios from 'axios'
import { NavLink } from 'react-router-dom'



function Checkout({user}) {

    const navigate = useNavigate()
    const [orders, setOrders]  = useState(JSON.parse(localStorage.getItem('orders')))
    const [address, setAddress] = useState("")
    const [rest, setRest] = useState({
        restaurant : "",
        address : "",
        id : ""
    })

    
  useEffect(
    () => {
  const customerAddress = async () => {
    try {
      const response = await axios.post(`${URL}/customer/customer`, {email:user.userEmail});
      setAddress(response.data.message[0].address);
      console.log(response)
      }
    catch (error) {
      console.log(error);
    }
  };


  const restaurant = async () => {
    try {
    const response = await axios.get(`${URL}/restaurant/${orders[0].id_rest}`); 
    setRest({
        restaurant:response.data.message.restaurant,
        address:response.data.message.address,
        id:response.data.message._id,
    })
    }
    catch (error) {
    console.log(error);
    }
};


restaurant()
customerAddress()
},[]);


const deleteItem = (order) => {
    const index = orders.findIndex(c => c.name === order.name)
    let temporary = [...orders]
    temporary.splice( index, 1)
    setOrders(temporary)
}

useEffect(()=>{
    localStorage.setItem('orders', JSON.stringify(orders))
  },[orders])

const goBack = ( ) => {
    navigate(`/restaurant/${rest.id}`)
}

const quantMore = (order ) =>{
    let temporary = [...orders]
    let index = temporary.findIndex(c=> c.name == order.name)
    temporary[index].quantity = order.quantity + 1
    temporary[index].total = order.price * temporary[index].quantity
    setOrders(temporary)

}
const quantLess = (order) =>{
    let temporary = [...orders]
    let index = temporary.findIndex(c=> c.name == order.name)
    if ( temporary[index].quantity > 1){
    temporary[index].quantity = order.quantity - 1
    temporary[index].total = order.price * temporary[index].quantity
    setOrders(temporary)
    } 
}
  return (
    <div>
        <button onClick={goBack}>{rest.restaurant}</button>
        <h2>{rest.restaurant}</h2>
        <h2>Delivery details</h2>
        
        <h2>Mapa</h2>
        <h2>{address}</h2>

        <section className= "carrito">
        <h2>Cart</h2>
        {orders.length > 0 &&
          <>
            {orders.map((order)=>(
              <>
              <h2>{order.quantity}x</h2>
              <h2>{order.name}</h2>
              <h2>$ {order.total}</h2>
              <button onClick= {()=>quantMore(order)} >+</button>
              <button onClick= {()=>quantLess(order)} >-</button>
              <button onClick= {()=>deleteItem(order)} >Delete item</button>
              </>
            ))} 
        
           <NavLink to={{pathname:'/payment', props:{orders}}} ><button>Pay ${orders.reduce((total,acc)=>(total +(acc.price * acc.quantity)),0)}</button></NavLink>
                
          </>
        }
      </section>          




    </div>
  )
}

export default Checkout