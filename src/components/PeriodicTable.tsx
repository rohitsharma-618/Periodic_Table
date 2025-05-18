import React from 'react';
import ElementCard from './ElementCard';
import { Element } from '../types/Element';
import { FilterOptions } from '../types/FilterOptions';
import { elementsData } from '../data/elementsData';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
  filterOptions: FilterOptions;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ 
  onElementClick,
  filterOptions
}) => {
  const filteredElements = elementsData.filter(element => {
    if (filterOptions.group && element.group?.toString() !== filterOptions.group) {
      return false;
    }
    
    if (filterOptions.period && element.period.toString() !== filterOptions.period) {
      return false;
    }
    
    if (filterOptions.category && element.category !== filterOptions.category) {
      return false;
    }
    
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase();
      return (
        element.name.toLowerCase().includes(query) ||
        element.symbol.toLowerCase().includes(query) ||
        element.atomicNumber.toString().includes(query)
      );
    }
    
    return true;
  });

  const isFiltering = 
    filterOptions.group !== '' || 
    filterOptions.period !== '' || 
    filterOptions.category !== '' || 
    filterOptions.searchQuery !== '';

  const getGridPosition = (element: Element) => {
    // Handle lanthanides (57-71)
    if (element.category === 'lanthanide') {
      return {
        gridRow: 9, // Separate row for lanthanides
        gridColumn: element.atomicNumber - 57 + 3, // Start from column 3
      };
    }
    
    // Handle actinides (89-103)
    if (element.category === 'actinide') {
      return {
        gridRow: 10, // Separate row for actinides
        gridColumn: element.atomicNumber - 89 + 3, // Start from column 3
      };
    }
    
    // For elements 57 and 89, place in main table
    if (element.atomicNumber === 57 || element.atomicNumber === 89) {
      return {
        gridRow: element.period,
        gridColumn: element.group,
      };
    }
    
    // For all other elements
    if (element.group !== null) {
      return {
        gridRow: element.period,
        gridColumn: element.group,
      };
    }

    return {};
  };

  if (isFiltering) {
    return (
      <div className="animate-fadeIn">
        <div className="mb-4 p-3 bg-blue-900/30 rounded-lg text-center">
          <p className="text-sm text-blue-200">
            {filteredElements.length === 0 
              ? "No elements match your filters. Try adjusting your criteria." 
              : `Showing ${filteredElements.length} elements matching your filters.`}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
          {filteredElements.map(element => (
            <ElementCard 
              key={element.atomicNumber} 
              element={element} 
              onClick={onElementClick} 
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="periodic-table overflow-x-auto pb-4 animate-fadeIn">
      <div className="grid grid-cols-18 gap-1 w-full min-w-[900px]">
        {elementsData.map(element => (
          <div
            key={element.atomicNumber}
            style={getGridPosition(element)}
            className="w-full"
          >
            <ElementCard element={element} onClick={onElementClick} />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-18 gap-1 mt-4 min-w-[900px]">
        <div className="col-span-2 text-xs text-blue-300 flex items-center">
          * Lanthanides (57-71)
        </div>
        <div className="col-span-2 text-xs text-blue-300 flex items-center mt-2">
          ** Actinides (89-103)
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;