import supertest from 'supertest';
import express from 'express';
import TaskRoutes from '../routes/routes.js'; 
import { connectDB } from '../utils/connection.js'; 
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use('/api', TaskRoutes);

const request = supertest(app); 

beforeAll(async () => {
    await connectDB(); 
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Tasks Routes', () => {
    let taskId: string;

    it('should create a new task', async () => {
        const response = await request
            .post('/api/task')
            .send({
                taskName: 'Test Task', 
                title: 'Test Title',
                description: 'This is a test task.',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.taskName).toBe('Test Task');

        taskId = response.body._id; 
    });

    it('should return all tasks', async () => {
        const response = await request.get('/api/tasks');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return a single task', async () => {
        const response = await request.get(`/api/task/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', taskId); 
    });


    it('should delete a task', async () => {
        const response = await request.delete(`/api/task/${taskId}`);

        expect(response.status).toBe(204);
    });
});