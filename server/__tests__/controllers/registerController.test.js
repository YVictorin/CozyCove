import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser } from '../../src/controllers/registerController.js';
import pool from '../../db.js';
import bcrypt from 'bcrypt';

describe('Register Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        needType: 'Parent',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        agreeTerms: true
      }
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should return 400 if required fields are missing', async () => {
    // Test with missing name
    req.body = { email: 'test@example.com', password: 'password123' };
    await registerUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining('required')
    }));

    // Reset mocks
    vi.clearAllMocks();

    // Test with missing email
    req.body = { name: 'Test User', password: 'password123' };
    await registerUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    
    // Reset mocks
    vi.clearAllMocks();

    // Test with missing password
    req.body = { name: 'Test User', email: 'test@example.com' };
    await registerUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should hash password and create a new user', async () => {
    bcrypt.hash.mockResolvedValueOnce('hashed_password');
    pool.query.mockResolvedValueOnce([{ insertId: 1 }]);
    
    await registerUser(req, res);
    
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO users'),
      ['Parent', 'Test User', 'test@example.com', 'hashed_password', 1]
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('registered successfully'),
      userId: 1
    }));
  });

  it('should handle duplicate email errors', async () => {
    const duplicateError = new Error('Duplicate entry');
    duplicateError.code = 'ER_DUP_ENTRY';
    pool.query.mockRejectedValueOnce(duplicateError);
    
    await registerUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining('already exists')
    }));
  });

  it('should handle other database errors gracefully', async () => {
    pool.query.mockRejectedValueOnce(new Error('Database error'));
    
    await registerUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.any(String)
    }));
  });
});