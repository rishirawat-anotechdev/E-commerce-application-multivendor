import React, { useState, useEffect } from 'react'
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
} from '@mui/material'
import {
  Edit,
  Delete,
  FilterList as FilterListIcon
} from '@mui/icons-material'
import { Link } from 'react-router-dom'


// Fake Data for Categories and Subcategories
const categoryData = [
  {
    id: 1,
    name: 'Fruits',
    subcategories: ['Bananas', 'Watermelons']
  },
  {
    id: 2,
    name: 'Meats',
    subcategories: ['Steaks', 'Chicken']
  },
  {
    id: 3,
    name: 'Dairy',
    subcategories: ['Eggs', 'Milk']
  }
]

const fakeData = [
  {
    id: 1,
    image: '🍌',
    product: 'Colorful Banana',
    category: 'Fruits',
    subcategory: 'Bananas',
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
    category: 'Dairy',
    subcategory: 'Eggs',
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
    category: 'Fruits',
    subcategory: 'Watermelons',
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
    category: 'Meats',
    subcategory: 'Steaks',
    price: 1530.0,
    stockStatus: 'In stock',
    quantity: 28,
    sku: 'ME-135',
    createdAt: '2024-07-22'
  }
]

const CategoriesTable = () => {
  const [rows, setRows] = useState(fakeData)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState({
    text: '',
    category: '',
    subcategory: '',
    stockStatus: '',
    priceCondition: '',
    priceValue: '',
    quantityCondition: '',
    quantityValue: '',
    dateCondition: ''
  })
  const [subcategories, setSubcategories] = useState([])

  useEffect(() => {
    // Update subcategories when category changes
    const selectedCategory = categoryData.find(
      cat => cat.name === filter.category
    )
    setSubcategories(selectedCategory ? selectedCategory.subcategories : [])
  }, [filter.category])

  const handleFilterChange = (key, value) => {
    setFilter({ ...filter, [key]: value })
  }

  const filteredRows = rows.filter(row => {
    let matches = true

    // Product name filter
    if (filter.text && !row.product.toLowerCase().includes(filter.text.toLowerCase())) {
      matches = false
    }

    // Category filter
    if (filter.category && row.category !== filter.category) {
      matches = false
    }

    // Subcategory filter
    if (filter.subcategory && row.subcategory !== filter.subcategory) {
      matches = false
    }

    return matches
  })

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleDelete = id => {
    setRows(rows.filter(row => row.id !== id))
  }

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      <Grid container alignItems='center' marginBottom={4} sx={{ backgroundColor: '#fff', p: 4, gap: 2 }}>
        {/* Responsive Search Bar */}
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Search by Product Name'
              variant='outlined'
              fullWidth
              value={filter.text}
              onChange={e => handleFilterChange('text', e.target.value)}
            />
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filter.category}
                onChange={e => handleFilterChange('category', e.target.value)}
                label='Category'
              >
                <MenuItem value=''>All Categories</MenuItem>
                {categoryData.map(category => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Subcategory Filter */}
          {filter.category && (
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={filter.subcategory}
                  onChange={e => handleFilterChange('subcategory', e.target.value)}
                  label='Subcategory'
                >
                  <MenuItem value=''>All Subcategories</MenuItem>
                  {subcategories.map(subcat => (
                    <MenuItem key={subcat} value={subcat}>
                      {subcat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper} mt={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Status</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Operations</TableCell>
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
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.subcategory}</TableCell>
                <TableCell>${row.price.toFixed(2)}</TableCell>
                <TableCell>{row.stockStatus}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
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
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={event => setRowsPerPage(parseInt(event.target.value, 10))}
      />
    </Box>
  )
}

export default CategoriesTable
