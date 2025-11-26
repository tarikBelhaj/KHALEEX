import React from 'react';
import { WhatsAppIcon } from './Icons';
import { useTranslation } from '../contexts/LanguageContext';

export const FloatingActionButton: React.FC = () => {
    const { t } = useTranslation();
    // Numéro basé sur les infos légales (+33 6 38 71 57 99)
    const whatsappNumber = '33638715799'; 
    const message = t('whatsAppMessage');

    return (
        <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-30 group">
            {/* Tooltip for Desktop */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 hidden md:block bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {t('contactOnWhatsApp')}
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-gray-700 rotate-45"></div>
            </div>

            <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-100 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
                aria-label={t('contactOnWhatsApp')}
             >
                {/* Ping animation */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping group-hover:animate-none"></span>
                <WhatsAppIcon className="w-9 h-9 relative z-10"/>
            </a>
        </div>
    );
};