import React from 'react';

export interface Category {
  title: string;
  subtitle: string;
  image: string;
  badge1?: string;
  page: string;
}

interface CategoryCardProps {
  category: Category;
  onClick: (page: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const { title, subtitle, image, badge1, page } = category;

  return (
    <button onClick={() => onClick(page)} className="relative w-full h-36 md:h-56 rounded-2xl overflow-hidden shadow-lg text-white text-left focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 transition-transform duration-200 hover:scale-105 group">
      <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      {badge1 && (
         <div className="absolute top-2 right-2 transform-gpu">
          <div className="bg-amber-400/80 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-md leading-none text-center flex items-center justify-center min-w-[60px]">
            {badge1}
          </div>
        </div>
      )}

      <div className="relative z-10 p-3 md:p-5 flex flex-col h-full justify-end">
        <h3 className="font-bold text-sm md:text-2xl leading-tight">{title}</h3>
        <p className="text-[11px] md:text-base opacity-90 leading-tight mt-0.5 md:mt-2">{subtitle}</p>
      </div>
    </button>
  );
};