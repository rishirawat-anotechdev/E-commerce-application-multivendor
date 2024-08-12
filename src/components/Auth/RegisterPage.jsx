import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Link,
  Paper,
} from '@mui/material';


const RegisterPage = () => {
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '',
    shopURL: '',
    shopPhone: '',
  });

  const handleUserTypeChange = (event, newUserType) => {
    if (newUserType !== null) {
      setUserType(newUserType);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
    <Paper elevation={3} sx={{ mt: 2, p: 4, backgroundColor: '#f7f8fa' }}>
    <Box
        sx={{
          
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={userType}
          exclusive
          onChange={handleUserTypeChange}
          aria-label="User type"
        >
          <ToggleButton value="customer">I am a customer</ToggleButton>
          <ToggleButton value="seller">I am a seller</ToggleButton>
        </ToggleButtonGroup>
        
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Create an {userType} account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {userType === 'seller' && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="shopName"
                label="Shop Name"
                id="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="shopURL"
                label="Shop URL"
                id="shopURL"
                value={formData.shopURL}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="shopPhone"
                label="Shop Phone"
                id="shopPhone"
                value={formData.shopPhone}
                onChange={handleInputChange}
              />
            </>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="I'm not a robot"
          />
       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#8bc34a', '&:hover': { bgcolor: '#7cb342' } }}
          >
            Register
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href="#" variant="body2">
              Forgot your password?
            </Link>
            <Link href="/login" variant="body2">
              Back to login
            </Link>
          </Box>
        </Box>
      </Box>
    </Paper>
    </Container>
  );
};

export default RegisterPage;