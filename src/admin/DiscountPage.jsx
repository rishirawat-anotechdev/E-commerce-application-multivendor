import React, { useState } from 'react'
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
  Radio
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

const DiscountPage = () => {
  const [couponCode, setCouponCode] = useState('')
  const [couponDescription, setCouponDescription] = useState('')
  const [neverExpired, setNeverExpired] = useState(false)
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month'))
  const [discountPercentage, setDiscountPercentage] = useState(10)
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(100)
  const [minPurchaseAmount, setMinPurchaseAmount] = useState(200)
  const [usageLimit, setUsageLimit] = useState(100)
  const [applyCategory, setApplyCategory] = useState('')
  const [applySubCategory, setApplySubCategory] = useState('')
  const [applyProduct, setApplyProduct] = useState('')
  const [couponType, setCouponType] = useState('allOrders')

  const categories = ['Electronics', 'Fashion', 'Groceries']
  const subCategories = ['Smartphones', 'Laptops', 'Clothing']
  const products = ['iPhone 14', 'MacBook Pro', 'Nike Shoes']

  // Function to generate random coupon code
  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase()
    setCouponCode(randomCode)
  }

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
    }

    console.log(discountData)
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, mt: 2, backgroundColor: '#fff' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant='h6'>Discount Configuration</Typography>

          {/* Coupon Code Input */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              label='Create coupon code'
              value={couponCode}
              onChange={e => setCouponCode(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
           <IconButton
  onClick={generateRandomCode}
  sx={{
    mb: 2,
    backgroundColor: "transparent", // Transparent button background
    '&:hover': {
      backgroundColor: "rgba(46, 204, 113, 0.1)", // Light green hover background
    },
    color: "#2ecc71" // Green color for the icon
  }}
>
  <AutoAwesomeIcon />
</IconButton>

          </Box>

          {/* Coupon Description Input */}
          <TextField
            label='Coupon Description'
            value={couponDescription}
            onChange={e => setCouponDescription(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Discount Percentage */}
          <TextField
            label='Discount Percentage'
            type='number'
            value={discountPercentage}
            onChange={e => setDiscountPercentage(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Max Discount Amount */}
          <TextField
            label='Max Discount Amount'
            type='number'
            value={maxDiscountAmount}
            onChange={e => setMaxDiscountAmount(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Min Purchase Amount */}
          <TextField
            label='Min Purchase Amount'
            type='number'
            value={minPurchaseAmount}
            onChange={e => setMinPurchaseAmount(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Usage Limit */}
          <TextField
            label='Usage Limit'
            type='number'
            value={usageLimit}
            onChange={e => setUsageLimit(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Date Pickers */}
        <Grid container spacing={3} item xs={12} md={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container item spacing={2}>
              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label='Start date'
                  value={startDate}
                  onChange={setStartDate}
                  renderInput={params => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label='End date'
                  value={endDate}
                  onChange={setEndDate}
                  renderInput={params => <TextField {...params} fullWidth />}
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
              label='Never expired?'
            />
          </Grid>
        </Grid>

        {/* Coupon Type Radio Buttons */}
        <Grid item xs={12} md={8}>
          <Typography variant='h6'>Coupon Type</Typography>
          <RadioGroup
            row
            value={couponType}
            onChange={(e) => setCouponType(e.target.value)}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value='allOrders'
              control={<Radio />}
              label='Apply to All Orders'
            />
            <FormControlLabel
              value='specific'
              control={<Radio />}
              label='Apply to Specific Products/Categories'
            />
          </RadioGroup>
        </Grid>

        {/* Apply For (Category, Subcategory, Product) */}
        {couponType === 'specific' && (
          <Grid container item xs={12} md={8} spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6'>Apply Discount To</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={applyCategory}
                  onChange={e => setApplyCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={applySubCategory}
                  onChange={e => setApplySubCategory(e.target.value)}
                >
                  {subCategories.map(subCategory => (
                    <MenuItem key={subCategory} value={subCategory}>
                      {subCategory}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Product</InputLabel>
                <Select
                  value={applyProduct}
                  onChange={e => setApplyProduct(e.target.value)}
                >
                  {products.map(product => (
                    <MenuItem key={product} value={product}>
                      {product}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Grid>

      {/* Save Button */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button variant='contained' color='primary' onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default DiscountPage
