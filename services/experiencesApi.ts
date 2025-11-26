
export interface Experience {
  title: string;
  description: string;
  image: string;
  badge: string;
  bookingUrl: string;
}

const experiences: Experience[] = [
  {
    title: 'Tour en hélicoptère des Alpes',
    description: 'Survolez les sommets enneigés et les glaciers.',
    image: 'https://images.unsplash.com/photo-1726212859367-ffb30266292f?q=80&w=1170&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    badge: 'Exclusivité',
    bookingUrl: 'https://www.getyourguide.com/geneva-l28/panoramic-helicopter-tour-over-the-swiss-alps-from-geneva-t61248/'
  },
  {
    title: 'Atelier d\'horlogerie privée',
    description: 'Assemblez votre propre montre suisse.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop',
    badge: 'Accès VIP',
    bookingUrl: 'https://www.airbnb.com/experiences/169811'
  },
  {
    title: 'Réserver un Jet Privé',
    description: 'Voyagez en toute discrétion et confort absolu.',
    image: 'https://images.unsplash.com/photo-1619623512419-6a68aa2337d2?q=80&w=800&auto=format&fit=crop',
    badge: 'Sur Demande',
    bookingUrl: 'https://www.netjets.com/en-gb/'
  },
];

export const fetchExperiences = (): Promise<Experience[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(experiences);
    }, 800); // 0.8 second delay
  });
};