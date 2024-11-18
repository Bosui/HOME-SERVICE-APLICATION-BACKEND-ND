// src/routes/companyRoutes.ts

import express from 'express';
import {
    createCompany,
    deleteCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany
} from '../controllers/companyController';

const router = express.Router();

// Gauti visas kompanijas
router.get('/', getAllCompanies);

// Sukurti naują kompaniją
router.post('/', createCompany);

// Gauti kompaniją pagal ID
router.get('/:id', getCompanyById);

// Atnaujinti kompanijos informaciją pagal ID
router.put('/:id', updateCompany);

// Ištrinti kompaniją pagal ID
router.delete('/:id', deleteCompany);

export default router;

