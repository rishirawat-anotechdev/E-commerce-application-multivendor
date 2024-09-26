import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, IconButton, TextField, Select, MenuItem, Paper, Box, Chip, TablePagination
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const usersData = [
  { id: 10, avatar: 'user1.jpg', name: 'Kaleigh Sporer', email: 'ursula.moore@example.org', createdAt: '2024-07-22', status: 'Activated', isVendor: 'No' },
  { id: 9, avatar: 'user2.jpg', name: 'Amie Wiza PhD', email: 'delia27@example.com', createdAt: '2024-07-22', status: 'Activated', isVendor: 'Yes' },
  { id: 8, avatar: 'user3.jpg', name: 'Adela Rowe PhD', email: 'kendra70@example.org', createdAt: '2024-07-22', status: 'Activated', isVendor: 'No' },
  { id: 7, avatar: 'user4.jpg', name: 'Vicky Bednar', email: 'merl.schultz@example.org', createdAt: '2024-07-22', status: 'Activated', isVendor: 'No' },
  { id: 6, avatar: 'user5.jpg', name: 'Miss Magdalena Hoeger Jr.', email: 'electa73@example.net', createdAt: '2024-07-22', status: 'Activated', isVendor: 'Yes' },
  { id: 5, avatar: 'user6.jpg', name: 'Josie Hilpert', email: 'dgoyette@example.net', createdAt: '2024-07-22', status: 'Activated', isVendor: 'No' },
  // Add more users as needed
];

const CustomerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      <Box sx={{ p: 4, backgroundColor: 'white' }}>
        <TextField
          label="Search by Username"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          margin="normal"
        />
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Avatar</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Is Vendor?</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user, index) => (
              <TableRow key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white' }}>
                <TableCell>{user.id}</TableCell>
                <TableCell><Avatar src={user.avatar} alt={user.name} /></TableCell>
                <TableCell><a href={`/admin/customer-profile/${user.id}`}>{user.name}</a></TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={user.status === 'Activated' ? 'primary' : 'secondary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.isVendor}
                    color={user.isVendor === 'Yes' ? 'primary' : 'secondary'}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <IconButton aria-label="edit" color="primary">
                 <Link to={'/admin/customer-profile/:id'}>
                 <Edit />
                 </Link>
                  </IconButton>
                  <IconButton aria-label="delete" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Records per page"
          labelDisplayedRows={({ from, to, count }) =>
            `Showing from ${from} to ${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
        />
    
    </Box>
  );
};

export default CustomerPage;
