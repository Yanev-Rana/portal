import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type User = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  // city: string;
  // state: string;
};

// ----------------------------------------------------------------------

export function UserView() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('You are not logged in.');
          return;
        }

        const response = await fetch(
          'http://localhost:5000/api/auth/profile',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Unable to load profile');
          return;
        }

        setUser(data.user);
      } catch (err) {
        console.error('Profile error:', err);
        setError('Unable to connect to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 400,
          }}
        >
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent>
        <Alert severity="error">{error}</Alert>
      </DashboardContent>
    );
  }

  if (!user) {
    return (
      <DashboardContent>
        <Alert severity="warning">No user information found.</Alert>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">My Profile</Typography>
      </Box>

      <Card
        sx={{
          maxWidth: 700,
          mx: 'auto',
          p: 4,
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: 40,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
              {user.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              {user.email}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          <ProfileField
            label="Full Name"
            value={user.name}
          />

          <ProfileField
            label="Email Address"
            value={user.email}
          />

          <ProfileField
            label="Phone Number"
            value={user.phone}
          />

          {/* <ProfileField
            label="City"
            value={user.city}
          />

          <ProfileField
            label="State"
            value={user.state}
          /> */}
        </Stack>
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

type ProfileFieldProps = {
  label: string;
  value: string;
};

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mb: 0.5,
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>

      <Typography variant="body1">
        {value}
      </Typography>
    </Box>
  );
}