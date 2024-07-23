import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoutes = () => {
  const token=sessionStorage.getItem('user');
let auth={token}
return auth.token?<Outlet/>:<Navigate to={'/'}/>
}
export default ProtectedRoutes;