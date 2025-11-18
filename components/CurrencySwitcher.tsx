import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from './Icons';

const currencies = ['CHF', 'USD', 'EUR', 'GBP'];

interface CurrencySwitcherProps {
  currentCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ currentCurrency, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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


  const handleSelect = (currency: string) => {
    onCurrencyChange(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
      >
        <span>{currentCurrency}</span>
        <ChevronDownIcon className={`w-4 h-4 ml-2 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-full mt-1 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-30 animate-fade-in">
          <div className="py-1">
            {currencies.map((c) => (
              <button
                key={c}
                onClick={() => handleSelect(c)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  currentCurrency === c
                    ? 'font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/50 dark:text-amber-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};