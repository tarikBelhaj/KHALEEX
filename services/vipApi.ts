export interface VipService {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    publicPrice?: number;
    vipPrice?: number;
    displayPrice?: string;
    discountPercentage: number;
    bookingUrl: string;
}

const vipServices: VipService[] = [
    {
        id: 'jet-prive',
        title: 'Location Jet Privé',
        category: 'Transport',
        description: 'Vol privé au départ de Genève vers toutes destinations en Europe.',
        image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format=fit=crop',
        displayPrice: 'dès 8000 CHF',
        discountPercentage: 30,
        bookingUrl: 'https://www.netjets.com'
    },
    {
        id: 'helico-montblanc',
        title: 'Hélicoptère Mont-Blanc',
        category: 'Experience',
        description: 'Survol panoramique privé du massif du Mont-Blanc (45 min).',
        image: 'https://images.unsplash.com/photo-1728763670545-06158f3a9d9a?q=80&w=1170&auto=format=fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publicPrice: 199,
        vipPrice: 179,
        discountPercentage: 10,
        bookingUrl: 'https://chamonix-helico.fr/'
    },
    {
        id: 'glacier-3000-excursion',
        title: "Excursion d'une journée à Glacier 3000",
        category: 'Experience',
        description: 'Découvrez les paysages alpins spectaculaires, incluant le Peak Walk by Tissot.',
        image: 'https://www.datocms-assets.com/134365/1721306704-2018_peakwalkbytissot_clara-glacier3000.jpg?crop=focalpoint&dpr=1.5&fit=crop&fm=webp&h=600&w=990',
        publicPrice: 89,
        vipPrice: 80,
        discountPercentage: 10,
        bookingUrl: 'https://www.glacier3000.ch/'
    },
    {
        id: 'chocolat-tour-geneve',
        title: 'Visite chocolaté de 2 heures en petit groupe dans la ville de Genève',
        category: 'Experience',
        description: 'Dégustez les créations des meilleurs chocolatiers de Genève.',
        image: 'https://www.geneve.com/fileadmin/_processed_/7/5/csm_75756_126979_v0-Header_Chocolate-flavour-tour_14822f0005.webp',
        displayPrice: 'Gratuit',
        discountPercentage: 100,
        bookingUrl: 'https://www.geneve.com/fr/attractions/detail/tour-guide-les-saveurs-du-chocolat#/'
    },
    {
        id: 'chauffeur-v-class',
        title: 'Chauffeur Privé (Journée)',
        category: 'Transport',
        description: 'Mise à disposition Mercedes Classe V avec chauffeur (10h).',
        image: 'https://images.unsplash.com/photo-1730800328198-f9efbf9db53f?q=80&w=687&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publicPrice: 715,
        vipPrice: 500,
        discountPercentage: 30,
        bookingUrl: 'https://www.gmc-limousines.ch'
    },
    {
        id: 'chef-domicile',
        title: 'Chef Étoilé à Domicile',
        category: 'Gastronomie',
        description: 'Menu gastronomique préparé et servi dans votre résidence.',
        image: 'https://images.unsplash.com/photo-1601002357064-e43894c23107?q=80&w=687&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format=fit=crop',
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