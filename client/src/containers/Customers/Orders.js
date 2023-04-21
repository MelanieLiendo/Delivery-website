import React, { useState, useEffect} from 'react'
import Modal from 'react-modal'
import {URL} from '../../config'
import axios from 'axios';

function Orders({user}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [orders,setOrders]=useState([])

  const openModal = () =>{
    setIsOpen(true);
  }

  const closeModal=() => {
    setIsOpen(false);
  }

  useEffect(
    () => {
  const customerInfo = async () => {
    try {
      const response = await axios.post(`${URL}/order/displayOrders`, {email:user.userEmail});
      console.log(response);
      setOrders(response.data.message)


      }
    catch (error) {
      console.log(error);
    }
  };
  customerInfo()
},[]);

  return (
    <div>
      <button onClick={openModal}>Orders</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>
        <h1>Orders</h1>
        {orders.map((or)=> 
        <div className='order'>
        <h2>{or.restaurant}</h2>
        <h2>{or.picture}</h2>
        <h2>{or.quantity} x</h2>
        <h2>{or.menu}</h2>
        <h2>${or.totalPrice}</h2>
        </div>
        )}
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}

export default Orders