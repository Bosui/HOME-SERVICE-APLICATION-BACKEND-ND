// src/routes/authRoutes.ts

import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = express.Router();

// Registracija
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    console.log('Maršrutas /register pasiektas');
    try {
        const { username, email, password } = req.body;

        // Patikrina, ar visi laukai yra užpildyti
        if (!username || !email || !password) {
            console.log('Trūksta laukų registracijos metu');
            res.status(400).json({ error: 'Visi laukai yra privalomi' });
            return;
        }

        // Patikrina, ar vartotojas jau egzistuoja
        console.log('Pradedamas vartotojo paieškos tikrinimas:', email);
        const existingUser = await User.findOne({ email });
        console.log('Vartotojo paieškos rezultatas:', existingUser);

        if (existingUser) {
            console.log('Vartotojas su šiuo el. paštu jau egzistuoja');
            res.status(400).json({ error: 'Vartotojas su šiuo el. paštu jau egzistuoja' });
            return;
        }

        
        // Sukuria naują vartotoją (šifravimas atliekamas middleware)
        const user = new User({ username, email, password });
        await user.save();
        console.log('Vartotojas sėkmingai sukurtas:', user);

        res.status(201).json({ message: 'Vartotojas sukurtas sėkmingai' });
    } catch (error: any) {
        console.error('Klaida registracijos metu:', error);
        res.status(400).json({ error: 'Registracijos klaida', details: error.message });
    }
});

// Prisijungimas
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    console.log('Maršrutas /login pasiektas');
    try {
        const { email, password } = req.body;

        // Patikrina, ar visi laukai yra užpildyti
        if (!email || !password) {
            console.log('Trūksta laukų prisijungimo metu');
            res.status(400).json({ error: 'Visi laukai yra privalomi' });
            return;
        }

        // Randa vartotoją pagal el. paštą
        const user = await User.findOne({ email });
        console.log('Vartotojas pagal el. paštą:', user);
        if (!user) {
            res.status(400).json({ error: 'Vartotojas nerastas' });
            return;
        }

        // Tikrina slaptažodį
        console.log('Slaptažodis iš užklausos:', password);
        console.log('Slaptažodis iš duomenų bazės:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Palyginimo rezultatas:', isMatch);

        if (!isMatch) {
            res.status(400).json({ error: 'Neteisingas slaptažodis' });
            return;
        }

        // Generuoja JWT tokeną
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
        console.log('Sugeneruotas JWT tokenas:', token);
        res.status(200).json({ token });
    } catch (error: any) {
        console.error('Klaida prisijungimo metu:', error);
        res.status(500).json({ error: 'Prisijungimo klaida', details: error.message });
    }
});

export default router;
