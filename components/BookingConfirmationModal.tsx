import React, { useState } from 'react';
import { Hotel } from './HotelCard';
import { XIcon, CreditCardIcon } from './Icons';
import { useTranslation } from '../contexts/LanguageContext';

interface HotelBookingModalProps {
  hotel: Hotel;
  onClose: () => void;
}

export const HotelBookingModal: React.FC<HotelBookingModalProps> = ({ hotel, onClose }) => {
    const { t } = useTranslation();
    const today = new Date().toISOString().split('T')[0];
    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);

    const isFormValid = () => {
        if (!checkIn || !checkOut || !guests) return false;
        if (new Date(checkOut) <= new Date(checkIn)) return false;
        if (guests < 1) return false;
        return true;
    };

    const handleFinalizeBooking = () => {
        if (!isFormValid()) return;
        
        // The previous logic for appending affiliate URL params was specific to booking.com
        // and would fail with direct hotel links. 
        // Simply opening the booking URL is a more robust solution that works for any website.
        window.open(hotel.bookingUrl, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm text-left relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>

                <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100 mt-2">{t('stayDetails')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{t('forHotel')} <span className="font-semibold">{hotel.name}</span>.</p>
                
                <div className="space-y-4 mt-6">
                    <div>
                        <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('checkInDate')}</label>
                        <input 
                            type="date" 
                            id="checkin"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={today}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="checkout" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('checkOutDate')}</label>
                        <input 
                            type="date" 
                            id="checkout"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || today}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('travelersCount')}</label>
                        <input 
                            type="number" 
                            id="guests"
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value, 10) || 1)}
                            min="1"
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                </div>
                
                <button 
                    onClick={handleFinalizeBooking}
                    disabled={!isFormValid()}
                    className="mt-6 w-full bg-blue-900 text-white font-bold py-3 px-5 rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    <CreditCardIcon className="w-6 h-6"/>
                    {t('finalizeBooking')}
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">{t('redirectPartnerHotel')}</p>
            </div>
        </div>
    );
};