import React from 'react';
import {Navigate} from "react-router-dom"


const Protected =({children}) =>{

    let auth = {token:true};
   /* return(
auth.token ? <Outlet/> : <Navigate to="/"/>



    )*/
    if(auth.token) {
       return children
    }
    else{
       
        return  <Navigate to="/" replace />
    
    }
 
}
export default Protected;