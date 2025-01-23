import React from 'react';
import { useLocation } from 'react-router-dom';

const OnlyUsers = () => {
  const location = useLocation();
  const nonAdminUsers = location.state?.nonAdminUsers || [];

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', margin: '20px 0' }}>Users</h1>
      <ul>
        {nonAdminUsers.map((user) => (
          <li key={user._id} style={{ marginBottom: '10px', fontSize: '1.2rem' }}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlyUsers;
