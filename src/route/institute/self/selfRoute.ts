

import express,{Router} from 'express'
import isLoggedIn from '../../../middleware/middleware'
import asyncErrorHandler from '../../../services/asyncErrorHandler'
import { changeMyOrganization, getMyCurrentOrganization, getMyInstitutes } from '../../../controller/institute/self/selfInstituteController'

const router:Router = express.Router()
router.route("/all").get(isLoggedIn,asyncErrorHandler(getMyInstitutes))
router.route("/my").get(isLoggedIn,asyncErrorHandler(getMyCurrentOrganization))
router.route("/change").post(isLoggedIn,asyncErrorHandler(changeMyOrganization))

export default router