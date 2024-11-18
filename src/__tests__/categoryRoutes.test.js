// __tests__/categoryRoutes.test.js
import request from 'supertest';
import app from '../app.js';

jest.setTimeout(20000); // 20 sekundžių laiko limitas visiems testams šiame faile

describe('Business Routes', () => {
    it('should retrieve all businesses', async () => {
        const response = await request(app).get('/api/businesses');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    // Kiti testai...



    describe('Category Routes', () => {
        it('should retrieve all categories', async () => {
            const response = await request(app).get('/api/categories');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should create a new category', async () => {
            const newCategory = {
                name: 'Cleaning',
                backgroundColor: '#FF5733',
                iconUrl: 'https://example.com/icon.png'
            };
            const response = await request(app).post('/api/categories').send(newCategory);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('_id');
        });
    });
});