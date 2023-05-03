import React, { useEffect, useState } from "react";
import axios from "axios";
import {URL} from '../../config'

const PaymentSuccess = ({user}) => {
  const [recentOrder, setRecentOrder]=useState([])
  const [orders, setOrders]  = useState(JSON.parse(localStorage.getItem('orders')))
  const [custEmail, setCustEmail]=useState("")
  
  const getSessionData = async () => {
    
    try {
      const sessionId = JSON.parse(localStorage.getItem("sessionId"));
      const response = await axios.get(`${URL}/payment/checkout-session?sessionId=${sessionId}`);
      localStorage.removeItem("sessionId");
      setRecentOrder(response.data.session.line_items.data)
      setCustEmail(response.data.customer.email)
      console.log(response.data.session.line_items.data);
    } catch (error) {}
  };
  
  const totalPriceCalc = orders.reduce((total,acc)=>(total +(acc.price * acc.quantity)),0)

useEffect(()=>{
console.log(user);
},[])

  const addOrderToHistory = async () => {
    
    try{
      debugger
      const response = await axios.post(`${URL}/order/add`,{
        email:user.userEmail, 
        restaurant_id: orders[0].id_rest,
        menu: orders.map((or)=> {return {dish:or.name, quantity:or.quantity}}), 
        totalPrice:totalPriceCalc});

        console.log(response.data);

      if (response.data.ok){
        localStorage.removeItem("orders")
      }
    }
    catch(error){
      console.log(error);
    }

  }
  useEffect(() => {
    if(user){
     getSessionData(); 
     addOrderToHistory(); 
    }
  }, [user]);


  return (
    <div className="message_container">
      <div  className="message_box">
        <div className="message_box_right">
          <h2>Payment Successfull</h2>
          <h2>We sent you an email to {custEmail} with your order confirmation</h2>
          <h2>Your order:</h2>
          {recentOrder.map((item)=>
          <div>
          <h2>{item.quantity} x {item.description}(${item.price.unit_amount/100})=${item.quantity*item.price.unit_amount/100}</h2>
          </div>)}
          <h2>Total: ${recentOrder.reduce((total,acc)=>(total +(acc.amount_total/100)),0)}</h2>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;