import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, IconButton, InputAdornment, Box, Button,Divider
} from '@mui/material';
import { Edit, Delete, Search, Save } from '@mui/icons-material';

const initialData = [
  {
    id: 2,
    image: 'https://via.placeholder.com/50',
    product: 'All Natural Italian-Style Chicken Meatballs',
    sku: 'GT-147',
    costPerItem: 0,
    price: 1638,
    priceSale: 906,
  },
  {
    id: 18,
    image: 'https://via.placeholder.com/50',
    product: 'All Natural Italian-Style Chicken Meatballs',
    sku: 'DG-173',
    costPerItem: 0,
    price: 672,
    priceSale: 300,
    subProducts: [
      { id: 'A1', sku: 'FD-122-A1', costPerItem: 0, price: 1599, priceSale: '' },
      { id: 'A2', sku: 'FD-122-A1-A2', costPerItem: 0, price: 1599, priceSale: '' },
      { id: 'A3', sku: 'FD-122-A1-A3', costPerItem: 0, price: 1599, priceSale: '' },
    ],
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/50',
    product: 'Angie’s Boomchickapop Sweet & Salty Kettle Corn',
    sku: 'EI-129',
    costPerItem: 0,
    price: 2282,
    priceSale: 385,
  },
];

const ProductPrice = () => {
  const [data, setData] = useState(initialData);
  const [editingRow, setEditingRow] = useState(null);

  const handleInputChange = (id, field, value, subProductId = null) => {
    setData(prevData =>
      prevData.map(row => {
        if (row.id === id) {
          if (subProductId) {
            const updatedSubProducts = row.subProducts.map(sub =>
              sub.id === subProductId ? { ...sub, [field]: value } : sub
            );
            return { ...row, subProducts: updatedSubProducts };
          }
          return { ...row, [field]: value };
        }
        return row;
      })
    );
  };

  const handleEditRow = (id) => {
    setEditingRow(id);
  };

  const handleSaveRow = () => {
    setEditingRow(null);
    // Here, you can integrate your API call to save the changes
  };

  const handleDeleteRow = (id) => {
    const updatedData = data.filter(row => row.id !== id);
    setData(updatedData);
    // Here, you can call an API to delete the product
  };

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2, backgroundColor:"#fff"  }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
        <TextField
          fullWidth
          label="Search by product name"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary"  sx={{ whiteSpace: 'nowrap', px:4, ml:4 }}>
          Add New Product
        </Button>
      </Box>

    <Divider sx={{mt:2}}/>
       <TableContainer>
       <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Cost Per Item</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Price Sale</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {data.map((row, index) => (
    <React.Fragment key={row.id}>
      <TableRow style={{ backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white' }}>
        <TableCell>{row.id}</TableCell>
        <TableCell>
          <img src={row.image} alt={row.product} width={50} />
        </TableCell>
        <TableCell>
          <div>{row.product}</div>
          <div>SKU: {row.sku}</div>
        </TableCell>
        <TableCell>
          <TextField
            value={row.costPerItem}
            onChange={(e) =>
              handleInputChange(row.id, 'costPerItem', e.target.value)
            }
            disabled={editingRow !== row.id}
          />
        </TableCell>
        <TableCell>
          <TextField
            value={row.price}
            onChange={(e) => handleInputChange(row.id, 'price', e.target.value)}
            disabled={editingRow !== row.id}
          />
        </TableCell>
        <TableCell>
          <TextField
            value={row.priceSale}
            onChange={(e) => handleInputChange(row.id, 'priceSale', e.target.value)}
            disabled={editingRow !== row.id}
          />
        </TableCell>
        <TableCell >
          {editingRow === row.id ? (
            <IconButton color="primary" onClick={handleSaveRow}>
              <Save />
            </IconButton>
          ) : (
            <IconButton color="primary" onClick={() => handleEditRow(row.id)}>
              <Edit />
            </IconButton>
          )}
          <IconButton color="secondary" onClick={() => handleDeleteRow(row.id)}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Render sub-products if they exist */}
      {row.subProducts?.map((sub) => (
        <TableRow key={sub.id} style={{ backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white' }}>
          <TableCell />
          <TableCell />
          <TableCell>↳ SKU: {sub.sku}</TableCell>
          <TableCell>
            <TextField
              value={sub.costPerItem}
              onChange={(e) =>
                handleInputChange(row.id, 'costPerItem', e.target.value, sub.id)
              }
              disabled={editingRow !== row.id}
            />
          </TableCell>
          <TableCell>
            <TextField
              value={sub.price}
              onChange={(e) =>
                handleInputChange(row.id, 'price', e.target.value, sub.id)
              }
              disabled={editingRow !== row.id}
            />
          </TableCell>
          <TableCell>
            <TextField
              value={sub.priceSale}
              onChange={(e) =>
                handleInputChange(row.id, 'priceSale', e.target.value, sub.id)
              }
              disabled={editingRow !== row.id}
            />
          </TableCell>
          <TableCell />
        </TableRow>
      ))}
    </React.Fragment>
  ))}
</TableBody>

        </Table>
       </TableContainer>
   
    </Box>
  );
};

export default ProductPrice;
