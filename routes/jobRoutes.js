import express from 'express'
import { applyJob, getAppliedJobs, getUserAppliedJobs } from '../controllers/jobController.js';
import multer from 'multer';
import { getJobById, getJobs } from '../controllers/jobController.js'
import { verifyToken } from '../Middleware/authmiddleware.js';
const router=express.Router()
const upload = multer({ dest: 'uploads/' });
//Route to get all job data
router.get('/',getJobs)

// router.post('/upload-resume', upload.single('resume'), uploadResume);
//Route to get single job ny id
router.get('/:id',getJobById)
router.post('/apply', verifyToken, applyJob);
router.get('/applied-jobs/:userId', verifyToken, getUserAppliedJobs);


export default router



