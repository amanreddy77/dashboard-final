import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Slider from 'rc-slider'; 
import 'rc-slider/assets/index.css'; 

const FilterSidebar = ({ 
  isOpen, 
  toggleSidebar, 
  filterProducts, 
  resetFilter, 
  categoriesWithCounts = {
    'Health': 5,
    'Pets': 10,
    'Clothing': 10,
    'Activity': 19,
    'Home': 16,
    'Automotive': 10,
    'Entertainment': 15,
    'Beauty': 5,
    'Electronics': 8,
  },
  subcategories = ['Nutrition', 'Mens', 'Outdoors', 'Camping', 'Cleaning', 'Aquarium', 'Cat', 'Tire', 'Jewelry', 'Movie', 'Furniture', 'Baby', 'First Aid', 'Home Improvement', 'Bath', 'Kids', 'Sports', 'Party', 'Computer', 'Dog', 'Technology', 'Toy', 'Engine', 'Music', 'Dining', 'Skin Care', 'Camera', 'Swimming', 'Kitchen', 'Phone', 'Medicine', 'Game', 'Storage', 'Vitamin', 'Bedding'] 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState(''); 
  const [nameInput, setNameInput] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [salePriceRange, setSalePriceRange] = useState([0, 100]);
  const [selectedDateCreated, setSelectedDateCreated] = useState('');
  const [selectedDateUpdated, setSelectedDateUpdated] = useState('');

  const handleApplyFilters = () => {
    const filters = {
      name: nameInput,
      category: selectedCategory,
      subcategory: selectedSubcategory, 
      createdAt: selectedDateCreated,
      updatedAt: selectedDateUpdated,
      price: priceRange,
      salePrice: salePriceRange,
    };
    filterProducts(filters);
    toggleSidebar(); 
  };

  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'visible' : 'invisible'} ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed top-0 right-0 w-full md:w-1/4 bg-white p-6 shadow-lg h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={toggleSidebar} className="text-gray-500">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Filter Products</h2>
          <div className="mb-4">
            <label className="block font-medium mb-2">Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Category</label>
            <div>
              {Object.entries(categoriesWithCounts).map(([category, count]) => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={category}
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="mr-2"
                  />
                  <label htmlFor={category} className="flex justify-between w-full">
                    <span>{category}</span>
                    <span>({count})</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Subcategory</label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>{subcategory}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Price Range</label>
            <Slider
              range
              min={0}
              max={100} 
              value={priceRange}
              onChange={setPriceRange}
            />
            <div className="flex justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Sale Price Range</label>
            <Slider
              range
              min={0}
              max={100} 
              value={salePriceRange}
              onChange={setSalePriceRange}
            />
            <div className="flex
      justify-between">
              <span>${salePriceRange[0]}</span>
              <span>${salePriceRange[1]}</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Created At</label>
            <input
              type="date"
              value={selectedDateCreated}
              onChange={(e) => setSelectedDateCreated(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Updated At</label>
            <input
              type="date"
              value={selectedDateUpdated}
              onChange={(e) => setSelectedDateUpdated(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
  
          <div className="flex justify-between mt-4">
            <button
              onClick={handleApplyFilters}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Apply
            </button>
            <button
              onClick={() => {
                resetFilter();
                toggleSidebar(); 
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
