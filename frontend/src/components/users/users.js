import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { BsFloppyFill, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import useGetUsers from '../../hooks/users/useGetUsers';
import usePutUser from '../../hooks/users/usePutUser';
import useDeleteUser from '../../hooks/users/useDeleteUser';
import useChangePassword from '../../hooks/users/useChangePass';

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
  }, [putError]);

  useEffect(() => {
    if (deleteError) console.error('Delete Error:', deleteError);
  }, [deleteError]);

  useEffect(() => {
    if (changePasswordError) console.error('Change Password Error:', changePasswordError);
  }, [changePasswordError]);

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

    try {
      await changePassword(selectedUser._id, { oldPassword, newPassword });
      refetchUsers();
      handleCloseChangePasswordModal();
    } catch (error) {
      alert('Error changing password');
    }
  };

  console.log("USER STATUS: ",user.isAdmin)
  if (!user || !user.isAdmin) {
    return (
      <Container className="mt-5">
        <h1>Only admin access allowed</h1>
      </Container>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (getError) {
    return <div>Error: {getError.message}</div>;
  }
  console.log(users)
  return (
    <Container className="mt-5">
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="align-middle">{u.email}</td>
              <td className="align-middle">{u.isAdmin.toString()}</td>
              <td>
                {user.email !== u.email && (
                  <>
                    <Button variant="light" className="text-warning" onClick={() => handleEdit(u)}>
                      <BsPencilSquare />
                    </Button>
                    <Button
                      variant="light"
                      className="text-warning"
                      onClick={() => handleChangePassword(u)}
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="light"
                      className="text-danger"
                      onClick={() => handleDelete(u._id)}
                    >
                      <BsTrash />
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUser && (
            <>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="isAdmin">
                <Form.Check
                  type="checkbox"
                  label="Admin"
                  checked={editUser.isAdmin}
                  onChange={(e) => setEditUser({ ...editUser, isAdmin: e.target.checked })}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="warning" onClick={handleUpdateUser}>
            <BsFloppyFill /> Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showChangePasswordModal} onHide={handleCloseChangePasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="oldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="repeatPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {passwordMatchError && <p className="text-danger">{passwordMatchError}</p>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChangePasswordModal}>
            Close
          </Button>
          <Button variant="warning" onClick={handleSaveNewPassword}>
            <BsFloppyFill /> Save Password
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;
