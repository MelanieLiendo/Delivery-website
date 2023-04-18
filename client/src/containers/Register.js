import React from 'react'
import RegisterCust from './RegisterCust'
import RegisterRest from './RegisterRest'

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