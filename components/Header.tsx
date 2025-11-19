
import React from 'react';
import { SearchIcon, MenuIcon, LogoIcon } from './Icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4 w-full">
      <div className="flex justify-between items-center text-white max-w-7xl mx-auto">
        <div className="flex items-center gap-2 md:hidden">
          {/* Logo only visible on mobile here because Desktop has sidebar */}
          <div className="bg-white/90 p-1.5 rounded-full shadow-md">
            <LogoIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Khaleex.com</h1>
            <p className="text-xs opacity-80 text-right">{t('guideToSwiss')}</p>
          </div>
        </div>
        
        {/* Empty div for spacing on desktop if logo is hidden */}
        <div className="hidden md:block"></div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full px-4 py-2 items-center gap-2 border border-white/20">
            <SearchIcon className="w-4 h-4" />
            <input type="text" placeholder={t('searchPlaceholder')} className="bg-transparent border-none focus:outline-none text-sm placeholder-white/70 w-48 md:w-80 transition-all" />
          </div>
          
          <LanguageSwitcher />

          <SearchIcon className="w-5 h-5 md:hidden" />
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="font-semibold text-sm hidden sm:block">{t('discover')}</span>
            <MenuIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};
