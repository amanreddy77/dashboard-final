import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ColumnToggleSidebar = ({ isOpen, toggleSidebar, visibleColumns, setVisibleColumns }) => {
  const handleToggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleShowAllColumns = () => {
    const allColumns = {};
    Object.keys(visibleColumns).forEach(column => {
      allColumns[column] = true; // Set all columns to visible
    });
    setVisibleColumns(allColumns);
  };

  const handleApply = () => {
    console.log('Applied changes:', visibleColumns);
    toggleSidebar(); // Close sidebar after applying
  };

  const columnNames = [
    'id', 'name', 'category', 'subcategory', 
    'createdAt', 'updatedAt', 'price', 'sale_price'
  ];

  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'visible' : 'invisible'} ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed top-0 right-0 w-full md:w-1/4 bg-white p-6 shadow-lg h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Show/Hide Columns</h2>
          <button onClick={toggleSidebar} className="text-gray-500">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {columnNames.map((column) => (
            <div key={column} className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={visibleColumns[column]}
                    onChange={() => handleToggleColumn(column)}
                  />
                  <div className={`block w-10 h-6 rounded-full ${visibleColumns[column] ? 'bg-blue-500' : 'bg-gray-400'} transition-colors`}></div>
                  <div className={`dot absolute left-0 top-1 bg-white w-4 h-4 rounded-full transition-transform ${visibleColumns[column] ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <span className="ml-3 text-sm">{column.charAt(0).toUpperCase() + column.slice(1)}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button 
            onClick={handleShowAllColumns} 
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Show All Columns
          </button>
          <button 
            onClick={handleApply} 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-2"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnToggleSidebar;
