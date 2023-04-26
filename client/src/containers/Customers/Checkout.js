import { useState, useEffect } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { URL } from '../../config'
import axios from 'axios'


function Checkout({user}) {

    let params = useParams()
    const navigate = useNavigate()
    const [orders, setOrders]  = useState(JSON.parse(localStorage.getItem('orders')))
    const [address, setAddress] = useState("")
    const [rest, setRest] = useState({
        restaurant : "",
        address : ""
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
        address:response.data.message.address})
    }
    catch (error) {
    console.log(error);
    }
};


restaurant()
customerAddress()
},[]);
  
   
  return (
    <div>
        <button>Back</button>
        <h2>{rest.restaurant}</h2>
        <h2>Delivery details</h2>
        
        <h2>Mapa</h2>
        <h2>{address}</h2>
        <h2>Payment method</h2>
        <input placeholder='num de tarjeta'/>

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
        
           <button>Pay</button>
                
          </>
        }
      </section>          




    </div>
  )
}

export default Checkout