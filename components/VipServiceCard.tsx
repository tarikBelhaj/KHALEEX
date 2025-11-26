import React from 'react';
import { VipService } from '../services/vipApi';
import { SparklesIcon, ArrowRightOnRectangleIcon } from './Icons';
import { useTranslation } from '../contexts/LanguageContext';

interface VipServiceCardProps {
    service: VipService;
    isFullWidth?: boolean;
}

export const VipServiceCard: React.FC<VipServiceCardProps> = ({ service, isFullWidth = false }) => {
    const { t } = useTranslation();
    return (
        <button 
            onClick={() => window.open(service.bookingUrl, '_blank')}
            className={`relative rounded-2xl overflow-hidden shadow-lg text-white text-left group transition-transform duration-200 hover:scale-105 ${isFullWidth ? 'w-full h-64' : 'w-72 h-56 flex-shrink-0'}`}
        >
            <img src={service.image} alt={service.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            {/* VIP Badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                <SparklesIcon className="w-3 h-3" />
                <span>-{service.discountPercentage}% VIP</span>
            </div>

            {/* Category */}
            <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-gray-200 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
                {service.category}
            </div>

            <div className="relative z-10 p-4 flex flex-col h-full justify-end">
                <h3 className={`font-bold leading-tight mb-1 ${isFullWidth ? 'text-2xl' : 'text-lg'}`}>{service.title}</h3>
                
                {isFullWidth && (
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">{service.description}</p>
                )}

                {/* Price Comparison */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 flex items-center justify-center mt-2 border border-white/10 min-h-[58px]">
                    {service.displayPrice ? (
                        <div className="w-full text-center">
                            <span className="text-lg font-bold text-white">{service.displayPrice}</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 uppercase">{t('publicPrice')}</span>
                                <span className="text-sm text-gray-400 line-through decoration-red-500 decoration-2">CHF {service.publicPrice}</span>
                            </div>
                            <div className="h-8 w-px bg-gray-500/50 mx-2"></div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-amber-400 uppercase font-bold flex items-center gap-1">
                                    <SparklesIcon className="w-3 h-3" /> {t('vipPrice')}
                                </span>
                                <span className="text-xl font-bold text-white">CHF {service.vipPrice}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
};