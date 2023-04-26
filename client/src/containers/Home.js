import React from 'react'
import HomeCust from './Customers/HomeCust'
import HomeRest from './Restaurant/HomeRest'
import { NavLink } from 'react-router-dom'
import homeImage from '../images/homeImage1.jpg'

function Home({isLoggedIn,user}) {
    return (
        <div className='home'>
        { isLoggedIn ? 
       user.userType === "restaurant" ? <section ><HomeRest user={user} /> </section > : <section >< HomeCust  user={user}/></section>: 
       <>
       <img src={homeImage}/>
       <h1></h1>
       <h2>If you are a restaurant..</h2>
       <NavLink to="/register/restaurant">Register as a Restaurant</NavLink>
      <NavLink to="/login/restaurant">Login as a Restaurant</NavLink>
       </>
        }
        </div>
          )
}

export default Home