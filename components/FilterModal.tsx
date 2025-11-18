import React, { useState, useEffect } from 'react';
import { XIcon, StarIcon } from './Icons';

export interface Filters {
  maxPrice: number;
  ratings: number[];
  amenities: string[];
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  allAmenities: string[];
  initialFilters: Filters;
  currentFilters: Filters;
  maxPrice: number;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, allAmenities, initialFilters, currentFilters, maxPrice }) => {
  const [filters, setFilters] = useState<Filters>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, isOpen]);

  if (!isOpen) return null;

  const handleRatingToggle = (rating: number) => {
    setFilters(prev => {
      const newRatings = prev.ratings.includes(rating)
        ? prev.ratings.filter(r => r !== rating)
        : [...prev.ratings, rating];
      return { ...prev, ratings: newRatings };
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onApply(initialFilters);
  };
  
  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex flex-col justify-end animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col" style={{ height: '85vh' }}>
        <header className="flex items-center justify-between p-4 border-b dark:border-gray-700 flex-shrink-0">
          <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100">Filtres</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </header>
        
        <main className="p-4 overflow-y-auto flex-grow space-y-6">
            {/* Price Filter */}
            <section>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">Prix maximum par nuit</h3>
                <div className="px-2">
                    <input
                        type="range"
                        min="500"
                        max={maxPrice}
                        step="50"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <span>CHF 500</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">CHF {filters.maxPrice}</span>
                        <span>CHF {maxPrice}</span>
                    </div>
                </div>
            </section>

            {/* Rating Filter */}
            <section>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">Étoiles</h3>
                <div className="flex gap-2">
                    {[5, 4, 3].map(rating => (
                        <button 
                            key={rating}
                            onClick={() => handleRatingToggle(rating)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                                filters.ratings.includes(rating)
                                ? 'bg-amber-100 border-amber-400 text-amber-800 dark:bg-amber-900/50 dark:border-amber-500 dark:text-amber-200'
                                : 'bg-white border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
                            }`}
                        >
                            {rating} <StarIcon className="w-4 h-4 text-amber-500" />
                        </button>
                    ))}
                </div>
            </section>
            
            {/* Amenities Filter */}
            <section>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">Équipements</h3>
                <div className="space-y-3">
                    {allAmenities.map(amenity => (
                        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.amenities.includes(amenity)}
                                onChange={() => handleAmenityToggle(amenity)}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
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
                Réinitialiser
            </button>
            <button
                onClick={handleApply}
                className="bg-blue-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
            >
                Appliquer
            </button>
        </footer>
      </div>
    </div>
  );
};