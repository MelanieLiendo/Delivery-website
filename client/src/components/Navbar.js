import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import InfoCust from '../containers/Customers/InfoCust';
import InfoRest from '../containers/Restaurant/InfoRest';
import Orders from '../containers/Customers/Orders';
import Modal from 'react-modal'
import logoFoodies from '../images/logoFoodies.jpg'
Modal.setAppElement("#root");



function Navbar({isLoggedIn, logout, user}) {
  const navigate=useNavigate()
  const handleLogOut =()=>{
      logout()
      navigate('/')
   }

  return (
    <div className='navbar'>
      <NavLink to = {'/'}><img src={logoFoodies}/></NavLink>

      {isLoggedIn===true && user.userType=== 'customer'?
        <>
       
        <InfoCust user={user} logout={logout}/>
        <Orders user={user}/>
        <Cart/>
        <button onClick={handleLogOut}>Log Out</button>
        </>
        :isLoggedIn===true && user.userType=== 'restaurant' ? 
        <>
        <InfoRest user={user} logout={logout}/>
        <button onClick={handleLogOut}>Log Out</button> 
        </>:
        <ul className='navbarLogRegCust'>
        <li><NavLink to="/login/customer" >Login</NavLink></li>
        <li><NavLink to="/register/customer" >Register</NavLink></li>
        </ul>
        }
    </div>
  )
}

export default Navbar