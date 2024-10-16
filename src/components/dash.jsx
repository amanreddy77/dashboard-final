import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar'; 
import ActionIcons from './ActionIcons';
import Pagination from './pagination';
import ColumnToggleSidebar from './columnToggleSidebar'; 
import CategoryGroupSidebar from './CategoryGroupSidebar';
import SortSidebar from './SortSiderbar'; 

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isColumnSidebarOpen, setIsColumnSidebarOpen] = useState(false); 
  const [isSortSidebarOpen, setIsSortSidebarOpen] = useState(false); // New state for sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; 
  
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    category: true,
    subcategory: true,
    createdAt: true,
    updatedAt: true,
    price: true,
    sale_price: true,
  });

  const [groupedCategory, setGroupedCategory] = useState('');
  const [sortingCriteria, setSortingCriteria] = useState(''); // State for sorting criteria

  // Fetching data from the products.json file
  useEffect(() => {
    fetch('/data.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);  
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  // Function to filter products by a specific category
  const filterProducts = (category) => {
    const filtered = products.filter(product => product.category === category);
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page whenever filters are applied
  };

  // Reset the filter to show all products
  const resetFilter = () => {
    setFilteredProducts(products);
    setCurrentPage(1); // Reset to the first page
  };

  // Function to toggle the sidebar for filters
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to toggle the column sidebar
  const toggleColumnSidebar = () => {
    setIsColumnSidebarOpen(!isColumnSidebarOpen);
  };

  // Function to toggle the sort sidebar
  const toggleSortSidebar = () => {
    setIsSortSidebarOpen(!isSortSidebarOpen);
  };

  // Function to handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Function to toggle the group sidebar
  const toggleGroupSidebar = () => {
    setIsGroupOpen(!isGroupOpen);
  };

  // Function to get product categories with counts
  const getCategoryCounts = () => {
    const categoryCounts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    return categoryCounts;
  };

  // Function to apply grouping based on the selected category
  const handleApplyGrouping = (category) => {
    setGroupedCategory(category); // Set the selected category
    filterProducts(category); // Filter products based on the selected category
    toggleGroupSidebar(); // Close the sidebar after applying
  };

  // Function to clear the grouping
  const handleClearGrouping = () => {
    setGroupedCategory('');
    resetFilter(); // Reset to show all products
  };

  // Function to sort products
  const sortProducts = (criteria) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (criteria) {
        case 'id':
          return a.id - b.id; // Assuming id is a number
        case 'name':
          return a.name.localeCompare(b.name); // For string comparison
        case 'category':
          return a.category.localeCompare(b.category);
        case 'subcategory':
          return a.subcategory.localeCompare(b.subcategory);
        case 'createdAt':
          return new Date(a.createdAt) - new Date(b.createdAt); // Assuming createdAt is a date string
        case 'updatedAt':
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case 'price':
          return a.price - b.price; // Assuming price is a number
        case 'sale_price':
          return a.sale_price - b.sale_price; // Assuming sale_price is a number
        default:
          return 0; // No sorting
      }
    });
    setFilteredProducts(sorted); // Update state with sorted products
  };

  // Function to handle sorting selection
  const handleSortingChange = (criteria) => {
    setSortingCriteria(criteria);
    sortProducts(criteria);
    toggleSortSidebar(); // Close the sorting sidebar after applying
  };

  // Calculate current products to display based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-800 p-4 text-white flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-2 md:mb-0">Dashboard</div>

        <div className="flex items-center justify-center flex-grow md:flex-row">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
          </div>
          
          <ActionIcons 
            onSort={toggleSortSidebar} // Open sorting sidebar
            onFilter={toggleSidebar} 
            onViewLayers={toggleColumnSidebar} 
            onGroup={toggleGroupSidebar} // Pass toggleGroupSidebar here
          />
        </div>
      </nav>

      <FilterSidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        filterProducts={filterProducts} 
        resetFilter={resetFilter} 
      />
      <CategoryGroupSidebar 
        isOpen={isGroupOpen} 
        toggleSidebar={toggleGroupSidebar} 
        categoryCounts={getCategoryCounts()} 
        onApplyGrouping={handleApplyGrouping} // Pass the apply grouping function
        onClearGrouping={handleClearGrouping} // Pass the clear grouping function
      />
      <SortSidebar 
        isOpen={isSortSidebarOpen} 
        toggleSidebar={toggleSortSidebar} 
        onSort={handleSortingChange} // Pass sorting function
      />
      <ColumnToggleSidebar 
        isOpen={isColumnSidebarOpen} 
        toggleSidebar={toggleColumnSidebar} 
        visibleColumns={visibleColumns} 
        setVisibleColumns={setVisibleColumns} 
      />

      <div className="p-4 md:p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                {visibleColumns.id && <th className="py-2 px-4 border-b text-left">Id</th>}
                {visibleColumns.name && <th className="py-2 px-4 border-b text-left">Name</th>}
                {visibleColumns.category && <th className="py-2 px-4 border-b text-left">Category</th>}
                {visibleColumns.subcategory && <th className="py-2 px-4 border-b text-left">Subcategory</th>}
                {visibleColumns.createdAt && <th className="py-2 px-4 border-b text-left">Created At</th>}
                {visibleColumns.updatedAt && <th className="py-2 px-4 border-b text-left">Updated At</th>}
                {visibleColumns.price && <th className="py-2 px-4 border-b text-left">Price</th>}
                {visibleColumns.sale_price && <th className="py-2 px-4 border-b text-left">Sale Price</th>}
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  {visibleColumns.id && <td className="py-2 px-4 border-b text-left">{product.id}</td>} 
                  {visibleColumns.name && <td className="py-2 px-4 border-b text-left">{product.name}</td>}
                  {visibleColumns.category && <td className="py-2 px-4 border-b text-left">{product.category}</td>}
                  {visibleColumns.subcategory && <td className="py-2 px-4 border-b text-left">{product.subcategory}</td>}
                  {visibleColumns.createdAt && <td className="py-2 px-4 border-b text-left">{new Date(product.createdAt).toLocaleDateString()}</td>}
                  {visibleColumns.updatedAt && <td className="py-2 px-4 border-b text-left">{new Date(product.updatedAt).toLocaleDateString()}</td>}
                  {visibleColumns.price && <td className="py-2 px-4 border-b text-left">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                  </td>}
                  {visibleColumns.sale_price && <td className="py-2 px-4 border-b text-left">
                    ${typeof product.sale_price === 'number' ? product.sale_price.toFixed(2) : 'N/A'}
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination controls */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
