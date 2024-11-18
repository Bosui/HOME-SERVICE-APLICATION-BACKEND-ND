import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import categoryRoutes from './routes/categoryRoutes'; // Patikrinkite teisingą kelią

const app: Application = express();
app.use(express.json());

app.use('/api/categories', categoryRoutes);

const PORT: number = parseInt(process.env.PORT || '5000', 10);

const options: ConnectOptions = {
  dbName: 'myDatabase',
};

mongoose
  .connect('mongodb://localhost:27017', options)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
  
