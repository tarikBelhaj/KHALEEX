
import React from 'react';
import { ArrowLeftIcon, AirbnbLogoIcon, KlookLogoIcon, StarIcon, UserGroupIcon } from '../Icons';

interface PageProps {
  onBack: () => void;
}

interface Excursion {
  title: string;
  description: string;
  image: string;
  platform: 'Airbnb' | 'Klook';
  price: number;
  rating: number;
  reviews: number;
  bookingUrl: string;
}

const excursions: Excursion[] = [
  {
    title: "Téléphérique de l'Aiguille du Midi",
    description: "Montez à 3 842 m pour une vue imprenable sur le Mont Blanc et les Alpes.",
    image: 'https://images.unsplash.com/photo-1605252834789-536a2a03a8c2?q=80&w=800&auto=format&fit=crop',
    platform: 'Klook',
    price: 85,
    rating: 4.9,
    reviews: 1200,
    bookingUrl: 'https://www.klook.com/activity/655-chamonix-mont-blanc-day-tour-geneva/'
  },
  {
    title: "Vol en Parapente Biplace",
    description: "Survolez la vallée de Chamonix avec un instructeur expérimenté. Une expérience inoubliable.",
    image: 'https://images.unsplash.com/photo-1510724651212-e5b15538d5e8?q=80&w=800&auto=format&fit=crop',
    platform: 'Airbnb',
    price: 150,
    rating: 5.0,
    reviews: 250,
    bookingUrl: 'https://www.airbnb.com/experiences/95743'
  },
  {
    title: "Randonnée au Lac Blanc",
    description: "Une randonnée spectaculaire offrant des panoramas exceptionnels sur le massif du Mont-Blanc.",
    image: 'https://images.unsplash.com/photo-1627993099901-3c6620358e2b?q=80&w=800&auto=format&fit=crop',
    platform: 'Airbnb',
    price: 60,
    rating: 4.8,
    reviews: 430,
    bookingUrl: 'https://www.airbnb.com/experiences/157299'
  },
  {
    title: "Train du Montenvers & Mer de Glace",
    description: "Prenez le train à crémaillère pour découvrir le plus grand glacier de France et sa grotte de glace.",
    image: 'https://images.unsplash.com/photo-1624230635441-b3ace07742d1?q=80&w=800&auto=format&fit=crop',
    platform: 'Klook',
    price: 45,
    rating: 4.7,
    reviews: 980,
    bookingUrl: 'https://www.klook.com/activity/23306-montenvers-mer-de-glace-train-ticket-chamonix/'
  }
];

const ExcursionCard: React.FC<{ excursion: Excursion }> = ({ excursion }) => {
    const { title, description, image, platform, price, rating, reviews, bookingUrl } = excursion;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-200/80 dark:border-gray-700/80 h-full flex flex-col transition-transform hover:scale-[1.01]">
            <div className="h-56 relative flex-shrink-0">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
                    {platform === 'Airbnb' 
                        ? <AirbnbLogoIcon className="w-6 h-6 text-pink-500" />
                        : <KlookLogoIcon className="w-6 h-6 text-orange-500" />
                    }
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{rating.toFixed(1)}</span>
                        <span>({reviews} avis)</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <UserGroupIcon className="w-4 h-4"/>
                        <span>Inspiré de {platform}</span>
                    </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow leading-relaxed">{description}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">à partir de</p>
                        <p className="font-extrabold text-2xl text-gray-900 dark:text-gray-50">
                           €{price}
                           <span className="font-normal text-sm text-gray-500"> /pers.</span>
                        </p>
                    </div>
                    <button 
                        onClick={() => window.open(bookingUrl, '_blank')}
                        className="bg-blue-900 text-white font-bold py-3 px-8 text-sm rounded-xl shadow-md transition-transform duration-200 hover:scale-105"
                    >
                        Réserver
                    </button>
                </div>
            </div>
        </div>
    );
};


export const ChamonixPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in pb-28 md:pb-0">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 p-4 flex items-center gap-4 border-b dark:border-gray-700">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Excursions à Chamonix</h1>
      </header>
      <main className="p-5 md:p-10 max-w-7xl mx-auto space-y-8">
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Découvrez des expériences uniques au pied du Mont-Blanc, inspirées des meilleures offres Airbnb et Klook. Réservez facilement via notre service de conciergerie WhatsApp.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {excursions.map((excursion, index) => (
                <ExcursionCard key={index} excursion={excursion} />
            ))}
        </div>
      </main>
    </div>
  );
};
