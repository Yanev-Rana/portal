import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignUpView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setError('');

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          'http://localhost:5000/api/auth/signup',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              phone,
              email,
            //   city,
            //   state,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Registration failed');
          return;
        }

        router.push('/sign-in');
      } catch (err) {
        console.error('Signup error:', err);
        setError('Unable to connect to the server');
      } finally {
        setLoading(false);
      }
    },
    [
      name,
      phone,
      email,
      //   city,
      //   state,
      password,
      confirmPassword,
      router,
    ]
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
        <Typography variant="h5">Create an account</Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Already have an account?
          <Link
            variant="subtitle2"
            sx={{ ml: 0.5, cursor: 'pointer' }}
            onClick={() => router.push('/sign-in')}
          >
            Sign in
          </Link>
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSignUp}
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

        <TextField
          fullWidth
          label="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          sx={{ mb: 3 }}
          required
        />

        <TextField
          fullWidth
          label="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          sx={{ mb: 3 }}
          required
        />

        <TextField
          fullWidth
          type="email"
          label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          sx={{ mb: 3 }}
          required
        />

        {/* <TextField
          fullWidth
          label="City"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          sx={{ mb: 3 }}
          required
        />

        <TextField
          fullWidth
          label="State"
          value={state}
          onChange={(event) => setState(event.target.value)}
          sx={{ mb: 3 }}
          required
        /> */}

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{ mb: 3 }}
          required
          slotProps={{
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
        />

        <TextField
          fullWidth
          label="Confirm password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          sx={{ mb: 3 }}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    edge="end"
                    type="button"
                  >
                    <Iconify
                      icon={
                        showConfirmPassword
                          ? 'solar:eye-bold'
                          : 'solar:eye-closed-bold'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </Box>
    </>
  );
}