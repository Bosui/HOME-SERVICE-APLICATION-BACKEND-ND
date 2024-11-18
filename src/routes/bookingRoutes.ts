// src/routes/bookingRoutes.ts

import express from 'express';
import {
    createBooking,
    deleteBooking,
    getBookingsByUserEmail
} from '../controllers/bookingController';

const router = express.Router();

router.get('/user/:email', getBookingsByUserEmail);
router.post('/', createBooking);
router.delete('/:id', deleteBooking);

export default router;

