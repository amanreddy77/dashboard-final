import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CategoryGroupSidebar = ({ isOpen, toggleSidebar, categoryCounts }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [appliedCategory, setAppliedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleApplyGrouping = () => {
   
    setAppliedCategory(selectedCategory);
    console.log('Grouping applied for category:', selectedCategory);
  };

  const handleClearGrouping = () => {
    
    console.log('Grouping cleared');
    setSelectedCategory(''); 
    setAppliedCategory(''); 
  };

  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'visible' : 'invisible'} ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed top-0 right-0 w-full md:w-1/4 bg-white p-6 shadow-lg h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Groups</h2>
          <button onClick={toggleSidebar} className="text-gray-500">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

       
        <div className="mb-4">
          <label htmlFor="category-select" className="block text-sm font-medium mb-2">Select Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select a category --</option>
            {Object.keys(categoryCounts).map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

       
        <div className="flex justify-between mt-4">
          <button
            onClick={handleApplyGrouping}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={!selectedCategory} 
          >
            Apply Grouping
          </button>
          <button
            onClick={handleClearGrouping}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear Grouping
          </button>
        </div>

       
        <div className="mt-4">
          {Object.entries(categoryCounts).filter(([category]) => appliedCategory === '' || category === appliedCategory).map(([category, count]) => (
            <div key={category} className="flex justify-between items-center p-2 border-b hover:bg-gray-100 transition">
              <span className="text-sm">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              <span className="text-sm">({count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGroupSidebar;
