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

export const updateCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),    
    param("uid", "No es un ID válido").isMongoId(),
    body("nameCompany").not().isEmpty().withMessage("Name is required"),
    body("description").not().isEmpty().withMessage("User is required"),
    body("address").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is envalide"),
    validarCampos,
    handleErrors
]

export const listValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),    
        validarCampos,
        handleErrors
]

export const reportValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),    
        validarCampos,
        handleErrors
]

