import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon, UserGroupIcon, CogIcon, BriefcaseIcon, StarIcon, FilterIcon, SearchIcon } from '../Icons';
import { useTranslation } from '../../contexts/LanguageContext';

interface PageProps {
  onBack: () => void;
  currency: string;
}

interface YeloCar {
    name: string;
    image: string;
    price: number;
    category: 'Économique' | 'SUV' | 'Luxe' | 'Familiale' | 'Van';
    transmission: 'Automatique' | 'Manuelle';
    seats: number;
    luggage: number;
}

const yeloCarsData: YeloCar[] = [
    { name: 'Mini Cooper Countryman S', image: 'https://ejar.iyelo.com:2200/webapigw/Attachments/1/Fleet/Model/2025/5/dec3ef8e-2d8b-4e7a-0bf8-08dd90ef2a34.png', price: 95, category: 'SUV', transmission: 'Automatique', seats: 5, luggage: 2 },
    { name: 'Volkswagen Tiguan', image: 'https://ejar.iyelo.com:2200/webapigw/Attachments/1/Fleet/Model/2025/6/a5fba100-4db0-4975-adf5-08ddac9cc9f6.png', price: 110, category: 'SUV', transmission: 'Automatique', seats: 5, luggage: 3 },
    { name: 'Volkswagen Golf', image: 'https://ejar.iyelo.com:2200/webapigw/Attachments/1/Fleet/Model/2025/2/32704df8-371e-43ae-0a4f-08dd44b57975.png', price: 80, category: 'Économique', transmission: 'Manuelle', seats: 5, luggage: 2 },
    { name: 'Skoda Kodiaq', image: 'https://ejar.iyelo.com:2200/webapigw/Attachments/1/Fleet/Model/2024/12/61f58149-87ed-435b-4669-08dd2933d19d.png', price: 125, category: 'Familiale', transmission: 'Automatique', seats: 7, luggage: 4 },
    { name: 'Mercedes-Benz Vito', image: 'https://ejar.iyelo.com:2200/webapigw/Attachments/1/Fleet/Model/2024/9/05691c95-364e-4a87-ad02-08dc68ff7536.png', price: 150, category: 'Van', transmission: 'Automatique', seats: 9, luggage: 8 },
    { name: 'Audi A3', image: 'https://ejar.iyelo.com:2200/webapigw/Attachments/1/Fleet/Model/2024/12/359a6744-245c-42ef-c650-08dd2f0b9d5c.png', price: 130, category: 'Luxe', transmission: 'Automatique', seats: 5, luggage: 2 },
];

const CarTypeButton: React.FC<{ label: string, selected: boolean, onClick: () => void }> = ({ label, selected, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${selected ? 'bg-amber-400 border-amber-400 text-black' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
    >
        {label}
    </button>
);

export const YeloPage: React.FC<PageProps> = ({ onBack, currency }) => {
    const { t } = useTranslation();
    const today = new Date().toISOString().split('T')[0];

    const [pickupDate, setPickupDate] = useState(today);
    const [pickupTime, setPickupTime] = useState('10:00');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('10:00');

    const [priceRange, setPriceRange] = useState(200);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [transmission, setTransmission] = useState<'Automatique' | 'Manuelle' | null>(null);

    const carCategories = ['Économique', 'SUV', 'Luxe', 'Familiale', 'Van'];

    const handleCategoryToggle = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const filteredCars = useMemo(() => {
        return yeloCarsData.filter(car => {
            if (car.price > priceRange) return false;
            if (selectedCategories.length > 0 && !selectedCategories.includes(car.category)) return false;
            if (transmission && car.transmission !== transmission) return false;
            return true;
        });
    }, [priceRange, selectedCategories, transmission]);

    return (
        <div className="animate-fade-in pb-28 md:pb-0 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30 p-4 flex items-center justify-between gap-4 border-b dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Location de voiture Yelo</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                {/* Search & Filter Bar */}
                <div className="p-4 bg-white dark:bg-gray-800 md:rounded-b-2xl shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Prise en charge</label>
                                <input type="text" defaultValue="Genève Aéroport" className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Date de départ</label>
                                <div className="flex gap-2">
                                    <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
                                    <input type="time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="w-28 p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Date de retour</label>
                                <div className="flex gap-2">
                                    <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} min={pickupDate} className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
                                    <input type="time" value={returnTime} onChange={e => setReturnTime(e.target.value)} className="w-28 p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" />
                                </div>
                            </div>
                        </div>
                        <button className="bg-amber-500 text-black font-bold py-3 rounded-md h-full flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
                            <SearchIcon className="w-5 h-5" />
                            Rechercher
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 p-4">
                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm space-y-6">
                            <div>
                                <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-100">Type de véhicule</h3>
                                <div className="flex flex-wrap gap-2">
                                    {carCategories.map(cat => (
                                        <CarTypeButton key={cat} label={cat} selected={selectedCategories.includes(cat)} onClick={() => handleCategoryToggle(cat)} />
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-100">Boîte de vitesse</h3>
                                <div className="flex gap-2">
                                    <CarTypeButton label="Automatique" selected={transmission === 'Automatique'} onClick={() => setTransmission(t => t === 'Automatique' ? null : 'Automatique')} />
                                    <CarTypeButton label="Manuelle" selected={transmission === 'Manuelle'} onClick={() => setTransmission(t => t === 'Manuelle' ? null : 'Manuelle')} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-100">Prix par jour</h3>
                                 <input
                                    type="range"
                                    min="50"
                                    max="200"
                                    step="5"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    <span>CHF 50</span>
                                    <span className="font-bold text-gray-800 dark:text-gray-200">CHF {priceRange}</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Car List */}
                    <section className="w-full md:w-3/4 lg:w-4/5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredCars.map(car => (
                                <div key={car.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                                    <img src={car.image} alt={car.name} className="h-48 w-full object-cover"/>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{car.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{car.category}</p>
                                        <div className="flex justify-around text-center text-xs text-gray-600 dark:text-gray-300 my-2 py-2 border-y dark:border-gray-700">
                                            <div className="flex flex-col items-center gap-1"><UserGroupIcon className="w-5 h-5"/> {car.seats} places</div>
                                            <div className="flex flex-col items-center gap-1"><CogIcon className="w-5 h-5"/> {car.transmission}</div>
                                            <div className="flex flex-col items-center gap-1"><BriefcaseIcon className="w-5 h-5"/> {car.luggage} valise(s)</div>
                                        </div>
                                        <div className="mt-auto flex justify-between items-center pt-3">
                                            <div>
                                                <span className="font-extrabold text-2xl text-gray-900 dark:text-white">{car.price}</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400"> CHF/jour</span>
                                            </div>
                                            <button className="font-bold text-sm bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">Réserver</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredCars.length === 0 && (
                             <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
                                <p className="text-gray-500 dark:text-gray-400">Aucun véhicule disponible avec ces filtres.</p>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};
