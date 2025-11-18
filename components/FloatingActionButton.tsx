import React from 'react';
import { WhatsAppIcon } from './Icons';

export const FloatingActionButton: React.FC = () => {
    return (
        <div className="absolute bottom-[75px] right-4 z-30">
             <button className="bg-blue-900 text-white w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-2xl">
                <WhatsAppIcon className="w-8 h-8"/>
                <span className="text-xs mt-1">WhatsApp</span>
            </button>
        </div>
    );
};
