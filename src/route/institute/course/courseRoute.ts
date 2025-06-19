



import express, { Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController"

// import {multer,storage} from './../../../middleware/multerMiddleware'

import multer from 'multer'
// const upload = multer({storage : storage })
import {cloudinary,storage} from './../../../services/cloudinaryConfig'
const upload = multer({storage : storage})
const router:Router = express.Router()

//fieldname -- frontend/postman bata chai k name aairaxa file vanne kura 
router.route("/")
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHandler(createCourse))
.get(asyncErrorHandler(getAllCourse))


router.route("/:id").get(asyncErrorHandler(getSingleCourse)).delete(isLoggedIn,asyncErrorHandler(deleteCourse))

export default router

 