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
      <button onClick={openModal}>&#128722;</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>
        <section className='cart'>
        <button onClick={closeModal}>X</button>
        <h2>Cart</h2>
        {(orders && orders.length > 0) &&
          <>
          <h2>Restaurant</h2>
          <button onClick= {deleteCart} >Delete cart</button>
            {orders.map((order)=>(
              <>
              <article className='itemFlex'>
              <div className='itemInCart'>
              <h2>{order.quantity} x {order.name} ${order.total}</h2> 
              </div>
              <div className='buttonsCartItem' >
              <button onClick= {()=>quantMore(order)} >+</button>
              <button onClick= {()=>quantLess(order)} >-</button>
              <button onClick= {()=>deleteItem(order)} >Delete item</button>
              </div>
              </article>
              </>
            ))} 
           <button className='buttonOrder' onClick={checkout}>Order {orders.reduce((total,acc)=>(total + acc.quantity),0)} for ${orders.reduce((total,acc)=>(total +(acc.price * acc.quantity)),0)}</button> 
          </>
        }

          </section>
    
      </Modal>
    </div>
  )
}

export default Cart