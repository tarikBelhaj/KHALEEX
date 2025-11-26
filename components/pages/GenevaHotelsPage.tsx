import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftIcon, 
  SpinnerIcon, 
  StarIcon, 
  MapPinIcon, 
  XIcon, 
  CheckCircleIcon, 
  CalendarIcon,
  ArrowRightOnRectangleIcon,
  SearchIcon,
  UserGroupIcon,
  FilterIcon
} from '../Icons';
import { 
  fetchHotelList, 
  fetchHotelRates, 
  destinations, 
  XoteloHotel, 
  XoteloRate 
} from '../../services/bookingApi';
import { useTranslation } from '../../contexts/LanguageContext';

interface PageProps {
  onBack: () => void;
  currency: string;
}

export const GenevaHotelsPage: React.FC<PageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  
  // Dates (Default: Tomorrow + 2 nights)
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(tomorrow); dayAfter.setDate(tomorrow.getDate() + 2);

  // -- State --
  // Default to Geneva (g188057)
  const [selectedDestination, setSelectedDestination] = useState<string>('g188057');
  const [hotels, setHotels] = useState<XoteloHotel[]>([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search Bar State
  const [checkInDate, setCheckInDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(dayAfter.toISOString().split('T')[0]);
  const [adults, setAdults] = useState(2);

  // -- Modal State --
  const [selectedHotel, setSelectedHotel] = useState<XoteloHotel | null>(null);
  const [rates, setRates] = useState<XoteloRate[]>([]);
  const [loadingRates, setLoadingRates] = useState(false);

  // -- Effects --
  useEffect(() => {
    if (selectedDestination) {
      loadHotels(selectedDestination);
    }
  }, [selectedDestination]);

  useEffect(() => {
    if (selectedHotel) {
      loadRates();
    }
  }, [selectedHotel, checkInDate, checkOutDate]);

  // -- Logic --
  const loadHotels = async (key: string) => {
    setLoadingHotels(true);
    setError(null);
    setHotels([]);

    // Hotels featured on the Geneva Page
    const featuredGenevaHotels: XoteloHotel[] = (key === 'g188057') ? [
        {
            hotel_key: 'president_wilson_feat',
            name: 'Hôtel Président Wilson, a Luxury Collection Hotel',
            image: 'https://lh3.googleusercontent.com/p/AF1QipOOTFW0mX0a1UNmn3Pc3-iGuyUXop2m-6rfCqXa=s680-w680-h510-rw',
            accommodation_type: 'Luxury Hotel',
            review_summary: { rating: 4.6, count: 1240 },
            price_ranges: { minimum: 850, maximum: 5000, currency: 'CHF' },
            mentions: ['Vue Lac', 'Luxe', 'Spa']
        },
        {
            hotel_key: 'beau_rivage_feat',
            name: 'Beau-Rivage Genève',
            image: 'https://lh3.googleusercontent.com/p/AF1QipMwOpCijN5Ta0rorpWyUuvRfoTBDAkNtF6xV3XB=s680-w680-h510-rw',
            accommodation_type: 'Historic Hotel',
            review_summary: { rating: 4.7, count: 950 },
            price_ranges: { minimum: 720, maximum: 3000, currency: 'CHF' },
            mentions: ['Historique', 'Gastronomie', 'Centre']
        },
        {
            hotel_key: 'four_seasons_feat',
            name: 'Four Seasons Hotel des Bergues Geneva',
            image: 'https://lh3.googleusercontent.com/proxy/NJ2D2mo8XMhuVTP-PaEa_Ndh5ZkeSyVYH68RwfUKPXnNHjv-gBo2WpTDJGSZaOcgHx9GNjxwd8DzcQWe25RwjEd_zPGcHv2MJuoGEjEepFMxzFaCgBAQApHeejoh5JK9mJVx4KZVz3Ee402gy4Hp4bsW9pDv5w=s680-w680-h510-rw',
            accommodation_type: 'Palace',
            review_summary: { rating: 4.9, count: 1500 },
            price_ranges: { minimum: 1100, maximum: 8000, currency: 'CHF' },
            mentions: ['Palace', 'Exclusif', 'Service']
        }
    ] : [];

    try {
      let list = await fetchHotelList(key);
      if (!list) list = [];
      
      // Combine featured hotels with API results
      const combinedList = [...featuredGenevaHotels, ...list];
      
      if (combinedList.length === 0) {
        setError(t('noHotelsAvailable'));
      } else {
        setHotels(combinedList);
      }
    } catch (err) {
        // Fallback: if API fails, at least show featured hotels for Geneva
        if (featuredGenevaHotels.length > 0) {
            setHotels(featuredGenevaHotels);
        } else {
            setError(t('serviceUnavailable'));
        }
    } finally {
      setLoadingHotels(false);
    }
  };

  const loadRates = async () => {
    if (!selectedHotel) return;
    setLoadingRates(true);
    setRates([]);
    try {
      const fetchedRates = await fetchHotelRates(selectedHotel.hotel_key, checkInDate, checkOutDate);
      
      // If API returns rates, sort them
      if (fetchedRates && fetchedRates.length > 0) {
          const sortedRates = fetchedRates.sort((a, b) => a.rate - b.rate);
          setRates(sortedRates);
      } else {
          // Fallback simulation
          const basePrice = selectedHotel.price_ranges ? selectedHotel.price_ranges.minimum : 450;
          const simulatedRates: XoteloRate[] = [
            { name: "Booking.com", rate: basePrice, tax: 0, url: generateAffiliateLink(selectedHotel.name, 'booking'), code: "booking" },
            { name: "Expedia", rate: basePrice + 25, tax: 0, url: generateAffiliateLink(selectedHotel.name, 'expedia'), code: "expedia" },
            { name: "Agoda", rate: basePrice - 15, tax: 0, url: generateAffiliateLink(selectedHotel.name, 'agoda'), code: "agoda" }
          ];
          setRates(simulatedRates.sort((a,b) => a.rate - b.rate));
      }
    } catch (err) {
      console.error("Error rates", err);
    } finally {
      setLoadingRates(false);
    }
  };

  const getOtaColor = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('booking')) return 'text-[#003580]';
    if (n.includes('expedia')) return 'text-[#FFC72C]';
    if (n.includes('hotels.com')) return 'text-[#D32F2F]';
    if (n.includes('agoda')) return 'text-[#5392F9]';
    return 'text-gray-700';
  };

  // Generate Deep Links
  const generateAffiliateLink = (hotelName: string, provider?: string) => {
    const destination = encodeURIComponent(hotelName);
    if (provider === 'booking') return `https://www.booking.com/searchresults.html?ss=${destination}&checkin=${checkInDate}&checkout=${checkOutDate}&group_adults=${adults}&no_rooms=1`;
    if (provider === 'expedia') return `https://www.expedia.com/Hotel-Search?destination=${destination}&startDate=${checkInDate}&endDate=${checkOutDate}&adults=${adults}`;
    if (provider === 'agoda') return `https://www.agoda.com/search?city=${destination}&checkIn=${checkInDate}&checkOut=${checkOutDate}&adults=${adults}`;
    return `https://fr.hotels.com/search.do?q-destination=${destination}&q-check-in=${checkInDate}&q-check-out=${checkOutDate}&q-rooms=1&q-room-0-adults=${adults}&sort-order=BEST_SELLER`;
  };

  const handleFinalizeBooking = () => {
      if (!selectedHotel) return;
      const url = generateAffiliateLink(selectedHotel.name);
      window.open(url, '_blank');
  };

  // -- Render Components --

  const renderSearchBar = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 md:p-3 mb-8 mx-auto max-w-5xl -mt-8 relative z-20">
      <div className="flex flex-col md:flex-row gap-2">
        {/* Destination */}
        <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer"
            >
                {destinations.map(dest => (
                    <option key={dest.location_key} value={dest.location_key}>{dest.name}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                 <ArrowLeftIcon className="h-4 w-4 text-gray-400 rotate-270" style={{ transform: 'rotate(-90deg)'}} />
            </div>
        </div>

        {/* Dates */}
        <div className="flex-1 grid grid-cols-2 gap-2">
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full h-12 pl-9 pr-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="relative">
                 <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate}
                    className="w-full h-12 pl-9 pr-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
        </div>

        {/* Guests & Search Button */}
        <div className="flex gap-2">
            <div className="relative w-20 md:w-24 flex-shrink-0">
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                    <UserGroupIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                    type="number" 
                    min="1" 
                    max="10"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full h-12 pl-8 pr-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none text-center"
                />
            </div>
            <button 
                onClick={() => loadHotels(selectedDestination)}
                className="flex-grow md:w-32 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors flex items-center justify-center gap-2 h-12"
            >
                <SearchIcon className="w-5 h-5" />
                <span className="hidden md:inline">{t('searchOnKlook').split(' ')[0]}</span>
            </button>
        </div>
      </div>
    </div>
  );

  const renderHotelList = () => {
    if (loadingHotels) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <SpinnerIcon className="w-12 h-12 animate-spin mb-4 text-blue-600" />
          <p className="text-gray-500 font-medium">{t('loadingHotels')}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">{error}</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {hotels.length} {t('hotelsTitle')} {t('from')} {destinations.find(d => d.location_key === selectedDestination)?.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <FilterIcon className="w-4 h-4" />
                <span>{t('sort')}</span>
            </div>
        </div>

        {hotels.map((hotel) => (
          <div 
            key={hotel.hotel_key}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => setSelectedHotel(hotel)}
          >
            {/* Image Section */}
            <div className="relative h-48 md:h-auto md:w-64 flex-shrink-0 bg-gray-200 overflow-hidden">
              {hotel.image ? (
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 dark:bg-gray-800">{t('noImageAvailable')}</div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-5 flex-grow flex flex-col md:flex-row justify-between">
              <div className="flex-grow pr-4">
                 <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{hotel.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
                             <MapPinIcon className="w-3 h-3" />
                             <span>{destinations.find(d => d.location_key === selectedDestination)?.name}, {t('countrySwitzerland')}</span>
                             <span className="mx-1">•</span>
                             <span>{hotel.accommodation_type || 'Hotel'}</span>
                        </div>
                    </div>
                    {hotel.review_summary && (
                        <div className="flex flex-col items-end">
                             <div className="flex items-center gap-1 bg-blue-900 text-white px-2 py-1 rounded-md mb-1">
                                <span className="font-bold text-sm">{hotel.review_summary.rating}</span>
                             </div>
                             <span className="text-xs text-gray-500">{hotel.review_summary.count} {t('reviews')}</span>
                        </div>
                    )}
                 </div>

                 {/* Tags / Mentions */}
                 {hotel.mentions && (
                    <div className="flex flex-wrap gap-2 mt-2 mb-4">
                      {hotel.mentions.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-semibold px-2 py-0.5 border border-green-200 bg-green-50 text-green-700 rounded dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                 )}
                 
                 <div className="mt-auto hidden md:block">
                     <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <CheckCircleIcon className="w-3 h-3" />
                        {t('freeCancellation')}
                     </p>
                 </div>
              </div>

              {/* Price Section (Right Side on Desktop) */}
              <div className="mt-4 md:mt-0 md:border-l md:border-gray-100 dark:md:border-gray-700 md:pl-6 flex flex-row md:flex-col justify-between items-end md:w-48 flex-shrink-0">
                  <div className="text-right">
                      <span className="text-xs text-gray-500 block">{t('from')}</span>
                      <div className="flex items-baseline justify-end gap-1">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                              {hotel.price_ranges?.minimum || 450}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {hotel.price_ranges?.currency || 'CHF'}
                          </span>
                      </div>
                      <span className="text-xs text-gray-400 block">{t('perNight')}</span>
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors w-full mt-3 flex items-center justify-center gap-2">
                     {t('viewPrices')} 
                     <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderModal = () => {
    if (!selectedHotel) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white dark:bg-gray-800 w-full md:max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{selectedHotel.name}</h2>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <MapPinIcon className="w-3 h-3" />
                {destinations.find(d => d.location_key === selectedDestination)?.name}
              </div>
            </div>
            <button 
              onClick={() => setSelectedHotel(null)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Rates List */}
          <div className="flex-grow overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">{t('priceComparator')}</h3>
            
            {loadingRates ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <SpinnerIcon className="w-8 h-8 animate-spin mb-3 text-blue-600" />
                <p>{t('loadingRates')}</p>
              </div>
            ) : rates.length > 0 ? (
              <div className="space-y-3">
                {rates.map((rate, idx) => {
                  const isBestPrice = idx === 0;
                  return (
                    <div 
                      key={idx} 
                      className={`bg-white dark:bg-gray-800 p-4 rounded-xl border transition-all hover:shadow-md flex items-center justify-between ${
                        isBestPrice 
                            ? 'border-green-500 ring-1 ring-green-200 dark:ring-green-800 shadow-sm' 
                            : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isBestPrice && (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                             <p className={`font-bold text-base ${getOtaColor(rate.name)} dark:text-white`}>{rate.name}</p>
                             {isBestPrice && (
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                                    {t('bestOffer')}
                                </span>
                             )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{t('freeCancellation')}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-xl font-extrabold ${isBestPrice ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                            {Math.round(rate.rate)} €
                        </p>
                        <button
                          onClick={() => window.open(rate.url, '_blank')}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-4 rounded-md mt-1 transition-colors"
                        >
                          {t('book')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>{t('ratesUnavailable')}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
             <button
               onClick={handleFinalizeBooking}
               className="w-full bg-[#FFC72C] hover:bg-[#E6B328] text-black font-bold py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
               <ArrowRightOnRectangleIcon className="w-5 h-5" />
               {t('bookOnExpedia')}
            </button>
             <p className="text-[10px] text-gray-400 text-center mt-2">
                {t('bookingRedirectDisclaimer')
                    .replace('{checkInDate}', checkInDate)
                    .replace('{checkOutDate}', checkOutDate)}
             </p>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-24 md:pb-0 animate-fade-in">
      {/* Header */}
      <header className="bg-blue-900 text-white pb-12 pt-6 px-4 md:px-8 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-4">
                <button onClick={onBack} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                <ArrowLeftIcon className="w-5 h-5 text-white" />
                </button>
                <h1 className="text-2xl font-bold">{t('luxuryHotelsAndSki')}</h1>
            </div>
            <p className="text-blue-100 max-w-xl text-sm md:text-base opacity-90">
                {t('luxuryHotelsAndSkiSubtitle')}
            </p>
        </div>
      </header>

      <main className="px-4 md:px-8 max-w-7xl mx-auto">
        {renderSearchBar()}
        {renderHotelList()}
      </main>

      {renderModal()}
    </div>
  );
};