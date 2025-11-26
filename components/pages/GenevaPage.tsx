import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftIcon, ShoppingBagIcon, DumbbellIcon, WhatsAppIcon, CameraIcon, PhotoIcon, ChevronRightIcon } from '../Icons';
import usePersistentState from '../../hooks/usePersistentState';
import { ServiceBookingModal } from '../ServiceBookingModal';
import { useTranslation } from '../../contexts/LanguageContext';
import { VipExperiences } from '../VipExperiences';
import { fetchVipServices, VipService } from '../../services/vipApi';
import { VipServiceCard } from '../VipServiceCard';


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
    available?: boolean;
}

const initialGenevaServicesData: HomeService[] = [
    {
        name: "Personnal Shopper",
        description: "Votre personal shopper sélectionne les articles directement auprès des marques et vous les livre à votre résidence.",
        icon: "ShoppingBag",
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1170&auto=format&fit=crop',
        bookingUrl: 'https://www.globus.ch/personal-shopping',
        available: false,
    },
    {
        name: "Coach Sportif Personnel",
        description: "Sessions de training personnalisées avec les meilleurs coachs.",
        icon: "Dumbbell",
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
        bookingUrl: 'https://www.trainme.co/coach-sportif/geneve',
        available: true,
    }
];

const featuredHotels = [
    { name: 'Hôtel Président Wilson', image: 'https://lh3.googleusercontent.com/p/AF1QipOOTFW0mX0a1UNmn3Pc3-iGuyUXop2m-6rfCqXa=s680-w680-h510-rw', description: 'Vue panoramique sur le lac' },
    { name: 'Beau-Rivage Genève', image: 'https://lh3.googleusercontent.com/p/AF1QipMwOpCijN5Ta0rorpWyUuvRfoTBDAkNtF6xV3XB=s680-w680-h510-rw', description: 'Élégance historique' },
    { name: 'Four Seasons des Bergues', image: 'https://lh3.googleusercontent.com/proxy/NJ2D2mo8XMhuVTP-PaEa_Ndh5ZkeSyVYH68RwfUKPXnNHjv-gBo2WpTDJGSZaOcgHx9GNjxwd8DzcQWe25RwjEd_zPGcHv2MJuoGEjEepFMxzFaCgBAQApHeejoh5JK9mJVx4KZVz3Ee402gy4Hp4bsW9pDv5w=s680-w680-h510-rw', description: 'Luxe intemporel' },
];

const featuredCars = [
    { name: 'Mercedes-Benz S-Class', image: 'https://images.unsplash.com/photo-1680451553374-09d8d6a1ca58?q=80&w=1170&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%D%3D' },
    { name: 'Range Rover Vogue', image: 'https://images.unsplash.com/photo-1646654184457-cd64cadcd3a3?q=80&w=687&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%D%3D' },
    { name: 'Porsche 911 Carrera', image: 'https://images.unsplash.com/photo-1646567799137-b1e1508b6b96?q=80&w=1170&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%D%3D' },
    { name: 'Bentley Bentayga', image: 'https://www.bentleymotors.com/content/dam/bm/websites/bmcom/bentleymotors-com/models/24my/bentayga-swb/bentayga-swb-range-page/SWB%20Range%20Accessories.jpg/_jcr_content/renditions/original.image_file.1074.1432.file/SWB%20Range%20Accessories.jpg' },
];

const rentalPartners = [
    { name: 'Yelo', logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQHlXdrTfyNQOQ/company-logo_200_200/company-logo_200_200/0/1736243790577/yelo_logo?e=2147483647&v=beta&t=rsn7-k0Hke4FA8S3U3ISIMOFSzTSiiWi_2xvfdAKDrU', available: true, page: 'yelo' },
    { name: 'Sixt', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8WzKf6QqcZ_pNB0P5G5q6DJ0vuSdptcEvyA&s', available: false, page: 'cars' }
];


// Helper component for service cards
const ServiceIcon: React.FC<{ icon: string }> = ({ icon }) => {
    if (icon === 'ShoppingBag') return <ShoppingBagIcon className="w-8 h-8 text-white" />;
    if (icon === 'Dumbbell') return <DumbbellIcon className="w-8 h-8 text-white" />;
    return null;
};

const HomeServiceCard: React.FC<{
    service: HomeService,
    isAdmin: boolean,
    onImageUpload: (file: File) => void;
    onBook: () => void;
}> = ({ service, isAdmin, onImageUpload, onBook }) => {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isAvailable = service.available !== false;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
    };

    return (
        <div className={`relative w-full h-64 rounded-2xl overflow-hidden shadow-lg text-white group ${!isAvailable ? 'grayscale' : ''}`}>
            {service.image ? (
                <img src={service.image} alt={service.name} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-300" />
            ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center">
                    <PhotoIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('noImage')}</p>
                </div>
            )}
             {!isAvailable && <div className="absolute inset-0 bg-black/30 z-10"></div>}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2.5 rounded-full shadow-md z-20">
                <ServiceIcon icon={service.icon} />
            </div>

            {!isAvailable ? (
                <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-12 z-20">
                    {t('comingSoon')}
                </div>
            ) : isAdmin && (
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
                        className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 backdrop-blur-sm hover:bg-black/80 transition-colors z-20"
                    >
                        <CameraIcon className="w-4 h-4" />
                        {t('changeImageShort')}
                    </button>
                </>
            )}

            <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                 <div className="flex justify-between items-end">
                    <div className="max-w-[70%]">
                        <h3 className="font-bold text-xl leading-tight mb-1">{service.name}</h3>
                        <p className="text-sm opacity-90 leading-relaxed">{service.description}</p>
                    </div>
                    <button
                        onClick={onBook}
                        disabled={!isAvailable}
                        className={`bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors flex-shrink-0 ml-4 ${isAvailable ? 'hover:bg-white/30' : 'opacity-50 cursor-not-allowed'}`}
                    >
                        {t('book')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ExperienceCardSkeleton: React.FC = () => (
    <div className="relative w-72 h-56 flex-shrink-0 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
);

export const GenevaPage: React.FC<PageProps> = ({ onBack, onNavigate }) => {
    const { t } = useTranslation();
    const [isAdmin, setIsAdmin] = useState(false);
    const [services, setServices] = usePersistentState<HomeService[]>('genevaServicesData', initialGenevaServicesData);
    const [selectedService, setSelectedService] = useState<HomeService | null>(null);
    const [experienceServices, setExperienceServices] = useState<VipService[]>([]);
    const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);

    useEffect(() => {
        const loadExperienceServices = async () => {
            setIsLoadingExperiences(true);
            try {
                const fetchedServices = await fetchVipServices();
                const experiences = fetchedServices.filter(s => s.category === 'Experience');
                setExperienceServices(experiences);
            } catch (error) {
                console.error("Failed to fetch VIP experience services:", error);
            } finally {
                setIsLoadingExperiences(false);
            }
        };
        loadExperienceServices();
    }, []);

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
        <div className="animate-fade-in pb-28 md:pb-0">
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 p-4 flex items-center justify-between gap-4 border-b dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('exclusiveServicesGeneva')}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{t('admin')}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </header>

            <main className="p-5 md:p-10 max-w-7xl mx-auto space-y-12">
                {/* Hotel Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t('luxuryHotelsAndAccommodations')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">{t('stayInGenevaBest')}</p>
                    <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4 md:grid md:grid-cols-3 md:mx-0 md:px-0 md:overflow-visible">
                        {featuredHotels.map((hotel, index) => (
                            <div key={index} onClick={() => onNavigate('hotels')} className="relative w-72 md:w-full h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg text-white cursor-pointer group">
                                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div className="relative z-10 p-4 flex flex-col h-full justify-end">
                                    <h3 className="font-bold leading-tight text-lg">{hotel.name}</h3>
                                    <p className="text-sm opacity-90">{hotel.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Car Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t('rentPrestigeCar')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">{t('rentPrestigeCarSubtitle')}</p>
                    <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4 md:grid md:grid-cols-4 md:mx-0 md:px-0 md:overflow-visible">
                        {featuredCars.map((car, index) => (
                            <div key={index} onClick={() => onNavigate('cars')} className="relative w-72 md:w-full h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg text-white cursor-pointer group">
                                <img src={car.image} alt={car.name} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div className="relative z-10 p-4 flex flex-col h-full justify-end">
                                    <h3 className="font-bold leading-tight text-lg">{car.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('rentalPartners')}</h3>
                        <div className="flex gap-6 items-center">
                            {rentalPartners.map(partner => (
                                <div key={partner.name} className="relative">
                                    <button
                                        onClick={() => partner.available && partner.page && onNavigate(partner.page)}
                                        disabled={!partner.available}
                                        className={!partner.available ? 'cursor-not-allowed' : 'transform transition-transform hover:scale-105'}
                                    >
                                        <div className={`bg-black rounded-full border border-gray-700/60 flex items-center justify-center w-28 h-28 shadow-md overflow-hidden transition-all duration-300 ${
                                            !partner.available ? 'opacity-40 grayscale' : 'opacity-80 hover:opacity-100'
                                        }`}>
                                            <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-2" />
                                        </div>
                                    </button>
                                    {!partner.available && (
                                        <div className="absolute -top-2 -right-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg transform rotate-12 z-10">
                                            {t('comingSoon')}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Experience Section (NEW) */}
                <section>
                    <div className="flex justify-between items-end mb-6 px-1">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('exclusiveExperiences')}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('exclusiveExperiencesSubtitle')}</p>
                        </div>
                        <button 
                            onClick={() => onNavigate('experiences')}
                            className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:text-amber-500 transition-colors"
                          >
                            {t('discover')} <ChevronRightIcon className="w-4 h-4 rtl:rotate-180" />
                        </button>
                    </div>
                    <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4">
                        {isLoadingExperiences ? (
                            Array.from({ length: 2 }).map((_, index) => <ExperienceCardSkeleton key={index} />)
                        ) : (
                            experienceServices.map(service => (
                                <VipServiceCard key={service.id} service={service} />
                            ))
                        )}
                    </div>
                </section>

                {/* At-Home Services Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('exclusiveAtHomeServices')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                {/* Services ++ Section */}
                <VipExperiences onNavigate={onNavigate} />
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