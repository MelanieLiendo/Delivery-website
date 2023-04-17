import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar({isLoggedIn}) {
  return (
    <div>
        <NavLink to = {'/'} style={ ({isActive}) => (
            isActive ? linkStyles.activeLink : linkStyles.defaultLink
          )}><h1>Foodies</h1></NavLink>

{isLoggedIn===false
      && <>
      <NavLink
      to="/Customer/register"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Register
      </NavLink>

      <NavLink
      to="/Customer/login"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Login
      </NavLink>
      </>
    }

{isLoggedIn===true
      && <>
      <NavLink
      to="/Customer/profile"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Personal Information
      </NavLink>
      
      <NavLink
      to="/Customer/orders"
      style={ ({isActive}) => (
        isActive ? linkStyles.activeLink : linkStyles.defaultLink
        )}>
      Orders
      </NavLink>
      </>
    }


    </div>
  )
}

export default Navbar