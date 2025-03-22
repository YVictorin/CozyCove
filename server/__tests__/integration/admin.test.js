import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../server.js';
import * as databaseHelpers from '../../src/config/database/helpers.js';
import jwt from 'jsonwebtoken';

describe('Admin Endpoints', () => {
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
    
    // Default JWT verification to success for admin routes
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: 1, email: 'admin@example.com', role: 'Admin' });
    });
    
    // Mock the executeQuery function
    vi.spyOn(databaseHelpers, 'executeQuery').mockImplementation(() => Promise.resolve([]));
  });

  describe('GET /api/admin', () => {
    it('should return all users for admin', async () => {
      const mockUsers = [
        { 
          id: 1, 
          name: 'Admin User', 
          email: 'admin@example.com', 
          role: 'Admin',
          created_at: '2023-01-01T00:00:00.000Z'
        },
        { 
          id: 2, 
          name: 'Regular User', 
          email: 'user@example.com', 
          role: 'Parent',
          created_at: '2023-02-01T00:00:00.000Z'
        }
      ];
      
      databaseHelpers.executeQuery.mockResolvedValueOnce(mockUsers);

      const response = await request(server)
        .get('/api/admin')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('count', 2);
      expect(response.body.users).toHaveLength(2);
      expect(response.body.users[0]).toMatchObject({
        id: 1,
        name: 'Admin User'
      });
    });

    it('should return 403 with invalid token', async () => {
      // Override the default mock to simulate invalid token
      jwt.verify.mockImplementationOnce((token, secret, callback) => {
        callback(new Error('Invalid token'), null);
      });

      const response = await request(server)
        .get('/api/admin')
        .set('Authorization', 'Bearer invalid-token')
        .expect(403);
    });
  });

  describe('POST /api/admin', () => {
    it('should delete users successfully', async () => {
      const requestBody = {
        action: 'DELETE_USERS',
        userIds: [2, 3]
      };
      
      databaseHelpers.executeQuery.mockResolvedValueOnce({ affectedRows: 2 });

      const response = await request(server)
        .post('/api/admin')
        .set('Authorization', `Bearer ${validToken}`)
        .send(requestBody)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', expect.stringContaining('deleted 2'));
    });

    it('should change user roles', async () => {
      const requestBody = {
        action: 'CHANGE_ROLE',
        userIds: [2, 3],
        newRole: 'Admin'
      };
      
      databaseHelpers.executeQuery.mockResolvedValueOnce({ affectedRows: 2 });

      const response = await request(server)
        .post('/api/admin')
        .set('Authorization', `Bearer ${validToken}`)
        .send(requestBody)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', expect.stringContaining('updated 2'));
      expect(response.body.message).toContain('Admin');
    });

    it('should toggle user active status', async () => {
      const requestBody = {
        action: 'TOGGLE_ACTIVE',
        userIds: [2, 3],
        setActive: false
      };
      
      databaseHelpers.executeQuery.mockResolvedValueOnce({ affectedRows: 2 });

      const response = await request(server)
        .post('/api/admin')
        .set('Authorization', `Bearer ${validToken}`)
        .send(requestBody)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', expect.stringContaining('deactivated 2'));
    });

    it('should reject invalid actions', async () => {
      const requestBody = {
        action: 'INVALID_ACTION',
        userIds: [2, 3]
      };

      const response = await request(server)
        .post('/api/admin')
        .set('Authorization', `Bearer ${validToken}`)
        .send(requestBody)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', expect.stringContaining('Invalid action'));
    });
  });
});