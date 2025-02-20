import React, { useContext, useEffect, useState } from 'react'
import { UserButton,useUser,useClerk } from '@clerk/clerk-react';
import nav_icon from '../Images/promotion.png'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import adminicon1 from '../Images/design.png'
import adminicon2 from '../Images/add.png'
import adminicon3 from '../Images/lender.png'
import { AppContext } from '../Context/AppContext';
const Admin = () => {
  const [showLogout,setShowLogout]=useState(false)
  // const {user}=useUser()
  const nav=useNavigate()
  const handleHome=()=>
  {
       if(user?.publicMetadata?.role==="admin")
       {
        nav('/admin/dashboard')
       }
       else
       {
        nav('/interface')
       }
  }
  const {companyData,setCompanyData,setCompanyToken}=useContext(AppContext)
  //function to logout company
  const logout=()=>
  {
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    nav('/')
  }
  useEffect(()=>
  {
        if(companyData)
        {
          nav('/admin/dashboard/manage-jobs')
        }
  },[companyData])
  return (
    <div>
       <header className='bg-gray-100 w-full flex items-center justify-between p-2'>
              <div className='max-w-[180px] w-full flex items-center justify-between'>
                     <img src={nav_icon} alt="icon" className='w-16' />
                     <h2 className='font-poppins text-violet-950 uppercase text-2xl font-extrabold hxx' style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)" }}>JobSphere</h2>
              </div>
              <nav>
                            <ul className='flex items-center justify-center gap-10 font-poppins font-semibold text-[.8rem] cursor-pointer tracking-wide capitalize text-purple-950'>
                            <li className='list-x' onClick={handleHome}>Home</li>
                            {companyData &&(
                              <div className='flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-purple-950  p-1.5 max-w-[280px] rounded-[8px] relative' 
                              onClick={e=>setShowLogout(!showLogout)}>
                                <img src={companyData.image} alt="" className='w-5 border rounded-full' />
                             <p className='text-red-100'>Welcome <span className='text-white'>{companyData.name}</span></p>
                             {showLogout &&(
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white text-black text-sm p-1 rounded shadow-md" onClick={logout}> 
                              Log out
                              </div>
                             )}
                             
                             </div>
                            )}
                          
                             </ul>
              </nav>
       </header>
       <div className='flex items-start'>
           <div className='h-screen bg-gray-100 flex items-center flex-col border-r-[1px] border-gray-200'>
           <ul className='flex items-center flex-col gap-3 justify-between m-4'>
  <NavLink to="/admin/dashboard/manage-jobs" className={({ isActive }) => 
    isActive 
      ? "bg-blue-400 rounded-md shadow-md border-l-4 border-violet-950 px-4 py-2 transition duration-300" 
      : "hover:bg-gray-100 rounded-md px-4 py-2 transition duration-300"
  }>
  <img src={adminicon1} alt="" className='w-4 mx-auto my-1'/>
    <li  className='font-bold text-sm text-violet-950 capitalize tracking-tighter'>Manage Jobs</li>
  </NavLink>
  <NavLink to="/admin/dashboard/add-job" className={({ isActive }) => 
    isActive 
      ? "bg-blue-400 rounded-md shadow-md border-l-4 border-violet-950 px-4 py-2 transition duration-300 " 
      : "hover:bg-gray-100 rounded-md px-4 py-2 transition duration-300"
  }> 
  <img src={adminicon2} alt="" className='w-4 mx-auto my-1'/>
    <li className='font-bold text-sm text-violet-950 capitalize tracking-tighter'>Add Job</li>
  </NavLink>
  <NavLink to="/admin/dashboard/view-application"  className={({ isActive }) => 
    isActive 
      ? "bg-blue-400 rounded-md shadow-md border-l-4 border-violet-950 px-4 py-2 transition duration-300" 
      : "hover:bg-gray-100 rounded-md px-4 py-2 transition duration-300"
  }>
  <img src={adminicon3} alt="" className='w-4 mx-auto my-1'/>
    <li className='font-bold text-sm text-violet-950 capitalize tracking-tighter '>View Applications</li>
  </NavLink>
</ul>
</div>
<Outlet />
       </div>
    </div>
  )
}

export default Admin
