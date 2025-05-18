import React from 'react';
import { Element, categoryColors } from '../types/Element';
import { motion } from 'framer-motion';

interface ElementCardProps {
  element: Element;
  onClick: (element: Element) => void;
}

const ElementCard: React.FC<ElementCardProps> = ({ element, onClick }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        zIndex: 10,
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.2,
        boxShadow: {
          duration: 0.3
        }
      }}
      onClick={() => onClick(element)}
      className={`relative cursor-pointer border aspect-square p-1 rounded-md transition-all duration-300 transform backdrop-blur-sm ${
        categoryColors[element.category]
      } hover:shadow-lg hover:shadow-blue-500/20 hover:brightness-125`}
    >
      <div className="absolute top-1 left-1 text-xs font-mono opacity-70">
        {element.atomicNumber}
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-xl font-bold relative group">
          {element.symbol}
          <motion.div
            className="absolute -inset-1 bg-white/10 rounded-full opacity-0 group-hover:opacity-100"
            initial={false}
            animate={{ scale: [1, 1.2, 1], opacity: [0, 0.2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <div className="text-[8px] md:text-[10px] text-center truncate opacity-80 mt-1 font-medium">
          {element.name}
        </div>
        <div className="text-[7px] md:text-[8px] opacity-60 mt-0.5">
          {element.atomicMass.toFixed(2)}
        </div>
      </div>
    </motion.div>
  );
};

export default ElementCard;