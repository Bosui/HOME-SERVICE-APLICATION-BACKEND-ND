// src/models/business.ts

import mongoose, { Document, Schema } from 'mongoose';

// Tipų apibrėžimas kiekvienam schemas laukui
interface Booking extends Document {
    date: Date;
    customerName: string;
    service: string;
}

interface Business extends Document {
    name: string;
    category: string;
    location: string;
    contactInfo: string;
    bookings: mongoose.Types.DocumentArray<Booking>;
}

// Užsakymų schema
const bookingSchema = new Schema<Booking>({
    date: {
        type: Date,
        required: true,
        validate: {
            validator: (value: Date) => !isNaN(Date.parse(value.toString())),
            message: 'Nurodyta netinkama data',
        },
    },
    customerName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    service: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
});


// Verslo schema
const businessSchema = new Schema<Business>({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    location: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200,
    },
    contactInfo: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /^[0-9\-\+]{9,15}$/.test(v);
            },
            message: 'Nurodyti netinkami kontaktiniai duomenys',
        },
    },
    bookings: {
        type: [bookingSchema],
        validate: {
            validator: function (v: mongoose.Types.DocumentArray<Booking>) {
                return Array.isArray(v);
            },
            message: 'Užsakymai turi būti masyvas',
        },
    },
});

export default mongoose.model<Business>('Business', businessSchema);
