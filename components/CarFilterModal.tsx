import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';
import { useTranslation } from '../contexts/LanguageContext';

export interface CarFilters {
  maxPrice: number;
  makes: string[];
  transmission: 'Auto' | 'Manual' | null;
}

interface CarFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: CarFilters) => void;
  allMakes: string[];
  initialFilters: CarFilters;
  currentFilters: CarFilters;
  maxPrice: number;
}

export const CarFilterModal: React.FC<CarFilterModalProps> = ({ isOpen, onClose, onApply, allMakes, initialFilters, currentFilters, maxPrice }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<CarFilters>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, isOpen]);

  if (!isOpen) return null;

  const handleMakeToggle = (make: string) => {
    setFilters(prev => {
      const newMakes = prev.makes.includes(make)
        ? prev.makes.filter(m => m !== make)
        : [...prev.makes, make];
      return { ...prev, makes: newMakes };
    });
  };

  const handleTransmissionChange = (transmission: 'Auto' | 'Manual' | null) => {
      setFilters(prev => ({...prev, transmission}));
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onApply(initialFilters);
    onClose();
  };
  
  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-end animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col" style={{ height: '85vh' }}>
        <header className="flex items-center justify-between p-4 border-b dark:border-gray-700 flex-shrink-0">
          <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100">{t('carFilters')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </header>
        
        <main className="p-4 overflow-y-auto flex-grow space-y-6">
            {/* Price Filter */}
            <section>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">{t('maxPricePerDay')}</h3>
                <div className="px-2">
                    <input
                        type="range"
                        min="300"
                        max={maxPrice}
                        step="50"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <span>CHF 300</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">CHF {filters.maxPrice}</span>
                        <span>CHF {maxPrice}</span>
                    </div>
                </div>
            </section>

            {/* Transmission Filter */}
            <section>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">{t('transmission')}</h3>
                <div className="flex gap-2">
                    {(['Auto', 'Manual'] as const).map(type => (
                        <button 
                            key={type}
                            onClick={() => handleTransmissionChange(filters.transmission === type ? null : type)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                                filters.transmission === type
                                ? 'bg-amber-100 border-amber-400 text-amber-800 dark:bg-amber-900/50 dark:border-amber-500 dark:text-amber-200'
                                : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
                            }`}
                        >
                            {t(type.toLowerCase())}
                        </button>
                    ))}
                </div>
            </section>
            
            {/* Make Filter */}
            <section>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">{t('make')}</h3>
                <div className="space-y-3">
                    {allMakes.map(make => (
                        <label key={make} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.makes.includes(make)}
                                onChange={() => handleMakeToggle(make)}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{make}</span>
                        </label>
                    ))}
                </div>
            </section>
        </main>
        
        <footer className="flex items-center justify-between p-4 border-t dark:border-gray-700 flex-shrink-0">
            <button
                onClick={handleReset}
                className="font-bold text-gray-700 dark:text-gray-200 hover:underline"
            >
                {t('reset')}
            </button>
            <button
                onClick={handleApply}
                className="bg-blue-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
            >
                {t('apply')}
            </button>
        </footer>
      </div>
    </div>
  );
};