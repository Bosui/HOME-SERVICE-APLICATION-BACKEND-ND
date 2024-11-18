// src/routes/orderRoutes.ts

import express from 'express';
import {
    createOrder,
    deleteOrder,
    getAllOrders,
    getOrderById,
    updateOrder
} from '../controllers/orderController';

const router = express.Router();

// Gauti visus užsakymus
router.get('/', getAllOrders);

// Sukurti naują užsakymą
router.post('/', createOrder);

// Gauti užsakymą pagal ID
router.get('/:id', getOrderById);

// Atnaujinti užsakymą pagal ID
router.put('/:id', updateOrder);

// Ištrinti užsakymą pagal ID
router.delete('/:id', deleteOrder);

export default router;

