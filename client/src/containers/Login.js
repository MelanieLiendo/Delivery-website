import React from 'react'
import LoginCust from './Customers/LoginCust'
import LoginRest from './Restaurant/LoginRest'
import { useParams } from 'react-router-dom'

function Login({login}) {
  const params = useParams()
    return (
        <div>
        {params.type === "restaurant" ? 
       (   <LoginRest login = {login}/>) : 
       (< LoginCust login = {login}/>)
        }

        </div>
          )
}

export default Login