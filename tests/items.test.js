const request = require('supertest');
const app = require('../src/app');
const items = require('../src/fakeDb');

beforeEach(() => {
    items.length = 0;
    items.push({ name: "popsicle", price: 1.45}, { name: "cheerios", price: 3.40 });
});

afterEach(() => {
    items.length = 0;
});

describe('GET /items', () => {
    test('should return a list of items', async () => {
        const response = await request(app).get('/items');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { name: "popsicle", price: 1.45 },
            { name: "cheerios", price: 3.40 }
        ]);
    });
});

describe('POST /items', () => {
    test('should add a new item', async () => {
        const newItem = { name: "apple", price: 0.99 };
        const response = await request(app).post('/items').send(newItem);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ added: newItem });
        expect(items).toContainEqual(newItem);
    });
});

describe('GET /items/:name', () => {
    test('should return a single item', async () => {
        const response = await request(app).get('/items/popsicle');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ name: "popsicle", price: 1.45 });
    });

    test('should return 404 if item not found', async () => {
        const response = await request(app).get('/items/notfound');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Item not found" });
    });
});

describe('PATCH /items/:name', () => {
    test('should update an item', async () => {
        const updatedItem = { name: "new popsicle", price: 2.45 };
        const response = await request(app).patch('/items/popsicle').send(updatedItem);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ updated: updatedItem });
        expect(items).toContainEqual(updatedItem);
    });

    test('should return 404 if item not found', async () => {
        const response = await request(app).patch('/items/notfound').send({ name: "new item", price: 2.00 });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Item not found" });
    });
});

describe('DELETE /items/:name', () => {
    test('should delete an item', async () => {
        const response = await request(app).delete('/items/popsicle');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Deleted" });
        expect(items).not.toContainEqual({ name: "popsicle", price: 1.45 });
    });

    test('should return 404 if item not found', async () => {
        const response = await request(app).delete('/items/notfound');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Item not found" });
    });
});