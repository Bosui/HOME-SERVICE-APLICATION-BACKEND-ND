// src/models/user.ts

import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

// Tipų apibrėžimas vartotojo laukams
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isModified: (path: string) => boolean; // Pridedamas mongoose metodas
}

// Vartotojo schema
const userSchema = new Schema < User > ({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Prieš išsaugant vartotoją, šifruojamas slaptažodis
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model < User > ('User', userSchema);

