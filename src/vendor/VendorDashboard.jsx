import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  Divider,
  Chip,
  Card
} from '@mui/material'

import {
  MdShoppingCart,
  MdRateReview,
  MdProductionQuantityLimits
} from 'react-icons/md'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import 'chart.js/auto'
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

const data = [
  { name: 'Revenue', value: 6768 },
  { name: 'Fees', value: 2000 }
]

const COLORS = ['#FFBB28', '#FF8042', '#00C49F', '#0088FE', '#FF00FF']

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1
  if (b[orderBy] > a[orderBy]) return 1
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const fakeOrders = [
  {
    id: '#0000045',
    customer: 'Kaleigh Sporer',
    amount: '$2,100.00',
    paymentMethod: 'Mollie',
    paymentStatus: 'Completed',
    status: 'Completed',
    createdAt: '2024-09-03',
    store: 'Global Office'
  },
  {
    id: '#0000043',
    customer: 'Kaleigh Sporer',
    amount: '$1,306.00',
    paymentMethod: 'PayPal',
    paymentStatus: 'Completed',
    status: 'Completed',
    createdAt: '2024-09-03',
    store: 'GoPro'
  },
  {
    id: '#0000044',
    customer: 'Kaleigh Sporer',
    amount: '$2,137.00',
    paymentMethod: 'Paystack',
    paymentStatus: 'Completed',
    status: 'Completed',
    createdAt: '2024-09-03',
    store: 'Global Store'
  },
  {
    id: '#0000041',
    customer: 'Adela Rowe PhD',
    amount: '$4,274.00',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Pending',
    status: 'Pending',
    createdAt: '2024-09-03',
    store: 'Global Store'
  },
  {
    id: '#0000040',
    customer: 'Josie Hilpert',
    amount: '$1,132.00',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Pending',
    status: 'Pending',
    createdAt: '2024-09-03',
    store: 'Global Store'
  },
  {
    id: '#0000039',
    customer: 'Josie Hilpert',
    amount: '$4,996.00',
    paymentMethod: 'Stripe',
    paymentStatus: 'Completed',
    status: 'Pending',
    createdAt: '2024-09-03',
    store: 'GoPro'
  },
  {
    id: '#0000038',
    customer: 'Adela Rowe PhD',
    amount: '$3,115.00',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Pending',
    status: 'Completed',
    createdAt: '2024-09-02',
    store: 'GoPro'
  },
  {
    id: '#0000036',
    customer: 'Vicky Bodnar',
    amount: '$2,784.00',
    paymentMethod: 'Razorpay',
    paymentStatus: 'Completed',
    status: 'Completed',
    createdAt: '2024-09-02',
    store: 'Young Shop'
  }
]

const columns = [
  { id: 'id', label: 'Id' },
  { id: 'name', label: 'Name' },
  { id: 'amount', label: 'Amount' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Created At' }
]

const StatusChip = ({ status }) => {
  const color = status === 'Completed' ? 'success' : 'warning'
  return <Chip label={status} color={color} size='small' />
}



// Sample data
const initialLineData = {
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
      data: [0, 0, 0, 140357, 0, 0, 0, 0, 0],
      fill: true,
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: '#FFBB28',
      borderWidth: 2,
      tension: 0.4,
      pointStyle: 'circle',
      pointRadius: 5
    }
  ]
}

let revenueValue = '6,785.9'

const cardData = [
  {
    title: 'Orders',
    value: 45,
    color: '#1abc9c',
    icon: <MdShoppingCart size={50} style={{ opacity: 0.2 }} />
  },
  {
    title: 'Products',
    value: 24,
    color: '#3498db',
    icon: <MdProductionQuantityLimits size={50} style={{ opacity: 0.2 }} />
  },
  {
    title: 'Revenue',
    value: `$${revenueValue}`,
    color: '#1F618D',
    icon: <MdRateReview size={50} style={{ opacity: 0.2 }} />
  }
]

const VendorDashboard = ({ sidebarOpen }) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('customer')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [selectedDateRange, setSelectedDateRange] = useState([null, null])
  const [filteredLineData, setFilteredLineData] = useState(initialLineData)

  useEffect(() => {
    // Function to filter data based on date range
    const filterDataByDateRange = () => {
      // Assuming `lineData` contains data to be filtered
      const [startDate, endDate] = selectedDateRange

      if (startDate && endDate) {
        // Implement your filtering logic here
        // For demonstration, we'll just use `initialLineData`
        setFilteredLineData(initialLineData)
      } else {
        setFilteredLineData(initialLineData)
      }
    }

    filterDataByDateRange()
  }, [selectedDateRange])

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = event =>
    setRowsPerPage(parseInt(event.target.value, 10))

  const sortedData = fakeOrders.slice().sort(getComparator(order, orderBy))

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Cards */}
        {cardData.map((card, index) => (
          <Grid xs={12} sm={6} md={6} lg={4}
            item
            key={index}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              elevation={3}
              sx={{
                backgroundColor: card.color,
                px: 2,
                py:1,
                color: 'white',
               width: '250px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '@media (max-width: 600px)': {
                  width: '90vw', // Full viewport width on mobile
                  maxWidth: 'none' // Remove the max width constraint on mobile
                },
                '@media (min-width:900px)': {
                  width: '100vw', // Full viewport width on mobile
                  maxWidth: 'none' // Remove the max width constraint on mobile
                }
              }}
            >
              <Box>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                <Typography variant='h3' sx={{ fontWeight: 'bold' }}>
                  {card.value}
                </Typography>
              </Box>
              <Box sx={{ position: 'absolute', right: 10, bottom: 10 }}>
                {card.icon}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Flexbox Layout for Site Analytics and Map */}

      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          marginTop: '20px',
          flexWrap: { xs: 'wrap', lg: 'nowrap' }
        }}
      >
        {/* Line Chart */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Paper
            elevation={3}
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 70%', lg: '1 1 70%' },
              padding: '20px'
            }}
          >
            <Typography variant='h6' gutterBottom>
              Sales Reports
            </Typography>

            {/* Date Range Picker */}
            <DateRangePicker
              
              startText='Start'
              endText='End'
              value={selectedDateRange}
              onChange={newValue => setSelectedDateRange(newValue)}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2  }}> to </Box>
                  <TextField {...endProps} />
                </>
              )}
            />

            <Box sx={{ height: '400px' }}>
              <Line
                data={filteredLineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 160000
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
        </LocalizationProvider>
        {/* Pie Chart */}
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
          <Typography variant='h5' gutterBottom>
            Earnings
          </Typography>
          <Typography variant='subtitle1' gutterBottom>
            Earnings in Last 30 days
          </Typography>

          <Box sx={{ height: "400px" }}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  innerRadius={90}
                  outerRadius={130}
                  paddingAngle={5}
                  dataKey='value'
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                EARNINGS
              </Typography>
              <Typography variant='h6' color='primary'>
                $6,768.00
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                REVENUE
              </Typography>
              <Typography variant='h6'>$6,768.00</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                WITHDRAWALS
              </Typography>
              <Typography variant='h6' color='error'>
                $3,151.00
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' color='text.secondary'>
                FEES
              </Typography>
              <Typography variant='h6'>$0.00</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Paper elevation={3} sx={{ mt: 4 }}>
        <Typography variant='h4' gutterBottom sx={{ p: 2 }}>
          Recent Orders
        </Typography>
        <Box sx={{ px: 4 }}>
          <TextField
            fullWidth
            size='small'
            label='Search'
            sx={{ marginBottom: '20px' }}
          />
        </Box>
        <Divider sx={{ mt: 4 }} />
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
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
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
          component='div'
          count={fakeOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Paper elevation={3} sx={{ mt: 4 }}>
        <Typography variant='h4' gutterBottom sx={{ p: 2 }}>
          Top Selling Product
        </Typography>
        <Box sx={{ px: 4 }}>
          <TextField
            fullWidth
            size='small'
            label='Search'
            sx={{ marginBottom: '20px' }}
          />
        </Box>
        <Divider sx={{ mt: 4 }} />
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
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>
                      <StatusChip status={row.status} />
                    </TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
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

export default VendorDashboard
