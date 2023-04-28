import { useState, useEffect } from 'react'
import React from 'react'
import axios from "axios";
import { URL } from "../../config"
import { useNavigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";




function Checkout({user}) {
    const stripe = useStripe();
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
const createCheckoutSession = async () => {
  try {
    // 2. Sending request to the create_checkout_session controller and passing products to be paid for
    const response = await axios.post(`${URL}/payment/create-checkout-session`,{ orders });
    console.log(response.data)
    return response.data.ok
      ? // we save session id in localStorage to get it later
        (localStorage.setItem("sessionId",JSON.stringify(response.data.sessionId)),
        // 9. If server returned ok after making a session we run redirect() and pass id of the session to the actual checkout / payment form
        redirect(response.data.sessionId))
      : navigate("/payment/error");
  } catch (error) {
    navigate("/payment/error");
  }
};

const redirect = (sessionId) => {
  debugger
  
  // 10. This redirects to checkout.stripe.com and if charge/payment was successful send user to success url defined in create_checkout_session in the controller (which in our case renders payment_success.js)
  stripe
    .redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: sessionId,
    })
    .then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    });
};
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
        
          <button onClick={() => createCheckoutSession()}>Pay ${orders.reduce((total,acc)=>(total +(acc.price * acc.quantity)),0)}</button>
                
          </>
        }
      </section>          




    </div>
  )
}

export default Checkout