// src/routes/businessRoutes.ts

import express from 'express';
import {
    createBusiness,
    getAllBusinesses,
    getBookingsByDate,
    getBusinessById,
    getBusinessesByCategory,
    updateBusiness,
} from '../controllers/businessController';
import { validateBusiness } from '../middlewares/validationMiddleware'; // Middleware įvesties patikrai

const router = express.Router();

// Maršrutai
router.get('/', getAllBusinesses); // Gauti visas įmones
router.get('/category/:category', getBusinessesByCategory); // Gauti įmones pagal kategoriją
router.get('/:id', getBusinessById); // Gauti įmonę pagal ID
router.post('/', validateBusiness, createBusiness); // Pridėti naują įmonę su patikra
router.put('/:id', validateBusiness, updateBusiness); // Atnaujinti įmonę pagal ID su patikra
router.get('/:businessId/bookings/date/:date', getBookingsByDate); // Gauti užsakymus pagal datą

export default router;

