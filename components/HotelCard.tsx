import React, { useState, useRef, useMemo, useEffect } from 'react';
import { StarIcon, ChevronDownIcon, WifiIcon, SparklesIcon, SunIcon, MapPinIcon, CameraIcon, PhotoIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export interface Hotel {
  name: string;
  city: string;
  rating: number;
  price: number;
  images: (string | null)[];
  bookingUrl: string;
  description: string;
  amenities: string[];
}

interface HotelCardProps {
  hotel: Hotel;
  onBook: (hotel: Hotel) => void;
  currency: string;
  isAdmin: boolean;
  onImageUpload: (file: File, imageIndex: number) => void;
}

const AmenityIcon: React.FC<{ amenity: string }> = ({ amenity }) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('spa')) return <SparklesIcon className="w-4 h-4 text-amber-600" />;
    if (lowerAmenity.includes('wi-fi')) return <WifiIcon className="w-4 h-4 text-amber-600" />;
    if (lowerAmenity.includes('piscine') || lowerAmenity.includes('pool')) return <SunIcon className="w-4 h-4 text-amber-600" />;
    if (lowerAmenity.includes('parking') || lowerAmenity.includes('vue')) return <MapPinIcon className="w-4 h-4 text-amber-600" />;
    return <SparklesIcon className="w-4 h-4 text-amber-600" />; // Default icon
};

const conversionRates = {
    CHF: 1,
    USD: 1.1,
    EUR: 1.05,
    GBP: 0.9,
};

const currencySymbols = {
    CHF: 'CHF',
    USD: '$',
    EUR: '€',
    GBP: '£',
};

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onBook, currency, isAdmin, onImageUpload }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { name, city, rating, price, description, amenities } = hotel;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter out null/undefined images and memoize the result for performance.
  const validImages = useMemo(() => {
    console.log(`Processing images for ${name}:`, hotel.images);
    return hotel.images.filter((img): img is string => !!img);
  }, [hotel.images, name]);
  
  // Reset index if the hotel changes to prevent stale state
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [name]);

  const getConvertedPrice = () => {
    const rate = conversionRates[currency as keyof typeof conversionRates] || 1;
    const symbol = currencySymbols[currency as keyof typeof currencySymbols] || 'CHF';
    const convertedPrice = (price * rate).toFixed(0);
    return `${symbol} ${convertedPrice}`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validImages.length > 0) {
      // Find the original index of the currently shown valid image
      const originalIndex = hotel.images.indexOf(validImages[currentImageIndex]);
      if (originalIndex !== -1) {
          onImageUpload(file, originalIndex);
      }
    }
  };
  
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (validImages.length > 1) {
        setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (validImages.length > 1) {
          setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
      }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200/80 dark:border-gray-700/80 transition-all duration-300 group">
      <div className="h-48 relative overflow-hidden">
        {validImages.length > 0 ? (
            <img src={validImages[currentImageIndex]} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
        ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center">
                <PhotoIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Aucune image</p>
            </div>
        )}

        {validImages.length > 1 && (
            <>
                <button 
                    onClick={handlePrevImage} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60 z-10"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button 
                    onClick={handleNextImage} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/60 z-10"
                >
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {validImages.map((_, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                    ))}
                </div>
            </>
        )}

        {isAdmin && (
          <>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange} 
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-semibold py-1 px-2.5 rounded-md flex items-center gap-1.5 backdrop-blur-sm hover:bg-black/80 transition-colors z-10"
            >
              <CameraIcon className="w-4 h-4" />
              {validImages.length > 0 ? "Changer l'image" : "Ajouter image"}
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{city}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-2 py-1 rounded-full text-sm font-bold">
            <StarIcon className="w-4 h-4 text-amber-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">dès</p>
            <p className="font-extrabold text-2xl text-gray-900 dark:text-gray-50">{getConvertedPrice()} <span className="font-normal text-sm">/nuit</span></p>
          </div>
          <button 
            onClick={() => onBook(hotel)}
            className="bg-blue-900 text-white font-bold py-2.5 px-6 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
          >
            Réserver
          </button>
        </div>

        {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{description}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {amenities.map(amenity => (
                        <div key={amenity} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <AmenityIcon amenity={amenity} />
                            <span>{amenity}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
       <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/60 text-gray-600 dark:text-gray-300 text-sm font-semibold py-2.5 px-4 flex items-center justify-center gap-2 transition-colors border-t dark:border-gray-700"
        >
          <span>{isExpanded ? 'Cacher les détails' : 'Voir les détails'}</span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
    </div>
  );
};
