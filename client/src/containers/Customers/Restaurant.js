import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import {URL} from '../../config'

function Restaurant() {
    let params = useParams()
    const [rest, setRest] = useState({})
    const [menu, setMenu] = useState([])

    
  useEffect( () => {

    const restaurant = async () => {
        try {
        const response = await axios.get(`${URL}/restaurant/${params.id}`); 
        setRest(response.data.message)
        }
        catch (error) {
        console.log(error);
        }
    };

  const menu = async () => {
    try {
      const response = await axios.get(`${URL}/menu/${params.id}`) 
      setMenu(response.data.message)
      console.log(response);
 
    }
    catch (error) {
      console.log(error);
    }
  };


  menu()
  restaurant()
},[]);
    
  return (
    <div>
        <h2>{rest.restaurant}</h2>
        <h2>{params.id}</h2>
        <h2>{menu.map((eachMenu)=>(
          <h2>{eachMenu.name}</h2>
        ))}</h2>

        </div>
    
  )
}

export default Restaurant