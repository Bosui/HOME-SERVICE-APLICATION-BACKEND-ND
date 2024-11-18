// __tests__/businessRoutes.test.js
import request from 'supertest';
import app from '../app.js'; // Importuokite savo Express serverį

jest.setTimeout(20000); // 20 sekundžių laiko limitas visiems testams šiame faile

describe('Business Routes', () => {
    it('should retrieve all businesses', async () => {
        const response = await request(app).get('/api/businesses');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    // Kiti testai...



    describe('Business Routes', () => {
        // Testas maršrutui GET /businesses
        it('should retrieve all businesses', async () => {
            const response = await request(app).get('/api/businesses');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        // Testas maršrutui GET /businesses/category/:category
        it('should retrieve businesses by category', async () => {
            const category = 'Restaurant';
            const response = await request(app).get(`/api/businesses/category/${category}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        // Testas maršrutui GET /businesses/:id
        it('should retrieve a business by ID', async () => {
            const businessId = '64b329a7d1f5a123456789ab'; // Pakeiskite ID su esamu duomenų bazės ID
            const response = await request(app).get(`/api/businesses/${businessId}`);
            if (response.status === 404) {
                expect(response.body.message).toBe('Business not found');
            } else {
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('name');
            }
        });

        // Testas maršrutui POST /businesses
        it('should create a new business', async () => {
            const newBusiness = {
                name: 'Test Business',
                category: 'Services',
                location: 'Test City',
                contactInfo: 'test@example.com'
            };
            const response = await request(app).post('/api/businesses').send(newBusiness);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.name).toBe('Test Business');
        });

        // Testas maršrutui PUT /businesses/:id
        it('should update an existing business', async () => {
            const businessId = '64b329a7d1f5a123456789ab'; // Pakeiskite ID su esamu duomenų bazės ID
            const updatedData = {
                name: 'Updated Business Name',
                location: 'Updated Location'
            };
            const response = await request(app).put(`/api/businesses/${businessId}`).send(updatedData);
            if (response.status === 404) {
                expect(response.body.message).toBe('Business not found');
            } else {
                expect(response.status).toBe(200);
                expect(response.body.name).toBe('Updated Business Name');
            }
        });

        // Testas maršrutui GET /businesses/:businessId/bookings/date/:date
        it('should retrieve bookings for a business on a specific date', async () => {
            const businessId = '64b329a7d1f5a123456789ab'; // Pakeiskite ID su esamu duomenų bazės ID
            const date = '2023-11-04'; // Naudokite tinkamą datą
            const response = await request(app).get(`/api/businesses/${businessId}/bookings/date/${date}`);
            if (response.status === 404) {
                expect(response.body.message).toBe('Business not found');
            } else {
                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBe(true);
            }
        });
    });
});
