import React, { useState } from 'react';
import carsData from '../mocks/carsMock.json';
import { CarCard, Car } from './CarCard';

const CarList = () => {
  const [cityFilter, setCityFilter] = useState('');
  const [currency, setCurrency] = useState('CHF');

  const handleBook = (car: Car) => {
    if (car.bookingUrl) {
      window.open(car.bookingUrl, '_blank');
    } else {
      alert(`Réservation pour ${car.make} ${car.name}`);
    }
  };

  const filteredCars = carsData.filter(car =>
    cityFilter ? car.make.toLowerCase().includes(cityFilter.toLowerCase()) : true
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrer par marque"
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        className="border p-2 rounded mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCars.map((car, index) => (
          <CarCard
            key={index}
            car={car}
            onBook={handleBook}
            currency={currency}
            isAdmin={false}
            onImageUpload={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default CarList;
