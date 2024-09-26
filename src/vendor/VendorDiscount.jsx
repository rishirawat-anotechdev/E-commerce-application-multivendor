import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Select,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  RadioGroup,
  Radio,
  Paper,
  Divider
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const VendorDiscount = () => {
  const [couponCode, setCouponCode] = React.useState('');
  const [couponDescription, setCouponDescription] = React.useState('');
  const [neverExpired, setNeverExpired] = React.useState(false);
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs().add(1, 'month'));
  const [discountPercentage, setDiscountPercentage] = React.useState(10);
  const [maxDiscountAmount, setMaxDiscountAmount] = React.useState(100);
  const [minPurchaseAmount, setMinPurchaseAmount] = React.useState(200);
  const [usageLimit, setUsageLimit] = React.useState(100);
  const [applyCategory, setApplyCategory] = React.useState('');
  const [applySubCategory, setApplySubCategory] = React.useState('');
  const [applyProduct, setApplyProduct] = React.useState('');
  const [couponType, setCouponType] = React.useState('allOrders');

  const categories = ['Electronics', 'Fashion', 'Groceries'];
  const subCategories = ['Smartphones', 'Laptops', 'Clothing'];
  const products = ['iPhone 14', 'MacBook Pro', 'Nike Shoes'];

  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setCouponCode(randomCode);
  };

  const handleSave = () => {
    const discountData = {
      couponCode,
      couponDescription,
      startCouponDate: startDate.toISOString(),
      endCouponDate: neverExpired ? null : endDate.toISOString(),
      discountPercentage,
      maxDiscountAmount,
      minPurchaseAmount,
      usageLimit,
      applyCategory: couponType === 'allOrders' ? 'All Orders' : applyCategory,
      applySubCategory: couponType === 'allOrders' ? null : applySubCategory,
      applyProduct: couponType === 'allOrders' ? null : applyProduct
    };

    console.log(discountData);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 0 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Discount Configuration
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label="Create coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                fullWidth
                variant="outlined"
              />
              <IconButton
                onClick={generateRandomCode}
                sx={{
                  backgroundColor: '#e3f2fd',
                  '&:hover': { backgroundColor: '#bbdefb' },
                  color: '#2ecc71',
                }}
              >
                <AutoAwesomeIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Coupon Description"
              value={couponDescription}
              onChange={(e) => setCouponDescription(e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={1}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Discount Percentage"
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              fullWidth
              variant="outlined"
              InputProps={{ endAdornment: <Typography variant="body2">%</Typography> }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Max Discount Amount"
              type="number"
              value={maxDiscountAmount}
              onChange={(e) => setMaxDiscountAmount(Number(e.target.value))}
              fullWidth
              variant="outlined"
              InputProps={{ startAdornment: <Typography variant="body2">$</Typography> }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Min Purchase Amount"
              type="number"
              value={minPurchaseAmount}
              onChange={(e) => setMinPurchaseAmount(Number(e.target.value))}
              fullWidth
              variant="outlined"
              InputProps={{ startAdornment: <Typography variant="body2">$</Typography> }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Usage Limit"
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(Number(e.target.value))}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Coupon Validity
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start date"
                value={startDate}
                onChange={setStartDate}
                renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End date"
                value={endDate}
                onChange={setEndDate}
                renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                disabled={neverExpired}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={<Checkbox checked={neverExpired} onChange={() => setNeverExpired(!neverExpired)} />}
              label="Never expired?"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Coupon Type
            </Typography>
            <RadioGroup
              row
              value={couponType}
              onChange={(e) => setCouponType(e.target.value)}
            >
              <FormControlLabel value="allOrders" control={<Radio />} label="Apply to All Orders" />
              <FormControlLabel value="specific" control={<Radio />} label="Apply to Specific Products/Categories" />
            </RadioGroup>
          </Grid>

          {couponType === 'specific' && (
            <>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={applyCategory}
                    onChange={(e) => setApplyCategory(e.target.value)}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    value={applySubCategory}
                    onChange={(e) => setApplySubCategory(e.target.value)}
                    label="Subcategory"
                  >
                    {subCategories.map((subCategory) => (
                      <MenuItem key={subCategory} value={subCategory}>
                        {subCategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Product</InputLabel>
                  <Select
                    value={applyProduct}
                    onChange={(e) => setApplyProduct(e.target.value)}
                    label="Product"
                  >
                    {products.map((product) => (
                      <MenuItem key={product} value={product}>
                        {product}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            size="large"
            sx={{ minWidth: 200, fontWeight: 'bold' }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default VendorDiscount;