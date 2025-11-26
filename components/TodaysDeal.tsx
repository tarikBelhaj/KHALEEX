import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, InfoIcon, ArrowRightOnRectangleIcon } from './Icons';
import { fetchTodaysDeals, Deal } from '../services/dealsApi';
import { useTranslation } from '../contexts/LanguageContext';

interface TodaysDealProps {
    onNavigate: (page: string) => void;
}

const DealCardSkeleton: React.FC = () => (
    <div aria-hidden="true" className="relative w-72 md:w-full h-80 flex-shrink-0 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
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
                className="relative w-72 md:w-full h-auto flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-800 text-left focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:hover:translate-y-0 group flex flex-col"
            >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                    <img 
                        src={deal.image} 
                        alt={deal.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                    />
                    {/* Badge Overlay */}
                    <div className="absolute top-3 right-3 bg-amber-400 text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-md uppercase tracking-wider">
                        {t('exclusive')}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">{deal.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{deal.subtitle}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                         <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide group-hover:text-amber-500 transition-colors">
                            {deal.page ? t('discover') : t('comingSoon')}
                         </span>
                         <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors">
                            <ArrowRightOnRectangleIcon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                         </div>
                    </div>
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
                    {t('discover')} <ChevronRightIcon className="w-4 h-4 rtl:rotate-180" />
                </button>
            </div>
            <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4 md:grid md:grid-cols-4 md:gap-8 md:mx-0 md:px-0 md:overflow-visible">
               {renderContent()}
            </div>
        </section>
    );
};