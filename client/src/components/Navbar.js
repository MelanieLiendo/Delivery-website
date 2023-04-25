import React from 'react'
import { NavLink } from 'react-router-dom'
import InfoCust from '../containers/Customers/InfoCust';
import InfoRest from '../containers/Restaurant/InfoRest';
import Orders from '../containers/Customers/Orders';
import Modal from 'react-modal'
Modal.setAppElement("#root");



function Navbar({isLoggedIn, logout, user}) {
  const handleLogOut =()=>{
      logout()
   }

  return (
    <div className='navbar'>
      <NavLink to = {'/'}><h1>Foodies</h1></NavLink>

      {isLoggedIn===true && user.userType=== 'customer'?
        <>
       
        <InfoCust user={user} logout={logout}/>
        <Orders user={user}/>
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