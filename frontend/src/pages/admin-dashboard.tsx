import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function AdminDashboardPage() {
  return (
    <DashboardContent>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4">
          Admin Dashboard
        </Typography>
      </Box>

      <Card
        sx={{
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">
          Welcome to the Admin Dashboard
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: 'text.secondary',
          }}
        >
          This dashboard is only available to administrators.
        </Typography>
      </Card>
    </DashboardContent>
  );
}