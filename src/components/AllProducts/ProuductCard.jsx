import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import VisibilityIcon from '@mui/icons-material/Visibility'
const ProductCard = ({ product }) => {
  return (
    <div className='border rounded-lg p-4 flex flex-col'>
      {product.discount && (
        <span className='bg-green-500 text-white px-2 py-1 rounded-full text-sm self-start'>
          {product.discount}% OFF
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className='w-full h-40 object-cover my-4 transition-transform duration-300 ease-in-out transform hover:scale-110'
      />

      <h3 className='font-bold'>{product.name}</h3>
      <div className='flex items-center mb-2'>
        {/* Star rating component */}
        <span className='text-yellow-400'>{'★'.repeat(product.rating)}</span>
        <span className='text-gray-400 ml-1'>({product.reviews})</span>
      </div>
      <div className='flex justify-between items-center mb-2'>
        <span className='font-bold text-[21px]'>
          ${product.price.toFixed(2)}
        </span>
        {product.oldPrice && (
          <span className='line-through text-gray-400'>
            ${product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>
      <div className='flex items-center justify-between'>
        <button className='bg-green-100 text-green-500 px-4 py-1 rounded hover:bg-green-600 hover:text-white ease-in-out  duration-300 '>
          Add to Cart
        </button>
        <div className='flex items-center space-x-2'>
          <FavoriteBorderIcon className='hover:text-green-500 hover:text-[25px] ease-in-out duration-300   ' />
          <VisibilityIcon />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
