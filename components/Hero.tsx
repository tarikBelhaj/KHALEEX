
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface HeroProps {
    user: User | null;
}

export const Hero: React.FC<HeroProps> = ({ user }) => {
  const [greetingTime, setGreetingTime] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        setGreetingTime('goodMorning');
    } else if (hour >= 12 && hour < 18) {
        setGreetingTime('goodAfternoon');
    } else {
        setGreetingTime('goodEvening');
    }
  }, []);

  return (
    <section className="relative h-[50vh] max-h-[450px] md:h-[60vh] md:max-h-[600px] text-white w-full">
      <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1470&auto=format&fit=crop" alt="Swiss landscape" className="absolute top-0 left-0 w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-black/10 to-transparent"></div>
      
      <div className="relative z-10 flex flex-col h-full p-4 w-full max-w-7xl mx-auto pt-24 md:pt-32 text-center items-center">
        {user && (
            <p className="font-semibold text-lg md:text-xl animate-fade-in text-amber-400">
                {greetingTime ? t(greetingTime) : ''}, {user.name} 👋
            </p>
        )}
        <h2 className="text-3xl md:text-5xl md:max-w-3xl font-extrabold mt-2 leading-tight drop-shadow-lg animate-fade-in">{t('heroTitle')}</h2>
        <p className="mt-2 text-lg md:text-xl text-right opacity-90 drop-shadow-md md:mt-4">
          {t('heroSubtitle')}
        </p>
        <button className="mt-6 md:mt-8 bg-amber-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-200 hover:scale-105">
            {t('unlockOffers')}
        </button>
      </div>
    </section>
  );
};
