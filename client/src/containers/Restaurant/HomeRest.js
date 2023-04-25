import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {URL} from '../../config'
import AddDish from './AddDish';
import EditDish from './EditDish';

function HomeRest({user}) {
  const [menu,setMenu]=useState([])
  const [categories,setCategories]=useState([])
  const [message,setMessage]=useState("")

  const restaurantMenu = async () => {
    try {
      const response = await axios.post(`${URL}/menu/restaurant`,{
        email:user.userEmail});
      setMenu(response.data.message)
    }
    catch (error) {
      console.log(error);
    }
  };
  const findingCategories = () =>{
    menu.forEach((ele) => {
      if(!categories.includes(ele.category)) {
        setCategories([...categories,ele.category])}
    });
  }
    useEffect(
        () => {
      findingCategories()
      restaurantMenu()
    },[menu,categories]);

    const deleteDish = async(dishName) =>{
      try{
        const response = await axios.post(`${URL}/menu/delete`,{email:user.userEmail, name:dishName});
          setMessage(response.data.message)
          setTimeout(() => {
            setMessage('');
          }, 4000);
      }
      catch(error){
        console.log(error);
      }

    }
  return (
    <div>
    <h1>Your menu</h1>
    <AddDish user= {user}/>
    {categories.map((categ)=>
        <section>  
        <h2>{categ}</h2>  
        {menu.map((dish)=>
        dish.category == categ &&
        <article>
        <h3>{dish.name}</h3>
        <h3>{dish.picture}</h3>
        <button onClick={deleteDish}>x</button>
        {message !=="" && <h3>{message}</h3>}
        <EditDish user= {user} dishName={dish.name}/>
        </article>)}
        </section>)}
    </div>
  )
}

export default HomeRest