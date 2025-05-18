import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, GithubIcon } from 'lucide-react';
import { AtomIcon } from 'lucide-react';

interface HeaderProps {
  toggleFilterPanel: () => void;
  isFilterPanelOpen: boolean;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleFilterPanel, 
  isFilterPanelOpen,
  onSearchChange,
  searchQuery
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled 
          ? 'bg-indigo-950/90 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
             <AtomIcon className="w-6 h-6 text-blue-400" />
            <span className="text-white">Element</span>
            <span className="text-blue-400">Explorer</span>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full p-2 px-4 w-1/3 transition-all duration-300 focus-within:bg-white/20">
          <Search className="w-4 h-4 text-blue-300 mr-2" />
          <input
            type="text"
            placeholder="Search element..."
            className="bg-transparent w-full text-white placeholder-blue-300 focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            {isMobileSearchOpen ? (
              <X className="w-5 h-5 text-blue-300" />
            ) : (
              <Search className="w-5 h-5 text-blue-300" />
            )}
          </button>

          {/* Filter Button */}
          <button 
            className={`p-2 rounded-full transition-colors ${
              isFilterPanelOpen 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-white/10 text-blue-300'
            }`}
            onClick={toggleFilterPanel}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/rohitsharma-618?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="GitHub repository"
          >
            <GithubIcon className="w-5 h-5 text-blue-300" />
          </a>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-4 animate-slideDown">
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-2 px-4 w-full">
            <Search className="w-4 h-4 text-blue-300 mr-2" />
            <input
              type="text"
              placeholder="Search element..."
              className="bg-transparent w-full text-white placeholder-blue-300 focus:outline-none text-sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;