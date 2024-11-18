// src/controllers/OrderController.ts

import { Request, Response } from 'express';
import Order from '../models/order'; // Įsitikinkite, kad turite sukurtą Order modelį

// Gauti visus užsakymus
export const getAllOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};


// Sukurti naują užsakymą
export const createOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { customerName, items, totalAmount, status } = req.body;
    try {
        const newOrder = new Order({ customerName, items, totalAmount, status });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Gauti užsakymą pagal ID
export const getOrderById = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order', error });
    }
};

// Atnaujinti užsakymą pagal ID
export const updateOrder = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOrder) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};

// Ištrinti užsakymą pagal ID
export const deleteOrder = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};
