import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, IconButton, TextField, Select, MenuItem, Pagination, Paper, Box, Typography, Chip,
  Divider
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

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
  const [page, setPage] = useState(1);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2, backgroundColor: "white" }}>
      <Box sx={{px:4}}>
      <TextField
      
      label="Search by Username"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleSearch}
      margin="normal"
      
   
    />
      </Box>
      <Divider sx={{mt:4}}/>
      <TableContainer >
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
                <TableCell><a href={`/users/${user.id}`}>{user.name}</a></TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell >
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
                <TableCell  sx={{ whiteSpace: 'nowrap' }}>
                  <IconButton aria-label="edit" color="primary">
                    <Edit />
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
      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Rows per page' }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
        <Pagination
          count={Math.ceil(filteredUsers.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CustomerPage;
