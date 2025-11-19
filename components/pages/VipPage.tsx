
import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, SparklesIcon, ShieldCheckIcon } from '../Icons';
import { fetchVipServices, VipService } from '../../services/vipApi';
import { VipServiceCard } from '../VipServiceCard';

interface PageProps {
  onBack: () => void;
}

export const VipPage: React.FC<PageProps> = ({ onBack }) => {
  const [services, setServices] = useState<VipService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchVipServices();
      setServices(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="animate-fade-in pb-28 md:pb-0">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 p-4 flex items-center justify-between gap-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    Services VIP
                    <SparklesIcon className="w-5 h-5 text-amber-500" />
                </h1>
            </div>
        </div>
      </header>

      <main className="p-5 md:p-10 max-w-7xl mx-auto space-y-12">
        
        {/* Motivation Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-amber-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="bg-amber-500/20 p-4 rounded-full">
                        <ShieldCheckIcon className="w-10 h-10 text-amber-400" />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Devenez Membre VIP Annuel</h2>
                        <p className="text-gray-300 text-base mb-4 max-w-xl">
                            Économisez jusqu'à <span className="text-amber-400 font-bold">30%</span> sur tous nos services premium : Jets privés, Villas, Hélicoptères et Chefs.
                        </p>
                        <p className="text-sm font-semibold text-amber-400 tracking-wide uppercase">Rentabilisé dès le premier vol.</p>
                    </div>
                    <button className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform whitespace-nowrap">
                        S'abonner (1200 CHF/an)
                    </button>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-200 px-1">Services Exclusifs du Moment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {services.map((service) => (
                    <VipServiceCard key={service.id} service={service} isFullWidth={true} />
                ))}
            </div>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30 text-center">
            <p className="text-sm text-amber-800 dark:text-amber-200 max-w-2xl mx-auto">
                *Les prix VIP sont garantis pour les détenteurs de la carte Khaleex Black. Les réservations sont soumises à disponibilité et confirmation par notre service de conciergerie.
            </p>
        </div>

      </main>
    </div>
  );
};
