import { body,param } from "express-validator";
import { nameCompanyExist, emmailExist } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-role.js";
import { handleErrors } from "./handle-errors.js";


export const registerValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),    
    body("nameCompany").not().isEmpty().withMessage("Name is required"),
    body("description").not().isEmpty().withMessage("User is required"),
    body("address").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is envalide"),
    body("email").custom(emmailExist),
    body("nameCompany").custom(nameCompanyExist),
        validarCampos,
        handleErrors
]

