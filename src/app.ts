import express from 'express'
const app = express()
import authRoute from "./route/globals/auth/authRoute"
import instituteRoute from "./route/institute/instituteRoute"
import courseRoute from './route/institute/course/courseRoute'
import studentRoute from './route/institute/student/studentRoute'
import categoryRoute from './route/institute/category/categoryRoute'
import teacherInstituteRoute from './route/institute/teacher/teacherRoute'
import teacherRoute from './route/teacher/teacherRoute'
import cors from 'cors'

app.use(express.json())
// alternative body-parser

// cors config 
app.use(cors({
    origin : "http://localhost:3000"
}))
//GLOBAL ROUTE
app.use("/api/auth",authRoute)

//INSTITUTE ROUTE
app.use("/api/institute",instituteRoute)
app.use('/api/institute/course',courseRoute)
app.use('/api/institute/student',studentRoute)
app.use('/api/institute/category',categoryRoute)
app.use('/api/institute/teacher',teacherInstituteRoute)

//TEACHER ROUTE
app.use("/api/teacher",teacherRoute)

export default app