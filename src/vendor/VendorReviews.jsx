import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Box,
  TablePagination,
  Paper,
  Modal,
  Typography,
  Tooltip
} from '@mui/material'
import { Delete, Visibility } from '@mui/icons-material'
import Rating from '@mui/material/Rating'
import CloseIcon from '@mui/icons-material/Close'
const reviewsData = [
  {
    id: 884,
    product: {
      name: 'Haagen-Dazs Caramel Cone Ice Cream',
      link: '/products/884'
    },
    user: { name: 'Adela Rowe PhD', link: '/users/1' },
    star: 3,
    comment:
      'As a developer I reviewed this script. This is really awesome ecommerce...',
    images: ['img1.jpg'],
    status: 'Published',
    createdAt: '2024-07-22'
  },
  {
    id: 877,
    product: {
      name: 'Simply Lemonade with Raspberry Juice',
      link: '/products/877'
    },
    user: { name: 'Mae West', link: '/users/2' },
    star: 4,
    comment:
      'Cool template. Excellent code quality. The support responds very quick...',
    images: ['img3.jpg'],
    status: 'Published',
    createdAt: '2024-07-22'
  }
  // Add more data here
]

const VendorReviews = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }

  const filteredReviews = reviewsData.filter(review =>
    review.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const displayedReviews = filteredReviews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      <Box sx={{ p: 4, backgroundColor: 'white' }}>
        <TextField
          label='Search by Username'
          variant='outlined'
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          margin='normal'
        />
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Star</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedReviews.map(review => (
              <TableRow
                key={review.id}
                style={{
                  backgroundColor: review.id % 2 === 0 ? '#f6f8fb' : 'white'
                }}
              >
                <TableCell>{review.id}</TableCell>
                <TableCell>
                  <a href={review.product.link}>{review.product.name}</a>
                </TableCell>
                <TableCell>
                {review.user.name}
                </TableCell>
                <TableCell>
                  <Rating name='read-only' value={review.star} readOnly />
                </TableCell>
                <Tooltip
                  title={review.comment}
                  arrow
                  sx={{
                    '& .MuiTooltip-tooltip': {
                      fontSize: '1.1rem' // Adjust the font size as needed
                    }
                  }}
                >
                  <TableCell onClick={handleOpen}>
                    <Box
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 150, // Adjust as per your needs
                        cursor: 'pointer'
                      }}
                    >
                      {review.comment}
                    </Box>
                  </TableCell>
                </Tooltip>

                <TableCell>
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`img${index + 1}`}
                      style={{ width: '50px', marginRight: '5px' }}
                    />
                  ))}
                </TableCell>
                <TableCell>{review.status}</TableCell>
                <TableCell>{review.createdAt}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <IconButton aria-label='view'>
                    <Visibility />
                  </IconButton>
                  <IconButton aria-label='delete' color='error'>
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
        count={filteredReviews.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  )
}

export default VendorReviews
