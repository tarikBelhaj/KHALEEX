
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TodaysDeal } from './components/TodaysDeal';
import { VipExperiences } from './components/VipExperiences';
import { PromoBanner } from './components/PromoBanner';
import { Testimonials } from './components/Testimonials';
import { FloatingActionButton } from './components/FloatingActionButton';
import { BottomNav } from './components/BottomNav';
import { CategoryCard, Category } from './components/CategoryCard';
import { GenevaHotelsPage } from './components/pages/GenevaHotelsPage';
import { CarsPage } from './components/pages/CarsPage';
import { ExperiencesPage } from './components/pages/ExperiencesPage';
import { TransferPage } from './components/pages/TransferPage';
import { AccountPage } from './components/pages/AccountPage';
import { GenevaPage } from './components/pages/GenevaPage';
import { ChamonixPage } from './components/pages/ChamonixPage';
import { VipPage } from './components/pages/VipPage';
import { LegalPage } from './components/pages/LegalPage';
import { YeloPage } from './components/pages/YeloPage';
import usePersistentState from './hooks/usePersistentState';
import { LanguageProvider, useTranslation } from './contexts/LanguageContext';
import { BestRentalDeals } from './components/BestRentalDeals';
import { GeneralExperiences } from './components/GeneralExperiences';
import { Footer } from './components/Footer';
import { EsimBookingWidget } from './components/EsimBookingWidget';
import { User } from './types';

// Extracted InnerApp to use hooks from LanguageProvider
const InnerApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currency, setCurrency] = useState('CHF');
  const [theme, setTheme] = useState('light');
  const { t } = useTranslation();
  
  // User state management (using persistent state to keep login across refreshes for demo)
  const [user, setUser] = usePersistentState<User | null>('khaleex_user_v2', null);

  // Define categories inside the component to use translation
  const categories: Category[] = [
    {
      title: t('hotelsTitle'),
      subtitle: t('hotelsSubtitle'),
      image: 'https://images.unsplash.com/photo-1643654282922-a859073eb6a1?q=80&w=1170&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      badge1: t('hotelsBadge'),
      page: 'hotels'
    },
    {
      title: t('carsTitle'),
      subtitle: t('carsSubtitle'),
      image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1170&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      badge1: t('carsBadge'),
      page: 'cars'
    },
    {
      title: t('transfersTitle'),
      subtitle: t('transfersSubtitle'),
      image: 'https://images.unsplash.com/photo-1627835448014-d4acd4d7cf49?q=80&w=1170&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      badge1: t('transfersBadge'),
      page: 'transfers'
    },
    {
      title: t('experiencesTitle'),
      subtitle: t('experiencesSubtitle'),
      image: 'https://images.unsplash.com/photo-1601893267113-a432b85910e0?q=80&w=1074&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      badge1: t('experiencesBadge'),
      page: 'experiences'
    }
  ];

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Mock login function
  const handleLogin = () => {
    setUser({
        name: 'Ahmed',
        email: 'ahmed.alfahim@email.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    });
    navigateTo('home');
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('home');
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'hotels':
        // Use the new Geneva Hotels Page for the hotels route
        return <GenevaHotelsPage onBack={() => navigateTo('home')} currency={currency} />;
      case 'cars':
        return <CarsPage onBack={() => navigateTo('home')} currency={currency} onCurrencyChange={setCurrency} />;
      case 'transfers':
        return <TransferPage onBack={() => navigateTo('home')} />;
      case 'experiences':
        return <ExperiencesPage onBack={() => navigateTo('home')} />;
      case 'vip-only':
        return <VipPage onBack={() => navigateTo('home')} />;
      case 'geneva':
        return <GenevaPage onBack={() => navigateTo('home')} onNavigate={navigateTo} />;
      case 'chamonix':
        return <ChamonixPage onBack={() => navigateTo('home')} />;
      case 'yelo':
        return <YeloPage onBack={() => navigateTo('geneva')} currency={currency} />;
      case 'account':
        return <AccountPage onBack={() => navigateTo('home')} user={user} onLogin={handleLogin} onLogout={handleLogout} onNavigate={navigateTo} />;
      // Legal Pages
      case 'terms':
        return <LegalPage type="terms" onBack={() => navigateTo('home')} />;
      case 'privacy':
        return <LegalPage type="privacy" onBack={() => navigateTo('home')} />;
      case 'cookies':
        return <LegalPage type="cookies" onBack={() => navigateTo('home')} />;
      case 'refund':
        return <LegalPage type="refund" onBack={() => navigateTo('home')} />;
      case 'legal-notice':
        return <LegalPage type="legal-notice" onBack={() => navigateTo('home')} />;
      case 'home':
      default:
        return (
          <div className="relative pb-28 md:pb-0">
            <Header />
            <main className="relative">
              <Hero user={user} />
              
              {/* Categories Section */}
              <div className="px-5 md:px-10 -mt-16 relative z-10 max-w-7xl mx-auto w-full">
                  <div className="flex gap-3 md:gap-6 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5 md:grid md:grid-cols-4 md:mx-0 md:px-0 md:overflow-visible snap-x snap-mandatory md:snap-none">
                    {categories.map(cat => (
                        <div key={cat.title} className="w-36 sm:w-48 md:w-full flex-shrink-0 snap-center">
                            <CategoryCard category={cat} onClick={navigateTo} />
                        </div>
                    ))}
                  </div>
              </div>

              {/* Main Content Sections with increased spacing */}
              <div className="px-5 md:px-10 mt-12 space-y-12 md:space-y-16 max-w-7xl mx-auto">
                
                {/* 1. Today's Deals (Choose your location) */}
                <TodaysDeal onNavigate={navigateTo} />

                {/* 2. Best Rental Deals */}
                <BestRentalDeals onNavigate={navigateTo} />

                {/* eSIM Booking Widget (NEW) */}
                <EsimBookingWidget />
                
                {/* 3. General Experiences */}
                <GeneralExperiences onNavigate={navigateTo} />
                
                <div className="grid md:grid-cols-2 gap-8">
                  <PromoBanner />
                  <div className="hidden md:block">
                     <PromoBanner />
                  </div>
                </div>
                
                <Testimonials />
              </div>
            </main>
            <Footer onNavigate={navigateTo} />
            <FloatingActionButton />
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col md:flex-row overflow-x-hidden transition-colors duration-200">
        {/* Sidebar for Desktop / BottomNav for Mobile */}
        <BottomNav 
          currentPage={currentPage}
          onNavigate={navigateTo}
          currentTheme={theme} 
          onToggleTheme={toggleTheme} 
        />
        
        {/* Main Content Area */}
        <div className="flex-grow w-full md:ml-64 transition-all duration-300">
            {renderContent()}
        </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <InnerApp />
    </LanguageProvider>
  );
};

export default App;
