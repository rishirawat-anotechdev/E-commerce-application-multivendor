// src/components/RevenuePage.js
import React, { useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  TextField,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
  Chip
} from '@mui/material'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import StarIcon from '@mui/icons-material/Star'

// Fake revenue data
const data = [
  { month: 'January', revenue: 12000 },
  { month: 'February', revenue: 15000 },
  { month: 'March', revenue: 8000 },
  { month: 'April', revenue: 20000 },
  { month: 'May', revenue: 17000 },
  { month: 'June', revenue: 22000 },
  { month: 'July', revenue: 19000 },
  { month: 'August', revenue: 25000 },
  { month: 'September', revenue: 24000 },
  { month: 'October', revenue: 21000 },
  { month: 'November', revenue: 26000 },
  { month: 'December', revenue: 28000 }
]

const columns = [
  { id: 'id', label: 'Order ID' },
  { id: 'customer', label: 'Customer' },
  { id: 'amount', label: 'Amount' },
  { id: 'paymentMethod', label: 'Payment Method' },
  { id: 'paymentStatus', label: 'Payment Status' },
  { id: 'status', label: 'Order Status' },
  { id: 'createdAt', label: 'Date' },
  { id: 'store', label: 'Store' }
]

// Example data (fake)
const fakeOrders = [
  {
    id: 1,
    customer: 'John Doe',
    amount: 150.5,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Completed',
    createdAt: '2023-09-15',
    store: 'Online'
  },
  {
    id: 2,
    customer: 'Jane Smith',
    amount: 220.0,
    paymentMethod: 'PayPal',
    paymentStatus: 'Pending',
    status: 'Processing',
    createdAt: '2023-09-16',
    store: 'Local Store'
  },
  {
    id: 3,
    customer: 'Bob Johnson',
    amount: 80.99,
    paymentMethod: 'Cash',
    paymentStatus: 'Paid',
    status: 'Shipped',
    createdAt: '2023-09-17',
    store: 'Online'
  },
  {
    id: 4,
    customer: 'Alice White',
    amount: 45.0,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Failed',
    status: 'Canceled',
    createdAt: '2023-09-18',
    store: 'Local Store'
  }
  // Add more fake data here as needed
]

// Status Chip component
const StatusChip = ({ status }) => {
  let color
  switch (status) {
    case 'Paid':
      color = 'success'
      break
    case 'Pending':
      color = 'warning'
      break
    case 'Failed':
      color = 'error'
      break
    case 'Completed':
      color = 'primary'
      break
    case 'Processing':
      color = 'info'
      break
    case 'Shipped':
      color = 'secondary'
      break
    default:
      color = 'default'
  }
  return <Chip label={status} color={color} />
}

// Calculate total revenue
const totalRevenue = data.reduce((acc, cur) => acc + cur.revenue, 0)

// Calculate monthly average revenue
const monthlyAverage = totalRevenue / data.length

// Find the best month
const bestMonth = data.reduce(
  (prev, current) => (prev.revenue > current.revenue ? prev : current),
  {}
)

const VendorRevenue = () => {
  const [orderBy, setOrderBy] = useState('id')
  const [order, setOrder] = useState('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  // Sorting logic
  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // Sort data based on selected column
  const sortedData = fakeOrders.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1
    }
    return a[orderBy] < b[orderBy] ? 1 : -1
  })

  // Search logic: filter data based on the search query
  const filteredData = sortedData.filter(row => {
    const searchStr = searchQuery.toLowerCase()
    return (
      row.customer.toLowerCase().includes(searchStr) ||
      row.paymentMethod.toLowerCase().includes(searchStr) ||
      row.status.toLowerCase().includes(searchStr) ||
      row.paymentStatus.toLowerCase().includes(searchStr)
    )
  })

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      {/* Revenue Summary */}
      <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Total Revenue */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Icon with random background color */}
              <Box
                sx={{
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  padding: '1rem',
                  borderRadius: '50%',
                  marginRight: '1rem'
                }}
              >
                <AttachMoneyIcon style={{ fontSize: '2rem' }} />
              </Box>
              {/* Text */}
              <Box>
                <Typography variant='h6' color='textSecondary'>
                  Total Revenue
                </Typography>
                <Typography variant='h5'>
                  ${totalRevenue.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Average */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Icon with random background color */}
              <Box
                sx={{
                  backgroundColor: '#388e3c',
                  color: '#fff',
                  padding: '1rem',
                  borderRadius: '50%',
                  marginRight: '1rem'
                }}
              >
                <TrendingUpIcon style={{ fontSize: '2rem' }} />
              </Box>
              {/* Text */}
              <Box>
                <Typography
                  variant='h6'
                  color='textSecondary'
                  whiteSpace='nowrap'
                >
                  Monthly Average
                </Typography>
                <Typography variant='h5'>
                  $
                  {monthlyAverage.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Best Month */}
        <Grid item xs={12} md={8} lg={4} whiteSpace='nowrap'>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Icon with random background color */}
              <Box
                sx={{
                  backgroundColor: '#f57c00',
                  color: '#fff',
                  padding: '1rem',
                  borderRadius: '50%',
                  marginRight: '1rem'
                }}
              >
                <StarIcon style={{ fontSize: '2rem' }} />
              </Box>
              {/* Text */}
              <Box>
                <Typography variant='h6' color='textSecondary'>
                  Best Month
                </Typography>
                <Typography variant='h5'>
                  {bestMonth.month} (${bestMonth.revenue.toLocaleString()})
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue Graph */}
      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='textSecondary'>
                Revenue Over Time
              </Typography>
              <ResponsiveContainer width='100%' height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='revenue'
                    stroke='#8884d8'
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ mt: 4 }}>
        <Typography variant='h4' gutterBottom sx={{ p: 2 }}>
          Recent Payments
        </Typography>

        {/* Search Box */}
        <Box sx={{ px: 4 }}>
          <TextField
            fullWidth
            size='small'
            label='Search'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
        </Box>

        <Divider sx={{ mt: 4 }} />

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id}>
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>${row.amount.toFixed(2)}</TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell>
                      <StatusChip status={row.paymentStatus} />
                    </TableCell>
                    <TableCell>
                      <StatusChip status={row.status} />
                    </TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>
                      {' '}
                      <Chip
                        label={row?.store}
                        sx={{ backgroundColor: '#2e7d32', color: '#fff' }}
                      />
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default VendorRevenue
