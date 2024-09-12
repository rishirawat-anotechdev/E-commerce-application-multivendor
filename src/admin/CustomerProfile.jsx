import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  MenuItem,
  Select,
  Divider,
  TablePagination,
  IconButton,
  Tooltip,
  Modal
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const CustomerProfile = () => {
  const [status, setStatus] = useState('Activated')
  const [isEditing, setIsEditing] = useState(false)
  const [openModal, setOpenModal] = useState(false) // Modal state
  const [formData, setFormData] = useState({
    name: 'Kalonji Sporer',
    email: 'ursula.moore@example.org',
    phone: '+19929977344',
    dob: '1992-07-03',
    privateNotes: 'Private notes are only visible to admins.'
  })

  // Pagination states
  const [addressPage, setAddressPage] = useState(0)
  const [paymentsPage, setPaymentsPage] = useState(0)
  const [reviewsPage, setReviewsPage] = useState(0)
  const [cartPage, setCartPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleStatusChange = event => {
    setStatus(event.target.value)
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleChangePage = (event, newPage, setter) => {
    setter(newPage)
  }

  const handleChangeRowsPerPage = (event, setter) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setter(0)
  }

  const fakeAddressData = [
    {
      address: '256 Jonathan Manors Suite 193',
      country: 'USA',
      state: 'Kansas',
      city: 'Aurelioton'
    },
    {
      address: '789 Elm Street',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto'
    },
    {
      address: '101 Pine Avenue',
      country: 'UK',
      state: 'England',
      city: 'London'
    }
    // Add more fake addresses as needed
  ]

  const fakePaymentsData = [
    {
      order: '#1000001',
      amount: '$500.00 USD',
      method: 'Stripe',
      status: 'Completed'
    },
    {
      order: '#1000002',
      amount: '$750.00 USD',
      method: 'PayPal',
      status: 'Pending'
    },
    {
      order: '#1000003',
      amount: '$1000.00 USD',
      method: 'Bank Transfer',
      status: 'Completed'
    }
    // Add more fake payments as needed
  ]

  const fakeReviewsData = [
    {
      product: 'Signature Mushroom and Vegetables Burger',
      rating: '5 stars',
      comment:
        'This burger is absolutely delicious! The blend of mushrooms and vegetables creates a perfect texture and flavor. I highly recommend it to anyone looking for a tasty vegetarian option.',
      status: 'Published',
      date: '2024-07-22'
    },
    {
      product: 'Organic Salad Mix',
      rating: '4 stars',
      comment:
        'Fresh and crispy salad mix. Great variety of greens. Would love to see more herb options included.',
      status: 'Published',
      date: '2024-07-23'
    }

    // Add more fake reviews as needed
  ]

  const fakeCartData = [
    { product: 'Product A', quantity: 2, price: '$25.00', total: '$50.00' },
    { product: 'Product B', quantity: 1, price: '$30.00', total: '$30.00' },
    { product: 'Product C', quantity: 3, price: '$15.00', total: '$45.00' }
    // Add more fake cart items as needed
  ]

  const renderTable = (
    data,
    columns,
    page,
    handlePageChange,
    handleRowsPerPageChange
  ) => (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white'
                    }}
                  >
                    {columns.map(column => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'comment' ? (
                            <Tooltip title={value} placement='top'>
                              <span>{value.substring(0, 50)}...</span>
                            </Tooltip>
                          ) : column.id === 'actions' ? (
                            <>
                              <IconButton size='small'>
                                <EditIcon />
                              </IconButton>
                              <IconButton size='small'>
                                <DeleteIcon />
                              </IconButton>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handlePageChange(event, newPage)}
        onRowsPerPageChange={event => handleRowsPerPageChange(event)}
      />
    </Paper>
  )

  const addressColumns = [
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'state', label: 'State', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100, align: 'right' }
  ]

  const paymentsColumns = [
    { id: 'order', label: 'Order', minWidth: 100 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    { id: 'method', label: 'Payment Method', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 }
  ]

  const reviewsColumns = [
    { id: 'product', label: 'Product', minWidth: 170 },
    { id: 'rating', label: 'Rating', minWidth: 100 },
    { id: 'comment', label: 'Comment', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'date', label: 'Created At', minWidth: 100 }
  ]

  const cartColumns = [
    { id: 'product', label: 'Product', minWidth: 170 },
    { id: 'quantity', label: 'Quantity', minWidth: 100, align: 'right' },
    { id: 'price', label: 'Price', minWidth: 100, align: 'right' },
    { id: 'total', label: 'Total', minWidth: 100, align: 'right' }
  ]

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant='h6' gutterBottom>
              Customer Details
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

          <Paper sx={{ mb: 2 }}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ p: 2, backgroundColor: '#fff' }}
            >
              Addresses
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {renderTable(
              fakeAddressData,
              addressColumns,
              addressPage,
              (event, newPage) =>
                handleChangePage(event, newPage, setAddressPage),
              event => handleChangeRowsPerPage(event, setAddressPage)
            )}
            <Button variant='outlined' onClick={handleOpenModal} sx={{ mt: 2 }}>
              {' '}
              + New Address
            </Button>
          </Paper>
          {/* Modal for New Address */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                p: 4,
                borderRadius: 1,
                boxShadow: 24
              }}
            >
              <Typography variant='h6' component='h2' gutterBottom>
                Add New Address
              </Typography>
              <TextField label='Address' fullWidth sx={{ mb: 2 }} />
              <TextField label='Country' fullWidth sx={{ mb: 2 }} />
              <TextField label='State' fullWidth sx={{ mb: 2 }} />
              <TextField label='City' fullWidth sx={{ mb: 2 }} />
              <Button
                variant='contained'
                color='primary'
                onClick={handleCloseModal}
              >
                Save
              </Button>
            </Box>
          </Modal>
          
          <Paper sx={{ mb: 2 }}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ p: 2, backgroundColor: '#fff' }}
            >
              Payments
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {renderTable(
              fakePaymentsData,
              paymentsColumns,
              paymentsPage,
              (event, newPage) =>
                handleChangePage(event, newPage, setPaymentsPage),
              event => handleChangeRowsPerPage(event, setPaymentsPage)
            )}
          </Paper>
          <Paper sx={{ mb: 2 }}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ p: 2, backgroundColor: '#fff' }}
            >
              Reviews
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {renderTable(
              fakeReviewsData,
              reviewsColumns,
              reviewsPage,
              (event, newPage) =>
                handleChangePage(event, newPage, setReviewsPage),
              event => handleChangeRowsPerPage(event, setReviewsPage)
            )}
          </Paper>

          <Paper sx={{ mb: 2 }}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ p: 2, backgroundColor: '#fff' }}
            >
              Cart Data
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {renderTable(
              fakeCartData,
              cartColumns,
              cartPage,
              (event, newPage) => handleChangePage(event, newPage, setCartPage),
              event => handleChangeRowsPerPage(event, setCartPage)
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p:2, mb: 2 }}>
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CustomerProfile
