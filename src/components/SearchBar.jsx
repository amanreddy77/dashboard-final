import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center bg-white text-gray-950 rounded-3xl shadow-md p-1">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" rounded-lg p-1 flex-grow focus:outline-none"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
