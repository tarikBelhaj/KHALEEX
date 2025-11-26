import React, { useState, useEffect } from 'react';
import { SparklesIcon, ChevronRightIcon } from './Icons';
import { fetchVipServices, VipService } from '../services/vipApi';
import { VipServiceCard } from './VipServiceCard';
import { useTranslation } from '../contexts/LanguageContext';

interface VipExperiencesProps {
    onNavigate: (page: string) => void;
}

const ExperienceCardSkeleton: React.FC = () => (
    <div className="relative w-72 md:w-full h-64 flex-shrink-0 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
);

export const VipExperiences: React.FC<VipExperiencesProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const [vipServices, setVipServices] = useState<VipService[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const loadServices = async () => {
            try {
                const fetchedServices = await fetchVipServices();
                // On en affiche que 3 ou 4 sur la home
                setVipServices(fetchedServices.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch VIP services:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadServices();
    }, []);

  return (
    <section className="py-2">
      <div className="flex justify-between items-end mb-6 px-1">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700">{t('vipOnly')}</span>
                <SparklesIcon className="w-6 h-6 text-amber-500"/>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('vipSubtitle')}</p>
          </div>
          <button 
            onClick={() => onNavigate('vip-only')}
            className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:text-amber-500 transition-colors"
          >
              {t('discover')} <ChevronRightIcon className="w-4 h-4 rtl:rotate-180" />
          </button>
      </div>
      
      <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4 md:grid md:grid-cols-3 md:gap-8 md:mx-0 md:px-0 md:overflow-visible">
        {isLoading ? (
             Array.from({ length: 3 }).map((_, index) => <ExperienceCardSkeleton key={index} />)
        ) : (
            vipServices.map((service) => (
              <VipServiceCard key={service.id} service={service} />
            ))
        )}
      </div>
    </section>
  );
};