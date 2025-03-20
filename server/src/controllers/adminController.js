import { executeQuery } from "../config/database/helpers.js";

export const getAllUsers = async (req, res) => {
    try {
      const users = await executeQuery(
        'SELECT * FROM users'
      );
      
      // Format dates for frontend consumption with error handling
      const formattedUsers = users.map(user => {
        let formattedUser = { ...user };
        
        try {
          formattedUser.created_at = user.created_at ? 
            new Date(user.created_at).toISOString() : null;
        } catch (e) {
          console.log(`Invalid created_at date for user ${user.id}:`, user.created_at);
          formattedUser.created_at = null;
        }
        
        try {
          formattedUser.last_login = user.last_login ? 
            new Date(user.last_login).toISOString() : null;
        } catch (e) {
          console.log(`Invalid last_login date for user ${user.id}:`, user.last_login);
          formattedUser.last_login = null;
        }
        
        return formattedUser;
      });
      
      return res.status(200).json({
        success: true,
        count: users.length,
        users: formattedUsers
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };

const handleAdmin = async (req, res) => {
    try {
      const { action, userIds, newRole } = req.body;
      
      // Validate userIds if provided
      if (userIds && (!Array.isArray(userIds) || userIds.length === 0)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or empty user selection'
        });
      }
  
      switch (action) {
        case 'DELETE_USERS':
          // Delete multiple users
          // Convert array to comma-separated placeholders for SQL IN clause
          const placeholders = userIds.map(() => '?').join(',');
          const deleteQuery = `DELETE FROM users WHERE id IN (${placeholders})`;
          
          const deleteResult = await executeQuery(deleteQuery, userIds);
          
          if (deleteResult.affectedRows === 0) {
            return res.status(404).json({
              success: false,
              message: 'No users found to delete'
            });
          }
          
          return res.status(200).json({
            success: true,
            message: `Successfully deleted ${deleteResult.affectedRows} user(s)`
          });
        
        case 'CHANGE_ROLE':
          // Validate new role
          if (!newRole || !['Admin', 'Parent'].includes(newRole)) {
            return res.status(400).json({
              success: false,
              message: 'Invalid role specified'
            });
          }
          
          // Update roles for multiple users
          const rolePlaceholders = userIds.map(() => '?').join(',');
          const updateQuery = `UPDATE users SET role = ? WHERE id IN (${rolePlaceholders})`;
          
          // First parameter is the new role, followed by all userIds
          const updateParams = [newRole, ...userIds];
          const updateResult = await executeQuery(updateQuery, updateParams);
          
          if (updateResult.affectedRows === 0) {
            return res.status(404).json({
              success: false,
              message: 'No users were updated'
            });
          }
          
          return res.status(200).json({
            success: true,
            message: `Successfully updated ${updateResult.affectedRows} user(s) to ${newRole}`
          });
        
        case 'TOGGLE_ACTIVE':
          // Toggle active status for multiple users
          const { setActive } = req.body;
          
          if (typeof setActive !== 'boolean') {
            return res.status(400).json({
              success: false,
              message: 'Must specify active status'
            });
          }
          
          const activePlaceholders = userIds.map(() => '?').join(',');
          const toggleQuery = `UPDATE users SET is_active = ? WHERE id IN (${activePlaceholders})`;
          
          // First parameter is the active status, followed by all userIds
          const toggleParams = [setActive, ...userIds];
          const toggleResult = await executeQuery(toggleQuery, toggleParams);
          
          if (toggleResult.affectedRows === 0) {
            return res.status(404).json({
              success: false,
              message: 'No users were updated'
            });
          }
          
          const statusMessage = setActive ? 'activated' : 'deactivated';
          return res.status(200).json({
            success: true,
            message: `Successfully ${statusMessage} ${toggleResult.affectedRows} user(s)`
          });
        
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid action specified'
          });
      }
    } catch (error) {
      console.error('Admin controller error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };
  
  export default handleAdmin;