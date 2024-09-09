import React, { useState } from 'react';
import {
  Box, Button, Accordion, AccordionSummary, AccordionDetails,
  Typography, List, ListItem, ListItemText, IconButton
} from '@mui/material';
import { ExpandMore, Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';  // Import Link from React Router

const initialCategories = [
  {
    id: 1,
    name: 'Milks and Dairies',
    count: 3,
    subcategories: ['Low Fat Milk', 'Whole Milk', 'Cheese'],
  },
  {
    id: 2,
    name: 'Clothing & beauty',
    count: 8,
    subcategories: ['Makeup', 'Skin Care', 'Clothing'],
  },
  {
    id: 3,
    name: 'Pet Toy',
    count: 11,
    subcategories: ['Chew Toys', 'Fetch Toys', 'Interactive Toys'],
  },
  // Add more categories as per your need
];

const CategoryPage = () => {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <Box sx={{ padding: 2,  maxWidth: '1200px', margin: 'auto', backgroundColor: '#f6f8fb', borderRadius: '8px' }}>
      {/* Create Button */}
      <Button variant="contained" color="primary" sx={{ marginBottom: 2, px:4 }}>
        + Create
      </Button>

      {/* Category Accordions */}
      {categories.map((category) => (
        <Accordion key={category.id} sx={{ marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${category.id}-content`}
            id={`panel${category.id}-header`}
          >
            <Typography sx={{ flexGrow: 1 }}>
              {category.name} ({category.count})
            </Typography>
            <IconButton color="primary">
              <Edit fontSize="small" />
            </IconButton>
            <IconButton color="secondary">
              <Delete fontSize="small" />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {category.subcategories.map((sub, index) => (
                <ListItem key={index} sx={{ padding: '2px 16px' }}>
                  <ListItemText
                    primary={
                      <Link
                        to={`/products/${sub}`}  // Navigating to the product page for the subcategory
                        style={{ textDecoration: 'none', color: '#1976d2' }}
                      >
                        {sub}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CategoryPage;
