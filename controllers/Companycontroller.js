//register a company

import { response } from "express"
import Company from "../models/Company.js"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateTokens.js"
import Job from "../models/job.js"
import JobApplication from "../models/JobApplication.js"
 export const registerCompany=async(req,res)=>{
  const{name,email,password,image}=req.body
  if(!name||!email||!password||!image)
  {
       return res.json({success:false,message:"Missing Details"})
  }
  try {
       const companyExist=await Company.findOne({email})
       if(companyExist)
       {
              return res.json({success:false,message:"Company already registered"})
       }
       const salt=await bcrypt.genSalt(10)
       const hashPassword=await bcrypt.hash(password,salt)

       // const imageUpload=await cloudinary.uploader.upload(imageFile.path)

       const company=await Company.create({
              name,
              email,
              password:hashPassword,
              image
       })

       res.json({
              success:true,
              company:{
                     _id:company._id,
                     name:company.name,
                     email:company.email,
                     image:company.image
              },
              token:generateToken(company._id)
       })
  } catch (error) {
       res.json({success:false,message:error.message})
  }
}
//company login

 export const logincompany=async(req,res)=>{
  const {email,password}=req.body
  try {
       const company=await Company.findOne({email})
       if(await bcrypt.compare(password,company.password))
       {
              res.json({
                     success:true,
                     company:{
                            _id:company._id,
                            name:company.name,
                            email:company.email,
                            image:company.image
                     },
                     token:generateToken(company._id)
              })
       }
       else
       {
              res.json({success:false,message:"Invalid Email or Password"})
       }
  } catch (error) {
       res.json({success:false,message:error.message})
  }
}
//get company data
export const getCompanydata=async(req,res)=>{
   try {
       const company=req.company
       res.json({success:true,company})
   } catch (error) {
       res.json({success:false,message:error.message})
   }
}
//post a new job

export const postjob=async(req,res)=>
{
   const {title,description,location,salary,jobtype,category}=req.body

   const companyId=req.company._id
//    console.log(companiId,{title,description,location,salary});
try {
       const newJob=new Job({
              title,
              description,
              location,
              salary,
              companyId,
              date:Date.now(),
              jobtype,
              category
       })
       await newJob.save()
       res.json({success:true,newJob,
              token:generateToken(companyId)
       })
} catch (error) {
        res.json({success:false,message:error.message})
}
   


}
//get company job applicants
export const getCompanyJobApplicants=async(req,res)=>
{

}
//Get company posted JObs
export const getCompanyPostedjobs=async(req,res)=>
{
   try {
       const companyId=req.company._id

       const jobs=await Job.find({companyId})
        //totalno. of applicants
        const jobsData=await Promise.all(jobs.map(async (job)=>{
              const applicants=await JobApplication.find({jobId:job._id})
              return {...job.toObject(),applicants:applicants.length}
        }))
       res.json({success:true,jobsData})
       
   } catch (error) {
       res.json({success:false,message:error.message})
   }
}
//change job application status
export const changeJobapplication=async(req,res)=>
{

}
//change job-visibility
export const changeJobvisibility=async(req,res)=>
{
   try {
       const {id}=req.body

       const companyId=req.company._id

       const job=await Job.findById(id)

       if(companyId.toString()===job.companyId.toString())
       {
              job.visible=!job.visible
       }
       await job.save()
       res.json({success:true,job})
   } catch (error) {
       res.json({success:false,message:error.message})
   }
}