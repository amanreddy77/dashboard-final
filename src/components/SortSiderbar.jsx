import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SortSidebar = ({ isOpen, toggleSidebar, onSort }) => {
  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed top-0 right-0 w-full sm:w-1/4 bg-white p-6 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-lg h-full overflow-y-auto`}>
        
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none"
          title="Close"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <h2 className="text-lg font-bold mb-4">Sort Products</h2>
        <div className="flex flex-col">
          <button className="mb-2 text-left hover:bg-gray-200 p-2 rounded" onClick={() => onSort('id')}>Sort by ID</button>
          <button className="mb-2 text-left hover:bg-gray-200 p-2 rounded" onClick={() => onSort('name')}>Sort by Name</button>
          <button className="mb-2 text-left hover:bg-gray-200 p-2 rounded" onClick={() => onSort('category')}>Sort by Category</button>
          <button className="mb-2 text-left hover:bg-gray-200 p-2 rounded" onClick={() => onSort('subcategory')}>Sort by Subcategory</button>
          <button className="mb-2 text-left hover:bg-gray-200 p-2 rounded" onClick={() => onSort('createdAt')}>Sort by Created At</button>
          <button className="mb-2 text-left hover:bg-gray-200 p-2 rounded" onClick={() => onSort('updatedAt')}>Sort by Updated At</button>
          <button className="mb-2 text-left hover:bg-gray-200 p-2 rounded" onClick={() => onSort('price')}>Sort by Price</button>
          <button className="mb-2 text-left hover:bg-gray-200 p-2 rounded" onClick={() => onSort('sale_price')}>Sort by Sale Price</button>
        </div>
      </div>
    </div>
  );
};

export default SortSidebar;
