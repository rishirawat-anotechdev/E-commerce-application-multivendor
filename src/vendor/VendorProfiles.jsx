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
// Dummy data
const rows = [
  {
    id: 9,
    name: 'Amie Wiza PhD',
    email: 'delia27@example.com',
    createdAt: '2024-07-22',
    status: 'Activated',
    store: "Robert's Store"
  },
  {
    id: 6,
    name: 'Miss Magdalena Hoeger Jr.',
    email: 'electa73@example.net',
    createdAt: '2024-07-22',
    status: 'Activated',
    store: 'Global Store'
  },
  {
    id: 4,
    name: 'Garland Kautzer',
    email: 'josinski@example.net',
    createdAt: '2024-07-22',
    status: 'Activated',
    store: 'Young Shop'
  },
  {
    id: 3,
    name: 'Dr. Marquis Schmeler',
    email: 'nwill@example.net',
    createdAt: '2024-07-22',
    status: 'Activated',
    store: 'Global Office'
  },
  {
    id: 2,
    name: 'Mae West',
    email: 'vendor@botble.com',
    createdAt: '2024-07-22',
    status: 'Activated',
    store: 'GoPro'
  }
]

const VendorProfiles = () => {
  const [page, setPage] = useState(0)
  // Handle pagination
  const handleChangePages = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPages = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant='h6' gutterBottom>
              Vendors Details
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
              Sells
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
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 2,
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          p: 4
        }}
      >
        <TextField
          placeholder='Search by name'
          variant='outlined'
          size='small'
          sx={{ width: 400 }}
        />
     </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Stock Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Store Name</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white'
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <img
                      src={`https://i.pravatar.cc/50?img=${index + 1}`}
                      alt={row.name}
                      width='40'
                      height='40'
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: 500,
                        color: 'blue',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                      onClick={() =>
                        alert(`Navigating to ${row.name}'s details`)
                      }
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>
                    <Button variant='contained' size='small' color='success'>
                      {row.status}
                    </Button>
                  </TableCell>
                  <TableCell>{row.store}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <IconButton color='primary'>
                      <EditIcon />
                    </IconButton>
                    <IconButton color='error'>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component='div'
        count={rows.length}
        page={page}
        onPageChange={handleChangePages}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPages}
      />
   
    </Box>
  )
}

export default VendorProfiles
