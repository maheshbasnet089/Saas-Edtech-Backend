import express,{Router} from 'express'
import asyncErrorHandler from '../../../../services/asyncErrorHandler';
import  { isLoggedIn, restrictTo } from '../../../../middleware/middleware';
import { UserRole } from '../../../../middleware/type';
import { createChapterLesson, fetchChapterLesson } from '../../../../controller/teacher/courses/lessons/lesson-controller';

const router:Router = express.Router()

router.route("/:chapterId/lessons").post(isLoggedIn, restrictTo(UserRole.Teacher), asyncErrorHandler(createChapterLesson))
.get(isLoggedIn,asyncErrorHandler(fetchChapterLesson))

export default router;