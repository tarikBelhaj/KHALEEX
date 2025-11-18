import React, { useState } from 'react';
import carsData from '../mocks/carsMock.json';
import CarCard from './CarCard';

const CarList = () => {
  const [cityFilter, setCityFilter] = useState('');

  const filteredCars = carsData.filter(car =>
    cityFilter ? car.city.toLowerCase() === cityFilter.toLowerCase() : true
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        className="border p-2 rounded mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCars.map((car: any) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarList;
