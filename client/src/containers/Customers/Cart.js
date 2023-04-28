import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';
import {URL} from '../../config'
import axios from 'axios';


function Cart() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const[orders, setOrders]= useState(JSON.parse(localStorage.getItem('orders')))
    const [rest, setRest] = useState({})


    useEffect(() => {
        const restaurant = async () => {
          try {
          const response = await axios.get(`${URL}/restaurant/${orders[0].id_rest}`); 
          setRest(response.data.message)
          }
          catch (error) {
          console.log(error);
          }
      };  
        restaurant()
      }, [])

  const openModal = () =>{
    setIsOpen(true);
    setOrders(JSON.parse(localStorage.getItem('orders')))}

  const closeModal=() => {
    setIsOpen(false);
}

  useEffect(()=>{
    localStorage.setItem('orders', JSON.stringify(orders))
  },[orders])

  const deleteCart = (order) =>{
    setOrders([])} 

  const checkout = ( ) => {
    setIsOpen(false);
    navigate('/checkout')}

  const deleteItem = (order) => {
    const index = orders.findIndex(c => c.name === order.name)
    let temporary = [...orders]
    temporary.splice( index, 1)
    setOrders(temporary)}

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
    } }
    
  return (
    <div>
      <button onClick={openModal}>Cart</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>
        <h2>Cart</h2>
        {orders.length > 0 &&
          <>
          <h2>{rest.restaurant}</h2>
            {orders.map((order)=>(
              <>
              <h2>{order.quantity}x</h2>
              <h2>{order.name}</h2>
              <h2>price per unit: {order.price}</h2>
              <h2>total price : $ {order.total}</h2>
              <button onClick= {()=>quantMore(order)} >+</button>
              <button onClick= {()=>quantLess(order)} >-</button>
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