import React from 'react'
import RegisterCust from './Customers/RegisterCust'
import RegisterRest from './Restaurant/RegisterRest'
import { useParams } from 'react-router-dom'

function Register({}) {
  const params = useParams()   
    return (
        <div>
        {params.type === "restaurant" ? 
       (   <RegisterRest />) : 
       (< RegisterCust />)
        }

        </div>
          )
}

export default Register