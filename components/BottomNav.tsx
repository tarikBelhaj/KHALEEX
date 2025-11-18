import React from 'react';
import { HomeIcon, DealsIcon, AccountIcon, SunIcon, MoonIcon } from './Icons';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentTheme: string;
  onToggleTheme: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate, currentTheme, onToggleTheme }) => {
    const dealPages = new Set(['hotels', 'cars', 'experiences']);

    const navItems = [
        { id: 'home', label: 'Home', arabicLabel: 'الرئيسية', icon: <HomeIcon className="w-6 h-6" />, action: () => onNavigate('home') },
        { id: 'deals', label: 'Deals', arabicLabel: 'عروض', icon: <DealsIcon className="w-6 h-6" />, action: () => onNavigate('hotels') },
        { id: 'account', label: 'Account', arabicLabel: 'حسابي', icon: <AccountIcon className="w-6 h-6" />, action: () => onNavigate('account') },
        { 
            id: 'theme',
            label: 'Mode', 
            arabicLabel: 'الوضع', 
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
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700/80 shadow-[0_-1px_10px_rgba(0,0,0,0.05)] rounded-t-2xl z-40">
      <div className="flex justify-around items-start pt-2 pb-1 h-16">
        {navItems.map((item) => (
          <button 
            key={item.id} 
            onClick={item.action}
            className={`flex flex-col items-center justify-center gap-1 w-1/4 h-full ${isActive(item.id) ? 'text-amber-500 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {item.icon}
            <div className="flex flex-col items-center">
              <span className="text-[10px] leading-tight font-medium">{item.label}</span>
              <span className="text-[10px] leading-tight font-light">{item.arabicLabel}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};