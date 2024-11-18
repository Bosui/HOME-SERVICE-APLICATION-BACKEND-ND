// src/routes/routes.ts

import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/test', (req: Request, res: Response): void => {
    res.json({ message: 'Test route works!' });
});

export default router;

