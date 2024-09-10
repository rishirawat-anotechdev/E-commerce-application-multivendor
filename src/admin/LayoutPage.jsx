import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Avatar,
  Divider,
  Badge
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
// Import icons from react-icons
import {
  MdDashboard,
  MdShoppingCart,
  MdStore,
  MdInsertDriveFile,
  MdArticle,
  MdPayment
} from 'react-icons/md'
import {
  FaShippingFast,
  FaUsers,
  FaTags,
  FaCog,
  FaChartLine,
  FaClipboardList,
  FaCommentAlt,
  FaBell
} from 'react-icons/fa'

import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'


const navLinks = [
  {
    text: 'Dashboard',
    icon: <MdDashboard size={30} />,
    link: '/admin/dashboard',
    iconColor: '#f39c12'
  }, // Orange
  {
    text: 'Report',
    icon: <MdShoppingCart size={30} />,
    link: '/admin/report',
    iconColor: '#1abc9c'
  }, // Greenish
  {
    text: 'Orders',
    icon: <MdStore size={30} />,
    link: '/admin/orders',
    iconColor: '#3498db'
  }, // Blue
  {
    text: 'Shipments',
    icon: <FaShippingFast size={30} />,
    link: '/admin/shipments',
    iconColor: '#9b59b6'
  }, // Purple
  {
    text: 'Products',
    icon: <MdArticle size={30} />,
    link: '/admin/products',
    iconColor: '#2ecc71'
  }, // Green
  {
    text: 'Product Prices',
    icon: <MdArticle size={30} />,
    link: '/admin/product-prices',
    iconColor: '#e67e22'
  }, // Orange
  {
    text: 'Products Categories',
    icon: <MdArticle size={30} />,
    link: '/admin/categories',
    iconColor: '#2c3e50'
  }, // Dark blue
  {
    text: 'Brands',
    icon: <MdArticle size={30} />,
    link: '/admin/brands',
    iconColor: '#8e44ad'
  }, // Violet
  {
    text: 'Reviews',
    icon: <FaCommentAlt size={30} />,
    link: '/admin/reviews',
    iconColor: '#27ae60'
  }, // Green
  {
    text: 'Discounts',
    icon: <FaTags size={30} />,
    link: '/admin/discounts',
    iconColor: '#e74c3c'
  }, // Red
  {
    text: 'Customers',
    icon: <FaUsers size={30} />,
    link: '/admin/customers',
    iconColor: '#16a085'
  }, // Teal
  {
    text: 'Vendors',
    icon: <MdStore size={30} />,
    link: '/admin/vendors',
    iconColor: '#c0392b'
  }, // Red
  {
    text: 'Transactions',
    icon: <MdPayment size={30} />,
    link: '/admin/transactions',
    iconColor: '#e74c3c'
  }, // Red
  {
    text: 'Payment Methods',
    icon: <MdPayment size={30} />,
    link: '/admin/payments',
    iconColor: '#2c3e50'
  }, // Dark blue
 
  {
    text: 'Settings',
    icon: <FaCog size={30} />,
    link: '/admin/settings',
    iconColor: '#2ecc71'
  } // Green
]



const Layout = () => {
  
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const drawerWidth = sidebarOpen ? 270 : 100

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleListItemClick = (index, link) => {
    setSelectedIndex(index);
    navigate(link); // Use navigate to route to the appropriate page
  };

  const drawer = (
    <div>
      <Toolbar />
      {/* Profile section for mobile screens */}
      <Box
        display={{ xs: 'flex', sm: 'none', justifyContent: 'center' }}
        alignItems='center'
        sx={{ mb: 0, color: 'white', mt:5}}
      >
        <Avatar
          alt='Profile'
          src='/path-to-image.jpg'
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Box display={{ xs: 'flex', sm: 'none' }} flexDirection='column'>
          <Typography variant='body1' sx={{ mt: 1 }}>
            Linda Bashirian
          </Typography>
          <Typography variant='body2'>linda@example.com</Typography>
        </Box>
      </Box>
      <Divider/>
      <List sx={{overflowX:'none', mt:2}}>
        {navLinks.map((link, index) => (
          <ListItem
            button
            key={index}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, link.link)}
            sx={{
              color: 'white',
              mt:1,
              backgroundColor: selectedIndex === index ? '#206bc4' : 'inherit',
              '&:hover': {
                backgroundColor: '#206bc4',
            
              }
            }}
          >
            <ListItemIcon
              sx={{ minWidth: sidebarOpen ? 60 : 70, color: link.iconColor }}
            >
              {link.icon}
            </ListItemIcon>
            {/* Ensure text visibility when sidebar is open */}
            {sidebarOpen && (
              <ListItemText
                primary={link.text}
                sx={{
                  color: 'white',
                  fontSize: { xs: '16px', sm: '20px' },
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ zIndex: theme => theme.zIndex.drawer + 1, bgcolor: '#182433' }}
      >
        <Toolbar sx={{height:"10vh"}}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color='inherit'
            aria-label='toggle sidebar'
            edge='start'
            onClick={handleSidebarToggle}
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
          >
            {sidebarOpen ? <MenuIcon /> : <MenuIcon />}
          </IconButton>
          <img
            src={logo}
            alt='Logo'
            style={{ width: '110px', marginRight: '10px' }}
          />
          <Box sx={{ flexGrow: 1 }} />
          {/* Search bar in the center */}
          <Box
            sx={{
              flexGrow: 1,
              position: 'relative',
              bgcolor: '#151f2c',
              borderRadius: '4px',
              border: '1px solid #fff',
            
            }}
          >
            <SearchIcon
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                zIndex: 1,
                color: 'white'
              }}
            />
            <InputBase
              placeholder='Search…'
              sx={{
                color: 'white',
                paddingLeft: '30px',
                width: { sm: '250px', md: '400px' },
                borderRadius: '4px',
                padding: '2px 8px',
                bgcolor: '#151f2c'
              }}
            />
          </Box>
          <Badge
            badgeContent={5}
            color='secondary'
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#f44336', // Custom badge color
                color: 'white'
                // Badge text color
              }
            }}
          >
            <FaBell
              size={28}
              style={{ color: 'white', cursor: 'pointer', mx: 2 }}
            />
          </Badge>
          {/* Hide profile on small screens */}
          <Box
            display={{ xs: 'none', sm: 'flex' }}
            alignItems='center'
            sx={{ ml: 2, color: 'white' }}
          >
            <Avatar alt='Profile' src='/path-to-image.jpg' />
            <Box ml={2}>
              <Typography variant='body1'>Linda Bashirian</Typography>
              <Typography variant='body2'>linda@example.com</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        sx={{
       
          width: drawerWidth ,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width:  drawerWidth ,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            bgcolor: '#2e3847',
            color: 'white'
          },
          display: { xs: 'none', sm: 'block' },
          overflowX: 'none',
          overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '0px'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: '#2e3847',
            color: 'white',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '0px'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          }
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component='main'
        sx={{
          backgroundColor: '#f6f8fb' ,
          width: { xs: '100%', sm: `calc(100vw - ${drawerWidth}px)` },
          maxWidth: { xs: '100%', sm: `calc(100vw - ${drawerWidth}px)` },
          height: { xs: 'calc(100vh - 10vh)', sm: `calc(100vh - 10vh)` },
          maxHeight: { xs: 'calc(100vh - 10vh)', sm: `calc(100vh- 10vh)` },
          overflowY: 'auto',
          mt:{ xs:10 , sm:8 },
          p: { xs:1 , sm:4 },
         
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
