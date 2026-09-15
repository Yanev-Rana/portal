import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { useAuth } from 'src/auth/auth-context';

// ----------------------------------------------------------------------

export default function AdminDashboardPage() {

    const { token } = useAuth();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

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
          const users = data.users || [];

          setTotalUsers(users.length);
          setTotalAdmins(
            users.filter((user: { role: string }) => user.role === 'admin').length
          );
        }
      } catch (error) {
        console.error('Failed to fetch admin statistics:', error);
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
          Admin Dashboard
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: 'text.secondary',
          }}
        >
          Manage users, monitor activity, and control your portal from one place.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              Total Users
            </Typography>

            <Typography
              variant="h3"
              sx={{
                mt: 1,
                fontWeight: 700,
              }}
            >
              {totalUsers}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                mt: 1,
                display: 'block',
                color: 'text.secondary',
              }}
            >
              Registered accounts
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              Administrators
            </Typography>

            <Typography
              variant="h3"
              sx={{
                mt: 1,
                fontWeight: 700,
              }}
            >
              {totalAdmins}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                mt: 1,
                display: 'block',
                color: 'text.secondary',
              }}
            >
              Accounts with admin access
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              System Status
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mt: 1,
                fontWeight: 700,
              }}
            >
              Operational
            </Typography>

            <Typography
              variant="caption"
              sx={{
                mt: 1,
                display: 'block',
                color: 'text.secondary',
              }}
            >
              All core services available
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Card
        sx={{
          p: 3,
          mt: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: 700,
          }}
        >
          Quick Actions
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: 'text.secondary',
          }}
        >
          Access frequently used administrative controls.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
        >
          <Button variant="contained">
            Manage Users
          </Button>

          <Button variant="outlined">
            View Reports
          </Button>

          <Button variant="outlined">
            System Settings
          </Button>
        </Stack>
      </Card>
    </DashboardContent>
  );
}