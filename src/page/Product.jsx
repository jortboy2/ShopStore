import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]); // Example price range

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Product List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="mb-4">
        <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
          <option value="">All Categories</option>
          {/* Add category options here */}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
          className="w-full"
        />
        <span>Max Price: ${priceRange[1]}</span>
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div className="bg-white rounded-lg shadow-md p-4" key={product._id}>
              <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold">Price: ${product.price}</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200">Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
