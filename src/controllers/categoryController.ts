// src/controllers/CategoryController.ts

import { NextFunction, Request, Response } from 'express';
import Category from '../models/category';

// Gauna visas kategorijas
export const getAllCategories = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
    }
};


// Sukuria naują kategoriją
export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, backgroundColor, iconUrl } = req.body;
        if (!name || !backgroundColor || !iconUrl) {
            res.status(400).json({ message: 'Trūksta būtino lauko' });
            return;
        }
        const newCategory = new Category({ name, backgroundColor, iconUrl });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Klaida kuriant kategoriją:', (error as Error).message);
        next(error);
    }
};

// Atnaujina kategoriją pagal ID
export const updateCategory = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCategory) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// Gauna kategoriją pagal ID
export const getCategoryById = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving category', error });
    }
};
