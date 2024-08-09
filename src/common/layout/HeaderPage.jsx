import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import hero3 from '../../assets/hero3.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Button
} from '@mui/material'
import {
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
  FavoriteBorder,
  CompareArrows
} from '@mui/icons-material'
import WidgetsIcon from '@mui/icons-material/Widgets'
import PromoBanner from '../../components/Layout/PromoBanner'
import CategoryButton from '../../components/Layout/CategoryButton'
import CallIcon from '@mui/icons-material/Call'

const categories = [
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

const HeaderPage = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [cartItems] = useState([])

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
    }
  }
  return (
    <>
      <PromoBanner />
      <AppBar position='static' style={styles.header}>
        <Toolbar style={styles.toolbarTop}>
          <div style={styles.logo} className=' mix-blend-multiply'>
            <img src={hero3} alt='Nest' style={styles.logoImage} />
            <Typography variant='h6' noWrap style={{ color: '#38a169' }}>
              Shop Now
            </Typography>
          </div>
          <div className='flex items-center w-[300px] md:w-[200px] lg:w-[500px] border rounded'>
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
              <span className='hidden text-sm  md:inline'>Compare</span>
            </div>
            <div className='flex items-center'>
              <IconButton aria-label='wishlist'>
                <Badge badgeContent={3} color='secondary'>
                  <FavoriteBorder />
                </Badge>
              </IconButton>
              <span className='hidden text-sm  md:inline'>Wishlist</span>
            </div>
            <div className='flex space-x-4'>
              {/* Cart Section */}
              <div className='relative group flex items-center'>
                <IconButton aria-label='cart'>
                  <Badge badgeContent={cartItems.length} color='secondary'>
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <span className='hidden text-sm  md:inline'>Cart</span>
                {/* Cart Dropdown */}
                <div className='absolute top-full  z-50 right-0 mt-2 p-4 bg-white border rounded-lg shadow-lg w-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto'>
                  {cartItems.length === 0 ? (
                    <div className='text-center text-gray-500'>
                      Cart is empty
                    </div>
                  ) : (
                    <div>
                      {cartItems.map((item, index) => (
                        <div key={index} className='mb-2'>
                          {item.name}
                        </div>
                      ))}
                      <div className='mt-2 text-blue-500 cursor-pointer'>
                        View Cart
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Section */}
              <div className='relative group flex items-center'>
                <IconButton edge='end' aria-label='account'>
                  <AccountCircle />
                </IconButton>
                <span className='hidden text-sm ml-2 md:inline'>Profile</span>
                {/* Account Dropdown */}
                <div className='absolute top-full z-50 right-0 mt-2 p-4 bg-white border rounded-lg shadow-lg w-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto'>
                  <div className='mb-2'>Login</div>
                  <div>Register</div>
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
        <div className='flex items-center justify-between text-lg py-1 px-2'>
          <div className='flex items-center'>
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

            <div className='flex items-center text-black space-x-4 ml-4'>
              <Link>Home</Link>

              <Link>Stores</Link>
              <Link>Product</Link>

              <Link>Contact</Link>
            </div>
          </div>

          <div className='flex items-center'>
            <CallIcon className='text-[60px] text-[#38a169] mr-1' />
            <div className='flex flex-col text-lg'>
              <span className='text-[#38a169] text-[20px] -mb-3'>1900-800</span>
              <span className=' text-gray-400 text-[10px]'>
                24/7 Support Center
              </span>
            </div>
          </div>
        </div>
      </AppBar>
    </>
  )
}

export default HeaderPage
