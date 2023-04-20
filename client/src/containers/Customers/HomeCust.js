import React from 'react'
import { NavLink } from 'react-router-dom'

function HomeCust() {
  return (
    <div>
      <h2>Delivering to *address*</h2>
      <input type="text" class="searchTerm" placeholder="Search.."/>
      <button type="submit" class="searchButton"></button>
      <NavLink to='/customer/allOptions' >Explore all our options</NavLink>
    </div>
  )
}

export default HomeCust