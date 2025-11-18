import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[50vh] max-h-[450px] text-white">
      <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1470&auto=format&fit=crop" alt="Swiss landscape" className="absolute top-0 left-0 w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-black/10 to-transparent"></div>
      
      <div className="relative z-10 flex flex-col h-full p-4 max-w-md mx-auto pt-24 text-center">
        <p className="font-semibold text-lg">Welcome back, Ahmed 👋</p>
        <h2 className="text-3xl font-extrabold mt-2 leading-tight drop-shadow-lg">Exclusive Swiss Deals for Khaleej Travelers</h2>
        <p className="mt-2 text-lg text-right opacity-90 drop-shadow-md">
          Votre guide de confiance pour des offres exclusives
        </p>
        <button className="mt-6 bg-amber-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 self-center">
            Unlock Exclusive Swiss Offers
        </button>
      </div>
    </section>
  );
};