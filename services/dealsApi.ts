
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
        image: 'https://unsplash.com/fr/photos/train-rouge-et-blanc-sur-une-montagne-enneigee-pendant-la-journee-Q0CARQx1WQk',
        page: 'chamonix'
    },
    { 
        id: 'deal-zermatt',
        title: 'Zermatt', 
        subtitle: 'Vue sur le Cervin',
        image: 'https://unsplash.com/fr/photos/une-montagne-enneigee-est-a-larriere-plan-dune-ville-vSS6nhP52_g?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
    },
    { 
        id: 'deal-interlaken',
        title: 'Interlaken', 
        subtitle: 'Aventures alpines',
        image: 'https://unsplash.com/fr/photos/maisons-pres-de-plan-deau-et-chaine-de-montagnes-_vt2_V8k2O4',
    },
     { 
        id: 'deal-montreux',
        title: 'Montreux', 
        subtitle: 'Riviera suisse',
        image: 'https://unsplash.com/fr/photos/vue-aerienne-des-batiments-de-la-ville-pres-dun-plan-deau-pendant-la-journee-ixPeR1YfgOA',
    }
];


export const fetchTodaysDeals = (): Promise<Deal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(mockDeals);
    }, 500);
  });
};
