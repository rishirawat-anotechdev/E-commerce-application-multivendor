import React, { useState } from 'react';
import ProductCard from './ProuductCard';


import {products} from "../../FakeData"



const AllProducts = () => {
  const [category, setCategory] = useState('New Products');
  


  return (
    <div className="container mx-auto p-4 px-2">
        <h1 className=' text-black font-bold text-[40px]'>Organic & Fresh Products</h1>
      <div className="flex space-x-4 my-4">
        {['New Products', 'Top Selling', 'Trending Products', 'Top Rated'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-2 py-1 rounded ${
              category === cat ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products[category].map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;