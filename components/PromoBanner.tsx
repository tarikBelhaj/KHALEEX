import React from 'react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="bg-amber-100 dark:bg-blue-900/30 rounded-2xl p-4 flex justify-between items-center my-6">
      <div>
        <h3 className="font-bold text-gray-800 dark:text-blue-100">100 CHF discount on your first booking</h3>
        <p className="text-sm text-gray-600 dark:text-blue-200 text-right">خصم 100 فرنك على حجزك الأول</p>
      </div>
      <button className="bg-blue-900 text-white font-bold text-sm py-2 px-4 rounded-lg whitespace-nowrap">
        Rejoindre & Économiser
      </button>
    </section>
  );
};