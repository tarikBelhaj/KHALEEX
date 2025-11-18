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
        image: 'https://images.unsplash.com/photo-1592185200388-14d48a80d5d5?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1535889767794-9a8a72c1598b?q=80&w=800&auto=format&fit=crop',
    },
     { 
        id: 'deal-montreux',
        title: 'Montreux', 
        subtitle: 'Riviera suisse',
        image: 'https://images.unsplash.com/photo-1518538183215-186e2b170c51?q=80&w=800&auto=format&fit=crop',
    }
];


export const fetchTodaysDeals = (): Promise<Deal[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        // Simulate a potential API error
        if (Math.random() > 0.95) {
            reject(new Error("API Error: Could not fetch today's deals."));
        } else {
            resolve(mockDeals);
        }
    }, 500);
  });
};
