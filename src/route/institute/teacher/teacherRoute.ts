


import express,{Router} from 'express'
import isLoggedIn from '../../../middleware/middleware'
import asyncErrorHandler from '../../../services/asyncErrorHandler'
import { createTeacher } from '../../../controller/institute/teacher/teacherController'
import upload from '../../../middleware/cloudinaryMiddleware'
const router:Router = express.Router()

router.route("/").post(isLoggedIn,upload.single("teacherPhoto"), asyncErrorHandler(createTeacher))


export default router