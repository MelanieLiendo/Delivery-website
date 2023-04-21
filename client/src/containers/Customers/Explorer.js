import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {URL} from '../../config'


function Explorer() {
    const [restaurants,setRestaurants]=useState([])
    useEffect(
        () => {
      const customerInfo = async () => {
        try {
          const response = await axios.get(`${URL}/restaurant/displayAll`);
          setRestaurants(response.data.message)
          }
        catch (error) {
          console.log(error);
        }
      };
      customerInfo()
    },[]);

  return (
    <div>
    <h1>Restaurants</h1>
    <section> {restaurants.map((rest)=>
    <article>
    <h2>{rest.restaurant}</h2>
    <h3>{rest.picture}</h3>
    <h3>{rest.filter}</h3>
    </article>
    )}
    </section>
    </div>
  )
}

export default Explorer