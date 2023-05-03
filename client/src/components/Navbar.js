import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import InfoCust from '../containers/Customers/InfoCust';
import InfoRest from '../containers/Restaurant/InfoRest';
import Cart from '../containers/Customers/Cart'
import Orders from '../containers/Customers/Orders';
import Modal from 'react-modal'
import logoFoodies from '../images/logoFoodies.png'
Modal.setAppElement("#root");



function Navbar({isLoggedIn, logout, user}) {
  const navigate=useNavigate()
  const handleLogOut =()=>{
      logout()
      navigate('/')
   }

  return (
    <div className= {isLoggedIn?'navbarLoggedIn':'navbar'}>
      <NavLink to = {'/'}><img src={logoFoodies}/></NavLink>

      {isLoggedIn===true && user.userType=== 'customer'?
        <ul className='navbarUserLogged'>
         <li><InfoCust user={user} logout={logout}/></li>
         <li><Orders user={user}/></li>
         <li><Cart/></li>
         <li><button onClick={handleLogOut}>Log Out</button></li>
        </ul>
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