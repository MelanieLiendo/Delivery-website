import React from 'react'
import HomeCust from './HomeCust'
import HomeRest from './HomeRest'
import { NavLink } from 'react-router-dom'

function Home({isLoggedIn,userType, setUserType}) {


  const handleClick =()=>{
    setUserType('restaurant')
  }
    return (
        <div>
        {userType === "restaurant" && isLoggedIn===true ? 
       (   <HomeRest />): userType === "customer" && isLoggedIn===true ? 
       (< HomeCust />): 
       <>
       <h2>If you are a restaurant..</h2>
       <button onClick={handleClick}><NavLink to="/register">Register as a Restaurant</NavLink></button>
       <button onClick={handleClick}><NavLink to="/login">Login as a Restaurant</NavLink></button>
       </>
        }

        </div>
          )
}

export default Home