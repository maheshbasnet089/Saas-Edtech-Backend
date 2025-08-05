


import express,{Router} from 'express'
import asyncErrorHandler from '../../../../services/asyncErrorHandler';
import isLoggedIn from '../../../../middleware/middleware';
import { createCourseChapterTable } from '../../../../controller/institute/instituteController';
import { addChapterToCourse, fetchCourseChapters } from '../../../../controller/teacher/courses/chapters/chapter-controller';

const router:Router = express.Router()

router.route("/course/:courseId/chapters/").post(isLoggedIn, restrictTo('teacher'), asyncErrorHandler(addChapterToCourse))
.get(isLoggedIn,asyncErrorHandler(fetchCourseChapters))

export default router;