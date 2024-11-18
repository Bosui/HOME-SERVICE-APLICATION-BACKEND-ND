// src/controllers/CompanyController.ts

import { Request, Response } from 'express';
import Company from '../models/company';

export const getAllCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Company.find().populate('category');
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving companies', error });
  }
};

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, address, category, contactPerson, email, images } = req.body;
    const newCompany = new Company({ name, description, address, category, contactPerson, email, images });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error creating company', error });
  }
};


export const getCompanyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await Company.findById(req.params.id).populate('category');
    if (!company) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving company', error });
  }
};

export const updateCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error updating company', error });
  }
};

export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      res.status(404).json({ message: 'Company not found' });
      return;
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company', error });
  }
};
