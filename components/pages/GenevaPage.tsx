import React, { useState, useRef } from 'react';
import { ArrowLeftIcon, ChefHatIcon, DumbbellIcon, WhatsAppIcon, CameraIcon, PhotoIcon } from '../Icons';
import usePersistentState from '../../hooks/usePersistentState';
import { ServiceBookingModal } from '../ServiceBookingModal';

interface PageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export interface HomeService {
    name: string;
    description: string;
    icon: string;
    image: string | null;
    bookingUrl?: string;
}

const initialGenevaServicesData: HomeService[] = [
    {
        name: "Chef Privé à Domicile",
        description: "Un chef étoilé concocte un menu sur mesure dans votre résidence.",
        icon: "ChefHat",
        image: 'https://images.unsplash.com/photo-1558005883-7bf3a1d6a8b7?q=80&w=800&auto=format&fit=crop',
        bookingUrl: 'https://www.labelleassiette.fr/chef-a-domicile/geneve'
    },
    {
        name: "Coach Sportif Personnel",
        description: "Sessions de training personnalisées avec les meilleurs coachs.",
        icon: "Dumbbell",
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
        bookingUrl: 'https://www.trainme.co/coach-sportif/geneve'
    }
];

const featuredCars = [
    { name: 'Mercedes-Benz S-Class', image: 'https://images.unsplash.com/photo-1616789916145-2b6555138259?q=80&w=800&auto=format&fit=crop' },
    { name: 'Range Rover Vogue', image: 'https://images.unsplash.com/photo-1580273916551-585a9b74f39d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Porsche 911 Carrera', image: 'https://images.unsplash.com/photo-1604280918973-72e9d28256e2?q=80&w=800&auto=format&fit=crop' },
    { name: 'Bentley Bentayga', image: 'https://images.unsplash.com/photo-1617892320643-951515c1b523?q=80&w=800&auto=format&fit=crop' },
];

const rentalPartners = [
    { name: 'Sixt', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Sixt-Logo.svg/1024px-Sixt-Logo.svg.png' },
    { name: 'Hertz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hertz_logo.svg/1200px-Hertz_logo.svg.png' },
    { name: 'Yelo', logo: 'https://www.yelo.swiss/logo.svg' }
];

// Helper component for service cards
const ServiceIcon: React.FC<{ icon: string }> = ({ icon }) => {
    if (icon === 'ChefHat') return <ChefHatIcon className="w-8 h-8 text-white" />;
    if (icon === 'Dumbbell') return <DumbbellIcon className="w-8 h-8 text-white" />;
    return null;
};

const HomeServiceCard: React.FC<{
    service: HomeService,
    isAdmin: boolean,
    onImageUpload: (file: File) => void;
    onBook: () => void;
}> = ({ service, isAdmin, onImageUpload, onBook }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
    };

    return (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg text-white group">
            {service.image ? (
                <img src={service.image} alt={service.name} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-300" />
            ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center">
                    <PhotoIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Aucune image</p>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm p-2 rounded-full shadow-md">
                <ServiceIcon icon={service.icon} />
            </div>

            {isAdmin && (
                <>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute top-2 right-2 bg-black/60 text-white text-xs font-semibold py-1 px-2.5 rounded-md flex items-center gap-1.5 backdrop-blur-sm hover:bg-black/80 transition-colors"
                    >
                        <CameraIcon className="w-4 h-4" />
                        Changer
                    </button>
                </>
            )}

            <div className="relative z-10 p-4 flex flex-col h-full justify-end">
                 <div className="flex justify-between items-end">
                    <div className="max-w-[60%]">
                        <h3 className="font-bold text-lg leading-tight">{service.name}</h3>
                        <p className="text-sm opacity-90 mt-1">{service.description}</p>
                    </div>
                    <button
                        onClick={onBook}
                        className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-white/30 transition-colors flex-shrink-0 ml-4"
                    >
                        Réserver
                    </button>
                </div>
            </div>
        </div>
    );
};

export const GenevaPage: React.FC<PageProps> = ({ onBack, onNavigate }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [services, setServices] = usePersistentState<HomeService[]>('genevaServicesData', initialGenevaServicesData);
    const [selectedService, setSelectedService] = useState<HomeService | null>(null);

    const handleImageUpload = (index: number, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newServices = [...services];
            newServices[index].image = reader.result as string;
            setServices(newServices);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="animate-fade-in pb-20 md:pb-0">
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 p-4 flex items-center justify-between gap-4 border-b dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Services Exclusifs à Genève</h1>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Admin</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </header>

            <main className="p-4 max-w-7xl mx-auto space-y-8">
                {/* Car Section */}
                <section>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Louez une voiture de prestige</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Découvrez notre flotte exclusive et profitez de la route avec style.</p>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 md:grid md:grid-cols-4 md:mx-0 md:px-0 md:overflow-visible">
                        {featuredCars.map((car, index) => (
                            <div key={index} onClick={() => onNavigate('cars')} className="relative w-64 md:w-full h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg text-white cursor-pointer group">
                                <img src={car.image} alt={car.name} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div className="relative z-10 p-3 flex flex-col h-full justify-end">
                                    <h3 className="font-bold leading-tight">{car.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6">
                        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">Nos partenaires de location</h3>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center">
                            {rentalPartners.map(partner => (
                                <div key={partner.name} className="bg-white dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700/60 flex flex-col items-center justify-center h-24">
                                    <img src={partner.logo} alt={partner.name} className="h-8 max-w-full object-contain" />
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-2 text-center">{partner.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* At-Home Services Section */}
                <section>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Services Exclusifs à Domicile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                           <HomeServiceCard 
                                key={index} 
                                service={service}
                                isAdmin={isAdmin}
                                onImageUpload={(file) => handleImageUpload(index, file)}
                                onBook={() => setSelectedService(service)}
                            />
                        ))}
                    </div>
                </section>
            </main>

            {selectedService && (
                <ServiceBookingModal 
                    service={selectedService} 
                    onClose={() => setSelectedService(null)}
                />
            )}
        </div>
    );
};