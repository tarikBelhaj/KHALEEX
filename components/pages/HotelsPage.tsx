
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeftIcon, SearchIcon, FilterIcon, SpinnerIcon, InfoIcon } from '../Icons';
import { HotelCard, Hotel } from '../HotelCard';
import { HotelBookingModal } from '../BookingConfirmationModal';
import { CurrencySwitcher } from '../CurrencySwitcher';
import usePersistentState from '../../hooks/usePersistentState';
import { FilterModal, Filters } from '../FilterModal';
import { fetchHotels } from '../../services/bookingApi';


interface PageProps {
  onBack: () => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export const HotelsPage: React.FC<PageProps> = ({ onBack, currency, onCurrencyChange }) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [allHotels, setAllHotels] = usePersistentState<Hotel[]>('hotelsData', []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  
  const { allAmenities, maxPrice, initialFilters } = useMemo(() => {
    if (allHotels.length === 0) {
        return { allAmenities: [], maxPrice: 5000, initialFilters: { maxPrice: 5000, ratings: [], amenities: [] } };
    }
    const amenities = [...new Set(allHotels.flatMap(hotel => hotel.amenities))];
    const price = Math.max(...allHotels.map(h => h.price));
    const filters = {
        maxPrice: price,
        ratings: [],
        amenities: [],
    };
    return { allAmenities: amenities, maxPrice: price, initialFilters: filters };
  }, [allHotels]);
  
  const [activeFilters, setActiveFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
      setActiveFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedHotels = await fetchHotels();
        setAllHotels(fetchedHotels);
      } catch (err: any) {
        setError(err.message || 'Impossible de charger les hôtels. Veuillez réessayer plus tard.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Only fetch if data isn't already persisted
    if (allHotels.length === 0) {
        loadHotels();
    } else {
        setIsLoading(false);
    }
  }, []); // Run only once on mount

  const handleBookClick = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
  };
  
  const handleImageUpload = (hotelIndex: number, imageIndex: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const newHotels = [...allHotels];
        const hotelToUpdate = { ...newHotels[hotelIndex] };
        hotelToUpdate.images[imageIndex] = reader.result as string;
        newHotels[hotelIndex] = hotelToUpdate;
        setAllHotels(newHotels);
    };
    reader.readAsDataURL(file);
  };

  const filteredHotels = useMemo(() => {
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.trim() !== '');

    return allHotels
      .filter(hotel => {
        if (searchTerms.length === 0) return true;
        const hotelInfo = [hotel.name, hotel.city, ...hotel.amenities].join(' ').toLowerCase();
        return searchTerms.every(term => hotelInfo.includes(term));
      })
      .filter(hotel => hotel.price <= activeFilters.maxPrice)
      .filter(hotel => activeFilters.ratings.length === 0 || activeFilters.ratings.includes(hotel.rating))
      .filter(hotel => activeFilters.amenities.length === 0 || activeFilters.amenities.every(amenity => hotel.amenities.includes(amenity)));
  }, [searchQuery, allHotels, activeFilters]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center text-center h-64">
          <SpinnerIcon className="w-12 h-12 text-blue-900 dark:text-amber-400 animate-spin" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des hôtels en cours...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="col-span-full flex flex-col items-center justify-center text-center h-64 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl">
          <InfoIcon className="w-12 h-12 text-red-500" />
          <p className="mt-4 font-semibold text-red-700 dark:text-red-300">Une erreur est survenue</p>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          {filteredHotels.length > 0 ? filteredHotels.map((hotel, hotelIndex) => (
            <HotelCard 
                key={hotel.name} 
                hotel={hotel} 
                onBook={handleBookClick} 
                currency={currency}
                isAdmin={isAdmin}
                onImageUpload={(file, imageIndex) => handleImageUpload(hotelIndex, imageIndex, file)}
            />
          )) : (
            <div className="col-span-full text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">Aucun hôtel ne correspond à vos critères.</p>
            </div>
          )}
        </div>
    );
  };


  return (
    <div className="animate-fade-in pb-28 md:pb-0">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 p-4 flex items-center justify-between gap-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Hôtels d'exception</h1>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Admin</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>
      </header>
      <main className="p-5 md:p-10 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="relative w-full md:max-w-lg">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                    type="text"
                    placeholder="Rechercher (hôtel, ville, service...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
                <button 
                    onClick={() => setFilterModalOpen(true)}
                    className="p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl flex-1 md:flex-none flex justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    disabled={isLoading || !!error}
                >
                    <FilterIcon className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                </button>
                <div className="w-36">
                    <CurrencySwitcher currentCurrency={currency} onCurrencyChange={onCurrencyChange} />
                </div>
            </div>
        </div>
        
        {renderContent()}
      </main>
      
      {selectedHotel && <HotelBookingModal hotel={selectedHotel} onClose={handleCloseModal} />}

      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={setActiveFilters}
        allAmenities={allAmenities}
        initialFilters={initialFilters}
        currentFilters={activeFilters}
        maxPrice={maxPrice}
      />
    </div>
  );
};
