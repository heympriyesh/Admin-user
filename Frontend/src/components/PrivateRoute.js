import React from 'react'
import { Redirect, Route } from 'react-router'

const PrivateRoute = ({component:Component,...rest}) => {
    console.log("Priavat Route")
    return (
        
      <Route {...rest}
       render={(props)=>sessionStorage.getItem('auth-token')?
       (<Component {...props}/>):(
           <Redirect
                to={{
                    pathname:'/'
                }}
            />
            )} />
    )
    
}

export default PrivateRoute
