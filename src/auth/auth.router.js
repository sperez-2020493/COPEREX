import { Router } from "express"
import { login, registerCompany } from "./auth.controller.js"
import { loginValidator} from "../middlewares/user-validators.js"
import { registerValidator } from "../middlewares/company-validators.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"

const router = Router()

router.post(
    "/register",
    registerValidator, 
    deleteFileOnError,
    registerCompany
)

router.post(
    "/login",
    loginValidator,
    deleteFileOnError,
    login
)

export default router