import React, { useState } from 'react';
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment,
  Button,
  IconButton
} from '@mui/material';
import { Search, Edit, Delete } from '@mui/icons-material';

// Fake data for the table
const rows = [
  { id: 1, name: 'Persxion', isFeatured: 'Yes', createdAt: '2024-07-22', status: 'Published' },
  { id: 2, name: 'Hiching', isFeatured: 'Yes', createdAt: '2024-07-22', status: 'Published' },
  { id: 3, name: 'Kepslo', isFeatured: 'Yes', createdAt: '2024-07-22', status: 'Published' },
  { id: 4, name: 'Groneba', isFeatured: 'Yes', createdAt: '2024-07-22', status: 'Published' },
  { id: 5, name: 'Babian', isFeatured: 'Yes', createdAt: '2024-07-22', status: 'Published' },
  { id: 6, name: 'Valorant', isFeatured: 'Yes', createdAt: '2024-07-22', status: 'Published' },
  { id: 7, name: 'Pure', isFeatured: 'Yes', createdAt: '2024-07-22', status: 'Published' },
];

function BrandsPage () {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box  sx={{ py: { xs: 1, sm: 2 }, mt: 2, backgroundColor:"white"  }}>
      {/* Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by brands name"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <Button variant="contained" sx={{ mr: 2 }}>Create</Button>         
        </Box>
      </Box>

      {/* Table */}
      <TableContainer sx={{mt:4}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell fontWeight="bold">ID</TableCell>
              <TableCell fontWeight="bold">Name</TableCell>
              <TableCell fontWeight="bold">Is Featured</TableCell>
              <TableCell fontWeight="bold">Created At</TableCell>
              <TableCell fontWeight="bold">Status</TableCell>
              <TableCell fontWeight="bold">Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} style={{ backgroundColor: row.id % 2 === 0 ? '#f6f8fb' : 'white' }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Chip label={row.isFeatured} color="success" />
                  </TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>
                    <Chip label={row.status} color="success" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton color="error">
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
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default BrandsPage;
