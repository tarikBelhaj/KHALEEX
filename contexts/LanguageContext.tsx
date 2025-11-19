
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar' | 'ru' | 'fr';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    home: 'Home',
    deals: 'Deals',
    account: 'Account',
    mode: 'Mode',
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    heroTitle: 'Exclusive Swiss Deals for Khaleej Travelers',
    heroSubtitle: 'Your trusted guide for exclusive offers',
    unlockOffers: 'Unlock Exclusive Swiss Offers',
    hotelsTitle: "Luxury Hotels",
    hotelsSubtitle: "Memorable Stays",
    hotelsBadge: "Up to -40%",
    carsTitle: "Prestige Cars",
    carsSubtitle: "Partners: Sixt & Prestige",
    carsBadge: "Exclusive Rates",
    experiencesTitle: "Leisure & Discovery",
    experiencesSubtitle: "Museums, Watches & Fun",
    experiencesBadge: "Tourism",
    vipOnly: "VIP ONLY",
    vipSubtitle: "Preferential rates for members",
    seeAll: "See all",
    todaysDeals: "Today's Exclusive Deals",
    testimonials: "Traveler Reviews",
    verifiedMember: "Verified Member",
    promoTitle: "100 CHF discount on your first booking",
    joinSave: "Join & Save",
    searchPlaceholder: "Search...",
    discover: "Discover",
    swissConcierge: "Swiss Concierge",
    guideToSwiss: "Your guide to Switzerland",
    bestRentalDeals: "Best Rental Deals",
    bestRentalDealsSubtitle: "Drive the best for less",
    generalExperiencesTitle: "Unforgettable Experiences",
    generalExperiencesSubtitle: "Discover Switzerland",
  },
  ar: {
    home: 'الرئيسية',
    deals: 'عروض',
    account: 'حسابي',
    mode: 'الوضع',
    goodMorning: 'صباح الخير',
    goodAfternoon: 'مساء الخير',
    goodEvening: 'مساء الخير',
    heroTitle: 'عروض سويسرية حصرية للمسافرين الخليجيين',
    heroSubtitle: 'دليلك الموثوق للعروض الحصرية',
    unlockOffers: 'اكتشف العروض الحصرية',
    hotelsTitle: "فنادق فاخرة",
    hotelsSubtitle: "إقامات لا تنسى",
    hotelsBadge: "خصم يصل لـ 40%",
    carsTitle: "سيارات فارهة",
    carsSubtitle: "شراكة مع Sixt و Prestige",
    carsBadge: "أسعار حصرية",
    experiencesTitle: "ترفيه واكتشاف",
    experiencesSubtitle: "متاحف، ساعات ومرح",
    experiencesBadge: "سياحة",
    vipOnly: "للشخصيات المهمة",
    vipSubtitle: "أسعار تفضيلية للأعضاء",
    seeAll: "عرض الكل",
    todaysDeals: "عروض اليوم الحصرية",
    testimonials: "آراء المسافرين",
    verifiedMember: "عضو موثوق",
    promoTitle: "خصم 100 فرنك على حجزك الأول",
    joinSave: "انضم ووفر",
    searchPlaceholder: "بحث...",
    discover: "اكتشف",
    swissConcierge: "كونسيرج سويسري",
    guideToSwiss: "دليلك إلى سويسرا",
    bestRentalDeals: "أفضل عروض التأجير",
    bestRentalDealsSubtitle: "قد الأفضل بأقل الأسعار",
    generalExperiencesTitle: "تجربة لا تنسى",
    generalExperiencesSubtitle: "اكتشف سويسرا",
  },
  ru: {
    home: 'Главная',
    deals: 'Акции',
    account: 'Аккаунт',
    mode: 'Режим',
    goodMorning: 'Доброе утро',
    goodAfternoon: 'Добрый день',
    goodEvening: 'Добрый вечер',
    heroTitle: 'Эксклюзивные предложения в Швейцарии',
    heroSubtitle: 'Ваш надежный гид по эксклюзивным предложениям',
    unlockOffers: 'Открыть предложения',
    hotelsTitle: "Роскошные отели",
    hotelsSubtitle: "Незабываемый отдых",
    hotelsBadge: "Скидки до -40%",
    carsTitle: "Престижные авто",
    carsSubtitle: "Партнеры: Sixt & Prestige",
    carsBadge: "Эксклюзивные тарифы",
    experiencesTitle: "Досуг и Открытия",
    experiencesSubtitle: "Музеи, Часы и Развлечения",
    experiencesBadge: "Туризм",
    vipOnly: "VIP",
    vipSubtitle: "Специальные тарифы для участников",
    seeAll: "Показать все",
    todaysDeals: "Эксклюзивные предложения дня",
    testimonials: "Отзывы путешественников",
    verifiedMember: "Проверенный участник",
    promoTitle: "Скидка 100 CHF на первое бронирование",
    joinSave: "Присоединиться",
    searchPlaceholder: "Поиск...",
    discover: "Обзор",
    swissConcierge: "Швейцарский консьерж",
    guideToSwiss: "Ваш гид по Швейцарии",
    bestRentalDeals: "Лучшие предложения аренды",
    bestRentalDealsSubtitle: "Лучшие авто по лучшим ценам",
    generalExperiencesTitle: "Незабываемые впечатления",
    generalExperiencesSubtitle: "Откройте Швейцарию",
  },
  fr: {
    home: 'Accueil',
    deals: 'Offres',
    account: 'Compte',
    mode: 'Mode',
    goodMorning: 'Bonjour',
    goodAfternoon: 'Bon après-midi',
    goodEvening: 'Bonsoir',
    heroTitle: 'Offres Suisses Exclusives pour Voyageurs',
    heroSubtitle: 'Votre guide de confiance pour des offres exclusives',
    unlockOffers: 'Voir les offres exclusives',
    hotelsTitle: "Hôtels d'exception",
    hotelsSubtitle: "Séjours mémorables",
    hotelsBadge: "Jusqu'à -40%",
    carsTitle: "Voitures de prestige",
    carsSubtitle: "Partenaires: Sixt & Prestige",
    carsBadge: "Tarifs Exclusifs",
    experiencesTitle: "Loisirs & Découvertes",
    experiencesSubtitle: "Musées, Montres & Fun",
    experiencesBadge: "Tourisme",
    vipOnly: "VIP UNIQUEMENT",
    vipSubtitle: "Tarifs préférentiels réservés aux membres",
    seeAll: "Tout voir",
    todaysDeals: "Offres Exclusives du Jour",
    testimonials: "Avis Voyageurs",
    verifiedMember: "Membre vérifié",
    promoTitle: "100 CHF de réduction sur votre première réservation",
    joinSave: "Rejoindre & Économiser",
    searchPlaceholder: "Rechercher...",
    discover: "Découvrir",
    swissConcierge: "Conciergerie Suisse",
    guideToSwiss: "Votre guide en Suisse",
    bestRentalDeals: "Meilleures Offres Location",
    bestRentalDealsSubtitle: "Roulez le meilleur pour moins",
    generalExperiencesTitle: "Expériences Inoubliables",
    generalExperiencesSubtitle: "Découvrez la Suisse",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('khaleex_lang') as Language;
    if (savedLang && ['en', 'ar', 'ru', 'fr'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('khaleex_lang', language);
    
    // Handle RTL/LTR
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Optional: Add a class to body for specific styling if needed
    if (language === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
