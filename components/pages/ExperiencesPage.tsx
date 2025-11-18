import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, SpinnerIcon, InfoIcon } from '../Icons';
import { fetchExperiences, Experience } from '../../services/experiencesApi';

interface PageProps {
  onBack: () => void;
}

export const ExperiencesPage: React.FC<PageProps> = ({ onBack }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedExperiences = await fetchExperiences();
        setExperiences(fetchedExperiences);
      } catch (err: any) {
        setError(err.message || 'Impossible de charger les expériences. Veuillez réessayer plus tard.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadExperiences();
  }, []);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-64">
          <SpinnerIcon className="w-12 h-12 text-blue-900 dark:text-amber-400 animate-spin" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des expériences...</p>
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
       <div>
         <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Toutes les Expériences VIP</h2>
         <div className="space-y-4">
            {experiences.map((exp, index) => (
              <button 
                key={index}
                onClick={() => window.open(exp.bookingUrl, '_blank')}
                className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg text-white text-left focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 transition-transform duration-200 hover:scale-105"
              >
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                <div className="absolute top-3 left-3 bg-blue-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  {exp.badge}
                </div>

                <div className="relative z-10 p-4 flex flex-col h-full justify-end">
                  <h3 className="font-bold text-lg leading-tight">{exp.title}</h3>
                  <p className="text-sm opacity-90 mt-1">{exp.description}</p>
                </div>
              </button>
            ))}
         </div>
     </div>
    );
  };


  return (
    <div className="animate-fade-in">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 p-4 flex items-center justify-between gap-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Expériences Inoubliables</h1>
        </div>
      </header>
      <main className="p-4 space-y-8">
         <p className="text-gray-600 dark:text-gray-400">Découvrez des activités uniques et des accès privilégiés pour rendre votre voyage inoubliable.</p>
         {renderContent()}
      </main>
    </div>
  );
};
