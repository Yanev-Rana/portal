import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { DashboardContent } from 'src/layouts/dashboard';

import { useAuth } from 'src/auth/auth-context';

// ----------------------------------------------------------------------

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt?: string;
};

export default function AdminUsersPage() {
  const { token } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  return (
    <DashboardContent>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          User Management
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: 'text.secondary',
          }}
        >
          Manage registered users and administrator accounts.
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Joined</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.name}</TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>{user.phone || '-'}</TableCell>

                  <TableCell>{user.role}</TableCell>

                  <TableCell>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </DashboardContent>
  );
}