import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';   // modify export for testability if needed

describe('Book API', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('rejects non-image files', async () => {
    const res = await request(app)
      .post('/api/books')
      .attach('cover', Buffer.from('not an image'), 'test.txt')
      .field('title', 't').field('author', 'a');
    expect(res.statusCode).toBe(500);
  });
});
