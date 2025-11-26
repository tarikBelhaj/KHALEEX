import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { 
    ShieldCheckIcon,
    CheckCircleIcon,
    StarIcon
} from './Icons';

export const TransferBookingWidget: React.FC = () => {
  const { t, language } = useTranslation();
  const widgetWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = widgetWrapperRef.current;
    if (wrapper) {
        // Clear any existing content
        wrapper.innerHTML = '';
        
        // Create a clean, non-React DOM element to host the script
        const cleanContainer = document.createElement('div');
        cleanContainer.className = "w-full";
        wrapper.appendChild(cleanContainer);

        const script = document.createElement('script');
        script.async = true;
        
        // Map app language to widget locale
        const localeMap: {[key: string]: string} = {
            'fr': 'fr',
            'en': 'en',
            'ru': 'ru',
            'ar': 'en' // Fallback to English for Arabic
        };
        const locale = localeMap[language] || 'en';

        script.src = `https://tpemd.com/content?trs=475500&shmarker=686172&locale=${locale}&show_header=true&powered_by=true&campaign_id=627&promo_id=8951`;
        script.charset = "utf-8";

        cleanContainer.appendChild(script);
    }

    return () => {
        if (wrapper) {
            wrapper.innerHTML = '';
        }
    };
  }, [language]);

  return (
    <section className="my-10 relative rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
        {/* Background Image for Depth */}
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
                alt="Luxury Transfer Background" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
            />
        </div>

        {/* Frozen Glass Overlay - Modern UX */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl"></div>
        
        {/* Decorative Gradient Orbs for that 'Modern' feel */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-overlay"></div>

        <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20 shadow-lg">
                            {t('vipTransfer')}
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                        {t('transferTitle')}
                    </h2>
                    <p className="text-gray-200 text-sm mt-1 max-w-md font-medium drop-shadow-sm">{t('transferSubtitle')}</p>
                </div>
            </div>

            {/* Widget Container - Glassmorphism */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/10 overflow-hidden min-h-[320px] flex items-center justify-center relative z-20">
               <div ref={widgetWrapperRef} className="w-full" />
            </div>

            {/* USPs / Benefits */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 shadow-lg transition-transform hover:scale-105">
                    <ShieldCheckIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-white font-bold tracking-wide">{t('professionalDriver')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 shadow-lg transition-transform hover:scale-105">
                    <CheckCircleIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-white font-bold tracking-wide">{t('fixedPrice')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 shadow-lg transition-transform hover:scale-105">
                    <StarIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-white font-bold tracking-wide">{t('freeCancellation')}</span>
                </div>
            </div>
        </div>
    </section>
  );
};