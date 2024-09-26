import React, { useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TablePagination,
  TextField,
  InputAdornment,
  Paper
} from '@mui/material'
import { Edit, Delete, Search } from '@mui/icons-material'

const orders = [
  {
    id: 18,
    orderId: '#10000027',
    customer: 'Josie Hilpert',
    shipping: '$0.00',
    status: 'Delivered',
    codStatus: 'Not available',
    createdAt: '2024-09-04'
  },
  {
    id: 17,
    orderId: '#10000026',
    customer: 'Josie Hilpert',
    shipping: '$0.00',
    status: 'Approved',
    codStatus: 'Not available',
    createdAt: '2024-09-04'
  },
  {
    id: 16,
    orderId: '#10000024',
    customer: 'Melody Effertz Jr.',
    shipping: '$0.00',
    status: 'Delivered',
    codStatus: 'Not available',
    createdAt: '2024-09-04'
  }
  // Add more data as needed
]

const ShipmentPage = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState({
    orderId: '',
    customer: '',
    status: ''
  })

  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = event =>
    setRowsPerPage(parseInt(event.target.value, 10))

  const handleFilterChange = (key, value) => {
    setFilter({ ...filter, [key]: value })
  }

  const filteredOrders = orders.filter(
    order =>
      order.orderId.toLowerCase().includes(filter.orderId.toLowerCase()) &&
      order.customer.toLowerCase().includes(filter.customer.toLowerCase()) &&
      (filter.status ? order.status === filter.status : true)
  )

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens, horizontally on larger screens
          alignItems: 'left',
          backgroundColor: '#fff',
          p: 4,
          mb: 2,
          gap: 2 // Adds space between the elements
        }}
      >
        {/* Order ID Filter */}
        <TextField
          fullWidth
          label='Order ID'
          variant='outlined'
          size='small'
          value={filter.orderId}
          onChange={e => handleFilterChange('orderId', e.target.value)}
          sx={{
            flex: 1, // Makes it flexible to take up available space
            width: { xs: '100%', sm: '60%' } // Full width on small screens, 60% width on larger screens
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            )
          }}
        />

        {/* Status Filter */}
        <TextField
          variant='outlined'
          size='small'
          value={filter.status}
          onChange={e => handleFilterChange('status', e.target.value)}
          select
          SelectProps={{ native: true }}
          sx={{
            flex: 1, // Makes it flexible to take up available space
            width: { xs: '25%', sm: '100%' } // Full width on small screens, 40% width on larger screens
          }}
        >
          <option value=''>Status</option>
          <option value=''>All</option>
          <option value='Approved'>Approved</option>
          <option value='Delivered'>Delivered</option>
        </TextField>
      </Box>

      <TableContainer component={Paper} mt={10}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell fontWeight='bold'>ID</TableCell>
              <TableCell fontWeight='bold'>Order ID</TableCell>
              <TableCell fontWeight='bold'>Customer</TableCell>
              <TableCell fontWeight='bold'>Shipping Amount</TableCell>
              <TableCell fontWeight='bold'>Status</TableCell>
              <TableCell fontWeight='bold'>COD Status</TableCell>
              <TableCell fontWeight='bold'>Created At</TableCell>
              <TableCell fontWeight='bold'>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(order => (
                <TableRow
                  key={order.id}
                  style={{
                    backgroundColor: order.id % 2 === 0 ? '#f6f8fb' : 'white'
                  }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.shipping}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={
                        order.status === 'Delivered' ? 'success' : 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell>{order.codStatus}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell sx={{whiteSpace:"nowrap"}}>
                    <IconButton color='primary'>
                      <Edit />
                    </IconButton>
                    <IconButton color='secondary'>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default ShipmentPage
