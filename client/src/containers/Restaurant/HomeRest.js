import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {URL} from '../../config'
import AddDish from './AddDish';
import EditDish from './EditDish';
import {useNavigate} from 'react-router-dom'

function HomeRest({user}) {
  const [menu,setMenu]=useState([])
  const [categories,setCategories]=useState([])
  const [message,setMessage]=useState("")
  const navigate = useNavigate()
  const restaurantMenu = async () => {
    try {
      
      const response = await axios.post(`${URL}/menu/restaurant`,{
        email:user.userEmail});
        console.log(user)

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
          restaurantMenu()   
    },[]);

    useEffect(
      () => {
        findingCategories()
  },[menu]);

    const deleteDish = async(dishName,index) =>{
      try{
        const response = await axios.post(`${URL}/menu/remove`,{email:user.userEmail, name:dishName});
          setMessage(response.data.message)
          if(response.data.message == "The dish was successfully removed") {
            let temp = [...menu]
            let categoryErrased = menu[index].category
            temp.splice(index,1)
            setMenu(temp)
            let unico = true
            menu.forEach(ele=>{
              if(ele.category == categoryErrased){
                unico = false
              }
            })
            if (unico=true){
              let idx = categories.findIndex(c=>c==categoryErrased)
              let tempCat = [...categories]
              tempCat.splice(idx,1)
              setCategories(tempCat)
            }
            findingCategories()
          }
          
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
    {message !=="" && <h3>{message}</h3>}
    <AddDish user= {user} restaurantMenu={restaurantMenu} findingCategories={findingCategories}/>
    {categories.map((categ)=>
        <section>  
        <h2>{categ}</h2>  
        {menu.map((dish,i)=>
        dish.category == categ &&
        <article>
        <h3>{dish.name}</h3>
        <h3>{dish.picture}</h3>
        <button onClick={()=>deleteDish(dish.name,i)}>x</button>
        <EditDish user= {user} dishName={dish.name} restaurantMenu={restaurantMenu} findingCategories={findingCategories}/>
        </article>)}
        </section>)}
    </div>
  )
}

export default HomeRest