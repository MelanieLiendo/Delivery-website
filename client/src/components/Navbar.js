import React from 'react'
import { NavLink } from 'react-router-dom'


function Navbar({isLoggedIn, setIsLoggedIn, userType, setUserType}) {
  const handleClick =()=>{
    setUserType('customer')
  }
  const handleLogOut =()=>{
    setUserType('')
    setIsLoggedIn(false);
   }

  return (
    <div>
      <NavLink to = {'/'}><h1>Foodies</h1></NavLink>

      {isLoggedIn===true && userType=== 'customer'?
        <>
        <NavLink to="/profileCustomer">Personal Information</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <button onClick={handleLogOut}>Log Out</button>
        </>
        :isLoggedIn===true && userType=== 'restaurant' ? 
        <>
        <NavLink to="/profileRestaurant">Restaurant Information</NavLink>
        <button onClick={handleLogOut}>Log Out</button> 
        </>:
        <>
      <button onClick={handleClick}><NavLink to="/register">Register</NavLink></button>
       <button onClick={handleClick}><NavLink to="/login">Login</NavLink></button>
        </>
        }
    </div>
  )
}

export default Navbar