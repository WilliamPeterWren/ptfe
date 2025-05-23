import React from 'react'
import Cookies from 'js-cookie'

function Dashboard() {

  const admin = Cookies.get('adminCookie')

  return (
    <div>
      <h1 className='dashboard'>Dashboard page</h1>
      <h3>Welcome, {admin}</h3>
    </div>
  )
}

export default Dashboard
