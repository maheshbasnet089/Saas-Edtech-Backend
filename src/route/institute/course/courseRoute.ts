



import express, { Request, Router } from "express"

import asyncErrorHandler from "../../../services/asyncErrorHandler"
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController"

// import {multer,storage} from './../../../middleware/multerMiddleware'
// cb(error,success), cb(error)

import upload from "../../../middleware/multerUpload"
import { UserRole } from "../../../middleware/type"
import { isLoggedIn, restrictTo } from "../../../middleware/middleware"
// const upload = multer({storage : storage })

const router:Router = express.Router()

//fieldname -- frontend/postman bata chai k name aairaxa file vanne kura 
router.route("/")
.post(isLoggedIn,restrictTo(UserRole.Institute), upload.single('courseThumbnail'), asyncErrorHandler(createCourse))
.get(isLoggedIn, asyncErrorHandler(getAllCourse))


router.route("/:id").get(asyncErrorHandler(getSingleCourse)).delete(isLoggedIn,restrictTo(UserRole.Institute), asyncErrorHandler(deleteCourse))

export default router

 