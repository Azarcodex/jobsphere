import React, { useContext, useEffect, useState } from 'react'
import '../Styling/Home.css'
import '../index.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import slide1 from '../Images/slide1.jpg'
import slide2 from '../Images/slide2.jpg'
import slide3 from '../Images/slide3.jpg'
import slide4 from '../Images/slide4.jpg'
import slide5 from '../Images/slide5.jpg'
import suit from '../Images/suitcase.png'
import ic1 from '../Images/ic1.png'
import ic2 from '../Images/ic2.png'
import ic3 from '../Images/ic3.png'
import ic4 from '../Images/ic4.png'
import { UserButton,useUser,useClerk } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
// import { set } from 'mongoose';
const Index = () => {
       const slider_image=[
              slide1,slide2,slide3,slide4,slide5
        ];
        const bx=[
               {icon:ic1,title:"create an account",desc:"Sign up with just a few clicks to unlock exclusive access to a world of job oppurtunities and landing your dream job.It's quick,easy,and completely free"},
               {icon:ic2,title:"search job",desc:"Dive into our job database tailored to match your skills and preferences.WIth our advanced search filters,finding the perfect job has never been easier"},
               {icon:ic3,title:"upload cv/resume",desc:"Showcase your experience by uploading your CV or resume.Let employers know why you 're the perfect candidate for their job openings"},
               {icon:ic4,title:"get job",desc:"Take the final step towards your new career.Get ready to empark on your professional journey and secure the job you 've been dreaming of."}
        ];
       //login activation//
       // const {openSignIn}=useClerk();
      const navigate=useNavigate()
//       const {isSignedIn,user}=useUser()

//       useEffect(()=>
// {
//        if(isSignedIn)
//        {
//               if(user.primaryEmailAddress.emailAddress==='admin21@gmail.com')
//               {
//                      navigate('/admin')
//               }
//               else
//               {
//               navigate("/interface")
//               }
//        }
// },[isSignedIn,user,navigate])
//login popUp for recruiter
const {setShowRecruiterLogin}=useContext(AppContext)
const {setShowUserLogin}=useContext(AppContext)
  return (
    <div>
        <section className='flex items-center justify-center min-h-[60vh] flex-col gap-7'>
           {/* <Swiper
              spaceBetween={30}
              centeredSlides={true}
               slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
             {slider_image.map((imgx,id)=>{
                    return(
              <SwiperSlide key={id}   style={{ backgroundImage: `url(${imgx})` }}>
              </SwiperSlide>
             )})}
            </Swiper> */}
            <div className="flex justify-between items-center bg-gray-200 rounded-2xl gap-5 p-3 ">
             <img src={suit} alt="" className='w-5' />
             <p className='text-red-700 font-light text-[.9rem] font-poppins '>No.1 job hunt website</p>
            </div>
            <div>
             <h1 className='text-center text-6xl font-extrabold capitalize leading-16 tracking-wide'>Search,Apply &<br />Get Your <span className='text-violet-950'>Dream Job</span></h1>
            </div>
            <div className='max-w-[500px]'>
             <p className='text-center font-poppins font-semibold'>Your future starts here.Discover countless opportunities
                    ,take action by applying to jobs that match your skills and aspirations,
                    and transform your career
             </p>
            </div>
            <div className='flex items-center justify-between gap-12'>
             <button className='px-5 py-1 bg-violet-950 rounded-[9px] border-2 border-transparent capitalize font-poppins text-white text-[.8rem] cursor-pointer browse-btn' onClick={e=>setShowUserLogin(true)}>Browse jobs</button>

            {/* <Modal isOpen={modelOpen} style={customStyles}   onRequestClose={closing}>
                    <div className='flex items-center flex-col justify-center gap-5 relative py-4 px-6 border-2 border-solid border-blue-950 bg-white'>
                    <h1 className='font-semibold text-blue-900 uppercase text-[1rem] font-poppins'>{action}</h1>
                    <button onClick={closing} className='absolute top-0 right-0 cursor-pointer text-blue-950 font-extrabold text-sm mx-2 my-2 hover:text-black hover:bg-white bg-amber-100 border-[1px] border-black px-1.5 rounded-[5px]'>&#x2715;</button>
                    <div className='flex items-center justify-between gap-5 border-2 border-solid border-blue-950 rounded-[7px] px-2 py-1'>
                           <img src={log1} alt="" className='w-4' />
                           <input type="text" name="" id="" placeholder='Enter username' className='border-0 outline-0 font-poppins' />
                    </div>
                    {action==="login"?<div className='hidden'></div>:
                    <div className='flex items-center justify-between gap-5 border-2 border-solid border-blue-950 rounded-[7px] px-2 py-1'>
                           <img src={log3} alt="" className='w-4' />
                           <input type="email" name="" id="" placeholder='Email address' className='border-0 outline-0 font-poppins' />
                    </div>}
                      <div className='flex items-center justify-between gap-5 border-2 border-solid border-blue-950 rounded-[7px] px-2 py-1 relative'>
                           <img src={log2} alt="" className='w-4' />
                           <input type={setpsw?"text":"password"} name="" id="" placeholder='Enter password' className='border-0 outline-0' />
                           {setpsw?<IoIosEye className='absolute right-0 cursor-pointer mx-0.5' onClick={toggle}/>:<IoMdEyeOff className='absolute right-0 cursor-pointer mx-0.5' onClick={toggle}/>}
                    </div>
                    {action==="login"?<div className='hidden'></div>:
                    <div className='flex items-center justify-between gap-5 border-2 border-solid border-blue-950 rounded-[7px] px-2 py-1'>
                    <img src={log2} alt="" className='w-4' />
                    <input type="password" name="" id="" placeholder='confirm password' className='border-0 outline-0' />
             </div>}
                    {action==="register"?<div> <p className='text-[.8rem] text-blue-950 cursor-pointer font-semibold  tracking-wide' onClick={()=>setAction("login")}>already have account?</p></div>:
                    <div>
                           <p className='text-[.8rem] font-semibold capitalize tracking-wide'>dont have account? <span className='text-blue-950 cursor-pointer capitalize hover:font-extrabold' onClick={repo}>register here</span></p>
                    </div>}
                    <button type="submit" className='flex items-center justify-center w-full p-1 bg-white border-2 border-solid border-black rounded-[6px] cursor-pointer font-bold font-poppins uppercase hover:bg-amber-100 text-[.8rem]' onClick={handlesubmit}>{action}</button>
                    </div> 
             </Modal>*/}
             <button className='px-5 py-1 bg-gray-700 border-2 border-transparent text-[0.8rem] rounded-[9px] capitalize cursor-pointer text-white font-poppins explore-btn' onClick={e=>setShowRecruiterLogin(true)}>recruiter login</button>
            </div>
             </section>
             <section className='flex items-center justify-between flex-col p-5'>
                    <h1 className='text-4xl font-extrabold font-poppins capitalize tracking-wide text-center'>Get Hired in 4 <span className='text-violet-950'>quick easy steps</span></h1>
                    <div className='max-w-[800px] m-5'>
                           <p className='text-[1rem] font-semibold text-blue-950 capitalize tracking-wider font-poppins text-center'>follow our simple step by step guide to quicky land your dream job and start your new career journey</p>
                    </div>
                    <div className='bx-container'>
                    {bx.map((item,idx)=>{
                           return(
                    <div className='bx-bx'>
                           <div className='py-2 px-3 bg-gray-200 rounded-full'>
                       <img src={item.icon} alt="" className='w-8' />
                       </div>
                       <h2 className='font-extrabold font-poppins  capitalize text-2xl'>{item.title}</h2>
                       <div className='max-w=[200px]'>
                       <p className='text-purple-950 font-semibold text-[.9rem]'>{item.desc}</p>
                       </div>
                    </div>
                   ) })}
                    </div>
             </section>
    </div>
  )
}

export default Index
