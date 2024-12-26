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
  let { putUser, putError } = usePutUser();
  let { deleteUser, deleteError } = useDeleteUser();
  let { changePassword, changePasswordError } = useChangePassword();

  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [updateError, setUpdateError] = useState(null);

  const [errorModal, setErrorModal] = useState(null);

  // useEffect(() => {
  //   if (putError) {
  //     setErrorModal(`Put Error: ${putError}`);
  //   }
  // }, [putError]);

  useEffect(() => {
    if (deleteError) {
      setErrorModal(`Delete Error: ${deleteError}`);
    }
  }, [deleteError]);

  // useEffect(() => {
  //   if (changePasswordError) {
  //     setErrorModal(`Change Password Error: ${changePasswordError}`);
  //   }
  // }, [changePasswordError]);


  const handleUpdateUser = async () => {
    if (!editUser.username || !editUser.email) {
      setUpdateError('Username and Email cannot be empty');
      return;
    }
    try {
      await putUser(editUser._id, editUser);
      refetchUsers();
      handleCloseEditModal();
    } catch (err) {
      setUpdateError(err.message);
    }
  };;

  const handleCloseErrorModal = () => {
    setErrorModal(null);
  };  

  const handleEdit = (userData) => {
    setEditUser(userData);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditUser(null);
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser._id, refetchUsers);
      setSelectedUser(null);
      setShowDeleteModal(false);
    }
  };

  const handleShowDeleteModal = (userData) => {
    setSelectedUser(userData);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedUser(null);
    setShowDeleteModal(false);
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
    try {
      await changePassword(selectedUser._id, { oldPassword, newPassword });
      refetchUsers();
      handleCloseChangePasswordModal();
    } catch (err) {
      setPasswordMatchError('Old password is wrong');
    }
  };  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (getError) {
    return <div>Error: {getError.message}</div>;
  }

  return (
    <div className="users-container">
      <h1 style={{ textAlign: 'center', fontSize: '2rem', margin: '20px 0', color: 'white' }}>All Users</h1>
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
                  {user.email !== u.email && (
                    <button className="btn-danger" onClick={() => handleShowDeleteModal(u)}>
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {errorModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Error</h2>
              <span className="close" onClick={handleCloseErrorModal}>&times;</span>
            </div>
            <div className="modal-body">
              <p>{errorModal}</p>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={handleCloseErrorModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit User</h2>
              <span className="close" onClick={handleCloseEditModal}>&times;</span>
            </div>
            <div className="modal-body">
              {editUser && (
                <>
                  <label>Username</label>
                  <input
                    type="text"
                    value={editUser.username}
                    onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  />
                  {user.id !== editUser._id && (
                    <label>
                      Admin
                      <input
                        type="checkbox"
                        checked={editUser.isAdmin}
                        onChange={(e) =>
                          setEditUser({ ...editUser, isAdmin: e.target.checked })
                        }
                      />
                    </label>
                  )}
                </>
              )}
              {updateError && <p className="error">{updateError}</p>}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseEditModal}>
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleUpdateUser}
                disabled={!editUser || editUser.username.trim() === '' || editUser.email.trim() === ''}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <span className="close" onClick={handleCloseDeleteModal}>&times;</span>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this user?
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                Confirm
              </button>
            </div>
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