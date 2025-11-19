
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

export const PromoBanner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-amber-100 dark:bg-blue-900/30 rounded-2xl p-4 flex justify-between items-center my-6">
      <div>
        <h3 className="font-bold text-gray-800 dark:text-blue-100">{t('promoTitle')}</h3>
      </div>
      <button className="bg-blue-900 text-white font-bold text-sm py-2 px-4 rounded-lg whitespace-nowrap ml-2">
        {t('joinSave')}
      </button>
    </section>
  );
};
