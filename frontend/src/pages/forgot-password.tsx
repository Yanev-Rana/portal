import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function ForgotPasswordView() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setMessage('');
      setError('');
      setLoading(true);

      try {
        const response = await fetch(
          'http://localhost:5000/api/auth/forgot-password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Unable to process request');
          return;
        }

        setMessage(
          'If an account exists with this email, a password reset link has been sent.'
        );
      } catch (err) {
        console.error('Forgot password error:', err);
        setError('Unable to connect to the server');
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Forgot password?</Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'center' }}
        >
          Enter your email address and we&apos;ll send you a link to reset
          your password.
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {error && (
          <Alert severity="error" sx={{ width: 1, mb: 3 }}>
            {error}
          </Alert>
        )}

        {message && (
          <Alert severity="success" sx={{ width: 1, mb: 3 }}>
            {message}
          </Alert>
        )}

        <TextField
          fullWidth
          type="email"
          label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </Button>

        <Link
          component="button"
          type="button"
          variant="body2"
          onClick={() => router.push('/sign-in')}
          sx={{
            mt: 3,
            alignSelf: 'center',
            cursor: 'pointer',
          }}
        >
          Back to sign in
        </Link>
      </Box>
    </>
  );
}