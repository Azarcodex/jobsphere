import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../Context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
const JobBox = ({job}) => {
  const navigate=useNavigate()
  // console.log('Job ID:', job._id);
  return (
    <div className='border-[1px] border-solid border-transparent shadow-lg  p-5 rounded-2xl cursor-pointer group hover:bg-blue-500 transition-all duration-300 ease-in-out'>
      <div className='flex items-center justify-center p-1 bg-transparent w-auto rounded-3xl'>
      <img src={job.companyId.image} alt="" className='w-9 border-[1px] border-solid border-black bg-white shadow-lg p-1 rounded-full object-center' />
      </div>
       <h2 className='text-violet-950 font-bold text-sm tracking-tighter text-center mx-auto my-2 group-hover:text-white transition-all duration-300 ease-in-out'>{job.title}</h2>
       <div className='flex  items-center  justify-between text-sm font-semibold '>
              <span className='border-[1px] border-solid border-transparent shadow-lg bg-blue-200 rounded-[4px] p-1 text-[.7rem]'>{job.location}</span>
              <span className='border-[1px] border-solid border-transparent shadow-lg bg-pink-200 rounded-[4px] p-1 text-[.7rem]'>{job.jobtype}</span>
       </div>
       <p dangerouslySetInnerHTML={{__html:job.description.slice(0,100)}} className='tracking-tighter text-[.8rem]/6  text-violet-950 font-semibold m-3 text-center group-hover:text-white transition-all duration-300 ease-in-out'></p>
       <div className='grid grid-cols-2 gap-2 items-center'>
              <button className='border-[1px] border-solid border-black px-0 py-1 rounded-[7px] capitalize text-[.7rem] font-semibold tracking-tighter bg-violet-950 text-white  cursor-pointer' onClick={()=>{navigate('/resume-upload')}}>apply now</button>
            <button className='border-[1px] border-solid border-black px-0 py-1 rounded-[7px] capitalize text-[.7rem] font-semibold tracking-tighter bg-gray-500 cursor-pointer'  onClick={()=>{navigate(`/apply/${job._id}`);scrollTo(0,0)}}> learn more</button>
       </div>
    </div>
  )
}

export default JobBox
