import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Grid,
  Paper,
  Typography,
  MenuItem,
  Select,
  Box,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import {
  MdShoppingCart,
  MdPeople,
  MdRateReview,
  MdProductionQuantityLimits
} from 'react-icons/md'
import IndiaMap from '../common/IndiaMap'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Updated working India GeoJson URL

// Fake data for top vendors
const fakeVendors = [
  { id: 1, name: 'Vendor A', sales: 15000 },
  { id: 2, name: 'Vendor B', sales: 12000 },
  { id: 3, name: 'Vendor C', sales: 10000 },
  { id: 4, name: 'Vendor D', sales: 9000 },
  { id: 5, name: 'Vendor E', sales: 8000 }
]

// Fake data for top products
const fakeProducts = [
  { id: 1, name: 'Product X', sales: 500 },
  { id: 2, name: 'Product Y', sales: 450 },
  { id: 3, name: 'Product Z', sales: 400 },
  { id: 4, name: 'Product W', sales: 350 },
  { id: 5, name: 'Product V', sales: 300 },
  { id: 6, name: 'Product U', sales: 250 },
  { id: 7, name: 'Product T', sales: 200 },
  { id: 8, name: 'Product S', sales: 150 },
  { id: 9, name: 'Product R', sales: 100 },
  { id: 10, name: 'Product Q', sales: 50 }
]

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
    title: 'Customers',
    value: 10,
    color: '#5DADE2',
    icon: <MdPeople size={50} style={{ opacity: 0.2 }} />
  },
  {
    title: 'Reviews',
    value: 233,
    color: '#1F618D',
    icon: <MdRateReview size={50} style={{ opacity: 0.2 }} />
  }
]

const data = {
  labels: ['1 Day', '1 Week', '1 Month', '1 Year'],
  datasets: [
    {
      label: 'Product A Sales',
      data: [150, 1000, 5000, 30000], // Sales data for different time ranges
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)'
    },
    {
      label: 'Product B Sales',
      data: [100, 800, 4000, 25000], // Sales data for a second product
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)'
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
}

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('Today')
  const [vendorStartDate, setVendorStartDate] = useState(null)
  const [vendorEndDate, setVendorEndDate] = useState(null)
  const [productStartDate, setProductStartDate] = useState(null)
  const [productEndDate, setProductEndDate] = useState(null)
  

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      <Grid container spacing={4}>
        {/* Cards */}
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: card.color,
                padding: 2,
                color: 'white',
                height: '150px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
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
            </Paper>
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
        {/* Site Analytics */}
        <Paper
          elevation={3}
          sx={{
            flex: { xs: '1 1 100%' , lg: '1 1 70%' },
            padding: '20px'
          }}
        >
          <Typography variant='h6' gutterBottom>
            Sales Analytics
          </Typography>
          <Select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            sx={{ float: 'right', marginTop: '-40px' }}
          >
            <MenuItem value='1 Day'>1 Day</MenuItem>
            <MenuItem value='1 Week'>1 Week</MenuItem>
            <MenuItem value='1 Month'>1 Month</MenuItem>
            <MenuItem value='1 Year'>1 Year</MenuItem>
          </Select>
          <Line data={data} options={options} />
        </Paper>

        {/* India Map */}
        <Paper
          elevation={2}
          sx={{
            flex: { xs: '1 1 100%', lg: '1 1 30%' },
            padding: '20px',
            height: '600px'
          }}
        >
          <Typography variant='h6' gutterBottom>
            Map of India (Usage Distribution)
          </Typography>
          <IndiaMap />
        </Paper>
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: '20px' }}>
              <Typography variant='subtitle1'>Sessions</Typography>
              <Typography variant='h5'>316</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: '20px' }}>
              <Typography variant='subtitle1'>Visitors</Typography>
              <Typography variant='h5'>270</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: '20px' }}>
              <Typography variant='subtitle1'>Pageviews</Typography>
              <Typography variant='h5'>1,240</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: '20px' }}>
              <Typography variant='subtitle1' sx={{ whiteSpace: 'nowrap' }}>
                Bounce Rate
              </Typography>
              <Typography variant='h5'>63%</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            py: 2,
            mt: 2
          }}
        >
          {/* Top Vendors Table */}
          <Box sx={{ flex: 1, px: 1, bgcolor: '#fff' }}>
            <Typography variant='h6' gutterBottom>
              Top Vendors
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <DatePicker
                label='Start Date'
                value={vendorStartDate}
                onChange={newValue => setVendorStartDate(newValue)}
                renderInput={params => <TextField {...params} size='small' />}
              />
              <DatePicker
                label='End Date'
                value={vendorEndDate}
                onChange={newValue => setVendorEndDate(newValue)}
                renderInput={params => <TextField {...params} size='small' />}
              />
            </Box>
            <TableContainer component={Paper}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Vendor Name</TableCell>
                    <TableCell align='right'>Sales</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fakeVendors.map((vendor, index) => (
                    <TableRow
                      key={vendor.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white'
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {vendor.name}
                      </TableCell>
                      <TableCell align='right'>
                        ${vendor.sales.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Top Products Table */}
          <Box sx={{ flex: 1, px: 1, bgcolor: '#fff' }}>
            <Typography variant='h6' gutterBottom>
              Top 10 Selling Products
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <DatePicker
                label='Start Date'
                value={productStartDate}
                onChange={newValue => setProductStartDate(newValue)}
                renderInput={params => <TextField {...params} size='small' />}
              />
              <DatePicker
                label='End Date'
                value={productEndDate}
                onChange={newValue => setProductEndDate(newValue)}
                renderInput={params => <TextField {...params} size='small' />}
              />
            </Box>
            <TableContainer component={Paper}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align='right'>Units Sold</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fakeProducts.map((product, index) => (
                    <TableRow
                      key={product.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white'
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {product.name}
                      </TableCell>
                      <TableCell align='right'>{product.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </LocalizationProvider>
    </Box>
  )
}

export default AdminDashboard
