import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuUser, setMenuUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      flexWrap: 'wrap',
    }}
  >
    <Box>
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

    <Chip
      label={`${users.length} Users`}
      variant="outlined"
      sx={{ fontWeight: 600 }}
    />
  </Box>
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
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.name}</TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>{user.phone || '-'}</TableCell>

                  <TableCell>
                    <Chip
                    label={user.role === 'admin' ? 'Admin' : 'User'}
                    size="small"
                    color={user.role === 'admin' ? 'secondary' : 'default'}
                    variant={user.role === 'admin' ? 'filled' : 'outlined'}
                    sx={{
                        fontWeight: 600,
                        textTransform: 'capitalize',
                    }}
                    />
                    </TableCell>
                  <TableCell>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : '-'}
                  </TableCell>

                  <TableCell align="right">
                  <IconButton
                  size="small"
                  onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                  setMenuUser(user);
                  }}  
                  >
                  <Iconify icon="eva:more-vertical-fill" width={20} />
                  </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          >
          <MenuItem
  onClick={() => {
    setSelectedUser(menuUser);
    setAnchorEl(null);
  }}
>
  View User
</MenuItem>

          <MenuItem onClick={() => setAnchorEl(null)}>
            Change Role
          </MenuItem>

          <MenuItem onClick={() => setAnchorEl(null)}>
            Delete User
            </MenuItem>
          </Menu>
          <Dialog
  open={Boolean(selectedUser)}
  onClose={() => setSelectedUser(null)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>User Details</DialogTitle>

  <DialogContent dividers>
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Name
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {selectedUser?.name}
        </Typography>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Email
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {selectedUser?.email}
        </Typography>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Phone
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {selectedUser?.phone || '-'}
        </Typography>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Role
        </Typography>

        <Box sx={{ mt: 0.5 }}>
          <Chip
            label={selectedUser?.role === 'admin' ? 'Admin' : 'User'}
            size="small"
            color={selectedUser?.role === 'admin' ? 'secondary' : 'default'}
            variant={selectedUser?.role === 'admin' ? 'filled' : 'outlined'}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Joined
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {selectedUser?.createdAt
            ? new Date(selectedUser.createdAt).toLocaleDateString()
            : '-'}
        </Typography>
      </Box>
    </Box>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setSelectedUser(null)}>
      Close
    </Button>
  </DialogActions>
</Dialog>
        </TableContainer>
      </Card>
    </DashboardContent>
  );
}