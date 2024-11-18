// src/middlewares/validationMiddleware.ts

import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

// Schema, skirta įmonės duomenų patikrai
const businessSchema = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    location: Joi.string().min(3).required(),
    contactInfo: Joi.string().min(5).required(),
});

export const validateBusiness = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { error } = businessSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            message: 'Invalid input data',
            details: error.details,
        });
        return; // Aiškiai grąžina void
    }
    next(); // Perduoda kontrolę
};

