import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginUser } from '../../src/controllers/loginController.js';
import pool from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('Login Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'correct_password'
      }
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      cookie: vi.fn()
    };
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should return 400 if email is missing', async () => {
    req.body = { password: 'password123' };
    await loginUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining('required')
    }));
  });

  it('should return 400 if password is missing', async () => {
    req.body = { email: 'test@example.com' };
    await loginUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining('required')
    }));
  });

  it('should return 401 if user is not found', async () => {
    pool.query.mockResolvedValueOnce([[]]);
    
    await loginUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining('Invalid credentials')
    }));
  });

  it('should return 401 if password is incorrect', async () => {
    pool.query.mockResolvedValueOnce([[{ id: 1, email: 'test@example.com', password: 'hashed_password' }]]);
    bcrypt.compare.mockResolvedValueOnce(false);
    
    req.body.password = 'wrong_password';
    await loginUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining('Invalid credentials')
    }));
  });

  it('should return a token and user data on successful login', async () => {
    const mockUser = { 
      id: 1, 
      name: 'Test User', 
      email: 'test@example.com', 
      password: 'hashed_password'
    };
    
    pool.query.mockResolvedValueOnce([[mockUser]]);
    bcrypt.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce('mock-token');
    
    await loginUser(req, res);
    
    expect(res.cookie).toHaveBeenCalledWith('token', 'mock-token', expect.any(Object));
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('success'),
      user: expect.objectContaining({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email
      }),
      accessToken: 'mock-token'
    }));
  });

  it('should handle errors gracefully', async () => {
    pool.query.mockRejectedValueOnce(new Error('Database error'));
    
    await loginUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.any(String)
    }));
  });
});