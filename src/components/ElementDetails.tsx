import React, { useState } from 'react';
import { Element, categoryColorText } from '../types/Element';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, Atom, Ruler as Molecule, Ruler } from 'lucide-react';
import ElementVisualizer from './ElementVisualizer';

interface ElementDetailsProps {
  element: Element;
  onClose: () => void;
}

const ElementDetails: React.FC<ElementDetailsProps> = ({ element, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'physical' | '3d'>('overview');

  const formatProperty = (value: number | null, unit: string) => {
    if (value === null) return 'Unknown';
    return `${value} ${unit}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-indigo-950/70 backdrop-blur-xl rounded-xl shadow-xl p-6 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onClose}
          className="flex items-center text-blue-300 hover:text-blue-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back to Table</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Element Header */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className={`text-8xl font-bold mr-6 ${categoryColorText[element.category]}`}>
              {element.symbol}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{element.name}</h1>
              <p className="text-blue-300">{element.category}</p>
              <div className="flex mt-2 space-x-4">
                <div className="text-sm">
                  <span className="text-gray-400">Atomic Number:</span>{' '}
                  <span className="text-white">{element.atomicNumber}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Atomic Mass:</span>{' '}
                  <span className="text-white">{element.atomicMass.toFixed(4)} u</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/30 rounded-lg p-3 text-sm text-center">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <span className="text-gray-400">Group:</span>{' '}
                <span className="text-white">{element.group || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400">Period:</span>{' '}
                <span className="text-white">{element.period}</span>
              </div>
              <div>
                <span className="text-gray-400">Block:</span>{' '}
                <span className="text-white">{element.block}</span>
              </div>
              <div>
                <span className="text-gray-400">Discovery:</span>{' '}
                <span className="text-white">{element.yearDiscovered}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="lg:col-span-3 mb-4">
          <div className="flex space-x-2 border-b border-blue-900/50 pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50'
              }`}
            >
              <Info className="w-4 h-4 mr-1" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('physical')}
              className={`flex items-center px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'physical'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50'
              }`}
            >
              <Molecule className="w-4 h-4 mr-1" />
              <span>Physical Properties</span>
            </button>
            <button
              onClick={() => setActiveTab('3d')}
              className={`flex items-center px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === '3d'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/50'
              }`}
            >
              <Atom className="w-4 h-4 mr-1" />
              <span>3D Visualization</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4 text-white">About {element.name}</h2>
              <p className="text-blue-100 mb-6">{element.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-white">Electronic Structure</h3>
                  <p className="text-sm text-blue-200 mb-2">
                    <span className="text-gray-400">Electron Configuration:</span>
                    <br />
                    <span className="font-mono">{element.electronConfiguration}</span>
                  </p>
                  <p className="text-sm text-blue-200">
                    <span className="text-gray-400">Electronegativity:</span>
                    <br />
                    {formatProperty(element.electronegativity, 'Pauling')}
                  </p>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-white">Discovery</h3>
                  <p className="text-sm text-blue-200 mb-2">
                    <span className="text-gray-400">Discovered by:</span>
                    <br />
                    {element.discoveredBy || 'Unknown'}
                  </p>
                  <p className="text-sm text-blue-200">
                    <span className="text-gray-400">Year:</span>
                    <br />
                    {element.yearDiscovered}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm border border-blue-800/50 rounded-lg p-6 h-full flex flex-col items-center justify-center">
                <div className={`text-[120px] font-bold mb-4 ${categoryColorText[element.category]}`}>
                  {element.symbol}
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Atomic Number</div>
                  <div className="text-3xl font-bold text-white">{element.atomicNumber}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'physical' && (
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold mb-4 text-white">Physical Properties</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-blue-400" />
                  Atomic Radius
                </h3>
                <p className="text-2xl font-bold text-blue-200">
                  {formatProperty(element.atomicRadius, 'pm')}
                </p>
                <p className="text-xs text-gray-400 mt-1">Picometers</p>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
                  <Molecule className="w-5 h-5 mr-2 text-blue-400" />
                  Density
                </h3>
                <p className="text-2xl font-bold text-blue-200">
                  {formatProperty(element.density, 'g/cm³')}
                </p>
                <p className="text-xs text-gray-400 mt-1">Grams per cubic centimeter</p>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
                  <Atom className="w-5 h-5 mr-2 text-blue-400" />
                  Ionization Energy
                </h3>
                <p className="text-2xl font-bold text-blue-200">
                  {formatProperty(element.ionizationEnergy, 'eV')}
                </p>
                <p className="text-xs text-gray-400 mt-1">Electron volts</p>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
                  <span className="mr-2 text-blue-400">🧊</span>
                  Melting Point
                </h3>
                <p className="text-2xl font-bold text-blue-200">
                  {formatProperty(element.meltingPoint, 'K')}
                </p>
                <p className="text-xs text-gray-400 mt-1">Kelvin</p>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
                  <span className="mr-2 text-blue-400">♨️</span>
                  Boiling Point
                </h3>
                <p className="text-2xl font-bold text-blue-200">
                  {formatProperty(element.boilingPoint, 'K')}
                </p>
                <p className="text-xs text-gray-400 mt-1">Kelvin</p>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-white flex items-center">
                  <span className="mr-2 text-blue-400">⚡</span>
                  Electronegativity
                </h3>
                <p className="text-2xl font-bold text-blue-200">
                  {formatProperty(element.electronegativity, '')}
                </p>
                <p className="text-xs text-gray-400 mt-1">Pauling scale</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '3d' && (
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold mb-4 text-white">3D Visualization</h2>
            <div className="bg-blue-900/20 rounded-lg p-4 h-[400px]">
              <ElementVisualizer element={element} />
            </div>
            <p className="text-sm text-blue-200 mt-4">
              This is a simplified 3D model of the atomic structure of {element.name}. 
              It displays electrons orbiting the nucleus in a stylized representation.
              Note that real atomic structures follow quantum mechanical principles and 
              don't have defined electron paths.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ElementDetails;