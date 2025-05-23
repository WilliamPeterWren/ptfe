import React, { useEffect, useContext } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/userContext';



function LogoutAdmin() {

  const {setUser} = useContext(UserContext);

  Cookies.remove('adminCookie');


  const navigate = useNavigate();

  useEffect(() => {
    setUser("")
    navigate('/admin/login');
  })

  return (
    <div>
      <h1>logout page</h1>
    </div>
  )
}

export default LogoutAdmin
