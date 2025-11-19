
import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ArrowLeftIcon } from './Icons';
import { useTranslation } from '../contexts/LanguageContext';
import { fetchExperiences, Experience } from '../services/experiencesApi';

interface GeneralExperiencesProps {
    onNavigate: (page: string) => void;
}

const ExperienceSkeleton: React.FC = () => (
    <div className="relative w-72 md:w-full h-72 flex-shrink-0 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
);

export const GeneralExperiences: React.FC<GeneralExperiencesProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                setIsLoading(true);
                const fetchedExperiences = await fetchExperiences();
                setExperiences(fetchedExperiences.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch experiences:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadExperiences();
    }, []);

    return (
        <section className="py-2">
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {t('generalExperiencesTitle')}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('generalExperiencesSubtitle')}</p>
                </div>
                <button 
                    onClick={() => onNavigate('experiences')}
                    className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:text-amber-500 transition-colors"
                >
                    {t('seeAll')} <ChevronRightIcon className="w-4 h-4 rtl:rotate-180" />
                </button>
            </div>
            
            <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4 md:grid md:grid-cols-3 md:gap-8 md:mx-0 md:px-0 md:overflow-visible">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => <ExperienceSkeleton key={index} />)
                ) : (
                    experiences.map((exp, index) => (
                        <button 
                            key={index}
                            onClick={() => window.open(exp.bookingUrl, '_blank')}
                            className="relative w-72 md:w-full h-72 md:h-80 rounded-3xl overflow-hidden shadow-lg flex-shrink-0 text-white text-left focus:outline-none transition-transform duration-200 hover:scale-[1.02] group"
                        >
                            <img src={exp.image} alt={exp.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            
                            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/20">
                                {exp.badge}
                            </div>

                            <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                                <h3 className="font-bold text-xl leading-tight mb-2">{exp.title}</h3>
                                <p className="text-xs text-gray-200 opacity-90 line-clamp-2 mb-4">{exp.description}</p>
                                <div className="mt-auto pt-4 border-t border-white/20 flex justify-between items-center">
                                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Découvrir</span>
                                    <div className="bg-white/20 p-2 rounded-full">
                                        <ArrowLeftIcon className="w-3 h-3 rotate-180" />
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </section>
    );
};
