import { vi } from 'vitest';
import dotenv from 'dotenv';

// Set up environment for tests
dotenv.config({ path: '.env.test' });

// Create a mock for MySQL connection pool
vi.mock('../db.js', () => {
  return {
    default: {
      query: vi.fn(),
      execute: vi.fn()
    }
  };
});

// Mock JWT for authentication tests
vi.mock('jsonwebtoken', () => {
  return {
    default: {
      sign: vi.fn().mockReturnValue('mock-token'),
      verify: vi.fn((token, secret, callback) => {
        if (token === 'valid-token') {
          callback(null, { id: 1, email: 'test@example.com' });
        } else {
          callback(new Error('Invalid token'), null);
        }
      }),
    }
  };
});

// Mock bcrypt for password hashing
vi.mock('bcrypt', () => {
  return {
    default: {
      hash: vi.fn().mockResolvedValue('hashed_password'),
      compare: vi.fn().mockImplementation((password, hash) => {
        return Promise.resolve(password === 'correct_password');
      }),
    }
  };
});

// Create a global cleanup function
global.afterAll(() => {
  vi.clearAllMocks();
});