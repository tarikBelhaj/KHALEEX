
import React from 'react';
import { HomeIcon, DealsIcon, AccountIcon, SunIcon, MoonIcon, LogoIcon } from './Icons';
import { useTranslation } from '../contexts/LanguageContext';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentTheme: string;
  onToggleTheme: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate, currentTheme, onToggleTheme }) => {
    const { t } = useTranslation();
    const dealPages = new Set(['hotels', 'cars', 'experiences']);

    const navItems = [
        { id: 'home', label: t('home'), icon: <HomeIcon className="w-6 h-6" />, action: () => onNavigate('home') },
        { id: 'deals', label: t('deals'), icon: <DealsIcon className="w-6 h-6" />, action: () => onNavigate('hotels') },
        { id: 'account', label: t('account'), icon: <AccountIcon className="w-6 h-6" />, action: () => onNavigate('account') },
        { 
            id: 'theme',
            label: t('mode'),
            icon: currentTheme === 'light' 
                ? <SunIcon className="w-6 h-6" /> 
                : <MoonIcon className="w-6 h-6" />,
            action: onToggleTheme 
        },
    ];

    const isActive = (itemId: string) => {
        if (itemId === 'theme') return false;
        if (itemId === 'home') return currentPage === 'home';
        if (itemId === 'deals') return dealPages.has(currentPage);
        if (itemId === 'account') return currentPage === 'account';
        return false;
    };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 flex-col rtl:right-0 rtl:left-auto rtl:border-l rtl:border-r-0">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800">
           <div className="bg-blue-900 p-1.5 rounded-lg shadow-md">
                <LogoIcon className="w-8 h-8 text-white" />
           </div>
           <div>
                <h1 className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">Khaleex</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('swissConcierge')}</p>
           </div>
        </div>

        <div className="flex-grow py-6 px-3 space-y-2">
            {navItems.map((item) => (
                <button 
                    key={item.id}
                    onClick={item.action}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive(item.id) 
                        ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                    <div className={`${isActive(item.id) ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                        {item.icon}
                    </div>
                    <div className="text-left rtl:text-right">
                        <span className={`block text-sm font-semibold ${isActive(item.id) ? 'font-bold' : ''}`}>{item.label}</span>
                    </div>
                </button>
            ))}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-4 text-white shadow-lg">
                <p className="text-xs opacity-80 mb-1">Besoin d'aide ?</p>
                <p className="font-bold text-sm mb-2">Support VIP 24/7</p>
                <button className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg w-full hover:bg-white/30 transition-colors">
                    Contacter
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700/80 shadow-[0_-1px_10px_rgba(0,0,0,0.05)] pb-safe z-40">
        <div className="flex justify-around items-start pt-2 pb-4 h-20">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={item.action}
              className={`flex flex-col items-center justify-center gap-1 w-1/4 h-full ${isActive(item.id) ? 'text-amber-500 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {item.icon}
              <div className="flex flex-col items-center">
                <span className="text-[10px] leading-tight font-medium">{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
