import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, InfoIcon } from './Icons';
import { fetchTodaysDeals, Deal } from '../services/dealsApi';


interface TodaysDealProps {
    onNavigate: (page: string) => void;
}

const DealCardSkeleton: React.FC = () => (
    <div aria-hidden="true" className="relative w-48 md:w-full h-60 flex-shrink-0 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
);

export const TodaysDeal: React.FC<TodaysDealProps> = ({ onNavigate }) => {
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
                setError("Impossible de charger les offres du jour.");
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
                <div className="col-span-full flex items-center justify-center w-full h-60 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-700 dark:text-red-300">
                    <InfoIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                    <p className="font-medium">{error}</p>
                </div>
            );
        }

        if (deals.length === 0) {
             return (
                <div className="col-span-full flex items-center justify-center w-full h-60 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-gray-500 dark:text-gray-400">
                    <p>Aucune offre disponible pour le moment.</p>
                </div>
            );
        }

        return deals.map((deal) => (
            <button 
                key={deal.id}
                onClick={() => deal.page && onNavigate(deal.page)}
                disabled={!deal.page}
                aria-label={`Voir les offres pour ${deal.title}`}
                className="relative w-48 md:w-full h-60 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg text-white text-left focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                <img src={deal.image} alt={deal.title} className="w-full h-full object-cover absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="relative z-10 p-3 flex flex-col h-full justify-end">
                    <h3 className="font-bold leading-tight text-lg">{deal.title}</h3>
                    <p className="text-xs opacity-90 mt-0.5">{deal.subtitle}</p>
                </div>
            </button>
        ));
    };

    return (
        <section aria-labelledby="todays-deals-heading">
            <div className="flex justify-between items-center mb-4">
                <h2 id="todays-deals-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100">Offres Exclusives du Jour</h2>
                <button 
                    aria-label="Voir toutes les offres exclusives du jour"
                    className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:text-amber-500 transition-colors"
                >
                    Voir tout <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 md:grid md:grid-cols-4 md:gap-6 md:mx-0 md:px-0 md:overflow-visible">
               {renderContent()}
            </div>
        </section>
    );
};