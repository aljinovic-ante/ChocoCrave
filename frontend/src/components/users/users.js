import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import useGetUsers from '../../hooks/users/useGetUsers';
import usePutUser from '../../hooks/users/usePutUser';
import useDeleteUser from '../../hooks/users/useDeleteUser';
import useChangePassword from '../../hooks/users/useChangePass';
import '../../css/users.css';

const Users = () => {
  const { user } = useAuth();
  const { users, loading, getError, refetchUsers } = useGetUsers();
  const { putUser, putError } = usePutUser();
  const { deleteUser, deleteError } = useDeleteUser();
  const { changePassword, changePasswordError } = useChangePassword();

  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  useEffect(() => {
    if (putError) console.error('Put Error:', putError);
    if (deleteError) console.error('Delete Error:', deleteError);
    if (changePasswordError) console.error('Change Password Error:', changePasswordError);
  }, [putError, deleteError, changePasswordError]);

  const handleEdit = (userData) => {
    setEditUser(userData);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditUser(null);
    setShowEditModal(false);
  };

  const handleUpdateUser = async () => {
    if (editUser) {
      await putUser(editUser._id, editUser);
      refetchUsers();
      handleCloseEditModal();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id, refetchUsers);
    }
  };

  const handleChangePassword = (userData) => {
    setSelectedUser(userData);
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setSelectedUser(null);
    setShowChangePasswordModal(false);
    setOldPassword('');
    setNewPassword('');
    setRepeatPassword('');
    setPasswordMatchError('');
  };

  const handleSaveNewPassword = async () => {
    if (newPassword !== repeatPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }
    await changePassword(selectedUser._id, { oldPassword, newPassword });
    refetchUsers();
    handleCloseChangePasswordModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (getError) {
    return <div>Error: {getError.message}</div>;
  }

  return (
    <div className="users-container">
      <h1>Users Panel</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td style={{ color: u.isAdmin ? 'green' : 'red' }}>{u.isAdmin.toString()}</td>
              <td>
                <div className="user-actions">
                  <button className="btn-warning" onClick={() => handleEdit(u)}>
                    Edit
                  </button>
                  <button className="btn-primary" onClick={() => handleChangePassword(u)}>
                    Change Password
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(u._id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseEditModal}>&times;</span>
            <h2>Edit User</h2>
            {editUser && (
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={editUser.isAdmin}
                    onChange={(e) => setEditUser({ ...editUser, isAdmin: e.target.checked })}
                  />
                  Admin
                </label>
              </div>
            )}
            <button onClick={handleUpdateUser}>Update</button>
          </div>
        </div>
      )}

      {showChangePasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Change Password</h2>
              <span className="close" onClick={handleCloseChangePasswordModal}>&times;</span>
            </div>
            <div className="modal-body">
              <label>Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label>Repeat Password</label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              {passwordMatchError && <p className="error">{passwordMatchError}</p>}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseChangePasswordModal}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSaveNewPassword}>
                Save Password
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;
