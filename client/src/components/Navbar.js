import React from 'react'
import { NavLink } from 'react-router-dom'
import InfoCust from '../containers/Customers/InfoCust';
import InfoRest from '../containers/Restaurant/InfoRest';
import { useParams } from 'react-router-dom';
import Orders from '../containers/Customers/Orders';
import Modal from 'react-modal'
Modal.setAppElement("#root");



function Navbar({isLoggedIn, logout, user}) {
  const params = useParams()

  const handleLogOut =()=>{
      logout()
   }

  return (
    <div>
      <NavLink to = {'/'}><h1>Foodies</h1></NavLink>

      {isLoggedIn===true && user.userType=== 'customer'?
        <>
       
        <InfoCust/>
        <Orders/>
        <button onClick={handleLogOut}>Log Out</button>
        </>
        :isLoggedIn===true && user.userType=== 'restaurant' ? 
        <>
        <InfoRest/>
        <NavLink to="/profileRestaurant">Restaurant Information</NavLink>
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