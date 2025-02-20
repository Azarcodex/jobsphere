import Job from "../models/job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import {v2 as cloudinary} from 'cloudinary'
import bcrypt from 'bcrypt'
//get user data
//    const userId=req.auth.userId
//   console.log("fetching data for user",userId)
//    try {
//         const user=await User.findById(userId)
//         if(!user)
//         {
//                return res.json({success:false,message:'User not found'})
//         }
//         res.json({success:true,user})
//    } catch (error) {
//         res.json({success:false,message:error.message})
//    }
export const getUserData=async(req,res)=>{
       try {
           const user=req.user
           res.json({success:true,user})
       } catch (error) {
           res.json({success:false,message:error.message})
       }
    }
 
/////////////////////////////////
import jwt from "jsonwebtoken";
import AppliedJob from "../models/applied.js"
 // Adjust path as needed

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
export const registerUser=async(req,res)=>{
       const{username,email,password}=req.body
       if(!username||!email||!password)
       {
            return res.json({success:false,message:"Missing Details"})
       }
       try {
            const userExist=await User.findOne({email})
            if(userExist)
            {
                   return res.json({success:false,message:"Company already registered"})
            }
            const salt=await bcrypt.genSalt(10)
            const hashPassword=await bcrypt.hash(password,salt)
     
            // const imageUpload=await cloudinary.uploader.upload(imageFile.path)
     
            const user=await User.create({
                   username,
                   email,
                   password:hashPassword
            })
     
            res.json({
                   success:true,
                   user:{
                          _id:user._id,
                          username:user.username,
                          email:user.email
                   },
                   token:generateToken(user._id)
            })
       } catch (error) {
            res.json({success:false,message:error.message})
       }
     }
     //user login
     
      export const loginUser=async(req,res)=>{
       const {email,password}=req.body
       try {
            const user=await User.findOne({email})
            if(await bcrypt.compare(password,user.password))
            {
                   res.json({
                          success:true,
                          user:{
                                 _id:user._id,
                                 username:user.username,
                                 email:user.email
                          },
                          token:generateToken(user._id)
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


/////////-----------------------------/////////////////
//apply for a Job
// export const applyForJob=async(req,res)=>
// {
//     const {jobId}=req.body
//     const userId=req.auth.userId

//     try {
//        const isAlreadyApplied=await JobApplication.find({jobId,userId})
//        if(isAlreadyApplied.length>0)
//        {
//               res.json({success:false,message:"Already applied"})
//        }
//        const jobData=await Job.findById(jobId)
//        if(!jobData)
//        {
//               return res.json({success:false,message:'Job not found'})
//        }
//        await JobApplication.create({
//               companyId:jobData.companyId,
//               userId,
//               jobId,
//               date:Date.now()
//        })
//        res.json({success:true,message:'Applied Successfully'})
//     } catch (error) {
//        res.json({success:false,message:error.message})
//     }
// }

// //get user applied applications

// export const getUserJobApplications=async(req,res)=>
// {
//   try {
//        const userId=req.auth.userId
//        const applications=await JobApplication.find({userId}).populate('companyId','name email image')
//        .populate('jobId','title description category jobtype salary')
//        .exec()

//        if(!applications)
//        {
//               return res.json({success:false,message:'No job applications found for the user'})
//        }
//        return res.json({success:true,applications})
//   } catch (error) {
//        res.json({success:false,message:error.message})
//   }
// }

//update user profile

export const updateUserResume=async(req,res)=>
{
     try {
       const userId=req.auth.userId
       const resumeFile=req.resumeFile

       const userData=await User.findById(userId)

       if(resumeFile)
       {
              const resumeUpload=await cloudinary.uploader.upload(resumeFile.path)
              userData.resume=resumeUpload.secure_url
       }
       await userData.save()
       return res.json({success:true,message:'resume updated'})
     } catch (error) {
       res.json({success:false,message:error.message})
     }
}

//


