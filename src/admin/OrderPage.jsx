import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Chip,
  TablePagination,
} from '@mui/material';

// Fake Data
const rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com', amount: 2109, paymentMethod: 'Mollie', paymentStatus: 'Completed', status: 'Completed', taxAmount: 0 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 1370, paymentMethod: 'Paystack', paymentStatus: 'Completed', status: 'Completed', taxAmount: 0 },
  { id: 3, name: 'Adam Johnson', email: 'adam@example.com', amount: 6300, paymentMethod: 'PayPal', paymentStatus: 'Completed', status: 'Completed', taxAmount: 0 },
  { id: 4, name: 'Test User', email: 'test@example.com', amount: 5000, paymentMethod: 'Stripe', paymentStatus: 'Pending', status: 'Pending', taxAmount: 0 },
];

// Payment and Status Chips
const getStatusChip = (status) => {
  const color = status === 'Completed' ? 'success' : 'warning';
  return <Chip label={status} color={color} />;
};

const getPaymentStatusChip = (status) => {
  const color = status === 'Completed' ? 'success' : status === 'Pending' ? 'warning' : 'error';
  return <Chip label={status} color={color} />;
};

const OrderPage = () => {
  const [filter, setFilter] = useState({
    field: '',
    value: '',
    paymentStatus: '',
    amountCondition: '',
    amount: '',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get the filtered rows for the current page


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredRows = rows
  .filter((row) => {
    // Apply filter conditions based on filter state
    let valid = true;

    // Filter by field (Name, Email, Amount)
    if (filter.field === 'name' && filter.value && !row.name.toLowerCase().includes(filter.value.toLowerCase())) {
      valid = false;
    }
    if (filter.field === 'email' && filter.value && !row.email.toLowerCase().includes(filter.value.toLowerCase())) {
      valid = false;
    }
    if (filter.field === 'amount' && filter.value && row.amount !== parseFloat(filter.value)) {
      valid = false;
    }

    // Filter by Payment Status
    if (filter.paymentStatus && row.paymentStatus !== filter.paymentStatus) {
      valid = false;
    }

    // Filter by Amount Condition
    if (filter.amountCondition === 'greater' && row.amount <= parseFloat(filter.amount)) {
      valid = false;
    }
    if (filter.amountCondition === 'less' && row.amount >= parseFloat(filter.amount)) {
      valid = false;
    }

    return valid;
  })
  // Apply pagination to the filtered rows
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <Box sx={{padding: { xs: 1, sm: 2 } , mt: 2 }}>
      {/* Filter Box */}
      <Box mb={4} p={3} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h6" mb={2}>Filters</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Select field</InputLabel>
              <Select
                name="field"
                value={filter.field}
                onChange={handleFilterChange}
                fullWidth
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
             
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              name="value"
              value={filter.value}
              onChange={handleFilterChange}
              fullWidth
              label="Value"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Payment Status</InputLabel>
              <Select
                name="paymentStatus"
                value={filter.paymentStatus}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Amount Condition</InputLabel>
              <Select
                name="amountCondition"
                value={filter.amountCondition}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="greater">Greater than</MenuItem>
                <MenuItem value="less">Less than</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              name="amount"
              value={filter.amount}
              onChange={handleFilterChange}
              fullWidth
              label="Amount"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth>Apply</Button>
          </Grid>
        </Grid>
      </Box>

      {/* Table */}
      <Box mb={2}>
      
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">ID</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Amount</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Payment Method</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Payment Status</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Tax Amount</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id} style={{ backgroundColor: row.id % 2 === 0 ? '#f6f8fb' : 'white' }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>${row.amount.toFixed(2)}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>{getPaymentStatusChip(row.paymentStatus)}</TableCell>
                <TableCell>{getStatusChip(row.status)}</TableCell>
                <TableCell>${row.taxAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
     

      {/* Pagination Component */}
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        labelRowsPerPage="Records per page"
        labelDisplayedRows={({ from, to, count }) => `Showing from ${from} to ${to} of ${count}`}
      />
    </Box>
    </Box>
  );
};

export default OrderPage;
