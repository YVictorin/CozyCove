import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../server.js';
import pool from '../../db.js';
import jwt from 'jsonwebtoken';

describe('Account Endpoints', () => {
  let server;
  const validToken = 'valid-token';

  beforeAll(() => {
    // Start the server
    server = app.listen();
  });

  afterAll(() => {
    // Close the server
    server.close();
  });

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  describe('GET /api/account', () => {
    it('should return user account details with valid token', async () => {
      // Mock JWT verification
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        callback(null, { id: 1, email: 'test@example.com' });
      });

      // Mock database response
      const mockUser = { 
        id: 1, 
        name: 'Test User', 
        email: 'test@example.com', 
        password: 'hashed_password', 
        created_at: '2023-01-01T00:00:00.000Z' 
      };
      pool.query.mockResolvedValueOnce([[mockUser]]);

      const response = await request(server)
        .get('/api/account')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        created_at: mockUser.created_at
      });
      
      // Password should not be returned
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 401 with missing token', async () => {
      const response = await request(server)
        .get('/api/account')
        .expect(401);

      expect(response.body).toHaveProperty('message', expect.stringContaining('Auth header not found'));
    });

    it('should return 403 with invalid token', async () => {
      // Mock JWT verification failure
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        callback(new Error('Invalid token'), null);
      });

      const response = await request(server)
        .get('/api/account')
        .set('Authorization', 'Bearer invalid-token')
        .expect(403);
    });

    it('should return 404 if user not found', async () => {
      // Mock JWT verification
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        callback(null, { id: 999, email: 'nonexistent@example.com' });
      });

      // Mock empty database response
      pool.query.mockResolvedValueOnce([[]]);

      const response = await request(server)
        .get('/api/account')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('message', expect.stringContaining('not found'));
    });
  });
});