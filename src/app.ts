import express from 'express'
const app = express()
import authRoute from "./route/globals/auth/authRoute"

app.use(express.json())
// alternative body-parser

app.use("/api",authRoute)
export default app