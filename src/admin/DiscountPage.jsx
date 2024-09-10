import React from 'react';
import { Box, TextField, MenuItem, Button, Checkbox, FormControlLabel, Grid, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const DiscountPage = () => {
  const [couponCode, setCouponCode] = React.useState('');
  const [unlimitedCoupon, setUnlimitedCoupon] = React.useState(true);
  const [neverExpired, setNeverExpired] = React.useState(true);
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleSave = () => {
    // Handle save logic, including API integration
    console.log({
      couponCode,
      unlimitedCoupon,
      neverExpired,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  return (
    <Box   sx={{p: { xs: 1, sm: 2 } , mt: 2,backgroundColor: '#fff' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Discount Configuration</Typography>
          
          {/* Select Discount Type */}
          <FormControl fullWidth sx={{ mb: 2 }}>
           
            <Select value="Coupon code">
              <MenuItem value="Coupon code">Coupon code</MenuItem>
              <MenuItem value="Coupon code">Discount code</MenuItem>
            </Select>
          </FormControl>

          {/* Coupon Code Input */}
          <TextField
            label="Create coupon code"
            value={couponCode}
            onChange={handleCouponCodeChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Generate Coupon Button */}
          <Button variant="contained" sx={{ mb: 2 }}>
            Generate coupon code
          </Button>

       

          {/* Coupon Type, Discount, and Apply For */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
           
            <TextField label="Discount" type="number" defaultValue={0} />
            
            <FormControl sx={{ width: '150px' }}>
              <InputLabel>Apply for</InputLabel>
              <Select value="All orders">
                <MenuItem value="All orders">All orders</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Date Pickers */}
        <Grid container spacing={3} item xs={12} md={8}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Grid container item spacing={2}>
      <Grid item xs={12} md={6}>
        <DateTimePicker
          label="Start date"
          value={startDate}
          onChange={setStartDate}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DateTimePicker
          label="End date"
          value={endDate}
          onChange={setEndDate}
          renderInput={(params) => <TextField {...params} fullWidth />}
          disabled={neverExpired}
        />
      </Grid>
    </Grid>
  </LocalizationProvider>

  {/* Never Expired Checkbox */}
  <Grid item xs={12}>
    <FormControlLabel
      control={
        <Checkbox
          checked={neverExpired}
          onChange={() => setNeverExpired(!neverExpired)}
        />
      }
      label="Never expired?"
    />
  </Grid>
</Grid>

      </Grid>

      {/* Save Button */}
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default DiscountPage;
