import React from 'react'
import LoginCust from './LoginCust'
import LoginRest from './LoginRest'

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