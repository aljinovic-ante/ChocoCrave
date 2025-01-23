import React from 'react';
import { useLocation } from 'react-router-dom';

const OnlyAdmins = () => {
  const location = useLocation();
  const adminUsers = location.state?.adminUsers || [];

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', margin: '20px 0' }}>Admins</h1>
      <ul>
        {adminUsers.map((admin) => (
          <li key={admin._id} style={{ marginBottom: '10px', fontSize: '1.2rem' }}>
            {admin.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlyAdmins;
