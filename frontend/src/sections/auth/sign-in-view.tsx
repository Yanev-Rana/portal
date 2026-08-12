import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setError('');
      setLoading(true);

      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Login failed');
          return;
        }

        // Store the JWT token
        localStorage.setItem('token', data.token);

        // Store user information
        localStorage.setItem('user', JSON.stringify(data.user));

        // Login successful
        router.push('/');
      } catch (err) {
        console.error('Login error:', err);
        setError('Unable to connect to the server');
      } finally {
        setLoading(false);
      }
    },
    [email, password, router]
  );

  const renderForm = (
    <Box
      component="form"
      onSubmit={handleSignIn}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      {error && (
        <Alert severity="error" sx={{ width: 1, mb: 3 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  type="button"
                >
                  <Iconify
                    icon={
                      showPassword
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
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
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </Box>
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
        <Typography variant="h5">Sign in</Typography>

        <Typography
  variant="body2"
  sx={{
    color: 'text.secondary',
  }}
>
  Don’t have an account?
  <Link
    variant="subtitle2"
    sx={{ ml: 0.5, cursor: 'pointer' }}
    onClick={() => router.push('/sign-up')}
  >
    Get started
  </Link>
</Typography>
      </Box>

      {renderForm}

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{
            color: 'text.secondary',
            fontWeight: 'fontWeightMedium',
          }}
        >
          OR
        </Typography>
      </Divider>

      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>

        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>

        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>
    </>
  );
}