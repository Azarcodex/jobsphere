// import { RetryScheduleInOut } from "svix"
// import Job from "../models/job.js"

// //Get all jobs
// export const getJobs=async(req,res)=>{
//        try {
//               const jobs=await Job.find({visible:true})
//               .populate({path:'companyId',select:'-password'})

//               res.json({success:true,jobs})
//        } catch (error) {
//               res.json({success:false,message:error.message})
//        }

// }

// //Get a single job by ID
// export const getJobById=async(req,res)=>{
//     try {
//        const {id}=req.params
//        const job=await Job.findById(id)
//        .populate({
//               path:'companyId',
//               select:'-password'
//        })
//        if(!job)
//        {
//               return res.json({success:false,message:'Job not found'})
//        }
//        res.json({
//               success:true,
//               job
//        })
//     } catch (error) {
//        res.json({success:false,message:error.message})
//     }
// }
import Job from "../models/job.js";
import mongoose from "mongoose";
import JobApplication from '../models/JobApplication.js';
import multer from 'multer';
import path from 'path';

// Multer storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Save files in `uploads/` folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });
// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });

    res.json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid job ID" });
    }

    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 export const getAppliedJobs = async (req, res) => {
  try {
    const jobs = await JobApplication.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// export const uploadResume = async (req, res) => {
//   try {
//     const { userId, jobTitle, company, location } = req.body;
//     const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     const newApplication = new JobApplication({ userId, jobTitle, company, location, resumeUrl });
//     await newApplication.save();

//     res.status(201).json({ message: 'Resume uploaded successfully', resumeUrl });
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading resume', error });
//   }
// };
// /

export const applyJob = async (req, res) => {  // Add Clerk middleware
  try {

    const { userId ,companyId, jobId, date } = req.body;


    const newApplication = new JobApplication({
      userId, 
      companyId,
      jobId,
      date,
    });

    await newApplication.save(); // Save the application to the database
    console.log(userId)
    res.status(201).json({ message: 'Application submitted successfully' }); // 201 Created

  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: 'Internal server error' }); // More specific error
  }
};

export const getUserAppliedJobs =  async (req, res) => {
  try {
      const userId = req.params.userId;

      const applications = await Application.find({ userId: userId });

      const applicationsWithJobDetails = await Promise.all(
          applications.map(async (application) => {
              try {
                  const job = await Job.findById(application.jobId); // Fetch the specific job

                  return {
                      ...application.toObject(),
                      job: job ? job.toObject() : null, // Include job details
                  };
              } catch (innerError) {
                  console.error("Error fetching job for application:", innerError);
                  return {
                      ...application.toObject(),
                      job: null, // Return application without job details if error
                  };
              }
          })
      );

      res.json(applicationsWithJobDetails); // Send combined data

  } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Server error" });
  }
}
