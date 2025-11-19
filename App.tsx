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
import { HotelsPage } from './components/pages/HotelsPage';
import { CarsPage } from './components/pages/CarsPage';
import { ExperiencesPage } from './components/pages/ExperiencesPage';
import { AccountPage } from './components/pages/AccountPage';
import { GenevaPage } from './components/pages/GenevaPage';
import { ChamonixPage } from './components/pages/ChamonixPage';

const categories: Category[] = [
  {
    title: "Hôtels d'exception",
    subtitle: 'Séjours mémorables',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    badge1: 'Jusqu\'à -40%',
    page: 'hotels'
  },
  {
    title: 'Voitures de prestige',
    subtitle: 'Partenaires: Sixt & Prestige',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    badge1: 'Tarifs Exclusifs',
    page: 'cars'
  },
  {
    title: 'Expériences Inoubliables',
    subtitle: 'Aventures sur mesure',
    image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=800&auto=format&fit=crop',
    badge1: 'Accès VIP',
    page: 'experiences'
  }
];


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currency, setCurrency] = useState('CHF');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
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
        return <HotelsPage onBack={() => navigateTo('home')} currency={currency} onCurrencyChange={setCurrency} />;
      case 'cars':
        return <CarsPage onBack={() => navigateTo('home')} currency={currency} onCurrencyChange={setCurrency} />;
      case 'experiences':
        return <ExperiencesPage onBack={() => navigateTo('home')} />;
      case 'geneva':
        return <GenevaPage onBack={() => navigateTo('home')} onNavigate={navigateTo} />;
      case 'chamonix':
        return <ChamonixPage onBack={() => navigateTo('home')} />;
      case 'account':
        return <AccountPage onBack={() => navigateTo('home')} />;
      case 'home':
      default:
        return (
          <div className="relative pb-20 md:pb-0">
            <Header />
            <main className="relative">
              <Hero />
              <div className="px-4 md:px-8 -mt-24 relative z-10 max-w-7xl mx-auto w-full">
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">
                    {categories.map(cat => <CategoryCard key={cat.title} category={cat} onClick={navigateTo} />)}
                  </div>
              </div>
              <div className="p-4 md:p-8 mt-8 space-y-6 md:space-y-10 max-w-7xl mx-auto">
                <TodaysDeal onNavigate={navigateTo} />
                <VipExperiences />
                <div className="grid md:grid-cols-2 gap-6">
                  <PromoBanner />
                  <div className="hidden md:block">
                     {/* Placeholder or duplicate banner for grid balance on desktop */}
                     <PromoBanner />
                  </div>
                </div>
                <Testimonials />
              </div>
            </main>
            <FloatingActionButton />
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col md:flex-row overflow-x-hidden">
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

export default App;