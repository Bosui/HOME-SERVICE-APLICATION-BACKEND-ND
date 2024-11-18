// src/middlewares/errorHandler.ts
import { NextFunction, Request, Response } from 'express';

interface ErrorWithStatus extends Error {
    status?: number;
    details?: any;
}

const errorHandler = (
    err: ErrorWithStatus,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Klaida:', err.message); // Spausdina klaidą į konsolę, naudinga debug'inimui

    const statusCode = err.status || 500; // Nustato statuso kodą, numatytasis 500 (vidinė serverio klaida)

    res.status(statusCode).json({
        error: {
            message: err.message || 'Vidinė serverio klaida',
            details: err.details || null, // Gali būti papildoma informacija apie klaidą, jei yra
        },
    });
};

export default errorHandler;

