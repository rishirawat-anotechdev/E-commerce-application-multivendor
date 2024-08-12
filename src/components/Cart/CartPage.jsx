import React from 'react'
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
  Grid
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'


const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Seeds of Change Organic Quinoe',
      price: 776.56,
      quantity: 1,
      image: 'https://via.placeholder.com/100',
      seller: 'Young Shop',
      weight: '4KG, Boxes: 5 Boxes'
    }
  ]

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
                  <TableRow key={item.id}>
                    <TableCell component='th' scope='row'>
                      <Box display='flex' alignItems='center'>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: 50, marginRight: 10 }}
                        />
                        <Box>
                          <Typography variant='subtitle1'>
                            {item.name}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            Sold by: {item.seller}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {item.weight}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell align='right'>
                      <TextField
                        type='number'
                        InputProps={{ inputProps: { min: 1 } }}
                        value={item.quantity}
                        onChange={() => {}}
                        size='small'
                        sx={{ width: '70px' }}
                      />
                    </TableCell>
                    <TableCell align='right'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton>
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
              <Typography variant='h6'>$776.56</Typography>
            </Box>
            <Typography variant='body2' color='text.secondary' mb={2}>
              (Shipping fees not included)
            </Typography>
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
          </Paper>

          <Paper sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant='h6' gutterBottom>
              Apply Coupon
            </Typography>
            <Typography variant='body2' color='text.secondary' mb={1}>
              Using A Promo Code?
            </Typography>
            <Box display='flex'>
              <TextField
                size='small'
                placeholder='Enter Your Coupon'
                fullWidth
                sx={{ marginRight: 1 }}
              />
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#38a169',
                  '&:hover': {
                    backgroundColor: '#2f855a'
                  }
                }}
              >
                Apply
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

     <Link to={"/checkout"} >
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
    </Box>
  )
}

export default CartPage
