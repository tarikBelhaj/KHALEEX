
export interface VipService {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    publicPrice: number;
    vipPrice: number;
    discountPercentage: number;
    bookingUrl: string;
}

const vipServices: VipService[] = [
    {
        id: 'jet-prive',
        title: 'Location Jet Privé',
        category: 'Transport',
        description: 'Vol privé au départ de Genève vers toutes destinations en Europe.',
        image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop',
        publicPrice: 5500,
        vipPrice: 3850,
        discountPercentage: 30,
        bookingUrl: 'https://www.netjets.com'
    },
    {
        id: 'helico-montblanc',
        title: 'Hélicoptère Mont-Blanc',
        category: 'Experience',
        description: 'Survol panoramique privé du massif du Mont-Blanc (45 min).',
        image: 'https://images.unsplash.com/photo-1728763670545-06158f3a9d9a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publicPrice: 450,
        vipPrice: 315,
        discountPercentage: 30,
        bookingUrl: 'https://www.swiftcopters.ch'
    },
    {
        id: 'chauffeur-v-class',
        title: 'Chauffeur Privé (Journée)',
        category: 'Transport',
        description: 'Mise à disposition Mercedes Classe V avec chauffeur (10h).',
        image: 'https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publicPrice: 1200,
        vipPrice: 840,
        discountPercentage: 30,
        bookingUrl: 'https://www.gmc-limousines.ch'
    },
    {
        id: 'chef-domicile',
        title: 'Chef Étoilé à Domicile',
        category: 'Gastronomie',
        description: 'Menu gastronomique préparé et servi dans votre résidence.',
        image: 'https://images.unsplash.com/photo-1601002357064-e43894c23107?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWYlMjBjdWlzaW5pZXIlMjBkb21pY2lsZXxlbnwwfHwwfHx8MA%3D%3D',
        publicPrice: 350,
        vipPrice: 245,
        discountPercentage: 30,
        bookingUrl: 'https://www.labelleassiette.fr'
    },
    {
        id: 'coach-sportif',
        title: 'Coach Sportif Privé',
        category: 'Bien-être',
        description: 'Séance de coaching personnalisée à votre hôtel ou résidence.',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
        publicPrice: 200,
        vipPrice: 140,
        discountPercentage: 30,
        bookingUrl: 'https://www.trainme.co'
    }
];

export const fetchVipServices = (): Promise<VipService[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(vipServices);
        }, 600);
    });
};
