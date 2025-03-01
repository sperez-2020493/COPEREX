import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";
import { verify } from "argon2";
import Companies from "../companies/companies.model.js";

export const registerCompany = async (req, res) => {
    try {
        const data = req.body;

        
        const fundacionDate = new Date(data.Foundation);
        const fechaDate = new Date();
        const trayectory = fechaDate.getFullYear() - fundacionDate.getFullYear();
        
        data.trayectory = trayectory;
        data.Foundation = fundacionDate;
        
        const company = await Companies.create(data);
        
        return res.status(201).json({
            message: "Empresa registrada exitosamente",
            nameCompany: company.nameCompany,
            email: company.email,
            trayectory: company.trayectory
        });
    } catch (err) {
        return res.status(500).json({
            message: "El registro de la empresa ha fallado",
            error: err.message
        });
    }
};


export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })
        if(!user){
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: "No exite el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return  res.status(400).json({
                message: "Credenciales invalidas",
                error: "Contrasenia incorrecta"
            })
        }

        const token = await generateJWT(user.id)
        
        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
            }
        })

    }catch(err){
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        })
    }
}


