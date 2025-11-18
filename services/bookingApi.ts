import { Hotel } from '../components/HotelCard';

// This is a mock API service to simulate fetching data from a real hotel booking API like Booking.com.
// In a real-world scenario, this would involve making an HTTP request from a backend to protect the API key.
// The bookingUrl should contain your affiliate ID.

const mockHotelsData: Hotel[] = [
    { 
        name: 'The Dolder Grand', 
        city: 'Zürich', 
        rating: 5, 
        price: 950, 
        images: [
            'https://images.unsplash.com/photo-1587784362703-a5789f2a4a75?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
        ], 
        bookingUrl: 'https://www.booking.com/hotel/ch/the-dolder-grand.html?aid=304142',
        description: 'Perché sur une colline dominant Zurich, le Dolder Grand offre une vue imprenable, un spa de 4 000 m², 2 restaurants primés et un service d\'exception.',
        amenities: ['Spa & Wellness', 'Piscine Intérieure', 'Wi-Fi Gratuit', 'Parking Privé']
    },
    { 
        name: 'Gstaad Palace', 
        city: 'Gstaad', 
        rating: 5, 
        price: 1200, 
        images: ['https://images.unsplash.com/photo-1596378443900-a37a65977a43?q=80&w=800&auto=format&fit=crop'], 
        bookingUrl: 'https://www.booking.com/hotel/ch/gstaad-palace.html?aid=304142',
        description: 'Icône de l\'hôtellerie de luxe suisse, le Gstaad Palace est un refuge glamour au cœur des Alpes, célèbre pour son atmosphère de conte de fées et son service impeccable.',
        amenities: ['Accès aux pistes', 'Spa de Luxe', 'Piscine Extérieure', 'Haute Gastronomie']
    },
    { 
        name: 'Beau-Rivage Palace', 
        city: 'Lausanne', 
        rating: 5, 
        price: 870, 
        images: ['https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?q=80&w=800&auto=format&fit=crop'], 
        bookingUrl: 'https://www.booking.com/hotel/ch/beau-rivage-palace.html?aid=304142',
        description: 'Situé dans un parc de 4 hectares sur les rives du lac Léman, cet hôtel élégant allie tradition et modernité avec un spa Cinq Mondes et une vue spectaculaire.',
        amenities: ['Vue sur le Lac', 'Spa Cinq Mondes', 'Jardins Privés', 'Wi-Fi Gratuit']
    },
    { 
        name: 'The Omnia', 
        city: 'Zermatt', 
        rating: 4, 
        price: 1150, 
        images: ['https://images.unsplash.com/photo-1622396643522-386f7f272a75?q=80&w=800&auto=format&fit=crop'],
        bookingUrl: 'https://www.booking.com/hotel/ch/the-omnia.html?aid=304142',
        description: 'Suspendu à un rocher au cœur de Zermatt, The Omnia est une fusion de design américain et de tradition suisse, offrant une expérience unique avec une vue sur le Cervin.',
        amenities: ['Vue sur le Cervin', 'Design Moderne', 'Bien-être & Spa', 'Navette Privée']
    },
];


export const fetchHotels = (): Promise<Hotel[]> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      if (Math.random() > 0.98) { // Simulate a rare network error
        reject(new Error('Failed to connect to the hotel booking service.'));
      } else {
        resolve(mockHotelsData);
      }
    }, 1200); // 1.2 second delay
  });
};
