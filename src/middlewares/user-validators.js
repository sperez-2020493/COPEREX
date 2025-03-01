import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handle-errors.js";

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("username").optional().isString().withMessage("Invalid username"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]