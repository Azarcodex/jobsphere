import express from 'express'
import { changeJobapplication, changeJobvisibility, getCompanydata, getCompanyJobApplicants, getCompanyPostedjobs, logincompany, postjob, registerCompany } from '../controllers/Companycontroller.js'
import upload from '../config/multer.js'
import { protectCompany } from '../Middleware/authmiddleware.js'

const router=express.Router()

//register a company
router.post('/register',upload.single('image'),registerCompany)

//company login
router.post('/login',logincompany)

//get company data
router.get('/company',protectCompany,getCompanydata)

//post a new job
router.post('/post-job',protectCompany,postjob)

//get company job applicants
router.get('/applicants',protectCompany,getCompanyJobApplicants)

//get company joblist
router.get('/list-jobs',protectCompany,getCompanyPostedjobs)
//change job application status
router.post('/change-status',protectCompany,changeJobapplication)

//change visibility

router.post('/change-visibilty',protectCompany,changeJobvisibility)

export default router