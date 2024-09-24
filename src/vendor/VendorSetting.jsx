import React from 'react'
import {
  Grid,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Button,
  MenuItem
} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'

const VendorSetting = () => {
  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, mt: 2, backgroundColor:"#fff" }}>
            {/* Logo Section */}
       <Typography variant='h6' gutterBottom sx={{mt:4}}>
            Store logo
          </Typography>
          <Grid
            item
            xs={12}
            sm={4}
            display='flex'
            flexDirection='column'
            alignItems='center'
            sx={{ mt: 4 }}
          >
            <img
              src='/path/to/logo.png'
              alt='Logo'
              style={{ width: 100, height: 100 }}
            />
            <Button variant='contained' component='label'>
              Choose Image
              <input type='file' hidden />
            </Button>
            <Typography variant='body2' align='center'>
              This logo will be used in Store logo
            </Typography>
          </Grid>
      <Typography variant='h6' gutterBottom>
        Store Information
      </Typography>

      <Grid container spacing={3}>
        {/* Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='name'
            name='name'
            label='Name'
            fullWidth
            variant='outlined'
            defaultValue='GoPro'
          />
        </Grid>

        {/* Shop URL */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='shopUrl'
            name='shopUrl'
            label='Shop URL'
            fullWidth
            variant='outlined'
            defaultValue='gopro'
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='email'
            name='email'
            label='Email'
            fullWidth
            variant='outlined'
            defaultValue='dixie67@example.net'
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            id='phone'
            name='phone'
            label='Phone'
            fullWidth
            variant='outlined'
            defaultValue='+17749778923'
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            id='description'
            name='description'
            label='Description'
            fullWidth
            multiline
            rows={3}
            variant='outlined'
            defaultValue='Qui tenetur nihil voluptas ipsam ipsa nulla id.'
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant='h6' gutterBottom>
          Social Media Links
        </Typography>

        <Grid container spacing={3}>
          {/* Instagram */}
          <Grid item xs={12} sm={6}>
            <TextField
              id='instagram'
              label='Instagram'
              fullWidth
              variant='outlined'
              defaultValue='https://instagram.com/'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <InstagramIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* YouTube */}
          <Grid item xs={12} sm={6}>
            <TextField
              id='youtube'
              label='YouTube'
              fullWidth
              variant='outlined'
              defaultValue='https://youtube.com/'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <YouTubeIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* X (Twitter) */}
          <Grid item xs={12} sm={6}>
            <TextField
              id='twitter'
              label='X (Twitter)'
              fullWidth
              variant='outlined'
              defaultValue='https://x.com/'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <TwitterIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* Pinterest */}
          <Grid item xs={12} sm={6}>
            <TextField
              id='pinterest'
              label='Pinterest'
              fullWidth
              variant='outlined'
              defaultValue='https://pinterest.com/'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PinterestIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h6' gutterBottom>
          Country Information
        </Typography>
        <Grid container spacing={2}>
          {/* Country */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label='Country'
              defaultValue=''
              variant='outlined'
            >
              <MenuItem value='Italy'>Italy</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </TextField>
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='State'
              defaultValue='Michigan'
              variant='outlined'
            />
          </Grid>

          {/* City */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='City'
              defaultValue='Damonhaven'
              variant='outlined'
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Address'
              defaultValue='521 Fat Crest'
              variant='outlined'
            />
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' variant='outlined' />
          </Grid>

          {/* Tax ID */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Tax ID' variant='outlined' />
          </Grid>

         
        </Grid>
      </Box>
   
          <Box sx={{ display: 'flex', gap: 2, marginTop: 4 }}>
      {/* Save Button with Green Theme */}
      <Button
        variant="contained"
        sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
        startIcon={<i className="fas fa-save"></i>} // You can replace this with an appropriate icon
      >
        Save
      </Button>

    
    </Box>
    </Box>
  )
}

export default VendorSetting
