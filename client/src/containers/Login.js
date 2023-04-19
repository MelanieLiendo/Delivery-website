import React from 'react'
import LoginCust from './Customers/LoginCust'
import LoginRest from './Restaurant/LoginRest'

function Login({userType, setUserType, login}) {
    return (
        <div>
        {userType === "restaurant" ? 
       (   <LoginRest login = {login}/>) : 
       (< LoginCust login = {login} setUserType={setUserType}/>)
        }

        </div>
          )
}

export default Login