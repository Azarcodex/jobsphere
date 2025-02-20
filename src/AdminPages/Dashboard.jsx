import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <h1 className='text-center font-bold text-violet-950 capitalize text-2xl tracking-tight'>Welcome to admin dashboard</h1>
      <Outlet />
    </div>
  )
}

export default Dashboard
