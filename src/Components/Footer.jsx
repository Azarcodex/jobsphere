import React from 'react'
import ft1 from '../Images/facebook.png'
import ft2 from '../Images/twitter.png'
import ft3 from '../Images/instagram.png'
import ft4 from '../Images/whatsapp.png'
const Footer = () => {
        const footer_icons=[
                     ft1,ft2,ft3,ft4
              ]
              const footer_features1=[
                     "Privacy & Security",
                     "Terms of Service",
                     "Communicatons",
                     "Refferal Terms",
                     "Lending Licnses",
                     "Disclaimers",
              ];
              const footer_features2=[
                     "Support",
                     "How It Works",
                     "For Employees",
                     "Underwriting",
                     "Contact Us",
              ];
              const footer_features3=[
                     "IT Jobs",
                     "Sales Jobes",
                     "Marketing Jobs",
                     "Accounts",
                     "Hardware Jobs",
              ]
  return (
    <div>
      <footer className='bg-black w-full  text-gray-100 p-5 text-sm'>
              <div className='flex items-center justify-between'>
                     <div className='flex items-center flex-col gap-4'>
                            <h1 className='text-2xl capitalize font-bold'>jobsphere</h1>
                            <address className='text-center'>
                                   <p>Info cyber park,victor 8007,India</p>
                                   <p>9745211557</p>
                                   <p>jobsphere@gmail.com</p>
                            </address>
                            <div className='flex items-center'>
                                   {/*icons*/}
                            {footer_icons.map((footer_img,idxx)=>{
                                   return(
                                   <img src={footer_img} alt="" className='w-6 mx-2 cursor-pointer hover:scale-110 transition duration-200'/>
                            )})}
                            </div>
                     </div>
                     <div className='grid grid-cols-2 gap-0.5 items-center'>
                     <div className='flex items-center flex-col gap-3'>
                            <h2 className='text-2xl font-bold capitalize '>Frequently Asked Questions</h2>
                            {footer_features1.map((txt1,idd)=>{
                                   return(
                                          <ul>
                                                 <li>-{txt1}</li>
                                          </ul>
                                   )
                            })}
                     </div>
                     <div className='flex items-center flex-col gap-3'>
                            {footer_features2.map((txt2,idd)=>{
                            return(
                                   <ul>
                                          <li className='text-center'>-{txt2}</li>
                                   </ul>

                            )
                                    }        )}
                     </div>
                     </div>
                     <div className='flex items-center gap-3 flex-col'>
                            <h2 className='font-bold capitalize text-2xl'>Find Jobes</h2>
                            {footer_features3.map((txt3,idd)=>{
                                   return(
                                          <ul>
                                                 <li>-{txt3}</li>
                                          </ul>
                              )
 } )}
                     </div>
              </div>
              <div className=' bg-gray-900 m-4 p-2'>
              <p className='text-center font-bold text-white font-poppins'>&#169; 2025 <span className='to-blue-950'> jobsphere</span>| all rights reserved | powered by NAM students</p>
              </div>
       </footer>
    </div>
  )
}

export default Footer
