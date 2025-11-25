

export type Deal = {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    page?: string;
};

const mockDeals: Deal[] = [
    { 
        id: 'deal-gstaad',
        title: 'Gstaad Palace', 
        subtitle: '-25% Suite',
        image: 'https://images.unsplash.com/photo-1596378443900-a37a65977a43?q=80&w=800&auto=format&fit=crop',
        page: 'hotels'
    },
    { 
        id: 'deal-geneva',
        title: 'Services à Genève', 
        subtitle: 'Chef, Coach & plus',
        image: 'https://images.unsplash.com/photo-1564053489984-317bbd824340?q=80&w=800&auto=format&fit=crop',
        page: 'geneva'
    },
    { 
        id: 'deal-chamonix',
        title: 'Chamonix', 
        subtitle: 'Excursions Mont-Blanc',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop',
        page: 'chamonix'
    },
    { 
        id: 'deal-zermatt',
        title: 'Zermatt', 
        subtitle: 'Vue sur le Cervin',
        image: 'https://images.unsplash.com/photo-1581331492948-2621d15a9999?q=80&w=800&auto=format&fit=crop',
    },
    { 
        id: 'deal-interlaken',
        title: 'Interlaken', 
        subtitle: 'Aventures alpines',
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c73?q=80&w=800&auto=format&fit=crop',
    },
     { 
        id: 'deal-montreux',
        title: 'Montreux', 
        subtitle: 'Riviera suisse',
        image: 'https://images.unsplash.com/photo-1553531580-652231dae097?q=80&w=800&auto=format&fit=crop',
    }
];


export const fetchTodaysDeals = (): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(mockDeals);
    }, 500);
  });
};