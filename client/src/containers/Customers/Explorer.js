import React,{useEffect,useState} from 'react'
import axios from 'axios';

// nos quedamos en como mostrar todo, yo digo que hay que usar un map pero no se como hacer para que este en un array
function Explorer(user) {
    const [restaurant,setRestaurant]=useState({picture:"",filter:"", restaurant:""})
    useEffect(
        () => {
      const customerInfo = async () => {
        try {
          const response = await axios.post(`${URL}/restaurant/displayAll`);
          setRestaurant({ 
            picture:response.data.message[0].picture, 
            filter:response.data.message[0].filter, 
            restaurant:response.data.message[0].restaurant, 
            })
    
          console.log(response);
          }
        catch (error) {
          console.log(error);
        }
      };
      customerInfo()
    },[]);

  return (
    <div></div>
  )
}

export default Explorer