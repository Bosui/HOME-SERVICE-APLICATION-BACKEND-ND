// src/routes/categoryRoutes.ts

import express from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.get('/:id', getCategoryById);

export default router;

