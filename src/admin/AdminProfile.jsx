import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Grid,
  MenuItem,
  Select,
  Divider
} from '@mui/material'

const AdminProfile = () => {
  const [status, setStatus] = useState('Activated')
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: 'Kalonji Sporer',
    email: 'ursula.moore@example.org',
    phone: '+19929977344',
    dob: '1992-07-03',
    privateNotes: 'Private notes are only visible to admins.'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleStatusChange = event => {
    setStatus(event.target.value)
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handlePasswordChangeToggle = () => {
    setIsChangingPassword(!isChangingPassword)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handlePasswordChange = e => {
    const { name, value } = e.target
    setPasswordData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmitPasswordChange = () => {
    // Handle password change logic here
    // Validate the new password, current password, and confirm password
    // Ensure new password and confirm password match
    // Call API to change password or show an error message if needed
    console.log(passwordData)
  }

  return (
    <Box sx={{ padding: { xs: 1, sm: 2 }, mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant='h6' gutterBottom>
              Admin Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Date of birth'
                  type='date'
                  name='dob'
                  value={formData.dob}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Private notes'
                  name='privateNotes'
                  multiline
                  rows={4}
                  value={formData.privateNotes}
                  onChange={handleInputChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>
            </Grid>
          </Paper>

          {isChangingPassword && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant='h6' gutterBottom>
                Change Password
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Current Password'
                    type='password'
                    name='currentPassword'
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='New Password'
                    type='password'
                    name='newPassword'
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Confirm New Password'
                    type='password'
                    name='confirmPassword'
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={handleSubmitPasswordChange}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant='h6' gutterBottom>
              Avatar
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar
                alt='Kalonji Sporer'
                src='/api/placeholder/150'
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Button variant='contained'>Choose Image</Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant='h6' gutterBottom>
              Publish
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant='subtitle1'>Status</Typography>
              <Select value={status} onChange={handleStatusChange} fullWidth>
                <MenuItem value='Activated'>Activated</MenuItem>
                <MenuItem value='Deactivated'>Deactivated</MenuItem>
              </Select>
            </Box>
            <Button
              variant={isEditing ? 'contained' : 'outlined'}
              color='primary'
              fullWidth
              onClick={handleEditToggle}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              fullWidth
              sx={{ mt: 2 }}
              onClick={handlePasswordChangeToggle}
            >
              {isChangingPassword ? 'Cancel' : 'Change Password'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminProfile
