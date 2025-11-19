
import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, InfoIcon } from './Icons';
import { fetchTodaysDeals, Deal } from '../services/dealsApi';
import { useTranslation } from '../contexts/LanguageContext';

interface TodaysDealProps {
    onNavigate: (page: string) => void;
}

const DealCardSkeleton: React.FC = () => (
    <div aria-hidden="true" className="relative w-64 md:w-full h-72 flex-shrink-0 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
);

export const TodaysDeal: React.FC<TodaysDealProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const [deals, setDeals] = useState<Deal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDeals = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedDeals = await fetchTodaysDeals();
                setDeals(fetchedDeals);
            } catch (error) {
                console.error("Failed to fetch today's deals:", error);
                setError("Unable to load deals.");
            } finally {
                setIsLoading(false);
            }
        };
        loadDeals();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: 4 }).map((_, index) => <DealCardSkeleton key={index} />);
        }

        if (error) {
            return (
                <div className="col-span-full flex items-center justify-center w-full h-60 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl text-red-700 dark:text-red-300">
                    <InfoIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                    <p className="font-medium">{error}</p>
                </div>
            );
        }

        if (deals.length === 0) {
             return (
                <div className="col-span-full flex items-center justify-center w-full h-60 bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl text-gray-500 dark:text-gray-400">
                    <p>No deals available.</p>
                </div>
            );
        }

        return deals.map((deal) => (
            <button 
                key={deal.id}
                onClick={() => deal.page && onNavigate(deal.page)}
                disabled={!deal.page}
                aria-label={`View deals for ${deal.title}`}
                className="relative w-64 md:w-full h-72 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg text-white text-left focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            >
                <img src={deal.image} alt={deal.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="relative z-10 p-5 flex flex-col h-full justify-end">
                    <h3 className="font-bold leading-tight text-xl mb-1">{deal.title}</h3>
                    <p className="text-sm opacity-90">{deal.subtitle}</p>
                </div>
            </button>
        ));
    };

    return (
        <section aria-labelledby="todays-deals-heading" className="py-2">
            <div className="flex justify-between items-center mb-6">
                <h2 id="todays-deals-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('todaysDeals')}</h2>
                <button 
                    aria-label="View all todays deals"
                    className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:text-amber-500 transition-colors"
                >
                    {t('seeAll')} <ChevronRightIcon className="w-4 h-4 rtl:rotate-180" />
                </button>
            </div>
            <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4 md:grid md:grid-cols-4 md:gap-8 md:mx-0 md:px-0 md:overflow-visible">
               {renderContent()}
            </div>
        </section>
    );
};
