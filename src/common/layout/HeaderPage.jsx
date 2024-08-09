import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PromoBanner from '../promoBanner/PromoBanner'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,

  Badge,
  Button,
} from '@mui/material'
import {
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
  FavoriteBorder,
  CompareArrows,
  
} from '@mui/icons-material'
import CategoryButton from '../CategoryButton/CategoryButton'

const categories = [
    { title: 'Apples', imageUrl: 'https://via.placeholder.com/64x64?text=Apples' },
    { title: 'Bananas', imageUrl: 'https://via.placeholder.com/64x64?text=Bananas' },
    { title: 'Carrots', imageUrl: 'https://via.placeholder.com/64x64?text=Carrots' },
    { title: 'Broccoli', imageUrl: 'https://via.placeholder.com/64x64?text=Broccoli' },
    { title: 'Apples', imageUrl: 'https://via.placeholder.com/64x64?text=Apples' },
    { title: 'Bananas', imageUrl: 'https://via.placeholder.com/64x64?text=Bananas' },
    { title: 'Carrots', imageUrl: 'https://via.placeholder.com/64x64?text=Carrots' },
    { title: 'Broccoli', imageUrl: 'https://via.placeholder.com/64x64?text=Broccoli' },
  ];

const HeaderPage = () => {
    const [showCategories, setShowCategories] = useState(false);

  const styles = {
    header: {
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    toolbarTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 16px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center'
    },
    logoImage: {
      height: '40px',
      marginRight: '8px'
    },

   
  }
  return (
    <>
      <PromoBanner />
      <AppBar position='static' style={styles.header}>
        <Toolbar style={styles.toolbarTop}>
          <div style={styles.logo} className=' mix-blend-multiply'>
            <img
              src='data:image/jpeg;base64,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'
              alt='Nest'
              style={styles.logoImage}
              
            />
            <Typography variant='h6' noWrap style={{ color: '#38a169' }}>
              Shop Now
            </Typography>
          </div>
          <div className='flex items-center w-[300px] md:w-[200px] lg:w-[400px] border rounded'>
      
      <input
        type='search'
        className='flex-grow p-2 outline-none text-black'
        placeholder='Search Products..'
      />
      <SearchIcon className='text-gray-500 ml-2' />
    </div>
    <div className='flex items-center space-x-4  text-black'>
      <div className='flex items-center'>
        <IconButton aria-label='compare'>
          <Badge badgeContent={0} color='secondary'>
            <CompareArrows />
          </Badge>
        </IconButton>
        <span className='hidden text-sm ml-2 md:inline'>Compare</span>
      </div>
      <div className='flex items-center'>
        <IconButton aria-label='wishlist'>
          <Badge badgeContent={3} color='secondary'>
            <FavoriteBorder />
          </Badge>
        </IconButton>
        <span className='hidden text-sm ml-2 md:inline'>Wishlist</span>
      </div>
      <div className='flex items-center'>
        <IconButton aria-label='cart'>
          <Badge badgeContent={4} color='secondary'>
            <ShoppingCart />
          </Badge>
        </IconButton>
        <span className='hidden text-sm ml-2 md:inline'>Cart</span>
      </div>
      <div className='flex items-center'>
        <IconButton edge='end' aria-label='account'>
          <AccountCircle />
        </IconButton>
        <span className='hidden text-sm ml-2 md:inline'>Profile</span>
      </div>
    </div>
        </Toolbar>
        <div className='flex items-center justify-between text-lg py-1 px-2'>
          <div className='flex items-center'>
          <div className='relative'>
      <button
        className='text-nowrap bg-[#38a169] text-white py-1 px-4 rounded-lg'
        onMouseEnter={() => setShowCategories(true)}
        onMouseLeave={() => setShowCategories(false)}
      >
        Browse All Categories
      </button>
      {showCategories && (
        <div className='absolute top-full left-0 mt-2 p-2 bg-white border rounded-lg shadow-lg w-[400px] grid grid-cols-3 gap-2'>
        {categories.map((category, index) => (
          <CategoryButton key={index} title={category.title} imageUrl={category.imageUrl} />
        ))}
      </div>
      
      )}
    </div>
            <div className='flex items-center text-black space-x-4 ml-4'>
              <Link>Home</Link>

              <Link>Stores</Link>
              <Link>Product</Link>

              <Link>Contact</Link>
            </div>
          </div>

          <div className='flex text-black text-lg'>
            <span>24/7 Support Center</span>
          </div>
        </div>
      </AppBar>
    </>
  )
}

export default HeaderPage
