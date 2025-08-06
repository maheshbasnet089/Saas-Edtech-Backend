


import express,{Router} from 'express'
import asyncErrorHandler from '../../../../services/asyncErrorHandler';
import  { isLoggedIn, restrictTo } from '../../../../middleware/middleware';
import { createCourseChapterTable } from '../../../../controller/institute/instituteController';
import { addChapterToCourse, fetchCourseChapters } from '../../../../controller/teacher/courses/chapters/chapter-controller';
import { UserRole } from '../../../../middleware/type';

const router:Router = express.Router()

router.route("/:courseId/chapters/").post(isLoggedIn, restrictTo(UserRole.Teacher), asyncErrorHandler(addChapterToCourse))
.get(isLoggedIn,asyncErrorHandler(fetchCourseChapters))

export default router;