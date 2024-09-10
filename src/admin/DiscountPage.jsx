// import React from 'react';
// import { Box, TextField, MenuItem, Button, Checkbox, FormControlLabel, Grid, Select, InputLabel, FormControl, Typography } from '@mui/material';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';




// import { LocalizationProvider } from '@mui/x-date-pickers';


// const DiscountPage = () => {
//   const [couponCode, setCouponCode] = React.useState('');
//   const [unlimitedCoupon, setUnlimitedCoupon] = React.useState(true);
//   const [neverExpired, setNeverExpired] = React.useState(true);
//   const [startDate, setStartDate] = React.useState(dayjs());
//   const [endDate, setEndDate] = React.useState(dayjs());

//   const handleCouponCodeChange = (event) => {
//     setCouponCode(event.target.value);
//   };

//   const handleSave = () => {
//     // Handle save logic, including API integration
//     console.log({
//       couponCode,
//       unlimitedCoupon,
//       neverExpired,
//       startDate: startDate.toISOString(),
//       endDate: endDate.toISOString(),
//     });
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Select type of discount</InputLabel>
//             <Select value="Coupon code">
//               <MenuItem value="Coupon code">Coupon code</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             label="Create coupon code"
//             value={couponCode}
//             onChange={handleCouponCodeChange}
//             fullWidth
//             sx={{ mb: 2 }}
//           />

//           <Button variant="contained" sx={{ mb: 2 }}>
//             Generate coupon code
//           </Button>

//           <FormControlLabel
//             control={<Checkbox checked={unlimitedCoupon} onChange={() => setUnlimitedCoupon(!unlimitedCoupon)} />}
//             label="Unlimited coupon?"
//           />

//           <FormControlLabel
//             control={<Checkbox />}
//             label="Can be used with promotion?"
//           />

//           <FormControlLabel
//             control={<Checkbox />}
//             label="Apply via URL?"
//           />

//           <FormControlLabel
//             control={<Checkbox />}
//             label="Display coupon code at the checkout page?"
//           />

//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
//             <FormControl sx={{ width: '120px' }}>
//               <InputLabel>Coupon type</InputLabel>
//               <Select value="$">
//                 <MenuItem value="$">$</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField label="Discount" type="number" defaultValue={0} />
//             <TextField label="$" type="number" defaultValue={0} />
//             <FormControl sx={{ width: '150px' }}>
//               <InputLabel>Apply for</InputLabel>
//               <Select value="All orders">
//                 <MenuItem value="All orders">All orders</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateTimePicker
//               label="Start date"
//               value={startDate}
//               onChange={setStartDate}
//               renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
//             />
//             <DateTimePicker
//               label="End date"
//               value={endDate}
//               onChange={setEndDate}
//               renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
//               disabled={neverExpired}
//             />
//           </LocalizationProvider>

//           <FormControlLabel
//             control={<Checkbox checked={neverExpired} onChange={() => setNeverExpired(!neverExpired)} />}
//             label="Never expired?"
//           />
//         </Grid>
//       </Grid>

//       <Box sx={{ textAlign: 'right', mt: 2 }}>
//         <Button variant="contained" color="primary" onClick={handleSave}>
//           Save
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default DiscountPage;
import React from 'react'

const DiscountPage = () => {
  return (
    <div>DiscountPage</div>
  )
}

export default DiscountPage
