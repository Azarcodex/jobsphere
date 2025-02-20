import express from 'express'
import multer from 'multer'
import {  getUserData, loginUser, registerUser, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'
import { getAppliedJobs } from '../controllers/jobController.js'
import { protectUser } from '../Middleware/authmiddleware.js'

const router=express.Router()
//get user data
 router.get('/user',protectUser,getUserData)
router.post('/register',registerUser)

//company login
router.post('/login',loginUser)
//apply for a Job
       
//get user applied applications
router.get('/applications',protectUser,getUserData) 
      
//update user profile(resume)
 router.post('/update-resume',upload.single('resume'),updateUserResume)


export default router
       
           