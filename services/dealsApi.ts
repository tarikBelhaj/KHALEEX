
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
        image: 'https://unsplash.com/fr/photos/une-vue-dune-montagne-enneigee-avec-des-arbres-dessus-a89K4YbINP8',
        page: 'hotels'
    },
    { 
        id: 'deal-geneva',
        title: 'Services à Genève', 
        subtitle: 'Chef, Coach & plus',
        image: 'https://images.unsplash.com/photo-1574904935745-7e40279f589d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        page: 'geneva'
    },
    { 
        id: 'deal-chamonix',
        title: 'Chamonix', 
        subtitle: 'Excursions Mont-Blanc',
        image: 'https://images.unsplash.com/photo-1585821244330-7029d402beb2?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        page: 'chamonix'
    },
    { 
        id: 'deal-zermatt',
        title: 'Zermatt', 
        subtitle: 'Vue sur le Cervin',
        image: 'https://images.unsplash.com/photo-1708598660454-4011df6397f0?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    { 
        id: 'deal-interlaken',
        title: 'Interlaken', 
        subtitle: 'Aventures alpines',
        image: 'https://images.unsplash.com/photo-1612215864092-355d4b25083f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
     { 
        id: 'deal-montreux',
        title: 'Montreux', 
        subtitle: 'Riviera suisse',
        image: 'https://images.unsplash.com/photo-1581541709890-f566353a3807?q=80&w=1275&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }
];


export const fetchTodaysDeals = (): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(mockDeals);
    }, 500);
  });
};
