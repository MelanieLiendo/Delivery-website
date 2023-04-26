import React from 'react'
import HomeCust from './Customers/HomeCust'
import HomeRest from './Restaurant/HomeRest'
import { NavLink } from 'react-router-dom'
import homeImage from '../images/homeImage1.jpg'
import restaurantLogo from '../images/restaurantLogo.jpg'

function Home({isLoggedIn,user}) {
    return (
        <div className='home'>
        { isLoggedIn ? 
       user.userType === "restaurant" ? <section ><HomeRest user={user} /> </section > : <section >< HomeCust  user={user}/></section>: 
       <>
       <section id='splashscreen'>
       <img src={homeImage}/>
       <article className='homeText'>
       <h1>Get your favorite food delivered to your doorstep with our easy-to-use delivery web!</h1>
        {/* <h2>Simply browse through menus, place your order, and sit back while we handle the rest. Enjoy the convenience and speed of our reliable delivery service</h2> */}
        </article>
       </section>
       <section id='restaurantLogReg'>
        <article className='picRestaurantLogReg'>
       <h2>Join our team of restaurants</h2>
       <img src={restaurantLogo}/>
       </article>
       <ul>
       <li><NavLink to="/register/restaurant">Register</NavLink></li>
       <li><NavLink to="/login/restaurant">Login</NavLink></li>
       </ul>
       </section>
       </>
        }
        </div>
          )
}

export default Home