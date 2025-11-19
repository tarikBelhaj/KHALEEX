
import React from 'react';
import { StarIcon } from './Icons';
import { useTranslation } from '../contexts/LanguageContext';

const testimonialsData = [
    {
        name: 'Fahad A. from Dubai, UAE',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        name: 'Yalla a.',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
     {
        name: 'Khaled S.',
        avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    }
];

export const Testimonials: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section>
             <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('testimonials')}</h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:gap-6">
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-4 flex items-center gap-3 flex-shrink-0 shadow-sm w-64 md:w-full">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700" />
                        <div>
                            <div className="flex mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="w-4 h-4 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{testimonial.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('verifiedMember')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
