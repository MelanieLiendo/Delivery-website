import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {URL} from '../../config'
import AddDish from './AddDish';
import AddCategory from './AddCategory';

function HomeRest({user}) {
  const [menu,setMenu]=useState([])
  console.log(user.userEmail);

  const restaurantMenu = async () => {
    try {
      debugger
      const response = await axios.post(`${URL}/menu/restaurant`,{
        email:user.userEmail});
      
      console.log(response)

      setMenu(response.data.message)
      }
    catch (error) {
      console.log(error);
    }
  };

  let categories = []
  const findingCategories = () =>{
    menu.forEach((ele) => {
      if(!categories.includes(ele.category)) {
        categories.push(ele.category)
      }
      
    });
    console.log(categories)
  }
    useEffect(
        () => {
      findingCategories()
      restaurantMenu()
    },[]);

  return (
    <div>
    <h1>Your menu</h1>
    {categories.map((categ)=> <h2>{categ}</h2>
        // <section>  
        // <h2>{categ}</h2>  
        // {menu.map((dish)=>
        // dish.category == categ &&
        // <article>
        // <h3>{dish.name}</h3>
        // <h3>{dish.picture}</h3>
        // </article>)}
        // <AddDish user= {user} restaurantMenu={restaurantMenu}/> 
        // </section>) 
    )}
        
    <AddCategory user= {user}/>
    </div>
  )
}

export default HomeRest