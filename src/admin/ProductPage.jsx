import React, { useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  IconButton,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Button,
  Modal,
  Divider
} from '@mui/material'
import {
  Edit,
  Delete,
  Search as SearchIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const fakeData = [
  {
    id: 1,
    image: '🍌',
    product: 'Colorful Banana',
    price: 162.0,
    stockStatus: 'In stock',
    quantity: 16,
    sku: 'OY-115',
    createdAt: '2024-07-22'
  },
  {
    id: 2,
    image: '🍳',
    product: 'Organic Cage-Free Eggs',
    price: 2141.0,
    stockStatus: 'In stock',
    quantity: 19,
    sku: 'LV-154-A1',
    createdAt: '2024-07-22'
  },
  {
    id: 3,
    image: '🍉',
    product: 'Chen Watermelon',
    price: 320.0,
    stockStatus: 'In stock',
    quantity: 12,
    sku: 'MQ-188',
    createdAt: '2024-07-22'
  },
  {
    id: 4,
    image: '🥩',
    product: 'Signature Wood-Fired Mushroom',
    price: 1530.0,
    stockStatus: 'In stock',
    quantity: 28,
    sku: 'ME-135',
    createdAt: '2024-07-22'
  },
  {
    id: 5,
    image: '🥩',
    product: 'Signature Wood-Fired Mushroom',
    price: 1510.0,
    stockStatus: 'out of stock',
    quantity: 48,
    sku: 'ME-135',
    createdAt: '2024-07-22'
  },
  {
    id: 6,
    image: '🥩',
    product: 'Signature Wood-Fired Mushroom',
    price: 1550.0,
    stockStatus: 'out of stock',
    quantity: 68,
    sku: 'ME-135',
    createdAt: '2024-07-22'
  }
]

const ProductPage = () => {
  const [rows, setRows] = useState(fakeData)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState({
    text: '',
    stockStatus: '',
    priceCondition: '',
    priceValue: '',
    quantityCondition: '',
    quantityValue: '',
    dateCondition: ''
  })
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterChange = (key, value) => {
    setFilter({ ...filter, [key]: value })
  }

  const handleSort = property => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const filteredRows = rows.filter(row => {
    let matches = true

    // Product name filter
    if (
      filter.text &&
      !row.product.toLowerCase().includes(filter.text.toLowerCase())
    ) {
      matches = false
    }

    // Stock status filter
    if (
      filter.stockStatus &&
      row.stockStatus.toLowerCase() !== filter.stockStatus.toLowerCase()
    ) {
      matches = false
    }

    // Price filter
    if (filter.priceCondition && filter.priceValue) {
      if (
        filter.priceCondition === 'greater' &&
        row.price <= parseFloat(filter.priceValue)
      ) {
        matches = false
      }
    }

    // Quantity filter
    if (filter.quantityCondition && filter.quantityValue) {
      if (
        filter.quantityCondition === 'greater' &&
        row.quantity <= parseInt(filter.quantityValue)
      ) {
        matches = false
      }
    }

    // Date range filter
    if (startDate && endDate) {
      const rowDate = new Date(row.createdAt)
      if (rowDate < startDate || rowDate > endDate) {
        matches = false
      }
    }

    return matches
  })

  const sortedRows = filteredRows.sort((a, b) => {
    const isNumericField = field => ['price', 'quantity'].includes(field)

    if (isNumericField(orderBy)) {
      return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy]
    } else {
      return order === 'asc'
        ? a[orderBy].toString().localeCompare(b[orderBy].toString())
        : b[orderBy].toString().localeCompare(a[orderBy].toString())
    }
  })

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleDelete = id => {
    setRows(rows.filter(row => row.id !== id))
  }

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      <Grid
        container
        alignItems='center'
        marginBottom={4}
        sx={{ backgroundColor: '#fff', p: 4, gap: 2 }}
      >
        {/* Responsive Search Bar */}
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <TextField
              label='Search by Product Name'
              variant='outlined'
              fullWidth
              value={filter.text}
              onChange={e => handleFilterChange('text', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Link to={'/admin/product-add'}>
              <Button variant='contained' color='primary' fullWidth>
                Create
              </Button>
            </Link>
          </Grid>
        </Grid>

        {/* Responsive Filter Button */}
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={2}
          container
          justifyContent='flex-start'
        >
          <Box
            sx={{
              color: 'blue',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={handleOpen}
          >
            <FilterListIcon sx={{ mr: 1  }} />
            <Typography variant='body2' sx={{ whiteSpace: 'nowrap', fontSize:"1.3rem" }}>
              Advanced Filter
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: 'none', // Remove the border
              outline: 'none', // Remove the outline
              boxShadow: 24,
              p: 4
            }}
          >
            {/* Close Button */}
            <Button
              onClick={handleClose}
              color='error'
              sx={{ position: 'absolute', top: 2, right: -8 }}
            >
              <IoCloseCircleOutline size={24} />
            </Button>

            {/* Price Condition */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Price Condition</InputLabel>
              <Select
                value={filter.priceCondition}
                onChange={e =>
                  handleFilterChange('priceCondition', e.target.value)
                }
                label='Price Condition'
              >
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='greater'>Greater than</MenuItem>
              </Select>
              <TextField
                type='number'
                label='Price Value'
                variant='outlined'
                fullWidth
                value={filter.priceValue}
                onChange={e => handleFilterChange('priceValue', e.target.value)}
                sx={{ mt: 2 }}
              />
            </FormControl>

            {/* Quantity Condition */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Quantity Condition</InputLabel>
              <Select
                value={filter.quantityCondition}
                onChange={e =>
                  handleFilterChange('quantityCondition', e.target.value)
                }
                label='Quantity Condition'
              >
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='greater'>Greater than</MenuItem>
              </Select>
              <TextField
                type='number'
                label='Quantity Value'
                variant='outlined'
                fullWidth
                value={filter.quantityValue}
                onChange={e =>
                  handleFilterChange('quantityValue', e.target.value)
                }
                sx={{ mt: 2 }}
              />
            </FormControl>

            {/* Date Filter */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label='Start Date'
                  value={startDate}
                  onChange={newDate => setStartDate(newDate)}
                  renderInput={params => <TextField {...params} fullWidth />}
                />
                <DatePicker
                  label='End Date'
                  value={endDate}
                  onChange={newDate => setEndDate(newDate)}
                  renderInput={params => <TextField {...params} fullWidth />}
                />
              </Box>
            </FormControl>

            {/* Apply Filters Button */}
            <Button
              onClick={() => {
                handleFilterChange('startDate', startDate)
                handleFilterChange('endDate', endDate)
                handleClose()
              }}
              variant='contained'
              fullWidth
            >
              Apply Filters
            </Button>
          </Box>
        </Modal>
      </LocalizationProvider>

      <TableContainer component={Paper} mt={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('id')}>
                <Typography fontWeight='bold'>ID</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight='bold'>Image</Typography>
              </TableCell>
              <TableCell onClick={() => handleSort('product')}>
                <Typography fontWeight='bold'>Product</Typography>
              </TableCell>
              <TableCell onClick={() => handleSort('price')}>
                <Typography fontWeight='bold'>Price</Typography>
              </TableCell>
              <TableCell onClick={() => handleSort('stockStatus')}>
                <Typography fontWeight='bold'>Stock Status</Typography>
              </TableCell>
              <TableCell onClick={() => handleSort('quantity')}>
                <Typography fontWeight='bold'>Quantity</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight='bold'>SKU</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight='bold'>Created At</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight='bold'>Operations</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={row.id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white'
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.image}</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>
                  <Link
                    to={`/admin/product-info/:${row.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {row.product}
                  </Link>
                </TableCell>
                <TableCell>${row.price.toFixed(2)}</TableCell>
                <TableCell>{row.stockStatus}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell sx={{whiteSpace:"nowrap"}}>
                  <IconButton color='primary'>
                    <Link to={'/admin/product-info/:id'}>
                    <Edit />
                    </Link>
                   
                  </IconButton>
                  <IconButton
                    color='secondary'
                    onClick={() => handleDelete(row.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default ProductPage
