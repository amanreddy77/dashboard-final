import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';

const ProductListing = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterProducts = (filters) => {
    const {
      name,
      category,
      subcategory,
      createdAt,
      updatedAt,
      price,
      salePrice,
    } = filters;

    const filtered = products.filter((product) => {
      const matchesName = name ? product.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesCategory = category ? product.category === category : true;
      const matchesSubcategory = subcategory ? product.subcategory === subcategory : true;
      const matchesCreatedAt = createdAt ? new Date(product.createdAt) >= new Date(createdAt) : true;
      const matchesUpdatedAt = updatedAt ? new Date(product.updatedAt) >= new Date(updatedAt) : true;
      const matchesPrice = price ? product.price <= price : true;
      const matchesSalePrice = salePrice ? product.salePrice <= salePrice : true;

      return (
        matchesName &&
        matchesCategory &&
        matchesSubcategory &&
        matchesCreatedAt &&
        matchesUpdatedAt &&
        matchesPrice &&
        matchesSalePrice
      );
    });

    setFilteredProducts(filtered);
  };

  const resetFilter = () => {
    setFilteredProducts(products); 
  };

  return (
    <div className="p-4 md:p-8">
      <button 
        onClick={toggleSidebar} 
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Filter Products
      </button>
      <FilterSidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        filterProducts={filterProducts} 
        resetFilter={resetFilter} 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
