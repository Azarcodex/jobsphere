import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import cross from '../Images/close.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
       const navigate=useNavigate()
       const [state,setState]=useState('Login')
       const [username,setUsername]=useState('')
       const [password,setPassword]=useState('')
       const [email,setEmail]=useState('')
       const{setShowUserLogin,backendUrl,setUserData,setUserToken,userToken}=useContext(AppContext)

       useEffect(()=>
                    {
                       document.body.style.overflow='hidden'
                       return ()=>{
                           document.body.style.overflow='unset'
                       }
                    },[])
//  const handleUser=async(e)=>
//  {
//       e.preventDefault()
//       try {
//         if(state==='Login')
//         {
//               const {data}=await axios.post(backendUrl+'/api/users/login',{
//                      email,password
//               })
//               if(data.success)
//               {
//                      console.log(data);
//                      setUserData(data.user)
//                      setUserToken(data.token)
//                      localStorage.setItem('userToken',data.token)
//                      setShowUserLogin(false)
//                      navigate('/interface')
//               }
//               else
//               {
//                      toast.error(data.message)
//               }
//         }
//         else
//         {
//               const { data } = await axios.post(
//                      backendUrl + '/api/users/register',
//                      { username, password, email },
//                      { headers: { "Content-Type": "application/json" } }
//                  );
//               if(data.success)
//               {
//                      console.log(data);
//                      setUserData(data.user)
//                      setUserToken(data.token)
//                      localStorage.setItem('userToken',data.token)
//                      setShowUserLogin(false)
//                      navigate('/')
//               }
//               else
//               {
//                      toast.error(data.message)
//               }
//         }
//       } catch (error) {
//        toast.error(error.message)
//       }
//  }
 const handleUser = async (e) => {
       e.preventDefault();
       try {
         if (state === 'Login') {
           const { data } = await axios.post(backendUrl + '/api/users/login', {
             email,
             password,
           });
           if (data.success) {
             console.log(data);
             setUserData(data.user);
             setUserToken(data.token);
             localStorage.setItem('userToken', data.token);
             localStorage.setItem('userData', JSON.stringify(data.user)); // Store user data
             setShowUserLogin(false);
             navigate('/interface');
           } else {
             toast.error(data.message);
           }
         } else {
           const { data } = await axios.post(
             backendUrl + '/api/users/register',
             { username, password, email },
             { headers: { 'Content-Type': 'application/json' } }
           );
           if (data.success) {
             console.log(data);
             setUserData(data.user);
             setUserToken(data.token);
             localStorage.setItem('userToken', data.token);
             localStorage.setItem('userData', JSON.stringify(data.user)); // Store user data
             setShowUserLogin(false);
             navigate('/interface')
           } else {
             toast.error(data.message);
           }
         }
       } catch (error) {
         toast.error(error.message);
       }
     };
   
  return (
       <div>
       <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center'>
         <form className='relative bg-white p-10 rounded-xl text-slate-500' onSubmit={handleUser}>
           <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
           <p className='text-sm'>Welcome back! Please sign in to continue</p>
           
           {state === 'Sign Up' ? (
             <>
               <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                 <input className='outline-none text-sm' onChange={e => setUsername(e.target.value)} type='text' placeholder='Username' value={username} required />
               </div>
               <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                 <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' value={email} required />
               </div>
               <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                 <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' value={password} required />
               </div>
             </>
           ) : (
             <>
               <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                 <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} type='email' placeholder='email' value={email} required />
               </div>
               <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                 <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' value={password} required />
               </div>
               <p className='text-sm text-blue-600 cursor-pointer m-2'>Forgot password?</p>
             </>
           )}
           
           <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-2 cursor-pointer'>
             {state === 'Login' ? 'Login' : 'Create Account'}
           </button>
           
           {state === 'Login' ? (
             <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
           ) : (
             <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>
           )}
           
           <img src={cross} className='absolute top-5 right-5 w-6 cursor-pointer' alt='Close' onClick={() => setShowUserLogin(false)} />
         </form>
       </div>
     </div>
     
  )
}

export default Login
