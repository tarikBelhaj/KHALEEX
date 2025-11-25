import React from 'react';
import { WhatsAppIcon } from './Icons';

export const FloatingActionButton: React.FC = () => {
    // Numéro basé sur les infos légales (+33 6 38 71 57 99)
    const whatsappNumber = '33638715799'; 
    const message = "Bonjour Khaleex, je souhaite obtenir des informations sur vos services VIP.";

    return (
        <div className="absolute bottom-24 md:bottom-8 right-4 z-30">
             <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200"
                aria-label="Contacter sur WhatsApp"
             >
                <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8"/>
                <span className="text-[9px] md:text-[10px] font-bold mt-0.5 md:mt-1">WhatsApp</span>
            </a>
        </div>
    );
};