import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import axios from 'axios'
import { JobListings, jobType, LocationListings } from '../Components/Descriptions'
import { AppContext } from '../Context/AppContext'
import { toast } from 'react-toastify'
const Addjob = () => {
  const [title,setTitle]=useState('')
  const [category,setCategory]=useState('Programming')
  const [location,setLocation]=useState("Bangalore")
  const [jobtype,setType]=useState("Fulltime")
  const [salary,setSalary]=useState(0)
  //QUILL//
  const editorRef=useRef(null)
  const quillRef=useRef(null)
  const { backendUrl,companyToken }=useContext(AppContext)
  const onSubmithandler=async(e)=>
  {
    e.preventDefault()
    try {
      const description=quillRef.current.root.innerHTML
      const { data }=await axios.post(backendUrl+'/api/company/post-job',
        {title,description,location,salary,category,jobtype},
        {headers:{token:companyToken}}
      )
      if(data.success)
      {
        toast.success(data.message)
        setTitle('')
        setSalary(0)
        quillRef.current.root.innerHTML=""
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
  if(editorRef.current&&!quillRef.current)
  {
    quillRef.current=new Quill(editorRef.current,{theme:'snow'});
  }
},[])
  return (
    <form action="" className="p-5 bg-white shadow-md rounded-lg max-w-3xl mx-auto" onSubmit={onSubmithandler}>
  <div className="space-y-4">
    {/* Job Title */}
    <div className="flex flex-col">
      <label htmlFor="title" className="font-bold text-sm text-purple-950 tracking-tight uppercase">
        Job Title
      </label>
      <input
        type="text"
        id="title"
        onChange={e => setTitle(e.target.value)}
        value={title}
        placeholder="Enter job title"
        className="rounded-md max-w-[400px] text-sm py-2 px-3 border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-purple-500 outline-none transition"
      />
    </div>

    {/* Job Description */}
    <div className="flex flex-col">
      <label className="font-bold text-sm text-purple-950 tracking-tight uppercase">
        Job Description
      </label>
      <div ref={editorRef} className="h-[200px] border border-gray-300 p-2 rounded-md bg-gray-50"></div>
    </div>

    {/* Job Filters (Category, Location, Type) */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Job Category */}
      <div>
        <p className="font-bold text-sm text-purple-950 tracking-tight uppercase mb-1">Job Category</p>
        <select
          onChange={e => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          {JobListings.map((value, id) => (
            <option value={value} key={id} className="text-sm">
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Job Location */}
      <div>
        <p className="font-bold text-sm text-purple-950 tracking-tight uppercase mb-1">Job Location</p>
        <select
          onChange={e => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          {LocationListings.map((loc, idx) => (
            <option value={loc} key={idx} className="text-sm">
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div>
        <p className="font-bold text-sm text-purple-950 tracking-tight uppercase mb-1">Job Type</p>
        <select
          onChange={e => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          {jobType.map((type, idx) => (
            <option value={type} key={idx} className="text-sm">
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Salary Input */}
    <div>
      <p className="font-bold text-sm text-purple-950 tracking-tight uppercase mb-1">Salary</p>
      <input
        min={0}
        type="number"
        onChange={e => setSalary(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
    </div>

    {/* Submit Button */}
    <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-md hover:bg-purple-700 transition text-sm cursor-pointer">
      Add Job
    </button>
  </div>
</form>


  )
}

export default Addjob
