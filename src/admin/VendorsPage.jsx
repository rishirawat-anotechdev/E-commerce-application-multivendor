import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  Typography,
  Button
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'

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

const VendorsPage = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      {/* Search Bar */}
      <Box
        sx={{
          py: { xs: 1, sm: 2 },
          mt: 2,
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          px: 2
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
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
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
                    <Link to={`/admin/vendor-profile`}>
                      <Typography
                        variant='body2'
                        sx={{
                          fontWeight: 500,
                          color: 'blue',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        {row.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>
                    <Button variant='contained' size='small' color='success'>
                      {row.status}
                    </Button>
                  </TableCell>
                  <TableCell>{row.store}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <IconButton color='primary'>
                      <Link to={'/admin/vendor-profile'}>
                      <EditIcon />
                      </Link>
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
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default VendorsPage
