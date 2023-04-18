import React from 'react'
import { NavLink } from 'react-router-dom'


function Navbar({isLoggedIn}) {
  return (
    <div>
        <NavLink to = {'/'}><h1>Foodies</h1></NavLink>

{isLoggedIn===false &&
 <>
      <NavLink to="/Customer/register">
      Register
      </NavLink>

      <NavLink to="/Customer/login">
      Login
      </NavLink>
      </>
    }

{isLoggedIn===true
      && <>
      <NavLink to="/Customer/profile">
      Personal Information
      </NavLink>
      
      <NavLink
      to="/Customer/orders"
      >
      Orders
      </NavLink>
      </>
    }


    </div>
  )
}

export default Navbar