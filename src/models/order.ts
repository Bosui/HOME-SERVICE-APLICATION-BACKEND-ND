// src/models/order.ts

import mongoose, { Document, Schema } from 'mongoose';

// Tipų apibrėžimas užsakymo laukams
interface Order extends Document {
    companyId: mongoose.Types.ObjectId; // Nuoroda į 'Company'
    date: Date;
    time: string;
    userEmail: string;
    userName: string;
    status: 'Pending' | 'Completed' | 'Cancelled'; // Galimos statuso reikšmės
}

// Užsakymo schema
const orderSchema = new Schema < Order > ({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
});

export default mongoose.model < Order > ('Order', orderSchema);

