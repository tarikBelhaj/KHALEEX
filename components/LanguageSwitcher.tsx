
import React, { useState, useRef, useEffect } from 'react';
import { GlobeIcon, ChevronDownIcon } from './Icons';
import { useTranslation, Language } from '../contexts/LanguageContext';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-3 py-2 rounded-full transition-colors border border-white/20"
      >
        <GlobeIcon className="w-4 h-4" />
        <span className="text-sm font-medium hidden md:block">{currentLang.name}</span>
        <span className="text-sm font-medium md:hidden">{currentLang.code.toUpperCase()}</span>
        <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                language === lang.code 
                  ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-bold' 
                  : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
