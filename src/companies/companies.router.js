import { Router } from "express"
import { editarCompany, listarEmpresas, generarReporte } from "./companies.controller.js"
import { updateCompanyValidator, listValidator, reportValidator } from "../middlewares/company-validators.js"
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

router.get(
    "/Reporte/",
    reportValidator,
    generarReporte 
);


export default router
