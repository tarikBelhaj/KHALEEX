import React, { useState, useRef } from 'react';
import { AccountIcon, CogIcon, CameraIcon, PhotoIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { useTranslation } from '../contexts/LanguageContext';

export interface Car {
  make: string;
  name: string;
  type: string;
  seats: number;
  transmission: string;
  price: number;
  images: (string | null)[];
  bookingUrl?: string;
}

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
  currency: string;
  isAdmin: boolean;
  onImageUpload: (file: File, imageIndex: number) => void;
}

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

export const CarCard: React.FC<CarCardProps> = ({ car, onBook, currency, isAdmin, onImageUpload }) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { name, type, seats, transmission, price, images } = car;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getConvertedPrice = () => {
    const rate = conversionRates[currency as keyof typeof conversionRates] || 1;
    const symbol = currencySymbols[currency as keyof typeof currencySymbols] || 'CHF';
    const convertedPrice = (price * rate).toFixed(0);
    return `${symbol} ${convertedPrice}`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file, currentImageIndex);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200/80 dark:border-gray-700/80 group">
      <div className="h-40 md:h-56 relative overflow-hidden">
        {images && images.length > 0 && images[currentImageIndex] ? (
          <img src={images[currentImageIndex]!} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center">
            <PhotoIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('noImage')}</p>
          </div>
        )}

        {images && images.length > 1 && (
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
                    {images.map((_, index) => (
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
              {t('changeImage')}
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{type}</p>
        </div>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mt-3 text-sm">
            <div className="flex items-center gap-1.5">
                <AccountIcon className="w-5 h-5"/>
                <span>{seats} {t('seats')}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <CogIcon className="w-5 h-5"/>
                <span>{transmission}</span>
            </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('from')}</p>
            <p className="font-extrabold text-xl text-gray-900 dark:text-gray-50">{getConvertedPrice()} <span className="font-normal text-sm">{t('perDay')}</span></p>
          </div>
          <button 
            onClick={() => onBook(car)}
            className="bg-blue-900 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
          >
            {t('book')}
          </button>
        </div>
      </div>
    </div>
  );
};