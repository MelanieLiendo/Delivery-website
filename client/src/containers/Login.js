import React from 'react'
import LoginCust from './LoginCust'
import LoginRest from './LoginRest'

function Login({userType}) {
    return (
        <div>
        {userType === "restaurant" ? 
       (   <LoginRest />) : 
       (< LoginCust />)
        }

        </div>
          )
}

export default Login