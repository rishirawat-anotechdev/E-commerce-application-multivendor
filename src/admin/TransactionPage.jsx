import React, { useState } from 'react';
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
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Dummy data for transactions
const transactions = [
  { id: 45, chargeId: 'RGFKLICJ0T', payerName: 'Kaleigh Sporer', amount: '2109.00 USD', paymentChannel: 'Mollie', status: 'Completed', createdAt: '2024-09-04' },
  { id: 44, chargeId: 'Z42AXCCAI1E', payerName: 'Kaleigh Sporer', amount: '2137.00 USD', paymentChannel: 'Paystack', status: 'Completed', createdAt: '2024-09-04' },
  { id: 43, chargeId: 'NTW4O3QREV', payerName: 'Kaleigh Sporer', amount: '1306.00 USD', paymentChannel: 'PayPal', status: 'Completed', createdAt: '2024-09-04' },
  { id: 42, chargeId: 'Y2ETNUCKAV', payerName: 'Adela Rowe PhD', amount: '6327.00 USD', paymentChannel: 'SslCommerz', status: 'Completed', createdAt: '2024-09-04' },
  { id: 41, chargeId: 'MI7QN6HJPO', payerName: 'Adela Rowe PhD', amount: '4274.00 USD', paymentChannel: 'Bank Transfer', status: 'Pending', createdAt: '2024-09-04' },
  { id: 40, chargeId: 'SONKA67XQF', payerName: 'Josie Hilpert', amount: '8800.00 USD', paymentChannel: 'SslCommerz', status: 'Completed', createdAt: '2024-09-04' },
  { id: 39, chargeId: 'FSWK95QGPU', payerName: 'Adela Rowe PhD', amount: '1762.00 USD', paymentChannel: 'SslCommerz', status: 'Completed', createdAt: '2024-09-04' },
];

const TransactionsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {/* Search Bar */}
      <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2, backgroundColor: '#fff', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', px: 2 }}>
        <TextField placeholder="Search by Payer Name" variant="outlined" size="small" sx={{ width: 400 }} />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Charge ID</TableCell>
              <TableCell>Payer Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Channel</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) => (
              <TableRow key={transaction.id} style={{ backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white' }}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.chargeId}</TableCell>
                <TableCell>{transaction.payerName}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.paymentChannel}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small" color={transaction.status === 'Completed' ? 'success' : 'warning'}>
                    {transaction.status}
                  </Button>
                </TableCell>
                <TableCell>{transaction.createdAt}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <IconButton color="primary"><EditIcon /></IconButton>
                  <IconButton color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={transactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default TransactionsPage
