
import React, { useState, useEffect } from 'react';
import { ChevronRightIcon } from './Icons';
import { useTranslation } from '../contexts/LanguageContext';
import { fetchSixtVehicles } from '../services/sixtApi';
import { CarCard, Car } from './CarCard';
import { CarBookingModal } from './CarBookingModal';

interface BestRentalDealsProps {
    onNavigate: (page: string) => void;
}

const CarSkeleton: React.FC = () => (
    <div className="w-80 md:w-full flex-shrink-0">
        <div className="relative w-full h-96 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>
);

export const BestRentalDeals: React.FC<BestRentalDealsProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    useEffect(() => {
        const loadCars = async () => {
            try {
                setIsLoading(true);
                const fetchedCars = await fetchSixtVehicles('Genève');
                // Select top 3 cars for comparison
                const showcaseCars = fetchedCars.slice(0, 3);
                setCars(showcaseCars);
            } catch (error) {
                console.error("Failed to fetch rental deals:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadCars();
    }, []);

    return (
        <section className="py-2">
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {t('bestRentalDeals')}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('bestRentalDealsSubtitle')}</p>
                </div>
                <button 
                    onClick={() => onNavigate('cars')}
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                    {t('seeAll')} <ChevronRightIcon className="w-4 h-4 rtl:rotate-180" />
                </button>
            </div>
            
            <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4 md:grid md:grid-cols-3 md:gap-8 md:mx-0 md:px-0 md:overflow-visible">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => <CarSkeleton key={index} />)
                ) : (
                    cars.map((car, index) => (
                        <div key={index} className="w-80 md:w-full flex-shrink-0">
                            <CarCard 
                                car={car} 
                                onBook={(c) => setSelectedCar(c)}
                                currency="CHF"
                                isAdmin={false}
                                onImageUpload={() => {}}
                            />
                        </div>
                    ))
                )}
            </div>
            
            {selectedCar && (
                <CarBookingModal car={selectedCar} onClose={() => setSelectedCar(null)} />
            )}
        </section>
    );
};
