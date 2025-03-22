import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllUsers } from '../../src/controllers/adminController.js';
import handleAdmin from '../../src/controllers/adminController.js';
import * as databaseHelpers from '../../src/config/database/helpers.js';

describe('Admin Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Mock the executeQuery function
    vi.spyOn(databaseHelpers, 'executeQuery').mockImplementation(() => Promise.resolve([]));
  });

  describe('getAllUsers', () => {
    it('should retrieve and format all users', async () => {
      const mockUsers = [
        { 
          id: 1, 
          name: 'Admin User', 
          email: 'admin@example.com', 
          created_at: '2023-01-01T00:00:00.000Z',
          last_login: '2023-01-02T00:00:00.000Z'
        },
        { 
          id: 2, 
          name: 'Test User', 
          email: 'test@example.com', 
          created_at: '2023-02-01T00:00:00.000Z',
          last_login: null
        }
      ];
      
      databaseHelpers.executeQuery.mockResolvedValueOnce(mockUsers);
      
      await getAllUsers(req, res);
      
      expect(databaseHelpers.executeQuery).toHaveBeenCalledWith('SELECT * FROM users');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        count: 2,
        users: expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com'
          }),
          expect.objectContaining({
            id: 2,
            name: 'Test User',
            email: 'test@example.com'
          })
        ])
      }));
    });

    it('should handle invalid date formats', async () => {
      const mockUsers = [
        { 
          id: 1, 
          name: 'User with Invalid Date', 
          email: 'invalid@example.com', 
          created_at: 'invalid-date',
          last_login: 'also-invalid'
        }
      ];
      
      databaseHelpers.executeQuery.mockResolvedValueOnce(mockUsers);
      
      await getAllUsers(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        users: expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            name: 'User with Invalid Date',
            created_at: null,
            last_login: null
          })
        ])
      }));
    });

    it('should handle database errors', async () => {
      databaseHelpers.executeQuery.mockRejectedValueOnce(new Error('Database error'));
      
      await getAllUsers(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: expect.stringContaining('Error')
      }));
    });
  });

  describe('handleAdmin', () => {
    it('should validate userIds input', async () => {
      req.body = { 
        action: 'DELETE_USERS',
        userIds: 'not-an-array'
      };
      
      await handleAdmin(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: expect.stringContaining('Invalid')
      }));
    });

    it('should delete users successfully', async () => {
      req.body = { 
        action: 'DELETE_USERS',
        userIds: [1, 2, 3]
      };
      
      databaseHelpers.executeQuery.mockResolvedValueOnce({ affectedRows: 3 });
      
      await handleAdmin(req, res);
      
      expect(databaseHelpers.executeQuery).toHaveBeenCalledWith(
        'DELETE FROM users WHERE id IN (?,?,?)',
        [1, 2, 3]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        message: expect.stringContaining('deleted 3')
      }));
    });

    it('should change user roles', async () => {
      req.body = { 
        action: 'CHANGE_ROLE',
        userIds: [1, 2],
        newRole: 'Admin'
      };
      
      databaseHelpers.executeQuery.mockResolvedValueOnce({ affectedRows: 2 });
      
      await handleAdmin(req, res);
      
      expect(databaseHelpers.executeQuery).toHaveBeenCalledWith(
        'UPDATE users SET role = ? WHERE id IN (?,?)',
        ['Admin', 1, 2]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        message: expect.stringContaining('updated 2')
      }));
    });

    it('should validate role on role change', async () => {
      req.body = { 
        action: 'CHANGE_ROLE',
        userIds: [1, 2],
        newRole: 'InvalidRole'
      };
      
      await handleAdmin(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: expect.stringContaining('Invalid role')
      }));
    });

    it('should toggle user active status', async () => {
      req.body = { 
        action: 'TOGGLE_ACTIVE',
        userIds: [1, 2],
        setActive: true
      };
      
      databaseHelpers.executeQuery.mockResolvedValueOnce({ affectedRows: 2 });
      
      await handleAdmin(req, res);
      
      expect(databaseHelpers.executeQuery).toHaveBeenCalledWith(
        'UPDATE users SET is_active = ? WHERE id IN (?,?)',
        [true, 1, 2]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        message: expect.stringContaining('activated 2')
      }));
    });

    it('should validate setActive parameter', async () => {
      req.body = { 
        action: 'TOGGLE_ACTIVE',
        userIds: [1, 2],
        setActive: 'not-a-boolean'
      };
      
      await handleAdmin(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: expect.stringContaining('Must specify active status')
      }));
    });

    it('should reject invalid actions', async () => {
      req.body = { 
        action: 'INVALID_ACTION',
        userIds: [1, 2]
      };
      
      await handleAdmin(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: expect.stringContaining('Invalid action')
      }));
    });
  });
});