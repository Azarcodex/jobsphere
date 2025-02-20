import React, { useContext, useEffect, useState } from 'react'
import { ManageJob } from '../Components/Descriptions'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ManageJobs = () => {
  const [jobs,setJobs]=useState([])
  const {backendUrl,companyToken}=useContext(AppContext)
//function to fetch company jobs application data
const fetchCompanyJobs=async()=>
{
  try {
     const {data}=await axios.get(backendUrl+'/api/company/list-jobs',
      {headers:{token:companyToken}}
     )
     if(data.success)
     {
      setJobs(data.jobsData.reverse())
      console.log(data.jobsData);
      
     }
     else
     {
      toast.error(data.message)
     }
  } catch (error) {
    toast.error(error.message)
  }
}
//function to change job visibility
const changeJobVisibility=async(id)=>
{
  try {
    const {data}=await axios.post(backendUrl+'/api/company/change-visibilty',
      {  id},
      {
        headers:{token:companyToken}
      }
    )
    if(data.success)
    {
      toast.success(data.message)
      fetchCompanyJobs()
    }else
    {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
useEffect(()=>
{
   if(companyToken)
   {
    fetchCompanyJobs()
   }
},[companyToken])
  return (
    <div className='p-5'>
       <table className='border-collapse border-2 border-solid border-purple-800 rounded-[12px] '>
        <thead>
          <tr className='bg-blue-300 p-1 border-b-[1px] border-solid border-black'>
          <th className='text-center text-sm font-bold text-purple-950 capitalize tracking-tight p-3'>index</th>
            <th className='text-center text-sm font-bold text-purple-950 capitalize tracking-tight p-3'>Job Title</th>
            <th className='text-center text-sm font-bold text-purple-950 capitalize tracking-tight p-3'>Date</th>
            <th className='text-center text-sm font-bold text-purple-950 capitalize tracking-tight p-3'>Location</th>
            <th className='text-center text-sm font-bold text-purple-950 capitalize tracking-tight p-3'>Applicants</th>
            <th className='text-center text-sm font-bold text-purple-950 capitalize tracking-tight p-3'>Visible</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((datax, id) => (
            <tr key={id} className='bg-violet-100 border-b-[1px] border-solid border-black'>
              <td className='border-1 border-solid border-gray-600 p-3 text-sm text-purple-950 font-semibold text-center'>{id+1}</td>
              <td className='border-1 border-solid border-gray-600 p-3 text-sm text-purple-950 font-semibold text-center'>{datax.title}</td>
              <td className='border-1 border-solid border-gray-600 p-3 text-sm text-purple-950 font-semibold text-center'>{new Date(datax.date).toLocaleDateString()}</td>
              <td className='border-1 border-solid border-gray-600 p-3 text-sm text-purple-950 font-semibold text-center'>{datax.location}</td>
              <td className='border-1 border-solid border-gray-600 p-3 text-sm text-purple-950 font-semibold text-center'>{datax.applicants}</td>
              <td className='border-1 border-solid border-gray-600 p-3 text-sm text-purple-950 font-semibold text-center'><input onChange={()=>changeJobVisibility(datax._id)} type="checkbox" name="" id="" className='scale-125 cursor-pointer' checked={datax.visible} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageJobs
