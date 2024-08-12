import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Link,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8dc63f',
  color: 'white',
  '&:hover': {
    backgroundColor: '#7ab32e',
  },
}));

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Handle login logic here
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, backgroundColor: '#f7f8fa' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: '#253D4E', mb: 2 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ color: '#7E7E7E', mb: 2, textAlign: 'center' }}>
            Please enter your email address and password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
              sx={{ backgroundColor: 'white' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              sx={{ backgroundColor: 'white' }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
              }
              label="Remember me"
              sx={{ color: '#7E7E7E' }}
            />
            <GreenButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </GreenButton>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="#" variant="body2" sx={{ color: '#7E7E7E' }}>
                Forgot your password?
              </Link>
              <Link href="/register" variant="body2" sx={{ color: '#7E7E7E' }}>
                Sign up for an account
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;