import React, { useContext, useEffect, useState } from 'react'
import r1 from '../Images/u1.png'
import r2 from '../Images/u2.png'
import r3 from '../Images/u3.png'
import cross from '../Images/close.png'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const RecruiterLogin = () => {
       const navigate=useNavigate()
       const [state,setState]=useState('Login')
       const [name,setName]=useState('')
       const [password,setPassword]=useState('')
       const [email,setEmail]=useState('')

       const [imageurl,setImageurl]=useState('')
       const [isTextDataSubmitted,setIsTextDataSubmitted]=useState(false)
       const [isvalidImage,setIsvalidImage]=useState(false)
       const {setShowRecruiterLogin,backendUrl,setCompanyToken,setCompanyData}=useContext(AppContext)
       const onsubmitHandler=async(e)=>{
              e.preventDefault()
              if(state==='Sign Up'&& !isTextDataSubmitted)
              {
                    return setIsTextDataSubmitted(true)
              }
              try {
                     if(state==='Login')
                     {
                            const {data}=await axios.post(backendUrl +'/api/company/login',{email,password})
                            if(data.success)
                            {
                                    console.log(data);
                                   setCompanyData(data.company)
                                   setCompanyToken(data.token)
                                   localStorage.setItem('companyToken',data.token)
                                   setShowRecruiterLogin(false)
                                   navigate('/admin')
                            }
                            else
                            {
                                   toast.error(data.message)
                            }
                     }
                     else
                     {
                            const formData=new FormData()
                            formData.append('name',name)
                            formData.append('password',password)
                            formData.append('email',email)
                            formData.append('image',imageurl)
                            //calling API
                            const {data}=await axios.post(backendUrl +'/api/company/register',formData)
                            if(data.success)
                            {
                                   // console.log(data);
                                   setCompanyData(data.company)
                                   setCompanyToken(data.token)
                                   localStorage.setItem('companyToken',data.token)
                                   setShowRecruiterLogin(false)
                                   navigate('/admin')
                            }
                            else
                            {
                                   toast.error(data.message)
                            }
                     }
              } catch (error) {
                     toast.error(error.message)
              }

       }
       const handleImageChange=(e)=>
       {
              const url=e.target.value
              setImageurl(url)
              const img=new Image()
              img.src=url
              img.onload=()=>setIsvalidImage(true)
              img.onerror=()=>setIsvalidImage(false)

       }
       useEffect(()=>
              {
                 document.body.style.overflow='hidden'
                 return ()=>{
                     document.body.style.overflow='unset'
                 }
              },[])
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center'>
      <form action="" className='relative bg-white p-10 rounded-xl text-slate-500' onSubmit={onsubmitHandler}>
       <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
       <p className='text-sm '>Welcome back! please sign in to continue</p>
       {state==="Sign Up"&& isTextDataSubmitted ?
       <>
       <div className='flex items-center gap-4 my-10'>
             <div className='cursor-pointer p-0.5 flex items-center gap-2'>
              {/* <img src={imageurl?URL.createObjectURL(imageurl):r1} alt="" className='w-15' /> */}
              <img src={isvalidImage ? imageurl : r1} alt="Recruiter" className='w-20 h-20 rounded-full object-cover border border-gray-300' />

              <input type="text" name="" id="" placeholder='write image Link' value={imageurl} onChange={handleImageChange} className='outline-none border my-1 text-sky-600 text-sm rounded-[5px]'/>
             </div>
       </div>
       </>:
       <>
       {state!=='Login'&&(
              <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={r1} alt="" className='w-4'/>
              <input  className='outline-none text-sm'  onChange={e=>setName(e.target.value)} type="text" name="" id=""placeholder='company Name' value={name}  required/>
       </div>
       )}
       <div  className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={r3} alt=""className='w-4' />
              <input className='outline-none text-sm'  onChange={e=>setEmail(e.target.value)} type="email" name="" id=""placeholder='email' value={email}  required/>
       </div>
       <div  className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              <img src={r2} alt="" className='w-4'/>
              <input  className='outline-none text-sm' onChange={e=>setPassword(e.target.value)} type="password" name="" id=""placeholder='password' value={password}  required/>
       </div>
       {state==='Login' &&<p className='text-sm text-blue-600 cursor-pointer m-2'>Forgot password?</p>}
       </>
}
       <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-2 cursor-pointer'>
              {state==='Login'?'login':isTextDataSubmitted?'create account':'next'}
       </button>
       {state==='Login'? <p className='mt-5 text-center'>Dont have an acount?<span  className='text-blue-600 cursor-pointer'  onClick={()=>setState("Sign Up")}>Sign Up</span></p>:
       <p className='mt-5 text-center'>Already have an account?<span className='text-blue-600 cursor-pointer'   onClick={()=>setState("Login")}>login</span></p>}
       <img src={cross} className='absolute top-5 right-5 w-6 cursor-pointer' alt="" onClick={e=>setShowRecruiterLogin(false)} />
      </form>
    </div>
  )
}

export default RecruiterLogin
