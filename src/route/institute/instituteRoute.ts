



import express, { Router } from "express"

import isLoggedIn from "../../middleware/middleware"
import { createCourseTable, createInstitute, createStudentTable, createTeacherTable } from "../../controller/institute/instituteController"
import catchAsync from "../../services/catchAsync"



const router:Router = express.Router()

router.route("/").post(isLoggedIn, catchAsync(createInstitute) , catchAsync(createTeacherTable),catchAsync(createStudentTable),catchAsync(createCourseTable))


export default router

 