



import express, { Router } from "express"
import isLoggedIn from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/asyncErrorHandler"
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController"
import multer from "multer"

const router:Router = express.Router()

import { storage } from "../../../services/cloudinaryConfig"
const upload = multer({storage : storage,
    limits: {
      fileSize: 2 * 1024 * 1024, // ✅ 2 MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = [ "application/pdf"];
  
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG, PNG, and PDF files are allowed."));
      }
    },
  })

router.route("/")
.post(isLoggedIn,upload.single('courseThumbnail'), asyncErrorHandler(createCourse))
.get(asyncErrorHandler(getAllCourse))


router.route("/:id").get(asyncErrorHandler(getSingleCourse)).delete(isLoggedIn,asyncErrorHandler(deleteCourse))

export default router

 