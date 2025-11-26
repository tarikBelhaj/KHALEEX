import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { ArrowRightOnRectangleIcon, MapPinIcon, ShieldCheckIcon, StarIcon, UserGroupIcon } from './Icons';

export const TransferBanner: React.FC = () => {
  const { t } = useTranslation();
  const affiliateLink = "https://tpo.lu/8ApKAKls";

  const features = [
    { icon: <ShieldCheckIcon className="w-4 h-4 text-amber-400" />, text: t('proChauffeurs') },
    { icon: <StarIcon className="w-4 h-4 text-amber-400" />, text: t('mercedesAndBmw') },
    { icon: <UserGroupIcon className="w-4 h-4 text-amber-400" />, text: t('meetAndGreet') },
  ];

  return (
    <section 
        className="relative rounded-3xl overflow-hidden shadow-2xl my-10 group cursor-pointer h-80 md:h-96 border border-gray-200 dark:border-gray-800 transform hover:scale-[1.01] transition-all duration-300" 
        onClick={() => window.open(affiliateLink, '_blank')}
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
            src="https://images.unsplash.com/photo-1632247996034-409753f7f80d?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury Chauffeur Service"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 brightness-75"
        />
      </div>
      
      {/* Advanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent md:via-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40"></div>
      
      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 max-w-3xl">
         
         {/* Top Badge */}
         <div className="flex items-center gap-2 mb-4 animate-fade-in">
            <div className="bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                {t('exclusivePartner')}
            </div>
            <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3 h-3 fill-current" />)}
            </div>
         </div>

         {/* Main Title with Gold Gradient */}
         <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                {t('transferTitle').split(' ')[0]} 
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                {t('transferTitle').split(' ').slice(1).join(' ')}
            </span>
         </h2>

         {/* Subtitle */}
         <p className="text-gray-300 text-sm md:text-lg mb-6 max-w-lg leading-relaxed font-light border-l-2 border-amber-500 pl-4">
            {t('transferSubtitle')}
         </p>

         {/* Feature Grid */}
         <div className="flex flex-wrap gap-3 mb-8">
            {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    {feature.icon}
                    <span className="text-xs text-gray-200 font-medium">{feature.text}</span>
                </div>
            ))}
         </div>

         {/* CTA Button */}
         <button
            onClick={(e) => {
                e.stopPropagation();
                window.open(affiliateLink, '_blank');
            }}
            className="relative overflow-hidden bg-white text-black font-bold py-3.5 px-8 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] w-fit hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 flex items-center gap-3 group-hover:pl-10"
         >
            <span className="relative z-10">{t('bookTransfer')}</span>
            <ArrowRightOnRectangleIcon className="w-5 h-5 relative z-10 text-amber-600 group-hover:translate-x-1 transition-transform" />
            
            {/* Button Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
         </button>
      </div>
    </section>
  );
};