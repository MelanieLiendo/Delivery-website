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
    <div>
      <NavLink to = {'/'}><h1>Foodies</h1></NavLink>

      {isLoggedIn===true && user.userType=== 'customer'?
        <>
       
        <InfoCust user={user}/>
        <Orders user={user}/>
        <button onClick={handleLogOut}>Log Out</button>
        </>
        :isLoggedIn===true && user.userType=== 'restaurant' ? 
        <>
        <InfoRest user={user}/>
        <button onClick={handleLogOut}>Log Out</button> 
        </>:
        <>
        <NavLink to="/login/customer" >Login</NavLink>
        <NavLink to="/register/customer" >Register</NavLink>
        </>
        }
    </div>
  )
}

export default Navbar