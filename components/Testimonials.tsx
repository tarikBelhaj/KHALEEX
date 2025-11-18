import React from 'react';
import { StarIcon } from './Icons';

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
    return (
        <section>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-3 flex items-center gap-3 flex-shrink-0 shadow-sm">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="w-4 h-4 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">{testimonial.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};