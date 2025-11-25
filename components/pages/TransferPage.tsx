
import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { 
    ArrowLeftIcon, 
    UserGroupIcon, 
    ShieldCheckIcon,
    WifiIcon
} from '../Icons';
import { TransferBookingWidget } from '../TransferBookingWidget';

interface PageProps {
  onBack: () => void;
}

export const TransferPage: React.FC<PageProps> = ({ onBack }) => {
  const { t } = useTranslation();

  const fleet = [
      {
          name: "Mercedes-Benz E-Class",
          type: "Business Class",
          passengers: 3,
          luggage: 3,
          image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop"
      },
      {
          name: "Mercedes-Benz S-Class",
          type: "First Class",
          passengers: 3,
          luggage: 2,
          image: "https://images.unsplash.com/photo-1616789916145-2b6555138259?q=80&w=800&auto=format&fit=crop"
      },
      {
          name: "Mercedes-Benz V-Class",
          type: "Business Van",
          passengers: 7,
          luggage: 7,
          image: "https://images.unsplash.com/photo-1631027124192-3343a4e9b6d6?q=80&w=800&auto=format&fit=crop"
      }
  ];

  return (
    <div className="animate-fade-in pb-28 md:pb-0">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 p-4 flex items-center gap-4 border-b dark:border-gray-700">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('transferPageTitle')}</h1>
      </header>

      <main className="p-5 md:p-10 max-w-7xl mx-auto space-y-12">
        
        {/* Replaced Hero Section with Widget */}
        <div className="-mt-6">
             <TransferBookingWidget />
        </div>

        {/* Fleet Section */}
        <section>
             <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-6">{t('ourFleet')}</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {fleet.map((car, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 group">
                        <div className="h-48 overflow-hidden">
                             <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{car.name}</h4>
                                <span className="bg-gray-100 dark:bg-gray-700 text-xs font-bold px-2 py-1 rounded-md text-gray-600 dark:text-gray-300">{car.type}</span>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mt-3">
                                <div className="flex items-center gap-1.5">
                                    <UserGroupIcon className="w-4 h-4" /> {car.passengers}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <ShieldCheckIcon className="w-4 h-4" /> {car.luggage} Valises
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <WifiIcon className="w-4 h-4" /> Wi-Fi
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </section>

      </main>
    </div>
  );
};
