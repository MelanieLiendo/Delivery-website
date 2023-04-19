import React from 'react'
import RegisterCust from './Customers/RegisterCust'
import RegisterRest from './Restaurant/RegisterRest'

function Register({userType}) {

   
    return (
        <div>
        {userType === "restaurant" ? 
       (   <RegisterRest />) : 
       (< RegisterCust />)
        }

        </div>
          )
}

export default Register