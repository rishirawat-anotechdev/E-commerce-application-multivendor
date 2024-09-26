import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Snackbar
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import api from '../../API/api'
import MuiAlert from '@mui/material/Alert'

// Snackbar Alert component
const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success') // success or error
  const [couponCode, setCouponCode] = useState('') // State for coupon code input
  const [discount, setDiscount] = useState(0) // Store discount amount
  const [isCouponApplied, setIsCouponApplied] = useState(false) // Coupon applied state
  const [userId, setUserId] = useState("")

  useEffect(() => {
    fetchCartData()
  }, [])

  // Function to fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await api.get('/cart', { withCredentials: true })
      const products = response.data.products
      setCartItems(products)
     setUserId(response.data.user)

      
    } catch (error) {
      showSnackbar('Failed to load cart data', 'error')
    }
  }

  // Function to update product quantity in the cart
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await api.post(
        '/cart',
        { productId, quantity: newQuantity },
        { withCredentials: true }
      )
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product._id === productId ? { ...item, quantity: newQuantity } : item
        )
      )
      showSnackbar(response.data.message, 'success')
    } catch (error) {
      showSnackbar('Failed to update quantity', 'error')
    }
  }

  // Function to remove product from the cart
  const removeProductFromCart = async productId => {
    try {
      const response = await api.delete('/cart/remove', {
        data: { productId },
        withCredentials: true
      })
      setCartItems(prevItems => prevItems.filter(item => item.product._id !== productId))
      showSnackbar(response.data.message, 'success')
    } catch (error) {
      showSnackbar('Failed to remove product', 'error')
    }
  }

  // Function to show the Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setOpenSnackbar(true)
  }

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  // Handle applying a coupon code
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      showSnackbar('Please enter a valid coupon code', 'error')
      return
    }

    try {
      const response = await api.post('/cart/apply-coupon', { couponCode }, { withCredentials: true })
      const discountAmount = response.data.discount
      setDiscount(discountAmount)
      setIsCouponApplied(true)
      showSnackbar('Coupon applied successfully!', 'success')
    } catch (error) {
      showSnackbar('Failed to apply coupon', 'error')
    }
  }

  const totalWithoutDiscount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const finalTotal = totalWithoutDiscount - discount

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
      <Typography variant='h4' gutterBottom>
        Your Cart
      </Typography>
      <Typography variant='body1' gutterBottom>
        There are {cartItems.length} products in your cart
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align='right'>Unit Price</TableCell>
                  <TableCell align='right'>Quantity</TableCell>
                  <TableCell align='right'>Subtotal</TableCell>
                  <TableCell align='right'>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map(item => (
                  <TableRow key={item.product._id}>
                    <TableCell component='th' scope='row'>
                      <Box display='flex' alignItems='center'>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={{ width: 50, marginRight: 10 }}
                        />
                        <Box>
                          <Typography variant='subtitle1'>
                            {item.product.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      ${item.product.price.toFixed(2)}
                    </TableCell>
                    <TableCell align='right'>
                      <TextField
                        type='number'
                        InputProps={{ inputProps: { min: 1 } }}
                        value={item.quantity}
                        onChange={e => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                        size='small'
                        sx={{ width: '70px' }}
                      />
                    </TableCell>
                    <TableCell align='right'>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton onClick={() => removeProductFromCart(item.product._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant='h6' gutterBottom>
              Order Summary
            </Typography>
            <Box display='flex' justifyContent='space-between' mb={1}>
              <Typography>Tax</Typography>
              <Typography>$0.00</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' mb={1}>
              <Typography variant='h6'>Total</Typography>
              <Typography variant='h6'>
                $
                {totalWithoutDiscount.toFixed(2)}
              </Typography>
            </Box>

            {/* Apply Coupon Section */}
            <Box display='flex' flexDirection='column' mb={2}>
              <TextField
                label='Coupon Code'
                variant='outlined'
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                disabled={isCouponApplied} // Disable if already applied
                fullWidth
                margin='dense'
              />
              <Button
                variant='contained'
                color='primary'
                sx={{
                  mt:2,
                  backgroundColor: '#38a169',
                  '&:hover': {
                    backgroundColor: '#2f855a'
                  }
                }}
                onClick={handleApplyCoupon}
                disabled={isCouponApplied} // Disable if already applied
              >
                {isCouponApplied ? 'Coupon Applied' : 'Apply Coupon'}
              </Button>
            </Box>

            {discount > 0 && (
              <Box display='flex' justifyContent='space-between' mb={1}>
                <Typography>Discount</Typography>
                <Typography>-${discount.toFixed(2)}</Typography>
              </Box>
            )}

            <Box display='flex' justifyContent='space-between' mb={1}>
              <Typography variant='h6'>Final Total</Typography>
              <Typography variant='h6'>
                ${finalTotal.toFixed(2)}
              </Typography>
            </Box>
            <Typography variant='body2' color='text.secondary' mb={2}>
              (Shipping fees not included)
            </Typography>
            <Link to={`/checkout/${userId}`}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{
                  backgroundColor: '#38a169',
                  '&:hover': {
                    backgroundColor: '#2f855a'
                  }
                }}
              >
                Proceed To Checkout
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>

      <Link to='/'>
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            marginTop: 2,
            backgroundColor: '#38a169',
            '&:hover': {
              backgroundColor: '#2f855a'
            }
          }}
          variant='contained'
        >
          Continue Shopping
        </Button>
      </Link>

      {/* Snackbar for messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={900}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default CartPage
