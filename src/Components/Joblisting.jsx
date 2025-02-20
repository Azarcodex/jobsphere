import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import close_icon from '../Images/close.png'
import { JobListings, LocationListings } from './Descriptions'
import JobBox from './JobBox'
import left_arrow from '../Images/less-than-symbol.png'
import right_arrow from '../Images/greater-than-symbol.png'
const Joblisting = () => {
       /*-------------------------------------------------
       Category Mapping
       ------------------------------------------------*/
       const categoryMap = {
              Programming: ["Senior Front-End Developer", "Full Stack Developer", "Backend Developer", "Mobile App Developer", "Software Engineer", "Web Developer", "Front-End Developer", "Software Architect"],
              DataScience: ["Data Scientist"],
              Designing: ["UI/UX Designer"],
              Networking: ["Network Engineer", "Systems Analyst", "Database Administrator"],
              Management: ["Product Manager", "IT Project Manager"],
              CyberSecurity: ["Cybersecurity Analyst"],
              Marketing: [],
              Others: ["DevOps Engineer", "Quality Assurance Engineer", "IT Consultant", "Technical Support Specialist"]
          };
          /*---------------------------------------------------------------*/
       const {searchFilter,searched,setsearchFilter,joblist}=useContext(AppContext)
       const handleRemoveTitle=()=>
              {
                     setsearchFilter((prev)=>({
                            ...prev,title:""
                     }));
              }
       const handleRemoveLocation=()=>
       {
              setsearchFilter((prev)=>({
                     ...prev,location:""
              }));
       }
       const [currentpage,Setcurrentpage]=useState(1)
       //-----------------search Logic------------------------//
       const [selectedCategory,setSelectedCategory]=useState([])
       const [selectedLocation,setSelectedLocation]=useState([])
       const [filteredJobs,SetfilteredJobs]=useState(joblist)
       const handleinputCategory=(title)=>
       {
              setSelectedCategory(
                     prev=>prev.includes(title)?
                     prev.filter(c => c !== title):
                     [...prev,title]
              )
       }

       const handleinputLocation=(location)=>
       {
              setSelectedLocation(
             prev=>prev.includes(location)?
              prev.filter(c => c !== location):
              [...prev,location]
              )
       }
       
/*---------------Main-Logic----------------------------*/
useEffect(()=>
{
       //  const matchCategory=job=>selectedCategory.length===0||selectedCategory.includes(job.title)
       const matchCategory = job => selectedCategory.length === 0 || selectedCategory.some(cat => categoryMap[cat].includes(job.title));
       const matchLocation=job=>selectedLocation.length===0||selectedLocation.includes(job.location)

       const matchestitle=job=>searchFilter.title===""||job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
       const matchesLocation=job=>searchFilter.location===""||job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

       const newfilteredJobs=joblist.slice().reverse().filter(
              job=>matchCategory(job)&& matchLocation(job)&& matchestitle(job)&& matchesLocation(job)
       )
       SetfilteredJobs(newfilteredJobs)
       Setcurrentpage(1)
},[joblist,selectedCategory,selectedLocation,searchFilter]);
      
  return (
       <div>
       <div className='grid grid-cols-4 min-h-screen'>
       <div className='col-span-1 bg-transparent p-4 '>
       {searched&&(searchFilter.title!==""||searchFilter.location!=="")&&
        (
              <>
              <h3 className='font-poppins text-purple-950 font-bold text-[1rem] text-center m-2'>Current Search</h3>
              <div className='grid grid-cols-2 items-center gap-6 p-2'>
                     {searchFilter.title&&(
                            <span className='flex items-center gap-4 text-left justify-between border-[1px] border-solid border-black bg-blue-200 rounded-[3px] p-[.4px] font-poppins text-sm text-blue-900 font-semibold'>
                            {searchFilter.title}
                             <img src={close_icon} alt="" className='w-3 cursor-pointer' onClick={handleRemoveTitle}/>
                            </span>
                     )}
                     {searchFilter.location&&(
                            <span className='flex items-center gap-4 text-left justify-between border-[1px] border-solid border-black bg-pink-200 rounded-[3px] p-[.4px] font-poppins text-sm text-blue-900 font-semibold'>
                            {searchFilter.location}
                             <img src={close_icon} alt="" className='w-3 cursor-pointer' onClick={handleRemoveLocation}/>
                            </span>
                     )}
              </div>
              </>
        )
       }
       <div className='flex items-center flex-col gap-2'>
       <h3 className='font-poppins text-purple-950 font-bold text-[1rem] text-center m-2 capitalize'>search by categories</h3>  
       <ul className=''>
              {Object.keys(categoryMap).map((title,id)=>{
                     return(
                     <li key={id} className='grid grid-cols-[20px_auto] gap-3 items-center my-1 mx-auto'>
                            <input type="checkbox" onChange={()=>handleinputCategory(title)} checked={selectedCategory.includes(title)} className='cursor-pointer scale-125' />
                            <span className='text-gray-800 font-poppins font-semibold capitalize tracking-tight text-[.8rem]'>{title}</span>
                     </li>
              )})}
       </ul>
       </div>
       <div className='flex items-center flex-col gap-2 mt-1'>
       <h3 className='font-poppins text-purple-950 font-bold text-[1rem] text-center m-2 capitalize'>search by location</h3>  
       <ul>
              {LocationListings.map((location,idx)=>{
                     return(
                     <li key={idx} className='grid grid-cols-[20px_auto] gap-3 items-center my-2 mx-auto'>
                            <input type="checkbox" onChange={()=>handleinputLocation(location)} checked={selectedLocation.includes(location)} className='cursor-pointer scale-125'/>
                            <span className='text-gray-800 font-poppins font-semibold capitalize tracking-tight text-[.8rem]'>{location}</span>
                     </li>
              )})}
       </ul>
       </div>
       </div>
       <div className='col-span-3 bg-transparent p-10 '>
              <h3 className='text-left font-semibold tracking-wide capitalize text-[.9rem] text-violet-950' id='jb-list'>latest jobs</h3>
              <p className='text-left text-sm font-normal my-1 text-violet-950 capitalize italic'>Get your desired job from top companies</p>
       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-10'>
              {filteredJobs.slice((currentpage-1)*9,currentpage*9).map((job,id)=>{
                     return(
                            <JobBox key={id} job={job}/>
                     )
              })}
       </div>
       </div>
       </div>
       {filteredJobs?.length>0&&(
              <div className='flex items-center justify-center gap-8'>
                     <a href='#jb-list'>
                       <img src={left_arrow} alt="" className='w-3' onClick={()=>Setcurrentpage(Math.max(currentpage-1,1))} />
                     </a>
                     {Array.from({length:Math.ceil(filteredJobs.length/9)}).map((_,index)=>
                            (
                       <a href='#jb-list' key={index}>
                            <button className={`border-[1px] border-solid border-black px-2 py-0 cursor-pointer ${currentpage===index+1?"bg-blue-200":"bg-transparent"}`} onClick={()=>Setcurrentpage(index+1)}>{index+1}</button>
                       </a>
))}
                     <a href='#jb-list'>
                     <img src={right_arrow} alt="" className='w-3' onClick={()=>Setcurrentpage(Math.min(currentpage+1,Math.ceil(filteredJobs.length/9)))}/>  
                     </a>
                     </div>
                     )}
                     
</div>
  )
}

export default Joblisting
