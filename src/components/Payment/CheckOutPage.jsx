import React, { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingMethod, setShippingMethod] = useState('local');
  const [sameAsBilling, setSameAsBilling] = useState(true);

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shipping information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Phone" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select label="Country">
                    <MenuItem value="">Select country...</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="State" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="City" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={true} />}
                  label="Register an account with above information?"
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Billing information
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsBilling}
                  onChange={(e) => setSameAsBilling(e.target.checked)}
                />
              }
              label="Same as shipping information"
            />
          </Paper>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Cash on delivery (COD)"
              />
              <Typography variant="caption" sx={{ ml: 4, mb: 1 }}>
                Please pay money directly to the postman, if you choose cash on delivery method (COD).
              </Typography>
              <FormControlLabel
                value="stripe"
                control={<Radio />}
                label="Pay online via Stripe (International and Domestic)"
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="Fast and safe online payment via PayPal"
              />
              <FormControlLabel
                value="razorpay"
                control={<Radio />}
                label="Payment with Razorpay"
              />
              <FormControlLabel
                value="paystack"
                control={<Radio />}
                label="Payment with Paystack"
              />
              <FormControlLabel
                value="mollie"
                control={<Radio />}
                label="Payment with Mollie"
              />
              <FormControlLabel
                value="sslcommerz"
                control={<Radio />}
                label="Payment with SSLCommerz"
              />
              <FormControlLabel
                value="bank"
                control={<Radio />}
                label="Bank transfer"
              />
            </RadioGroup>
          </Paper>

        
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Young Shop
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: 'grey.300',
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                1
              </Box>
              <Box>
                <Typography variant="body1">Seeds of Change Organic Quinoa</Typography>
                <Typography variant="caption">Weight: 4KG, Boxes: 3 Boxes</Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 'auto' }}>
                $776.56
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
              Shipping method:
            </Typography>
            <RadioGroup
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              <FormControlLabel
                value="local"
                control={<Radio />}
                label="Local Pickup - Free shipping"
              />
              <FormControlLabel
                value="flat"
                control={<Radio />}
                label="Flat Rate - $20.00"
              />
            </RadioGroup>
            <Box sx={{ mt: 2 }}>
              <Typography>Subtotal: $776.56</Typography>
              <Typography>Tax: $0.00</Typography>
              <Typography>Shipping fee: $0.00</Typography>
              <Typography variant="h6">Total: $776.56</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant="text" size="small">
                You have a coupon code?
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutForm;