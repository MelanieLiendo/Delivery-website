import React, {useEffect,useState} from 'react'
import axios from 'axios';
import {URL} from '../../config'
import { NavLink } from 'react-router-dom';

function HomeCust({user}) {
  const [address,setAddress]= useState('')
  const [restaurants,setRestaurants]=useState([])
  const [actualFilter, setActualFilter] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searching, setSearching] = useState(false)
  const [busqueda, setBusqueda] = useState("")
  const [listadoRests, setListadoRests] =useState([])
  const [listadoMenus, setListadoMenus] = useState([])
  const [menu, setMenu] = useState([])
  const [noResult,setNoResult]=useState(false)


  useEffect(
    () => {
      
        const customerAddress = async () => {
          try {
            const response = await axios.post(`${URL}/customer/customer`, {email:user.userEmail});
            setAddress({address:response.data.message[0].address});
            console.log(response);}
          catch (error) {
            console.log(error);
          }
        };
  
  const menu = async () => {
    try {
      const response = await axios.get(`${URL}/menu/all`)
      console.log(response);
      setMenu(response.data.message)
 
    }
    catch (error) {
      console.log(error);
    }
  };

  const customerInfo = async () => {
    try {
      const response = await axios.get(`${URL}/restaurant/displayAll`);
      setRestaurants(response.data.message)
      }
    catch (error) {
      console.log(error);
    }
  };

  if(!address){
  menu()
  customerAddress()
  customerInfo()
  }
},[]);
  

    useEffect( () => {         
    let restando = [...restaurants]    
    let result = restando.filter(res=>{
      return actualFilter.every(tag=>res.filter.includes(tag))
    }) 
    setFiltered(result)
    },[actualFilter])  



    const inputSearch = (e) => {
      setBusqueda(e.target.value)
    }
    
    useEffect(()=>{
      
      if(busqueda){   
        let result = restaurants.filter(res=>res.restaurant.toLowerCase().includes(busqueda.toLowerCase()))
        let menus = menu.filter(menu=> menu.name.toLowerCase().includes(busqueda.toLowerCase()) )
        setListadoRests(result)  
        setListadoMenus(menus)     
      if (listadoMenus.length < 1 || listadoRests.length < 1){
        setNoResult(true);
      }
      else{
        setNoResult(false);
      }
    } 

  
    },[busqueda])
    


    const handleClick =(e) => {
      setActualFilter([...actualFilter, e.target.value])
    }

    const handleDelete = (filtro)=>{
      let index = actualFilter.findIndex(ele => ele === filtro)
      let temporary = [...actualFilter]
      temporary.splice(index,1)
      setActualFilter(temporary)
    }

    const handleSearch = () => {
      setSearching(!searching)
    }
    

  return (
    <div>
      <h2 className='deliveringAddress'>Delivering to {address.address}</h2>
      <section className='searchRestaurant'>
        <input onChange= {inputSearch} type="text" placeholder="Search.."/>
        <div className='selectorRestFood'>
          <button onClick = {handleSearch} type="submit"  disabled={ !searching }>Dishes</button>
          <button  onClick = {handleSearch} type="submit"  disabled={ searching }>Restaurants</button>
        </div>
      </section>

      <section className='gridHomeCust3'>
        {(busqueda && searching) && listadoRests.map((rest)=>(
          <NavLink  to= {`/restaurant/${rest._id}`} >
          <article>
            <h2>{rest.restaurant}</h2>
            <h3>{rest.picture}</h3>
            <h3>{rest.filter}</h3>
          </article>
          </NavLink>
        ))}
      </section>
      <section className='gridHomeCust3'>
        {(busqueda && !searching) && listadoMenus.map((menu)=>
            {let resName = restaurants.find(
              (res) => res._id == menu.restaurant_id).restaurant;
              return(
              <NavLink  to= {`/restaurant/${resName._id}`} >
              <article>          
                <h2>{resName}</h2>
                <h3>{menu.name}</h3>
                <h3>{menu.description}</h3>
                <h3>{menu.price}</h3>
              </article>
              </NavLink>)
            }
        )}
      </section>
   
      {!busqueda &&

        <div className='gridHomeCust1'>
          <section className='filtersSection'>
            <h1>Filters</h1>

            <div className='filteredBy'>
              {actualFilter.length > 0 && 
                <>
                  <p> Filtered by: </p>
                  {actualFilter.map((filtro)=>
                    <button onClick={()=>{handleDelete(filtro)}}> {filtro} X</button>)
                  }
                </>
              }
            </div>
            <section className='filters'>
              <button onClick={handleClick} disabled={actualFilter.includes("Gluten Free") || (filtered.length<1 && actualFilter.length>0)}  value= "Gluten Free">Gluten Free</button>
              <button onClick={handleClick} disabled={actualFilter.includes("Pizza")|| (filtered.length<1 && actualFilter.length>0)}  value= "Pizza">Pizza</button>
              <button onClick={handleClick} disabled={actualFilter.includes("Sushi")|| (filtered.length<1 && actualFilter.length>0)}  value= "Sushi">Sushi</button>
              <button onClick={handleClick} disabled={actualFilter.includes("Vegetarian")|| (filtered.length<1 && actualFilter.length>0)}  value= "Vegetarian">Vegetarian</button>
              <button onClick={handleClick} disabled={actualFilter.includes("Vegan")|| (filtered.length<1 && actualFilter.length>0)}  value= "Vegan">Vegan</button>
              <button onClick={handleClick} disabled={actualFilter.includes("Healthy")|| (filtered.length<1 && actualFilter.length>0)}  value= "Healthy">Healthy</button>
              <button onClick={handleClick} disabled={actualFilter.includes("Fast Food")|| (filtered.length<1 && actualFilter.length>0)}  value= "Fast Food">Fast Food</button>
              <button onClick={handleClick} disabled={actualFilter.includes("Hamburger")|| (filtered.length<1 && actualFilter.length>0)}  value= "Hamburger">Hamburger</button>
              <button onClick={handleClick} disabled={actualFilter.includes("Breakfast")|| (filtered.length<1 && actualFilter.length>0)}  value= "Breakfast">Breakfast</button>
            </section>
            
          </section>
          <section className='restaurantsSection'>
            <h1>Restaurants</h1>
            {actualFilter.length < 1 ?  
            
              <section className='gridHomeCust2'> 
                {restaurants.map((rest)=> 
                  <NavLink  to= {`/restaurant/${rest._id}`} >
                  <article className='restDisplay'>
                  <h2>{rest.restaurant}</h2>
                  <h3>{rest.picture}</h3>
                  <h3>{rest.filter}</h3>
                  </article></NavLink>
                )}
              </section> :
              <section className='gridHomeCust2'> 
                {filtered.map((rest) => 
                <NavLink  to= {`/restaurant/${rest._id}`} >
                <article className='restDisplay'>
                  <h2>{rest.restaurant}</h2>
                  <h3>{rest.picture}</h3>
                  <h3>{rest.filter}</h3>
                </article>
                </NavLink>
                )}
              </section>
            }
          </section>
        </div>
      }
    </div>
  )
}

export default HomeCust