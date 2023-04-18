import React from 'react'
import HomeCust from './HomeCust'
import HomeRest from './HomeRest'

function Home({userType}) {

   
    return (
        <div>
        {userType === "restaurant" ? 
       (   <HomeRest />) : 
       (< HomeCust />)
        }

        </div>
          )
}

export default Home