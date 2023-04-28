import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';


function Cart() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const[orders, setOrders]= useState(JSON.parse(localStorage.getItem('orders')))


  const openModal = () =>{
    setIsOpen(true);
    setOrders(JSON.parse(localStorage.getItem('orders')))
  }

  const closeModal=() => {
    setIsOpen(false);
  }

  useEffect(()=>{
    localStorage.setItem('orders', JSON.stringify(orders))
  },[orders])

  const deleteCart = (order) =>{
    setOrders([])
  } 

  const checkout = ( ) => {
    setIsOpen(false);
    navigate('/checkout')
  }

  const deleteItem = (order) => {
    const index = orders.findIndex(c => c.name === order.name)
    let temporary = [...orders]
    temporary.splice( index, 1)
    setOrders(temporary)
}


  return (
    <div>
      <button onClick={openModal}>Cart</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>
        <h2>Cart</h2>
        {orders.length > 0 &&
          <>
            {orders.map((order)=>(
              <>
              <h2>{order.quantity}x</h2>
              <h2>{order.name}</h2>
              <h2>price per unit: {order.price}</h2>
              <h2>total price : $ {order.total}</h2>
              <button onClick= {()=>deleteItem(order)} >Delete item</button>
              </>
            ))} 
            <button onClick= {deleteCart} >Delete cart</button>
           <button onClick={checkout}>Order {orders.reduce((total,acc)=>(total + acc.quantity),0)} for ${orders.reduce((total,acc)=>(total +(acc.price * acc.quantity)),0)}</button>
                
          </>
        }


    <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  )
}

export default Cart