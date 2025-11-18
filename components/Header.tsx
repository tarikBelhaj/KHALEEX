import React from 'react';
import { SearchIcon, MenuIcon, LogoIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="bg-white/90 p-1.5 rounded-full shadow-md">
            <LogoIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Khaleex.com</h1>
            <p className="text-xs opacity-80 text-right">دليلك إلى سويسرا</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SearchIcon className="w-5 h-5" />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-right">اكتشف</span>
            <MenuIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};