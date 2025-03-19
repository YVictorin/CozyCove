import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import ConfirmationModal from './ConfirmationModal';
import useAuth from '../../../hooks/useAuth';

export default function UsersTable({ searchQuery, activeFilter }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);
  const { auth } = useAuth();

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    action: null
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users', {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json',
        withCredentials: true,
      });

      // Access the users array inside the response object
      setUsers(response.data.users);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on searchQuery and activeFilter
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || 
      (activeFilter === "parents" && user.role === "Parent") ||
      (activeFilter === "admins" && user.role === "Admin");
    
    return matchesSearch && matchesFilter;
  });

  const handleUserSelect = (userId, isSelected) => {
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const performBulkAction = async (action, additionalData = {}) => {
    if (selectedUsers.length === 0) {
      setActionMessage({
        type: 'error',
        text: 'Please select at least one user'
      });
      return;
    }

    try {
      setActionInProgress(true);
      setActionMessage(null);

      const response = await axios.post('/api/admin', {
        action,
        userIds: selectedUsers,
        ...additionalData
      });

      setActionMessage({
        type: 'success',
        text: response.data.message
      });
      
      // Refresh the users list
      fetchUsers();
      // Clear selections
      setSelectedUsers([]);
    } catch (err) {
      setActionMessage({
        type: 'error',
        text: err.response?.data?.message || 'An error occurred'
      });
    } finally {
      setActionInProgress(false);
    }
  };

  const confirmAction = (actionConfig) => {
    setModalConfig({
      isOpen: true,
      ...actionConfig
    });
  };

  const closeModal = () => {
    setModalConfig({
      ...modalConfig,
      isOpen: false
    });
  };

  const handleModalConfirm = () => {
    const { action, params } = modalConfig;
    closeModal();
    if (action) {
      action(...(params || []));
    }
  };

  // Action handler methods that open confirmation modals
  const handleDeleteUsers = () => {
    confirmAction({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete ${selectedUsers.length} user(s)? This action cannot be undone.`,
      action: () => performBulkAction('DELETE_USERS'),
    });
  };

  const handleChangeRole = (newRole) => {
    confirmAction({
      title: 'Confirm Role Change',
      message: `Are you sure you want to change ${selectedUsers.length} user(s) to ${newRole} role?`,
      action: performBulkAction,
      params: ['CHANGE_ROLE', { newRole }]
    });
  };

  const handleToggleActive = (setActive) => {
    const actionText = setActive ? 'activate' : 'deactivate';
    confirmAction({
      title: `Confirm ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
      message: `Are you sure you want to ${actionText} ${selectedUsers.length} user(s)?`,
      action: performBulkAction,
      params: ['TOGGLE_ACTIVE', { setActive }]
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Failed to load users: {error}</p>
        <button 
          onClick={fetchUsers}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Action buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button 
          onClick={handleDeleteUsers}
          disabled={selectedUsers.length === 0 || actionInProgress}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Delete Selected
        </button>
        <button 
          onClick={() => handleChangeRole('Admin')}
          disabled={selectedUsers.length === 0 || actionInProgress}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Make Admin
        </button>
        <button 
          onClick={() => handleChangeRole('Parent')}
          disabled={selectedUsers.length === 0 || actionInProgress}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Make Parent
        </button>
        <button 
          onClick={() => handleToggleActive(true)}
          disabled={selectedUsers.length === 0 || actionInProgress}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Activate
        </button>
        <button 
          onClick={() => handleToggleActive(false)}
          disabled={selectedUsers.length === 0 || actionInProgress}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Deactivate
        </button>
      </div>

      {/* Action messages with X button */}
      {actionMessage && (
        <div className={`mb-4 p-3 rounded flex justify-between items-center ${
          actionMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <span>{actionMessage.text}</span>
          <button 
            onClick={() => setActionMessage(null)} 
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* Users table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-6 text-left">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  checked={selectedUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-right pr-12">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleUserSelect(user.id, e.target.checked)}
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === "Parent" ? "bg-green-100 text-green-800" : 
                    "bg-purple-100 text-purple-800"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.is_active ? "bg-blue-100 text-blue-800" : 
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <p>{new Date(user.joined).toISOString().split('T')[0]}</p>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="text-sm text-gray-500">
            {selectedUsers.length} user(s) selected
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={handleModalConfirm}
        onCancel={closeModal}
      />
    </div>
  );
}