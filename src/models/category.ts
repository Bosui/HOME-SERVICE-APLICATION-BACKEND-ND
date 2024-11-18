// src/models/category.ts

import mongoose, { Document, Schema } from 'mongoose';

// Tipų apibrėžimas kategorijos laukams
interface Category extends Document {
    name: string;
    backgroundColor?: string;
    iconUrl?: string;
}

// Kategorijos schema
const categorySchema = new Schema < Category > ({
    name: { type: String, required: true },
    backgroundColor: { type: String },
    iconUrl: { type: String }
});

const Category = mongoose.model < Category > ('Category', categorySchema);
export default Category;

