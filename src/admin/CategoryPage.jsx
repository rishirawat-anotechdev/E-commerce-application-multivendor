import React, { useState } from 'react';
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Modal,
  TextField,
  Chip
} from '@mui/material';
import { ExpandMore, Edit, Delete, Add, Close } from '@mui/icons-material'; // Import Close icon
import { Link } from 'react-router-dom';

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
];

const CategoryPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', subcategories: [] });
  const [newSubcategory, setNewSubcategory] = useState('');

  const handleOpenModal = (mode, category = null) => {
    setModalMode(mode);
    setSelectedCategory(category);
    setNewCategory(category || { name: '', subcategories: [] });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategory({ name: '', subcategories: [] });
    setNewSubcategory('');
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.trim() !== '') {
      setNewCategory(prev => ({
        ...prev,
        subcategories: [...prev.subcategories, newSubcategory.trim()]
      }));
      setNewSubcategory('');
    }
  };

  const handleRemoveSubcategory = (index) => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index)
    }));
  };

  const handleSaveCategory = () => {
    if (modalMode === 'create') {
      setCategories(prev => [...prev, { ...newCategory, id: prev.length + 1, count: newCategory.subcategories.length }]);
    } else {
      setCategories(prev => prev.map(cat => 
        cat.id === selectedCategory.id ? { ...newCategory, count: newCategory.subcategories.length } : cat
      ));
    }
    handleCloseModal();
  };

  const handleDeleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <Box sx={{ padding: 2, maxWidth: '800px', margin: 'auto', backgroundColor: '#f6f8fb', borderRadius: '8px' }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenModal('create')}
        sx={{ marginBottom: 2, px: 4 }}
      >
        Create Category
      </Button>

      {categories.map((category) => (
        <Accordion key={category.id} sx={{ marginBottom: 2, boxShadow: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${category.id}-content`}
            id={`panel${category.id}-header`}
          >
            <Typography sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              {category.name} 
              <Chip label={category.count} size="small" sx={{ ml: 1 }} />
            </Typography>
            <IconButton color="primary" onClick={(e) => { e.stopPropagation(); handleOpenModal('edit', category); }}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton color="error" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id); }}>
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
                        to={`/products/${sub}`}
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

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>

          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {modalMode === 'create' ? 'Create New Category' : 'Edit Category'}
          </Typography>
          <TextField
            fullWidth
            label="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              label="New Subcategory"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
            />
            <Button onClick={handleAddSubcategory} sx={{ ml: 1 }}>
              Add
            </Button>
          </Box>
          <Box sx={{ mb: 2 }}>
            {newCategory.subcategories.map((sub, index) => (
              <Chip
                key={index}
                label={sub}
                onDelete={() => handleRemoveSubcategory(index)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Button variant="contained" onClick={handleSaveCategory} fullWidth>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CategoryPage;
