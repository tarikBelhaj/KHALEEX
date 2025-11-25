
import { Car } from '../components/CarCard';

// This is a mock API service to simulate fetching data from a real car rental API like Sixt.
// In a real-world scenario, this would involve making an HTTP request with an API key.

// We will transform the API response to match the `Car` interface used by our components.
export interface CarFromApi {
  id: string;
  make: string;
  model: string;
  series: string;
  fuelType: 'Petrol' | 'Diesel' | 'Electric';
  transmission: 'Auto' | 'Manual';
  seats: number;
  price: {
    amount: number;
    currency: 'CHF';
  };
  images: {
    large: string;
  };
  bookingUrl: string;
}

const mockApiResponse: CarFromApi[] = [
    {
        id: 'sixt-s-class',
        make: 'Mercedes-Benz',
        model: 'S-Class',
        series: 'Mercedes-Benz S-Class',
        fuelType: 'Petrol',
        transmission: 'Auto',
        seats: 4,
        price: { amount: 450, currency: 'CHF' },
        images: { large: 'https://images.unsplash.com/photo-1680451553374-09d8d6a1ca58?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        bookingUrl: 'https://www.sixt.ch/mercedes-benz-s-class-limousine/'
    },
    {
        id: 'sixt-q5',
        make: 'Audi',
        model: 'Q5',
        series: 'Audi Q5',
        fuelType: 'Diesel',
        transmission: 'Auto',
        seats: 5,
        price: { amount: 520, currency: 'CHF' },
        images: { large: 'https://images.unsplash.com/photo-1612884831623-6a970e4b8f1c?q=80&w=800&auto=format=fit=crop' },
        bookingUrl: 'https://www.sixt.ch/suv/audi/q5/'
    },
    {
        id: 'sixt-5-series',
        make: 'BMW',
        model: '5 Series',
        series: 'BMW 5 Series',
        fuelType: 'Petrol',
        transmission: 'Auto',
        seats: 5,
        price: { amount: 480, currency: 'CHF' },
        images: { large: 'https://images.unsplash.com/photo-1621287924822-b5193d543e37?q=80&w=800&auto=format=fit=crop' },
        bookingUrl: 'https://www.sixt.ch/berline/bmw/serie-5/'
    },
    {
        id: 'gmc-v-class',
        make: 'Mercedes-Benz',
        model: 'V-Class',
        series: 'Mercedes V-Class',
        fuelType: 'Diesel',
        transmission: 'Auto',
        seats: 7,
        price: { amount: 600, currency: 'CHF' },
        images: { large: 'https://unsplash.com/fr/photos/le-logo-mercedes-benz-sur-fond-noir-HotQ6dHmAVA' },
        bookingUrl: 'https://www.gmc-limousines.ch/flotte/mercedes-classe-v/'
    },
    {
        id: 'gmc-bentayga',
        make: 'Bentley',
        model: 'Bentayga',
        series: 'Bentley Bentayga',
        fuelType: 'Petrol',
        transmission: 'Auto',
        seats: 5,
        price: { amount: 950, currency: 'CHF' },
        images: { large: 'https://images.unsplash.com/photo-1617892320643-951515c1b523?q=80&w=800&auto=format=fit=crop' },
        bookingUrl: 'https://www.gmc-limousines.ch/flotte/bentley-bentayga/'
    },
     { 
        id: 'edelswiss-911',
        make: 'Porsche',
        model: '911 Carrera',
        series: 'Porsche 911 Carrera',
        fuelType: 'Petrol',
        transmission: 'Auto',
        seats: 2,
        price: { amount: 750, currency: 'CHF' },
        images: { large: 'https://images.unsplash.com/photo-1604280918973-72e9d28256e2?q=80&w=800&auto=format=fit=crop'}, 
        bookingUrl: 'https://www.edelswiss-limousine.ch/location-porsche-geneve' 
    },
];

export const fetchSixtVehicles = (location: string): Promise<Car[]> => {
  console.log(`Fetching vehicles for location: ${location}...`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Transform the mock API response to the `Car` interface our components expect.
      const transformedData: Car[] = mockApiResponse.map(apiCar => ({
        make: apiCar.make,
        name: apiCar.series,
        type: `${apiCar.make} ${apiCar.model}`,
        seats: apiCar.seats,
        transmission: apiCar.transmission,
        price: apiCar.price.amount,
        images: [apiCar.images.large], // Our component expects an array of strings
        bookingUrl: apiCar.bookingUrl,
      }));
      resolve(transformedData);
    }, 1500); // 1.5 second delay
  });
};
