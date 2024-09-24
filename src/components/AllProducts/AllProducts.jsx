import React, { useState, useEffect } from 'react';
 // Make sure the import path is correct
import api from '../../API/api';
import ProductCard from './ProuductCard';

const AllProducts = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category');
        setCategories(response.data); // Set categories from API response

        // Set the first category as the default selected category if categories exist
        if (response.data.length > 0) {
          const firstCategoryId = response.data[0]._id;
          setCategoryId(firstCategoryId); // Set default category ID
          
          // Fetch products for the default category
          await fetchProductsByCategory(firstCategoryId);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products by category
  const fetchProductsByCategory = async (id) => {
    try {
      const response = await api.get(`/products/category/${id}`);
      const fetchedProducts = response.data.map(product => ({
        ...product,
        discount: product.discountedPrice ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : 0
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Effect to fetch products when categoryId changes
  useEffect(() => {
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    }
  }, [categoryId]);

  return (
    <div className="container mx-auto p-4 px-2">
      <h1 className="text-black font-bold text-[40px]">Organic & Fresh Products</h1>
      <div className="flex space-x-4 my-4">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setCategoryId(cat._id)}
            className={`px-2 py-1 rounded ${categoryId === cat._id ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p className="text-gray-500">No products available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
