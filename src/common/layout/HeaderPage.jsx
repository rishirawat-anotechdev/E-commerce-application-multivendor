import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Box,
  Avatar
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
  FavoriteBorder,
  CompareArrows,
  Menu as MenuIcon,
  Call as CallIcon,
  Widgets as WidgetsIcon
} from '@mui/icons-material'
import PromoBanner from '../../components/Layout/PromoBanner'
import CategoryButton from '../../components/Layout/CategoryButton'
import './layout.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CloseIcon from '@mui/icons-material/Close';

// ... (keep your categories array)

const categories = [
  // ... (your categories array remains unchanged)
  {
    title: 'Apples',
    imageUrl: 'https://via.placeholder.com/64x64?text=Apples'
  },
  {
    title: 'Bananas',
    imageUrl: 'https://via.placeholder.com/64x64?text=Bananas'
  },
  {
    title: 'Carrots',
    imageUrl: 'https://via.placeholder.com/64x64?text=Carrots'
  },
  {
    title: 'Broccoli',
    imageUrl: 'https://via.placeholder.com/64x64?text=Broccoli'
  },
  {
    title: 'Apples',
    imageUrl: 'https://via.placeholder.com/64x64?text=Apples'
  },
  {
    title: 'Bananas',
    imageUrl: 'https://via.placeholder.com/64x64?text=Bananas'
  },
  {
    title: 'Carrots',
    imageUrl: 'https://via.placeholder.com/64x64?text=Carrots'
  },
  {
    title: 'Broccoli',
    imageUrl: 'https://via.placeholder.com/64x64?text=Broccoli'
  }
]

const cartItems = [
  {
    name: 'Seeds of Change Organic Quinoe',
    quantity: 1,
    price: 776.56,
    image: '/path/to/image.jpg'
  },
  {
    name: "Angie's Boomchickapop Sweet & Salty Kettle Corn",
    quantity: 1,
    price: 188.65,
    image: '/path/to/image.jpg'
  },
  {
    name: 'Blue Diamond Almonds Lightly',
    quantity: 1,
    price: 186.88,
    image: '/path/to/image.jpg'
  },
  {
    name: 'Canada Dry Ginger Ale - 2 L Bottle',
    quantity: 1,
    price: 133.92,
    image: '/path/to/image.jpg'
  }
]

const HeaderPage = () => {
  const [showCategories, setShowCategories] = useState(false)
  // const [cartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setIsHeaderVisible(false)
        } else {
          // if scroll up show the navbar
          setIsHeaderVisible(true)
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader)

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlHeader)
      }
    }
  }, [lastScrollY])

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setIsDrawerOpen(open)
  }

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          src={logo}
          alt='Nest'
          style={{ width: '120px', marginRight: '8px' }}
        />
        
      </Box>
      <Divider />
      <List>
        {['Home', 'Stores', 'Product', 'Brand', 'Contact'].map(text => (
          <ListItem
            button
            key={text}
            component={Link}
            to={'/' + text.toLowerCase()}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Badge badgeContent={0} color='secondary'>
            <CompareArrows />
          </Badge>
          <ListItemText primary='Compare' sx={{ ml: 2 }} />
        </ListItem>
        <ListItem button>
          <Badge badgeContent={3} color='secondary'>
            <FavoriteBorder />
          </Badge>
          <ListItemText primary='Wishlist' sx={{ ml: 2 }} />
        </ListItem>
      </List>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <CallIcon sx={{ fontSize: 40, color: '#38a169', mr: 1 }} />
        <Box>
          <Typography
            variant='subtitle1'
            sx={{ color: '#38a169', lineHeight: 1 }}
          >
            1900-800
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            24/7 Support Center
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 'auto',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #e0e0e0'
        }}
      >
        <Avatar sx={{ bgcolor: '#38a169', mr: 2 }}>P</Avatar>
        <Typography variant='body1'>Profile</Typography>
      </Box>
    </Box>
  )

  return (
    <>
      <PromoBanner />
      <AppBar
        position='sticky'
        color='default'
        elevation={1}
        sx={{
          top: isHeaderVisible ? '0' : '-200px',
          transition: 'top 0.3s'
        }}
      >
        <Toolbar className='bg-white' sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                edge='start'
                color='inherit'
                aria-label='menu'
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            {!isMobile && (
              <Link to={"/homepage"}><Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={logo}
                alt='Nest'
                style={{ width:'130px' ,  marginRight: '8px' }}
              />
             
            </Box></Link>
            )}
          </Box>

          {/* Search Bar */}
          <div className='flex items-center bg-green-50 w-[300px] md:w-[200px] border-green-400 hover:border-green-600 border lg:w-[500px] '>
            <input
              type='search'
              className='flex-grow p-2 outline-none text-black '
              placeholder='Search Products..'
            />
            <SearchIcon className='text-green-500  ml-2' />
          </div>

          {isMobile && (
            <IconButton color='inherit'>
              <Badge
                badgeContent={cartItems.length}
                color='primary'
                sx={{
                  '& .MuiBadge-dot': {
                    backgroundColor: '#38a169' // Green color
                  },
                  '& .MuiBadge-standard': {
                    backgroundColor: '#38a169' // Green color
                  },
                  '& .MuiBadge-dot, & .MuiBadge-standard': {
                    color: 'white'
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color='inherit'>
                <Badge
                  badgeContent={0}
                  color='primary'
                  sx={{
                    '& .MuiBadge-dot': {
                      backgroundColor: '#38a169' // Green color
                    },
                    '& .MuiBadge-standard': {
                      backgroundColor: '#38a169' // Green color
                    },
                    '& .MuiBadge-dot, & .MuiBadge-standard': {
                      color: 'white'
                    }
                  }}
                >
                  <CompareArrows />
                </Badge>
              </IconButton>
              <IconButton color='inherit'>
                <Badge
                  badgeContent={3}
                  color='primary'
                  sx={{
                    '& .MuiBadge-dot': {
                      backgroundColor: '#38a169' // Green color
                    },
                    '& .MuiBadge-standard': {
                      backgroundColor: '#38a169' // Green color
                    },
                    '& .MuiBadge-dot, & .MuiBadge-standard': {
                      color: 'white'
                    }
                  }}
                >
                  <FavoriteBorder />
                </Badge>
              </IconButton>
              <div className='relative group'>
                <button className='p-2 text-gray-600 hover:text-gray-800'>
                  <div className='relative'>
                   <Link to={"/cart"}> <ShoppingCartIcon size={24} /></Link>
                    <span className='absolute -top-2 -right-2 bg-[#38a169] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                      {cartItems.length}
                    </span>
                  </div>
                </button>

                <div className='absolute right-0 mt-2 w-[300px] bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10'>
                  <div className='p-4 max-h-96 scrollbar-hide  overflow-y-auto'>
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className='flex items-center mb-4 last:mb-0'
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-12 h-12 object-cover mr-3'
                        />
                        <div className='flex-grow'>
                          <p className='text-sm font-medium'>{item.name}</p>
                          <p className='text-xs text-gray-500'>
                            {item.quantity} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <button className='text-gray-400 hover:text-gray-600'>
                         <CloseIcon /> 
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className='p-4 border-t'>
                    <Link to={"/cart"}>
                    <button className='w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-150'>
                      View Cart
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='relative group'>
                <button className='focus:outline-none'>
                  <AccountCircle className='text-md' />
                </button>
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-10'>
                  <div className='py-1'>
                    <a
                      href='/login'
                      className='block px-4 py-2 text-gray-800 hover:bg-green-100'
                    >
                      Login
                    </a>
                    <a
                      href='/register'
                      className='block px-4 py-2 text-gray-800 hover:bg-green-100'
                    >
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </Box>
          )}
        </Toolbar>
        <Divider />
        {!isMobile && (
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              bgcolor: 'background.paper'
            }}
          >
            <div className='flex items-center mr-2'>
              <div className='relative group'>
                <button
                  className='text-nowrap bg-[#38a169] text-white py-1 px-4 rounded-lg'
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  <WidgetsIcon className='mr-1' />
                  Browse All Categories
                  <KeyboardArrowDownIcon className='ml-1' />
                </button>
                <div
                  className={`absolute top-full z-50 left-0 mt-2 p-2 bg-white border rounded-lg shadow-lg w-[400px] 
                ${showCategories ? 'block' : 'hidden'} group-hover:block`}
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  <div className='grid grid-cols-3 gap-2'>
                    {categories.map((category, index) => (
                      <CategoryButton
                        key={index}
                        title={category.title}
                        imageUrl={category.imageUrl}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Box sx={{ display: 'flex', marginLeft: '10px' }}>
                <NavLink
                  to='/homepage'
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: 'inherit',
                    borderBottom: isActive ? '2px solid #38a169' : 'none',
                    paddingBottom: '4px',
                    marginRight: '16px'
                  })}
                >
                  Home
                </NavLink>
                <NavLink
                  to='/stores'
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: 'inherit',
                    borderBottom: isActive ? '2px solid #38a169' : 'none',
                    paddingBottom: '4px',
                    marginRight: '16px'
                  })}
                >
                  Stores
                </NavLink>
                <NavLink
                  to='/product'
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: 'inherit',
                    borderBottom: isActive ? '2px solid #38a169' : 'none',
                    paddingBottom: '4px',
                    marginRight: '16px'
                  })}
                >
                  Product
                </NavLink>
                <NavLink
                  to='/contact'
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: 'inherit',
                    borderBottom: isActive ? '2px solid #38a169' : 'none',
                    paddingBottom: '4px',
                    marginRight: '16px'
                  })}
                >
                  Contact
                </NavLink>
                <NavLink
                  to='/brand'
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: 'inherit',
                    borderBottom: isActive ? '2px solid #38a169' : 'none',
                    paddingBottom: '4px',
                    marginRight: '16px'
                  })}
                >
                  Brand
                </NavLink>
              </Box>
            </div>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center'
              }}
            >
              <CallIcon sx={{ fontSize: 40, color: '#38a169', mr: 1 }} />
              <Box>
                <Typography
                  variant='subtitle1'
                  sx={{ color: '#38a169', lineHeight: 1 }}
                >
                  1900-800
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                  24/7 Support Center
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        )}
        {isMobile && (
          <div className='flex items-center justify-between px-3 py-2'>
            {' '}
            <div className='relative group '>
              <button
                className='text-nowrap  bg-[#38a169] text-white py-1 px-2 rounded-lg'
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <WidgetsIcon className='mr-1' />
                <span className='text-[14px]'>Browse All Categories</span>
                <KeyboardArrowDownIcon className='ml-1' />
              </button>
              <div
                className={`absolute top-full z-50 left-0 mt-2 p-2 bg-white border rounded-lg shadow-lg w-[400px] 
                ${showCategories ? 'block' : 'hidden'} group-hover:block`}
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <div className='grid grid-cols-3 gap-2'>
                  {categories.map((category, index) => (
                    <CategoryButton
                      key={index}
                      title={category.title}
                      imageUrl={category.imageUrl}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <CallIcon sx={{ fontSize: 25, color: '#38a169', mr: 1 }} />
              <Box>
                <Typography
                  variant='subtitle1'
                  sx={{ color: '#38a169', lineHeight: 1 }}
                >
                  1900-800
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                  24/7 Support Center
                </Typography>
              </Box>
            </Box>
          </div>
        )}
      </AppBar>

      <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  )
}

export default HeaderPage
