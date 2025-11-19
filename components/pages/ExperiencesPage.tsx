
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
        // On filtre pour ne garder que les "vraies" expériences touristiques, pas les services VIP
        // Pour l'instant, on prend tout ce qui vient de l'API normale, car l'API VIP est séparée.
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
        <div className="col-span-full flex flex-col items-center justify-center text-center h-64">
          <SpinnerIcon className="w-12 h-12 text-blue-900 dark:text-amber-400 animate-spin" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des activités...</p>
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
       <div className="w-full">
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <button 
                key={index}
                onClick={() => window.open(exp.bookingUrl, '_blank')}
                className="relative w-full h-72 md:h-80 rounded-3xl overflow-hidden shadow-xl text-white text-left focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-transform duration-200 hover:scale-[1.02] group"
              >
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/20">
                  {exp.badge}
                </div>

                <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                  <h3 className="font-bold text-2xl leading-tight mb-2">{exp.title}</h3>
                  <p className="text-sm text-gray-200 opacity-90 line-clamp-2 mb-4">{exp.description}</p>
                  <div className="mt-auto pt-4 border-t border-white/20 flex justify-between items-center">
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Découvrir</span>
                    <div className="bg-white/20 p-2 rounded-full">
                        <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
         </div>
     </div>
    );
  };


  return (
    <div className="animate-fade-in pb-28 md:pb-0">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 p-4 flex items-center justify-between gap-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Loisirs & Découvertes</h1>
        </div>
      </header>
      <main className="p-5 md:p-10 max-w-7xl mx-auto space-y-10">
         <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Une sélection d'activités culturelles et touristiques pour enrichir votre séjour en Suisse. Pour nos services exclusifs (Jets, Chefs...), visitez la section VIP.
         </p>
         {renderContent()}
      </main>
    </div>
  );
};
