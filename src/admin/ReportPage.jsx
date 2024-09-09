import React, { useState } from 'react'
import { Card, CardContent, Grid, Typography, Box, Paper, TableRow } from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import StorageIcon from '@mui/icons-material/Storage'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableSortLabel,  Button, TextField, Chip } from '@mui/material';
  
  import { Line } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  const fakeOrders = [
    { id: '#0000045', customer: 'Kaleigh Sporer', amount: '$2,100.00', paymentMethod: 'Mollie', paymentStatus: 'Completed', status: 'Completed', createdAt: '2024-09-03', store: 'Global Office' },
    { id: '#0000043', customer: 'Kaleigh Sporer', amount: '$1,306.00', paymentMethod: 'PayPal', paymentStatus: 'Completed', status: 'Completed', createdAt: '2024-09-03', store: 'GoPro' },
    { id: '#0000044', customer: 'Kaleigh Sporer', amount: '$2,137.00', paymentMethod: 'Paystack', paymentStatus: 'Completed', status: 'Completed', createdAt: '2024-09-03', store: 'Global Store' },
    { id: '#0000041', customer: 'Adela Rowe PhD', amount: '$4,274.00', paymentMethod: 'Bank Transfer', paymentStatus: 'Pending', status: 'Pending', createdAt: '2024-09-03', store: 'Global Store' },
    { id: '#0000040', customer: 'Josie Hilpert', amount: '$1,132.00', paymentMethod: 'Bank Transfer', paymentStatus: 'Pending', status: 'Pending', createdAt: '2024-09-03', store: 'Global Store' },
    { id: '#0000039', customer: 'Josie Hilpert', amount: '$4,996.00', paymentMethod: 'Stripe', paymentStatus: 'Completed', status: 'Pending', createdAt: '2024-09-03', store: 'GoPro' },
    { id: '#0000038', customer: 'Adela Rowe PhD', amount: '$3,115.00', paymentMethod: 'Bank Transfer', paymentStatus: 'Pending', status: 'Completed', createdAt: '2024-09-02', store: 'GoPro' },
    { id: '#0000036', customer: 'Vicky Bodnar', amount: '$2,784.00', paymentMethod: 'Razorpay', paymentStatus: 'Completed', status: 'Completed', createdAt: '2024-09-02', store: 'Young Shop' },
  ];
  
  const columns = [
    { id: 'id', label: 'Order #' },
    { id: 'customer', label: 'Customer' },
    { id: 'amount', label: 'Amount' },
    { id: 'paymentMethod', label: 'Payment Method' },
    { id: 'paymentStatus', label: 'Payment Status' },
    { id: 'status', label: 'Status' },
    { id: 'createdAt', label: 'Created At' },
    { id: 'store', label: 'Store' }
  ];
  
  const StatusChip = ({ status }) => {
    const color = status === 'Completed' ? 'success' : 'warning';
    return <Chip label={status} color={color} size="small" />;
  };


// Line Chart Data
const lineData = {
  labels: [
    '08 Aug',
    '11 Aug',
    '14 Aug',
    '17 Aug',
    '20 Aug',
    '23 Aug',
    '26 Aug',
    '29 Aug',
    'Sep 04'
  ],
  datasets: [
    {
      label: 'Items Earning Sales',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 140357],
      fill: true,
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: '#FFBB28',
      borderWidth: 2,
      tension: 0.4, // This smoothens the curve while retaining a sharp peak
      pointStyle: 'circle',
      pointRadius: 5
    }
  ]
}

// Pie Chart Data
const pieData = {
  labels: ['Completed', 'Pending'],
  datasets: [
    {
      label: 'Total Earnings',
      data: [140357, 59732],
      backgroundColor: ['#00C49F', '#FF6384'], // Matching green and red
      hoverOffset: 4
    }
  ]
}

const statsData = [
  {
    label: 'Revenue',
    value: '$140,357.00',
    change: '+103,536',
    changeType: 'increase',
    icon: <MonetizationOnIcon fontSize='large' style={{ color: '#f06292' }} />
  },
  {
    label: 'Products',
    value: '0',
    change: '-49',
    changeType: 'decrease',
    icon: <StorageIcon fontSize='large' style={{ color: '#42a5f5' }} />
  },
  {
    label: 'Customers',
    value: '0',
    change: '-10',
    changeType: 'decrease',
    icon: <PeopleIcon fontSize='large' style={{ color: '#66bb6a' }} />
  },
  {
    label: 'Orders',
    value: '33',
    change: '+33',
    changeType: 'increase',
    icon: <ShoppingCartIcon fontSize='large' style={{ color: '#ffb74d' }} />
  }
]

const ReportPage = () => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('customer');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleRequestSort = (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));
  
    const sortedData = fakeOrders.slice().sort(getComparator(order, orderBy));
  
  return (

      <Box sx={{ padding: { xs: 1, sm: 2 }, mt:2 }}>
        <Grid container spacing={2}>
          {statsData.map((stat, index) => (
            <Grid
              item
              xs={12} // Full width on extra small screens
              sm={6} // 50% width on small screens
              md={6} // 50% width on medium screens
              lg={3} // 25% width on large screens
              key={index}
            >
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', sm: 'row' } // Stack on small screens
                }}
              >
                <Box sx={{ padding: { xs: 1, sm: 2 }, textAlign: 'center' }}>
                  {stat.icon}
                </Box>
                <CardContent>
                  <Typography variant='h6' component='div'>
                    {stat.label}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    {stat.value}
                  </Typography>
                  <Typography
                    color={stat.changeType === 'increase' ? 'green' : 'red'}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {stat.changeType === 'increase' ? (
                      <TrendingUp fontSize='small' />
                    ) : (
                      <TrendingDown fontSize='small' />
                    )}
                    {stat.change}{' '}
                    {stat.changeType === 'increase' ? 'increase' : 'decrease'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      

      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          marginTop: '20px',
          flexWrap: { xs: 'wrap', lg: 'nowrap' }
        }}
      >
        {/* Line Chart */}
        <Paper
          elevation={3}
          sx={{
            flex: { xs: '1 1 100%', lg: '1 1 70%' },
            padding: '20px'
          }}
        >
         
            <Typography variant='h6' gutterBottom>
              Sales Reports
            </Typography>
            <Box sx={{ height: '400px' }}>
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 160000 // Set max to show spike correctly
                    }
                  }
                }}
              />
            </Box>
            <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
              <span style={{ color: '#FFBB28' }}>●</span> Items Earning Sales:
              $140,357.00
            </Typography>
          
        </Paper>

        {/* Pie Chart */}
        <Paper
          elevation={2}
          sx={{
            flex: { xs: '1 1 100%', lg: '1 1 30%' },
            padding: '20px',
            height: '600px'
          }}
        >
       
            <Typography variant='h6' gutterBottom>
              Total Earnings
            </Typography>
            <Box sx={{ height: '380px' }}>
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right' // Legend on the right to match your layout
                    }
                  }
                }}
              />
            </Box>
            <Typography variant='h5' align='center'>
              $140,357.00
            </Typography>
            <Typography variant='body2' color='textSecondary' align='center'>
              Total Earnings
            </Typography>
 
        </Paper>
      </Box>

      <Paper  elevation={3} sx={{mt:4}}>
      <Typography variant="h4" gutterBottom>
        Recent Orders
      </Typography>
      <TextField
        fullWidth
        size="small"
        label="Search"
        sx={{ marginBottom: '20px', mx:4 }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell>
                    <StatusChip status={row.paymentStatus} />
                  </TableCell>
                  <TableCell>
                    <StatusChip status={row.status} />
                  </TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.store}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={fakeOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>
  )
}

export default ReportPage
