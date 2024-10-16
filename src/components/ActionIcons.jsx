import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSort, faLayerGroup, faFilter, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const ActionIcons = ({ onSort, onFilter, onViewLayers, onGroup }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to manage icon visibility

  const toggleIcons = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-4 right-4 flex flex-col space-y-2">
      {/* Toggle Button for mobile view */}
      <button
        onClick={toggleIcons}
        className="p-3 hover:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
        title="Actions"
      >
        <FontAwesomeIcon icon={faEllipsisV} size="lg" />
      </button>

      {/* Expanded action icons for mobile view */}
      {isExpanded && (
        <div className="flex flex-col space-y-2 bg-blue-500 p-4 rounded-lg md:hidden">
          <button onClick={onViewLayers} className="flex items-center justify-start p-3 bg-white hover:bg-blue-100 rounded focus:outline-none">
            <FontAwesomeIcon icon={faEye} size="lg" className="text-blue-500" />
            <span className="ml-2 text-gray-950">Show/Hide</span>
          </button>
          <button onClick={onSort} className="flex items-center justify-start p-3 bg-white hover:bg-blue-100 rounded focus:outline-none">
            <FontAwesomeIcon icon={faSort} size="lg" className="text-blue-500" />
            <span className="ml-2 text-gray-950">Sort</span>
          </button>
          <button onClick={onFilter} className="flex items-center justify-start p-3 bg-white hover:bg-blue-100 rounded focus:outline-none">
            <FontAwesomeIcon icon={faFilter} size="lg" className="text-blue-500" />
            <span className="ml-2 text-gray-950">Filters</span>
          </button>
          <button onClick={onGroup} className="flex items-center justify-start p-3 bg-white hover:bg-blue-100 rounded focus:outline-none">
            <FontAwesomeIcon icon={faLayerGroup} size="lg" className="text-blue-500" />
            <span className="ml-2 text-gray-950">Group</span>
          </button>
        </div>
      )}

      {/* Action Icons for larger screens */}
      <div className={`hidden md:flex space-x-2 md:space-x-4`}>
        {/* View Layers Icon */}
        <button onClick={onViewLayers} className="p-3 hover:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" title="View Layers">
          <FontAwesomeIcon icon={faEye} size="lg" />
        </button>

        {/* Sort Icon */}
        <button onClick={onSort} className="p-3 hover:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" title="Sort">
          <FontAwesomeIcon icon={faSort} size="lg" />
        </button>

        {/* Filter Icon */}
        <button onClick={onFilter} className="p-3 hover:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" title="Filters">
          <FontAwesomeIcon icon={faFilter} size="lg" />
        </button>

        {/* Layers Icon - now triggers the group sidebar */}
        <button onClick={onGroup} className="p-3 hover:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" title="Group">
          <FontAwesomeIcon icon={faLayerGroup} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default ActionIcons;
