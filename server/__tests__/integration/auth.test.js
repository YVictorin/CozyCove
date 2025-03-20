import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../server.js';
import pool from '../../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

describe('Authentication Endpoints', () => {
  let server;

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

  describe('POST /api/register', () => {
    it('should register a new user with valid data', async () => {
      const userData = {
        needType: 'Parent',
        name: 'New Test User',
        email: 'newuser@example.com',
        password: 'password123',
        agreeTerms: true
      };

      // Mock successful database insertion
      pool.query.mockResolvedValueOnce([{ insertId: 999 }]);

      const response = await request(server)
        .post('/api/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('message', expect.stringContaining('registered successfully'));
      expect(response.body).toHaveProperty('userId', 999);
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    });

    it('should reject registration with missing fields', async () => {
      const userData = {
        // Missing required fields
        name: 'Incomplete User'
      };

      const response = await request(server)
        .post('/api/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', expect.stringContaining('required'));
    });

    it('should handle duplicate email', async () => {
      const userData = {
        needType: 'Parent',
        name: 'Duplicate User',
        email: 'existing@example.com',
        password: 'password123',
        agreeTerms: true
      };

      // Mock database error for duplicate email
      const duplicateError = new Error('Duplicate entry');
      duplicateError.code = 'ER_DUP_ENTRY';
      pool.query.mockRejectedValueOnce(duplicateError);

      const response = await request(server)
        .post('/api/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', expect.stringContaining('already exists'));
    });
  });

  describe('POST /api/login', () => {
    it('should login successfully with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'correct_password'
      };

      // Mock user lookup
      const mockUser = { 
        id: 1, 
        name: 'Test User', 
        email: 'test@example.com', 
        password: 'hashed_password' 
      };
      
      pool.query.mockResolvedValueOnce([[mockUser]]);
      bcrypt.compare.mockResolvedValueOnce(true);
      jwt.sign.mockReturnValueOnce('test-jwt-token');

      const response = await request(server)
        .post('/api/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('message', expect.stringContaining('success'));
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user).toMatchObject({
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      });
      
      // Check if cookie was set
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should reject login with invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrong_password'
      };

      // Mock user lookup
      const mockUser = { 
        id: 1, 
        name: 'Test User', 
        email: 'test@example.com', 
        password: 'hashed_password' 
      };
      
      pool.query.mockResolvedValueOnce([[mockUser]]);
      bcrypt.compare.mockResolvedValueOnce(false);

      const response = await request(server)
        .post('/api/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('error', expect.stringContaining('Invalid credentials'));
    });

    it('should reject login for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      // Mock empty user lookup result
      pool.query.mockResolvedValueOnce([[]]);

      const response = await request(server)
        .post('/api/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('error', expect.stringContaining('Invalid credentials'));
    });
  });

  describe('POST /api/logout', () => {
    it('should clear the auth cookie on logout', async () => {
      const response = await request(server)
        .post('/api/logout')
        .expect(200);

      expect(response.body).toHaveProperty('message', expect.stringContaining('Logged out'));
      
      // Check if cookie was cleared
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain('token=;');
    });
  })
});