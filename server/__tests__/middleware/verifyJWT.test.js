import { describe, it, expect, vi, beforeEach } from 'vitest';
import verifyJWT from '../../src/middleware/verifyJWT.js';
import jwt from 'jsonwebtoken';

describe('JWT Verification Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {}
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      sendStatus: vi.fn()
    };
    next = vi.fn();
    
    // Reset JWT verify mock before each test
    jwt.verify.mockClear();
  });

  it('should return 401 if no auth header or cookie is present', () => {
    verifyJWT(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('Auth header not found')
    }));
    expect(next).not.toHaveBeenCalled();
  });

  it('should extract token from Authorization header with Bearer prefix', () => {
    req.headers.authorization = 'Bearer valid-token';
    
    verifyJWT(req, res, next);
    
    expect(jwt.verify).toHaveBeenCalledWith('valid-token', expect.any(String), expect.any(Function));
    expect(next).toHaveBeenCalled();
  });

  it('should extract token from cookie if no Authorization header', () => {
    req.cookies = { token: 'valid-token' };
    
    verifyJWT(req, res, next);
    
    expect(jwt.verify).toHaveBeenCalledWith('valid-token', expect.any(String), expect.any(Function));
    expect(next).toHaveBeenCalled();
  });

  it('should extract token directly if no Bearer prefix', () => {
    req.headers.authorization = 'valid-token';
    
    verifyJWT(req, res, next);
    
    expect(jwt.verify).toHaveBeenCalledWith('valid-token', expect.any(String), expect.any(Function));
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if token verification fails', () => {
    req.headers.authorization = 'Bearer invalid-token';
    
    verifyJWT(req, res, next);
    
    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('should add email to request and call next() on successful verification', () => {
    req.headers.authorization = 'Bearer valid-token';
    
    verifyJWT(req, res, next);
    
    expect(req.email).toBe('test@example.com');
    expect(next).toHaveBeenCalled();
  });
});