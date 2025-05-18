import React, { useState } from 'react';
import Header from './components/Header';
import PeriodicTable from './components/PeriodicTable';
import ElementDetails from './components/ElementDetails';
import FilterPanel from './components/FilterPanel';
import { Element } from './types/Element';
import { FilterOptions } from './types/FilterOptions';
import { AtomIcon } from 'lucide-react';

function App() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    group: '',
    period: '',
    category: '',
    searchQuery: '',
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  const handleCloseElementDetails = () => {
    setSelectedElement(null);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilterOptions((prev) => ({ ...prev, ...newFilters }));
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  return (
    <div className="min-h-screen bg-[#0a0b1e] text-white relative">
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0b1e] to-[#0a0b1e]" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              backgroundColor: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})`,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              boxShadow: '0 0 10px currentColor',
              animation: `float ${Math.random() * 15 + 15}s linear infinite`,
              animationDelay: `-${Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      <Header 
        toggleFilterPanel={toggleFilterPanel} 
        isFilterPanelOpen={isFilterPanelOpen}
        onSearchChange={(query) => handleFilterChange({ searchQuery: query })}
        searchQuery={filterOptions.searchQuery}
      />
      
      <main className="px-4 pb-20 pt-24 md:px-8 container mx-auto relative">
        {!selectedElement && (
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Periodic Table of Elements
            </h1>
            <p className="max-w-3xl mx-auto text-blue-200 text-lg">
              Explore the building blocks of our universe through this interactive periodic table.
              Hover over elements to see basic information, click for detailed insights.
            </p>
            <div className="mt-4 text-sm text-blue-300 animate-pulse">
              👆 Click any element to view detailed properties and 3D visualization
            </div>
          </div>
        )}

        <FilterPanel 
          isOpen={isFilterPanelOpen} 
          onClose={() => setIsFilterPanelOpen(false)}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
        />

        {!selectedElement ? (
          <PeriodicTable 
            onElementClick={handleElementClick} 
            filterOptions={filterOptions}
          />
        ) : (
          <ElementDetails 
            element={selectedElement} 
            onClose={handleCloseElementDetails} 
          />
        )}

        <div className="fixed bottom-4 right-4 opacity-50 text-white text-sm flex items-center">
          <AtomIcon className="animate-spin-slow mr-2" size={18} />
          <span>Made By Rohit ❤</span>
        </div>
      </main>
    </div>
  );
}

export default App;