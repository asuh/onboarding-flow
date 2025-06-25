"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { transformUserData, formatAddress } from '@/lib/userUtils';

export default function Data() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  if (loading) {
    return <p>Loading users...</p>;
  }
  
  if (error) {
    return <div className="error-message">
      <p>Error loading user data: {error}</p>
      <p>Please try again later or check the server logs.</p>
    </div>;
  }

  if (users.length === 0) {
    return <p>No users found. Submit the form to add a new user.</p>;
  }

  return <div className="data-container">
    <h1>User Data</h1>
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>Birthdate</th>
            <th>About Me</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const userData = transformUserData(user);
            
            return <tr key={user.id}>
              <td>{userData.email}</td>
              <td>{'•'.repeat(8)}</td>
              <td>{formatAddress(userData)}</td>
              <td>{userData.birthdate}</td>
              <td>{userData.aboutMe}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  </div>;
}
