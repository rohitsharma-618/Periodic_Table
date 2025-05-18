import React from 'react';
import { FilterOptions } from '../types/FilterOptions';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filterOptions: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  filterOptions,
  onFilterChange,
}) => {
  const elementCategories = [
    { value: '', label: 'All Categories' },
    { value: 'noble gas', label: 'Noble Gases' },
    { value: 'alkali metal', label: 'Alkali Metals' },
    { value: 'alkaline earth metal', label: 'Alkaline Earth Metals' },
    { value: 'transition metal', label: 'Transition Metals' },
    { value: 'post-transition metal', label: 'Post-Transition Metals' },
    { value: 'metalloid', label: 'Metalloids' },
    { value: 'nonmetal', label: 'Nonmetals' },
    { value: 'halogen', label: 'Halogens' },
    { value: 'lanthanide', label: 'Lanthanides' },
    { value: 'actinide', label: 'Actinides' },
  ];

  const groups = [
    { value: '', label: 'All Groups' },
    ...Array.from({ length: 18 }, (_, i) => ({
      value: (i + 1).toString(),
      label: `Group ${i + 1}`,
    })),
  ];

  const periods = [
    { value: '', label: 'All Periods' },
    ...Array.from({ length: 7 }, (_, i) => ({
      value: (i + 1).toString(),
      label: `Period ${i + 1}`,
    })),
  ];

  const resetFilters = () => {
    onFilterChange({
      group: '',
      period: '',
      category: '',
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.3 }}
      className="fixed right-0 top-0 h-full bg-indigo-950/95 backdrop-blur-xl w-full md:w-96 z-20 shadow-xl overflow-auto"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Filter Elements</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-blue-300" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Element Category
            </label>
            <select
              value={filterOptions.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-md border border-indigo-800/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {elementCategories.map((category) => (
                <option key={category.value} value={category.value} className="bg-indigo-950 text-white">
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Group
            </label>
            <select
              value={filterOptions.group}
              onChange={(e) => onFilterChange({ group: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-md border border-indigo-800/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {groups.map((group) => (
                <option key={group.value} value={group.value} className="bg-indigo-950 text-white">
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          {/* Period Filter */}
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-2">
              Period
            </label>
            <select
              value={filterOptions.period}
              onChange={(e) => onFilterChange({ period: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-md border border-indigo-800/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value} className="bg-indigo-950 text-white">
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="w-full py-2 bg-blue-600/80 hover:bg-blue-600 transition-colors rounded-lg text-white font-medium mt-4"
          >
            Reset Filters
          </button>
        </div>

        <div className="mt-8 rounded-lg p-4 bg-indigo-900/50 border border-indigo-800/50">
          <h3 className="text-md font-semibold text-blue-300 mb-2">
            Element Categories Legend
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {elementCategories.slice(1).map((category) => (
              <div key={category.value} className="flex items-center gap-2">
                <div 
                  className={`w-3 h-3 rounded-full ${getCategoryColorClass(category.value)}`} 
                />
                <span className="text-xs text-white">{category.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to get color class based on category
const getCategoryColorClass = (category: string): string => {
  const colors: Record<string, string> = {
    'noble gas': 'bg-purple-500',
    'alkali metal': 'bg-red-500',
    'alkaline earth metal': 'bg-orange-500',
    'transition metal': 'bg-yellow-500',
    'post-transition metal': 'bg-emerald-500',
    'metalloid': 'bg-teal-500',
    'nonmetal': 'bg-green-500',
    'halogen': 'bg-cyan-500',
    'lanthanide': 'bg-blue-500',
    'actinide': 'bg-violet-500',
  };

  return colors[category] || 'bg-gray-500';
};

export default FilterPanel;