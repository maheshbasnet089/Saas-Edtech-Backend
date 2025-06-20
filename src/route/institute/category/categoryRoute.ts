

import express, { Router } from "express";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import { createCategory, deleteCategory, getCategories } from "../../../controller/institute/category/categoryController";
const router:Router = express.Router()


router.route("/").get(asyncErrorHandler(getCategories)).post(asyncErrorHandler(createCategory))

router.route("/:id").delete(asyncErrorHandler(deleteCategory))

export default router ; 