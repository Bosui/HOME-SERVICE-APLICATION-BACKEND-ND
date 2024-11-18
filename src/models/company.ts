// src/models/company.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

// Tipų apibrėžimas įmonės laukams
export interface ICompany extends Document {
  name: string;
  description: string;
  address: string;
  category: mongoose.Types.ObjectId; // Nuoroda į kategorijos modelį
  contactPerson: string;
  email: string;
  images: string[];
}

// Įmonės schema
const companySchema: Schema<ICompany> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Pridėta `required`
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // El. pašto validacija
  images: [{ type: String }],
});

// Eksportuojamas modelis
const Company: Model<ICompany> = mongoose.model<ICompany>('Company', companySchema);
export default Company;

