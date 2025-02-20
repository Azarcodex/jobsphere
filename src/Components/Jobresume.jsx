// // import React, { useState } from 'react'
// // import { jobsApplied } from './Descriptions'

// // const Jobresume = () => {
// //        const [isEdit,setIsedit]=useState(false)
// //        const [resume,setResume]=useState(null)
// //   return (
// //     <div className='h-screen'>
// //       <h2 className='text-violet-900 font-semibold text-[1rem] tracking-tighter p-3'>your resume</h2>
// //       <div>
// //        {isEdit?
// //    <>
// //   <label htmlFor='resumeUpload'>
// //        <p>select resume</p>
// //        <input type="file" name="" id="resumeUpload" accept='application/pdf' onChange={e=>setResume(e.target.files)} hidden />
// //        {/* img for profile uplaod icon */}
// //   </label>
// //   <button onClick={e=>setIsedit(false)}>save</button>
// //    </>   :
// //    <div className='bg-gray-300 flex items-center justify-between max-w-[15rem]'>
// //        <a href=''>
// //               resume
// //        </a>
// //        <button onClick={()=>setIsedit(true)}>Edit</button>
// //        </div>    
// // }
// //       </div>
// //     </div>
// //   )
// // }

// // export default Jobresume
// import React, { useState } from 'react';
// import bgimage from '../Images/resume-bg.jpg'
// import upload from '../Images/upload.png'
// const Jobresume = () => {
//   const [isEdit, setIsedit] = useState(false);
//   const [resume, setResume] = useState(null);
//   const handleResumeUpload=(e)=>
//   {
//      const file=e.target.files[0]
//      if(file)
//      {
//        setResume(file)
//        setIsedit(false)
//      }
//   }
//   const handleRemove=()=>
//   {
//        setResume(null)
//   }

// //   const handleResumeUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setResume(file);
// //       setIsedit(false);
// //     }
// //   };

//   return (
//     <div 
//       className="h-screen flex bg-cover bg-center p-4 flex-col"
//       style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)),url(${bgimage})` }}
//     >
//       <h2 className="text-white font-semibold text-2xl tracking-tight p-3 text-left">Your Resume</h2>

//       <div className=" max-w-[22rem] rounded-[12px] p-2 border-2 border-solid border-white backdrop-blur-[15px]">
//         {isEdit ? (
//           <>
//             <label htmlFor="resumeUpload" className="border-[1px] border-solid border-white cursor-pointer bg-transparent px-4 py-2 rounded-md flex items-center justify-between gap-4">
//               <p className="text-sm text-white">Select Resume</p>
//               <input
//                 type="file"
//                 id="resumeUpload"
//                 accept="application/pdf"
//                 onChange={handleResumeUpload}
//                 hidden
//               />
//               <img src={upload} alt="" className='w-7 ' />
//             </label>
//             <button className=" bg-blue-500 text-white px-3 py-1 text-sm rounded-md cursor-pointer mx-auto my-2 flex items-center" onClick={() => setIsedit(false)}>
//               Save
//             </button>
//           </>
//         ) : (
//           <div className="bg-transparent  border-[.1px] border-solid border-amber-200 flex items-center justify-between w-full p-3 rounded-lg backdrop-blur-[15px]">
//             {resume ? (
//               <div className='flex flex-row items-center justify-between gap-7 p-2'>
//               <a href={URL.createObjectURL(resume)} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                 View Resume
//               </a>
//               <button className=" bg-blue-500 text-white px-3 py-1 text-sm rounded-md cursor-pointer mx-auto my-2 flex items-center" onClick={handleRemove}>
//               delete
//             </button>
//               </div>
//             ) : (
//               <p className="text-white">No Resume Uploaded</p>
//             )}
//             <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-[.8rem] font-light cursor-pointer m-2" onClick={() => setIsedit(true)}>
//               Edit
//             </button>
//             <button className=" bg-blue-500 text-white px-3 py-1 text-sm rounded-md cursor-pointer mx-auto my-2 flex items-center" onClick={() => setIsedit(false)}>
//               submit
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Jobresume;
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react'; // Import useUser from Clerk
import bgimage from '../Images/resume-bg.jpg';
import upload from '../Images/upload.png';
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';

const Jobresume = () => {
  const {backendUrl,userData,userApplications,fetchUserData,userToken}=useContext(AppContext)
  const [isEdit, setIsedit] = useState(false);
  const [resume, setResume] = useState(null);
  const [jobTitle, setJobTitle] = useState("Software Engineer");  // Example job title
  const [company, setCompany] = useState("Tech Innovations");      // Example company
  const [location, setLocation] = useState("Bangalore, India");    // Example location
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const handleRemove = () => {
    setResume(null);
  };

  // const handleSubmit = async () => {
  //   if (!resume) return alert('Please upload a resume before submitting.');

  //   const formData = new FormData();
  //   formData.append('resume', resume);
  //   formData.append('jobTitle', jobTitle);
  //   formData.append('company', company);
  //   formData.append('location', location);

  //   // Append the Clerk user ID dynamically
  //   formData.append('userId', user.id); // Use Clerk's user.id

  //   try {
  //     // Send job application and resume to backend
  //     const response = await axios.post(backendUrl+'/api/jobs/upload-resume', formData);
  //     console.log(response.data);
  //     alert('Job application submitted successfully!');

  //     setIsedit(false);
  //   } catch (error) {
  //     console.error('Error submitting job application:', error);
  //     alert('Failed to submit application');
  //   }
  // };
  const updateResume=async()=>
  {
    try {
      const formData=new FormData()
      formData.append('resume',resume)

      const token=await userToken

      const {data}=await axios.post('backendUrl'+'api/users/update-resume',formData,
        {headers:{token:userToken}}
      )
      if(data.success)
      {
        toast.success(data.message)
        await fetchUserData()
      }
      else
      {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setIsedit(false)
    setResume(null)
  }

  return (
    <div
      className="h-screen flex bg-cover bg-center p-4 flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)),url(${bgimage})`,
      }}
    >
      <h2 className="text-white font-semibold text-2xl tracking-tight p-3 text-left">Your Resume</h2>

      <div className="max-w-[22rem] rounded-[12px] p-2 border-2 border-solid border-white backdrop-blur-[15px]">
        {isEdit ? (
          <>
            <label
              htmlFor="resumeUpload"
              className="border-[1px] border-solid border-white cursor-pointer bg-transparent px-4 py-2 rounded-md flex items-center justify-between gap-4"
            >
              <p className="text-sm text-white">Select Resume</p>
              <input
                type="file"
                id="resumeUpload"
                accept="application/pdf"
                onChange={handleResumeUpload}
                hidden
              />
              <img src={upload} alt="" className="w-7 " />
            </label>
            <button
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md cursor-pointer mx-auto my-2 flex items-center"
              onClick={() => setIsedit(false)}
            >
              Save
            </button>
          </>
        ) : (
          <div className="bg-transparent border-[.1px] border-solid border-amber-200 flex items-center justify-between w-full p-3 rounded-lg backdrop-blur-[15px]">
            {resume ? (
              <div className="flex flex-row items-center justify-between gap-7 p-2">
                <a
                  href={URL.createObjectURL(resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
                <button
                  className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md cursor-pointer mx-auto my-2 flex items-center"
                  onClick={handleRemove}
                >
                  Delete
                </button>
              </div>
            ) : (
              <p className="text-white">No Resume Uploaded</p>
            )}
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md text-[.8rem] font-light cursor-pointer m-2"
              onClick={() => setIsedit(true)}
            >
              Edit
            </button>
            <button
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md cursor-pointer mx-auto my-2 flex items-center"
              onClick={updateResume}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobresume;
