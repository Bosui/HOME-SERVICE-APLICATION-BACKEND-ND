// __tests__/bookingRoutes.test.ts

import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app'; // Importuokite savo Express aplikaciją
import Booking from '../src/models/Booking'; // Jei naudojate Booking modelį

// Prieš visus testus prisijungiame prie testavimo duomenų bazės
beforeAll(async () => {
    const mongoUri = 'mongodb://localhost:27017/testBookingRoutes';
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Po visų testų išvalome duomenis ir atsijungiame
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

// Prieš kiekvieną testą išvalome Booking kolekciją
beforeEach(async () => {
    await Booking.deleteMany({});
});

// Testas: Sukuria naują užsakymą
describe('POST /api/bookings', () => {
    it('turėtų sukurti naują užsakymą', async () => {
        const newBooking = {
            businessId: '60d0fe4f5311236168a109ca',
            date: '2024-12-01T00:00:00.000Z',
            customerName: 'Test User',
            service: 'Test Service',
        };

        const response = await request(app)
            .post('/api/bookings')
            .send(newBooking);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.customerName).toBe(newBooking.customerName);
    });

    it('turėtų grąžinti klaidą, jei trūksta laukų', async () => {
        const incompleteBooking = {
            date: '2024-12-01T00:00:00.000Z',
            customerName: 'Test User',
        };

        const response = await request(app)
            .post('/api/bookings')
            .send(incompleteBooking);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Trūksta būtino lauko');
    });
});

// Testas: Gauti užsakymus pagal vartotojo el. pašto adresą
describe('GET /api/bookings/user/:email', () => {
    it('turėtų grąžinti užsakymus pagal vartotojo el. paštą', async () => {
        const booking1 = await Booking.create({
            businessId: '60d0fe4f5311236168a109ca',
            date: '2024-12-01T00:00:00.000Z',
            customerName: 'user@test.com',
            service: 'Test Service 1',
        });

        const response = await request(app).get('/api/bookings/user/user@test.com');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]._id).toBe(booking1._id.toString());
    });
});

// Testas: Ištrinti užsakymą pagal ID
describe('DELETE /api/bookings/:id', () => {
    it('turėtų ištrinti užsakymą pagal ID', async () => {
        const booking = await Booking.create({
            businessId: '60d0fe4f5311236168a109ca',
            date: '2024-12-01T00:00:00.000Z',
            customerName: 'Test User',
            service: 'Test Service',
        });

        const response = await request(app).delete(`/api/bookings/${booking._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Užsakymas sėkmingai ištrintas');
    });

    it('turėtų grąžinti klaidą, jei užsakymas nerastas', async () => {
        const invalidId = '60d0fe4f5311236168a109cb';

        const response = await request(app).delete(`/api/bookings/${invalidId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Užsakymas nerastas');
    });
});

