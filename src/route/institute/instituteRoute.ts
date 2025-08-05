



import express, { Router } from "express"

import isLoggedIn from "../../middleware/middleware"
import { createCategoryTable, createCourseChapterTable, createCourseTable, createInstitute, createStudentTable, createTeacherTable } from "../../controller/institute/instituteController"
import asyncErrorHandler from "../../services/asyncErrorHandler"


const router:Router = express.Router()

router.route("/").post(isLoggedIn, 
    createInstitute,
    createTeacherTable,
    createStudentTable, 
    createCategoryTable, 
    createCourseChapterTable,
    asyncErrorHandler(createCourseTable))


export default router

 