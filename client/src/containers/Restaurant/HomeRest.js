import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {URL} from '../../config'
import AddDish from './AddDish';
import AddCategory from './AddCategory';

function HomeRest({user}) {
  const [menu,setMenu]=useState([])
  console.log(user.userEmail);
    useEffect(
        () => {
      const restaurantMenu = async () => {
        try {
          const response = await axios.post(`${URL}/menu/restaurant`,{
            email:user.userEmail});
          debugger
          console.log(response)

          setMenu(response.data.message)
          }
        catch (error) {
          console.log(error);
        }
      };
      restaurantMenu()
    },[]);

  return (
    <div>
    <h1>Your menu</h1>
    <section> 
    {menu.map((dish)=>
    <article>
    <h2>{dish.category}</h2>
    <h3>{dish.name}</h3>
    <h3>{dish.picture}</h3>
    <AddDish/>
    </article>)}
    </section>
    <AddCategory/>
    </div>
  )
}

export default HomeRest