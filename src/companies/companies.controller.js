import Companies from "../companies/companies.model.js";

export const editarCompany = async (req, res) => {
    try {
        const { uid } = req.params; 

        const { nameCompany, description, address, email, phone, impactLevel, category, Foundation } = req.body;
        
        let updatedCompany = { nameCompany, description, address, email, phone, impactLevel, category };

        if (Foundation) {
            const fundacionDate = new Date(Foundation);
            updatedCompany.trayectory = new Date().getFullYear() - fundacionDate.getFullYear();
            updatedCompany.Foundation = fundacionDate;
        }

        const updatedComp = await Companies.findByIdAndUpdate(uid, updatedCompany, { new: true });

        return res.status(200).json({ 
            success: true, 
            message: 'Empresa actualizada', 
            company: updatedComp });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Error al actualizar la empresa', 
            error: error.message });
    }
};

export const listarEmpresas = async (req, res) => {
    try {
        const { trayectory, category, Alfabetico } = req.query; 
        const filterConditions = {};

        if (category) {
            filterConditions.category = category;
        }
        if (trayectory) {
            filterConditions.trayectory = { $gte: parseInt(trayectory) }; 
        }

        let sortOptions = {};

        if (Alfabetico === "A-Z") {
            sortOptions.nameCompany = 1; 
        } else if (Alfabetico === "Z-A") {
            sortOptions.nameCompany = -1; 
        }

        const companies = await Companies.find(filterConditions).sort(sortOptions);

        return res.status(200).json({
            success: true,
            message: 'Listado de empresas',
            companies,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al listar las empresas',
            error: error.message,
        });
    }
};