// src/config/db.ts

import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
      // `useNewUrlParser` ir `useUnifiedTopology` nebėra būtini, jie įjungiami automatiškai
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', (err as Error).message);
    process.exit(1);
  }
};


export default connectDB;
