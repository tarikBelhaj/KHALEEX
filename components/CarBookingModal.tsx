import React, { useState } from 'react';
import { Car } from './CarCard';
import { XIcon, CreditCardIcon } from './Icons';

interface CarBookingModalProps {
  car: Car;
  onClose: () => void;
}

export const CarBookingModal: React.FC<CarBookingModalProps> = ({ car, onClose }) => {
    const today = new Date().toISOString().split('T')[0];
    const [pickUpDate, setPickUpDate] = useState(today);
    const [returnDate, setReturnDate] = useState('');
    const [pickUpLocation, setPickUpLocation] = useState('Genève Aéroport');

    const isFormValid = () => {
        if (!pickUpDate || !returnDate || !pickUpLocation.trim()) return false;
        if (new Date(returnDate) <= new Date(pickUpDate)) return false;
        return true;
    };

    const handleFinalizeBooking = () => {
        if (!isFormValid() || !car.bookingUrl) return;
        // For a general affiliate link, we just redirect the user to the partner's page.
        // Passing parameters is highly provider-specific for car rentals.
        window.open(car.bookingUrl, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm text-left relative">
                <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>

                <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100 mt-2">Détails de votre location</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Pour le véhicule <span className="font-semibold">{car.name}</span>.</p>
                
                <div className="space-y-4 mt-6">
                    <div>
                        <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de prise en charge</label>
                        <input 
                            type="date" 
                            id="pickup-date"
                            value={pickUpDate}
                            onChange={(e) => setPickUpDate(e.target.value)}
                            min={today}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de retour</label>
                        <input 
                            type="date" 
                            id="return-date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            min={pickUpDate || today}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                     <div>
                        <label htmlFor="pickup-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lieu de prise en charge</label>
                        <input 
                            type="text" 
                            id="pickup-location"
                            value={pickUpLocation}
                            onChange={(e) => setPickUpLocation(e.target.value)}
                            placeholder="ex: Genève Aéroport"
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                    </div>
                </div>
                
                <button 
                    onClick={handleFinalizeBooking}
                    disabled={!isFormValid() || !car.bookingUrl}
                    className="mt-6 w-full bg-blue-900 text-white font-bold py-3 px-5 rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    <CreditCardIcon className="w-6 h-6"/>
                    Réserver sur le site partenaire
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">Vous serez redirigé vers le site de notre partenaire pour finaliser la location.</p>
            </div>
        </div>
    );
};