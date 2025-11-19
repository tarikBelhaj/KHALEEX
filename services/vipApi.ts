
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
        image: 'https://images.unsplash.com/photo-1506460737377-25a47182c62c?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1631027124192-3343a4e9b6d6?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800&auto=format&fit=crop',
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
