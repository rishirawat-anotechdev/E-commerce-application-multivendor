import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Typography,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemText,
  TablePagination
} from '@mui/material'
import {
  Edit,
  Delete,
  Add,
  Close,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const initialCategories = [
  {
    id: 1,
    name: 'Milks and Dairies',
    subcategories: ['Low Fat Milk', 'Whole Milk', 'Cheese']
  },
  {
    id: 2,
    name: 'Clothing & beauty',
    subcategories: ['Makeup', 'Skin Care', 'Clothing']
  },
  {
    id: 3,
    name: 'Pet Toy',
    subcategories: ['Chew Toys', 'Fetch Toys', 'Interactive Toys']
  },
  // Add more categories for testing pagination
  {
    id: 4,
    name: 'Beverages',
    subcategories: ['Juice', 'Soda', 'Tea']
  },
  {
    id: 5,
    name: 'Snacks',
    subcategories: ['Chips', 'Cookies', 'Nuts']
  },
  {
    id: 6,
    name: 'Electronics',
    subcategories: ['Mobile', 'Laptop', 'Camera']
  }
]

const CategoryPage = () => {
  const [categories, setCategories] = useState(initialCategories)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    subcategories: []
  })
  const [newSubcategory, setNewSubcategory] = useState('')
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [page, setPage] = useState(0) // For pagination
  const [rowsPerPage, setRowsPerPage] = useState(5) // Default rows per page
  const navigate = useNavigate()

  const filteredCategories = categories.filter(
    category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some(sub =>
        sub.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  const handleOpenModal = (mode, category = null) => {
    setModalMode(mode)
    setSelectedCategory(category)
    setNewCategory(category || { name: '', subcategories: [] })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setNewCategory({ name: '', subcategories: [] })
    setNewSubcategory('')
  }

  const handleAddSubcategory = () => {
    if (newSubcategory.trim() !== '') {
      setNewCategory(prev => ({
        ...prev,
        subcategories: [...prev.subcategories, newSubcategory.trim()]
      }))
      setNewSubcategory('')
    }
  }

  const handleRemoveSubcategory = index => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index)
    }))
  }

  const handleSaveCategory = () => {
    if (modalMode === 'create') {
      setCategories(prev => [...prev, { ...newCategory, id: prev.length + 1 }])
    } else {
      setCategories(prev =>
        prev.map(cat =>
          cat.id === selectedCategory.id ? { ...newCategory } : cat
        )
      )
    }
    handleCloseModal()
  }

  const handleDeleteCategory = id => {
    setCategories(prev => prev.filter(cat => cat.id !== id))
  }

  const handleCategoryClick = categoryName => {
    navigate(`/admin/products/category/${categoryName}`)
  }

  const handleSubcategoryClick = subcategoryName => {
    navigate(`/admin/products/subcategory/${subcategoryName}`)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ py: { xs: 1, sm: 2 }, mt: 2 }}>
      <Box sx={{ p: 4, backgroundColor: '#fff', mb: 2 }}>
        <TextField
          fullWidth
          variant='outlined'
          placeholder='Search categories or subcategories'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant='contained'
          color='primary'
          startIcon={<Add />}
          onClick={() => handleOpenModal('create')}
          sx={{ mb: 2 }}
        >
          Create Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Subcategories Count</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate
              .map((category, index) => (
                <React.Fragment key={category.id}>
                  <TableRow
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white'
                    }}
                  >
                    <TableCell
                      onClick={() => handleCategoryClick(category.name)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {category.name}
                    </TableCell>
                    <TableCell>
                      {category.subcategories.length}
                      <IconButton
                        onClick={() =>
                          setExpandedCategory(
                            expandedCategory === category.id
                              ? null
                              : category.id
                          )
                        }
                      >
                        {expandedCategory === category.id ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <IconButton
                        color='primary'
                        onClick={() => handleOpenModal('edit', category)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color='error'
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={3}
                    >
                      <Collapse
                        in={expandedCategory === category.id}
                        timeout='auto'
                        unmountOnExit
                      >
                        <List>
                          {category.subcategories.map(
                            (subcategory, subIndex) => (
                              <ListItem
                                key={subIndex}
                                onClick={() =>
                                  handleSubcategoryClick(subcategory)
                                }
                                sx={{ cursor: 'pointer' }}
                              >
                                <ListItemText
                                  primary={
                                    <>
                                      {subcategory}
                                      <span
                                        style={{
                                          marginLeft: '8px',
                                          fontWeight: 'bold'
                                        }}
                                      >
                                        (4){' '}
                                        {/* Placeholder for product count */}
                                      </span>
                                    </>
                                  }
                                />
                              </ListItem>
                            )
                          )}
                        </List>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>

        {/* Add TablePagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredCategories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal for creating/editing category */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <IconButton
            aria-label='close'
            onClick={handleCloseModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
          <Typography variant='h6'>
            {modalMode === 'create' ? 'Create Category' : 'Edit Category'}
          </Typography>
          <TextField
            fullWidth
            label='Category Name'
            value={newCategory.name}
            onChange={e =>
              setNewCategory(prev => ({ ...prev, name: e.target.value }))
            }
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label='New Subcategory'
            value={newSubcategory}
            onChange={e => setNewSubcategory(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAddSubcategory()
              }
            }}
            sx={{ mb: 2 }}
          />
          <Box>
            {newCategory.subcategories.map((subcategory, index) => (
              <Chip
                key={index}
                label={subcategory}
                onDelete={() => handleRemoveSubcategory(index)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleSaveCategory}
            sx={{ mt: 2 }}
          >
            {modalMode === 'create' ? 'Create Category' : 'Save Changes'}
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default CategoryPage
