import React, { useState, useEffect } from 'react';
import { SparklesIcon, ChevronRightIcon } from './Icons';
import { fetchExperiences, Experience } from '../services/experiencesApi';


const ExperienceCardSkeleton: React.FC = () => (
    <div className="relative w-64 h-40 flex-shrink-0 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
);

export const VipExperiences: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const loadExperiences = async () => {
            try {
                // Fetch all and take the first 3 for the homepage
                const fetchedExperiences = await fetchExperiences();
                setExperiences(fetchedExperiences.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch VIP experiences:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadExperiences();
    }, []);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-amber-500"/>
            VIP Only
          </h2>
          <button className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
              Voir tout <ChevronRightIcon className="w-4 h-4" />
          </button>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
        {isLoading ? (
             Array.from({ length: 3 }).map((_, index) => <ExperienceCardSkeleton key={index} />)
        ) : (
            experiences.map((exp, index) => (
              <button 
                key={index} 
                onClick={() => window.open(exp.bookingUrl, '_blank')}
                className="relative w-64 h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg text-white text-left focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 transition-transform duration-200 hover:scale-105"
              >
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                <div className="absolute top-2 left-2 bg-blue-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  {exp.badge}
                </div>

                <div className="relative z-10 p-3 flex flex-col h-full justify-end">
                  <h3 className="font-bold leading-tight">{exp.title}</h3>
                  <p className="text-xs opacity-90 mt-1">{exp.description}</p>
                </div>
              </button>
            ))
        )}
      </div>
    </section>
  );
};
