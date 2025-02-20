import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaSearch,FaHome, } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios'
import c1 from "../Images/company/c1.png";
import c2 from "../Images/company/c2.png";
import c3 from "../Images/company/c3.png";
import c4 from "../Images/company/c4.png";
import c5 from "../Images/company/c5.png";
import c6 from "../Images/company/c6.png";
import { AppContext } from '../Context/AppContext';
import Joblisting from './Joblisting';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
const Interface = () => {
       const company_logos=[
             {img:c1,name:"Adobe"},
             {img:c2,name:"Meta"},
             {img:c3,name:"Microsoft"},
             {img:c4,name:"Netflix"},
             {img:c5,name:"Intel"},
             {img:c6,name:"Amazon"},
       ];
       const inputReference={
        titleref:useRef(null),
        locationref:useRef(null),
       };
       const listings=[
              {icon:<FaSearch/>,ph:"Search Job Here",reference:"titleref"},
              {icon:<FaLocationDot/>,ph:"Search by Location",reference:"locationref"},
       ]
       const Jobcategory=[
              "part-time","full-time","freelance","internship"
       ];
       //searchEngine//
       const { setsearchFilter, setSearched}=useContext(AppContext)
const searchON=()=>
{
   setsearchFilter({
     title:inputReference.titleref.current.value,
     location:inputReference.locationref.current.value
})
setSearched(true)
console.log({
       title: inputReference.titleref.current.value,
       location: inputReference.locationref.current.value,
     });
     //some login logics
     const {isSignedIn}=useUser()
     const navigate=useNavigate()
   
//     useEffect(()=>{
//        if(!isSignedIn)
//        {
//               navigate('/')
//        }
//     },[isSignedIn,navigate])

//     if(!isSignedIn)
//     {
//        return null
//     }
}
  return (
    <div>
      <section className='min-h-screen p-6'>
       <h1 className='text-center text-2xl text-black font-bold font-poppins uppercase tracking-[.1px] m-2'>find your <span className='text-purple-950 font-bold'> new job</span> today</h1>
       <p className='text-center mx-auto my-2 text-violet-950 font-semibold text-sm w-[450px]'>Your next big career move starts right here <span className='text-red-900'> - </span> explore the best job oppurtunities and take the first step towards your future</p>
       <div className='bg-gradient-to-r from-purple-800 to-purple-950 rounded-[6px] flex items-center justify-center p-5 sticky top-0 z-[1000]'>
              <div className='grid grid-cols-3 items-center p-5 justify-center bg-white rounded-[6px] gap-10 shadow-[0_6px_12px_rgba(0,0,0,0.15)]'>
               {listings.map((ic,phx)=>{
                     return(
                     <div className=' flex items-center justify-between gap-14 '>
                    {ic.icon}
                    <input type="search" name="" id="" placeholder={ic.ph} className='border-0 outline-0 text-[.7rem] font-poppins font-bold' ref={inputReference[ic.reference]}/>
                    </div>
                     ) })}
                     <button type='submit' className='bg-blue-800 py-3 text-[.8rem] text-white font-bold rounded-[12px] max-w-[190px] w-full flex items-center justify-center cursor-pointer hover:opacity-[.6]' onClick={searchON}>Search</button>
              </div>
       </div>
       <div className='flex items-center justify-between gap-9  bg-white  max-w-[65rem] rounded-[10px] mx-auto my-4 border-[.1px] border-solid border-gray-200 p-1.5 shadow-lg'>
              <p className='font-bold text-[1rem] font-poppins text-purple-950 tracking-normal'>Trusted By</p>
          {company_logos.map((img_l,id)=>{
              return(
                     <img src={img_l.img} key={id} alt="" className='w-6 cursor-pointer' title={img_l.name}/>
              )
          })}
       </div>
       <Joblisting />
      </section>
    </div>
  )
}

export default Interface
