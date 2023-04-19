import React from 'react'
import LoginCust from './Customers/LoginCust'
import LoginRest from './Restaurant/LoginRest'

function Login({userType,login}) {
    return (
        <div>
        {userType === "restaurant" ? 
       (   <LoginRest login = {login}/>) : 
       (< LoginCust login = {login}/>)
        }

        </div>
          )
}

export default Login