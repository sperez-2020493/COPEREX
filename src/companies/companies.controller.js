import Companies from "../companies/companies.model.js";
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs'; 
import { fileURLToPath } from 'url'; 

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


export const generarReporte = async (req, res) => {
    try {
        const { category, Alfabetico, trayectory } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (trayectory) filter.trayectory = trayectory;

        let sortOptions = {};
        if (Alfabetico === "A-Z") {
            sortOptions.nameCompany = 1; 
        } else if (Alfabetico === "Z-A") {
            sortOptions.nameCompany = -1; 
        }

        let empresas = await Companies.find(filter).sort(sortOptions);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.columns = [
            { header: 'Nombre', key: 'nameCompany', width: 30 },
            { header: 'Descripción', key: 'description', width: 40 },
            { header: 'Dirección', key: 'address', width: 40 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Teléfono', key: 'phone', width: 15 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 15 },
            { header: 'Categoría', key: 'category', width: 20 },
            { header: 'Trayectoria', key: 'trayectory', width: 15 },
            { header: 'Fundación', key: 'Foundation', width: 20 },
        ];

        worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
        worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4F81BD' } };

        empresas.forEach(empresa => {
            worksheet.addRow({
                nameCompany: empresa.nameCompany,
                description: empresa.description,
                address: empresa.address,
                email: empresa.email,
                phone: empresa.phone,
                impactLevel: empresa.impactLevel,
                category: empresa.category,
                trayectory: empresa.trayectory,
                Foundation: empresa.Foundation.toISOString().split('T')[0],
            });
        });

        const filename = `reporte_empresas_${new Date().toISOString()}.xlsx`;

        const __filename = fileURLToPath(import.meta.url);  
        const __dirname = path.dirname(__filename);  

        const filePath = path.join(__dirname, `../../public/reports/companies-report-${Date.now()}.xlsx`);

        await workbook.xlsx.writeFile(filePath);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on('end', () => {
            fs.unlinkSync(filePath); 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error al generar el reporte', error: error.message });
    }
};