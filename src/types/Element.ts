export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  group: number | null;
  period: number;
  block: string;
  electronConfiguration: string;
  electronegativity: number | null;
  atomicRadius: number | null;
  ionizationEnergy: number | null;
  density: number | null;
  meltingPoint: number | null;
  boilingPoint: number | null;
  discoveredBy: string;
  yearDiscovered: number | string;
  description: string;
}

export type ElementCategory = 
  | 'noble gas'
  | 'alkali metal'
  | 'alkaline earth metal'
  | 'transition metal'
  | 'post-transition metal'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'lanthanide'
  | 'actinide';

export const categoryColors: Record<ElementCategory, string> = {
  'noble gas': 'bg-purple-700 border-purple-600',
  'alkali metal': 'bg-red-700 border-red-600',
  'alkaline earth metal': 'bg-orange-700 border-orange-600',
  'transition metal': 'bg-yellow-700 border-yellow-600',
  'post-transition metal': 'bg-emerald-700 border-emerald-600',
  'metalloid': 'bg-teal-700 border-teal-600',
  'nonmetal': 'bg-green-700 border-green-600',
  'halogen': 'bg-cyan-700 border-cyan-600',
  'lanthanide': 'bg-blue-700 border-blue-600',
  'actinide': 'bg-violet-700 border-violet-600',
};

export const categoryColorText: Record<ElementCategory, string> = {
  'noble gas': 'text-purple-300',
  'alkali metal': 'text-red-300',
  'alkaline earth metal': 'text-orange-300',
  'transition metal': 'text-yellow-300',
  'post-transition metal': 'text-emerald-300',
  'metalloid': 'text-teal-300',
  'nonmetal': 'text-green-300',
  'halogen': 'text-cyan-300',
  'lanthanide': 'text-blue-300',
  'actinide': 'text-violet-300',
};