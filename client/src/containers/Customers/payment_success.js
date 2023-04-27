import React, { useEffect, useState } from "react";
import axios from "axios";
import {URL} from '../../config'

const PaymentSuccess = ({user}) => {
  const [recentOrder, setRecentOrder]=useState([])
  const [orders, setOrders]  = useState(JSON.parse(localStorage.getItem('orders')))
  
  const getSessionData = async () => {
    // 11. Now when payment was successful we need to get back to Stripe to know what was paid for and who is the customer
    try {
      // 12. we get the session id from the localStorage
      const sessionId = JSON.parse(localStorage.getItem("sessionId"));
      // 13. And send request to checkout_session controller to get info from Stripe by session ID
      const response = await axios.get(`${URL}/payment/checkout-session?sessionId=${sessionId}`);
      // Then removing session id from localStorage
      localStorage.removeItem("sessionId");
      // 18. response from the server will contain data for the customer and the session with the order's info
      console.log("== response ==>", response);
      // 19. So from here we continue with whatever action is needed to be done after successful payment
      setRecentOrder(response.data.session.line_items)
      //if you need the products list in this page, you can find them in : response.data.session.display_items or in response.data.session.line_items depends on the version of API you are using
    } catch (error) {
      //handle the error here, in case of network error
    }
  };
  
  const totalPriceCalc = orders.reduce((total,acc)=>(total +(acc.price * acc.quantity)),0)

  const addOrderToHistory = async () => {
    try{
      const response = await axios.post(`${URL}/order/add`,{
        email:user.userEmail, 
        restaurant_id: orders[0].id_rest,
        menu: [{dish:orders.name, quantity:orders.quantity}], 
        totalPrice:totalPriceCalc});

        console.log(response.message);

      if (response.ok){
        localStorage.removeItem("orders")
      }
    }
    catch(error){
      console.log(error);
    }

  }
  useEffect(() => {
    getSessionData();
    addOrderToHistory();
  }, []);

  return (
    <div className="message_container">
      <div  className="message_box">
        <div className="message_box_right">
          <h2>Payment Successfull</h2>
          <h2>We sent you an email with your order confirmation.</h2>
          {/* {recentOrder.map((item)=>
          <h2>{item.quantity} x {item.product_data.name}({item.amount_data.price})={item.quantity*item.amount_data.price}</h2>)} */}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;