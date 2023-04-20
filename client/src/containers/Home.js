import React from 'react'
import HomeCust from './Customers/HomeCust'
import HomeRest from './Restaurant/HomeRest'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function Home({isLoggedIn,user}) {
  const params = useParams()
    return (
        <div>
        { isLoggedIn ? 
       user.userType === "restaurant" ? <HomeRest /> : < HomeCust user={user}/>: 
       <>
       <h2>If you are a restaurant..</h2>
       <NavLink to="/register/restaurant">Register as a Restaurant</NavLink>
      <NavLink to="/login/restaurant">Login as a Restaurant</NavLink>
       </>
        }

        </div>
          )
}

export default Home