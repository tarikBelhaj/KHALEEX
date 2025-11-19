
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
    <button onClick={() => onClick(page)} className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-lg text-white text-left focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 transition-transform duration-200 hover:scale-[1.02] group">
      <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      {badge1 && (
         <div className="absolute top-2 right-2 md:top-3 md:right-3 transform-gpu">
          <div className="bg-amber-400/90 backdrop-blur-sm text-gray-900 text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-md leading-none text-center flex items-center justify-center min-w-[40px] md:min-w-[60px]">
            {badge1}
          </div>
        </div>
      )}

      <div className="relative z-10 p-3 md:p-6 flex flex-col h-full justify-end">
        <h3 className="font-bold text-sm md:text-3xl leading-tight mb-0.5 md:mb-2 line-clamp-2">{title}</h3>
        <p className="text-[10px] md:text-lg opacity-90 leading-tight font-medium line-clamp-1">{subtitle}</p>
      </div>
    </button>
  );
};
