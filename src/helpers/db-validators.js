import Companies from "../companies/companies.model.js"


export const emmailExist = async(email = "") =>{
    const existe = await Companies.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}
 
export const nameCompanyExist = async (nameCompany = "") => {
    const existe = await Companies.findOne({nameCompany})
    if(existe){
        throw new Error(`The user ${nameCompany} is already registered`)
    }
}

export const userExists = async (uid =" ") =>{
    const existe = await Companies.findById(uid)
    if(!existe){
        throw new Error("No existe el ID de la Compañia proporcionado")
    }
}