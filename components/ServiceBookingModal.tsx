import React, { useState } from 'react';
import { XIcon, CreditCardIcon } from './Icons';
import { HomeService } from './pages/GenevaPage';


interface ServiceBookingModalProps {
  service: HomeService;
  onClose: () => void;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({ service, onClose }) => {
    const today = new Date().toISOString().split('T')[0];
    const [bookingDate, setBookingDate] = useState(today);
    const [bookingTime, setBookingTime] = useState('10:00');
    const [duration, setDuration] = useState(2);

    const isFormValid = () => {
        if (!bookingDate || !bookingTime || !duration) return false;
        if (duration < 1) return false;
        return true;
    };

    const handleFinalizeBooking = () => {
        if (!isFormValid() || !service.bookingUrl) return;
        window.open(service.bookingUrl, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm text-left relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>

                <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100 mt-2">Détails de votre service</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Pour le service <span className="font-semibold">{service.name}</span>.</p>
                
                <div className="space-y-4 mt-6">
                    <div>
                        <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                        <input 
                            type="date" 
                            id="booking-date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            min={today}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="booking-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Heure de début</label>
                        <input 
                            type="time" 
                            id="booking-time"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Durée (en heures)</label>
                        <input 
                            type="number" 
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value, 10) || 1)}
                            min="1"
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                </div>
                
                <button 
                    onClick={handleFinalizeBooking}
                    disabled={!isFormValid() || !service.bookingUrl}
                    className="mt-6 w-full bg-blue-900 text-white font-bold py-3 px-5 rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    <CreditCardIcon className="w-6 h-6"/>
                    Réserver sur le site partenaire
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">Vous serez redirigé pour finaliser votre réservation exclusive.</p>
            </div>
        </div>
    );
};