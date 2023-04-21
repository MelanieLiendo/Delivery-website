import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {URL} from '../../config'


function Explorer() {
    const [restaurants,setRestaurants]=useState([])
    const [actualFilter, setActualFilter] = useState([])
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

    
    const handleClick =(e) => {
      setActualFilter([...actualFilter, e.target.value])
    }

    const handleDelete = (filtro)=>{
      let index = actualFilter.findIndex(ele => ele === filtro)
      let temporary = [...actualFilter]
      temporary.splice(index,1)
      setActualFilter(temporary)
    }

  return (
    <div>
    <h1>Filters</h1>
    <button onClick={handleClick} disabled={actualFilter.includes("Gluten Free")}  value= "Gluten Free">Gluten Free</button>
    <button onClick={handleClick} disabled={actualFilter.includes("Pizza")}  value= "Pizza">Pizza</button>
    <button onClick={handleClick} disabled={actualFilter.includes("Sushi")}  value= "Sushi">Sushi</button>
    <button onClick={handleClick} disabled={actualFilter.includes("Vegetarian")}  value= "Vegetarian">Vegetarian</button>
    <button onClick={handleClick} disabled={actualFilter.includes("Vegan")}  value= "Vegan">Vegan</button>
    <button onClick={handleClick} disabled={actualFilter.includes("Healthy")}  value= "Healthy">Healthy</button>
    <button onClick={handleClick} disabled={actualFilter.includes("Fast Food")}  value= "Fast Food">Fast Food</button>
    <button onClick={handleClick} disabled={actualFilter.includes("Hamburger")}  value= "Hamburger">Hamburger</button>
    <button onClick={handleClick} disabled={actualFilter.includes("Breakfast")}  value= "Breakfast">Breakfast</button>

    {actualFilter.length > 0 && 
    <>
    <p> Filtered by: </p>
    {actualFilter.map((filtro)=>
      <button onClick={handleDelete}> {filtro} X</button>)}
    </>
    }
  

    <h1>Restaurants</h1>

    {actualFilter.length < 1 ?  
    
    <section> {restaurants.map((rest)=> 
      <article>
      <h2>{rest.restaurant}</h2>
      <h3>{rest.picture}</h3>
      <h3>{rest.filter}</h3>
      </article>
      )}
      </section> :
      <section> {restaurants.map((rest)=> (actualFilter.map((ele)=> rest.filter.includes(ele)  )) && /* tengo que hacer que solo se vean los res que cumple con todos los filtros*/
      <article>
      <h2>{rest.restaurant}</h2>
      <h3>{rest.picture}</h3>
      <h3>{rest.filter}</h3>
      </article>
      )}
      </section>
  }
    </div>
  )
}

export default Explorer