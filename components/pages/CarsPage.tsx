import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeftIcon, SpinnerIcon, InfoIcon, FilterIcon } from '../Icons';
import { CarCard, Car } from '../CarCard';
import { CarBookingModal } from '../CarBookingModal';
import { CurrencySwitcher } from '../CurrencySwitcher';
import { fetchSixtVehicles } from '../../services/sixtApi';
import { CarFilterModal, CarFilters } from '../CarFilterModal';

interface PageProps {
  onBack: () => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export const CarsPage: React.FC<PageProps> = ({ onBack, currency, onCurrencyChange }) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<CarFilters | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedCars = await fetchSixtVehicles('Genève');
        setCars(fetchedCars);

        const maxPrice = Math.max(...fetchedCars.map(c => c.price));
        setActiveFilters({
            maxPrice: maxPrice,
            makes: [],
            transmission: null
        });

      } catch (err) {
        setError('Impossible de charger les véhicules. Veuillez réessayer plus tard.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, []);
  
  const { allMakes, maxPrice, initialFilters } = useMemo(() => {
    if (cars.length === 0) {
        return { allMakes: [], maxPrice: 1000, initialFilters: null };
    }
    const makes = [...new Set(cars.map(car => car.make))];
    const price = Math.max(...cars.map(h => h.price));
    const filters = {
        maxPrice: price,
        makes: [],
        transmission: null,
    };
    return { allMakes: makes, maxPrice: price, initialFilters: filters };
  }, [cars]);


  const filteredCars = useMemo(() => {
      if (!activeFilters) return cars;

      return cars.filter(car => {
          const priceMatch = car.price <= activeFilters.maxPrice;
          const makeMatch = activeFilters.makes.length === 0 || activeFilters.makes.includes(car.make);
          const transmissionMatch = !activeFilters.transmission || car.transmission === activeFilters.transmission;
          return priceMatch && makeMatch && transmissionMatch;
      });
  }, [cars, activeFilters]);


  const handleBookClick = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  const handleImageUpload = (carIndex: number, imageIndex: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const newCars = [...cars];
        const carToUpdate = { ...newCars[carIndex] };
        carToUpdate.images[imageIndex] = reader.result as string;
        newCars[carIndex] = carToUpdate;
        setCars(newCars);
    };
    reader.readAsDataURL(file);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-64">
          <SpinnerIcon className="w-12 h-12 text-blue-900 dark:text-amber-400 animate-spin" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des véhicules en cours...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="flex flex-col items-center justify-center text-center h-64 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <InfoIcon className="w-12 h-12 text-red-500" />
          <p className="mt-4 font-semibold text-red-700 dark:text-red-300">Une erreur est survenue</p>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      );
    }

    return (
       <div className="space-y-4">
          {filteredCars.length > 0 ? filteredCars.map((car, index) => (
            <CarCard 
                key={`${car.name}-${index}`}
                car={car} 
                onBook={handleBookClick} 
                currency={currency}
                isAdmin={isAdmin}
                onImageUpload={(file, imageIndex) => handleImageUpload(index, imageIndex, file)}
            />
          )) : (
            <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">Aucun véhicule ne correspond à vos critères.</p>
            </div>
          )}
        </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 p-4 flex items-center justify-between gap-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Voitures de prestige</h1>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Admin</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>
      </header>
      <main className="p-4">
        <div className="flex justify-between items-center mb-4 gap-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">Véhicules disponibles en temps réel.</p>
            <button 
                onClick={() => setFilterModalOpen(true)}
                className="p-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg flex-shrink-0"
                disabled={isLoading || !!error}
            >
                <FilterIcon className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
            </button>
            <div className="flex-shrink-0 w-24">
                <CurrencySwitcher currentCurrency={currency} onCurrencyChange={onCurrencyChange} />
            </div>
        </div>
        
       {renderContent()}

      </main>
      {selectedCar && <CarBookingModal car={selectedCar} onClose={handleCloseModal} />}
      
      {activeFilters && initialFilters && (
         <CarFilterModal 
            isOpen={isFilterModalOpen}
            onClose={() => setFilterModalOpen(false)}
            onApply={setActiveFilters}
            allMakes={allMakes}
            initialFilters={initialFilters}
            currentFilters={activeFilters}
            maxPrice={maxPrice}
          />
      )}
    </div>
  );
};