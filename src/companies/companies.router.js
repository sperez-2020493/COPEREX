import { Router } from "express"
import { editarCompany, listarEmpresas } from "./companies.controller.js"
import { updateCompanyValidator, listValidator } from "../middlewares/company-validators.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"

const router = Router()

router.put(
    "/editCompany/:uid",
    updateCompanyValidator, 
    deleteFileOnError,
    editarCompany
)

router.get(
    "/companies/",
    listValidator,
    listarEmpresas 
);

export default router
