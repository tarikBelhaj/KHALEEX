
import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { StarIcon } from './Icons';

export const ExpediaHotelsWidget: React.FC = () => {
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
        // Clear wrapper
        wrapper.innerHTML = '';

        // Create the widget div manually to decouple from React fiber tree
        const widgetDiv = document.createElement('div');
        widgetDiv.className = "eg-widget";
        widgetDiv.dataset.widget = "search";
        widgetDiv.dataset.program = "fr-hcom";
        widgetDiv.dataset.lobs = "stays";
        widgetDiv.dataset.network = "pz";
        widgetDiv.dataset.camref = "1100l5ynW4";
        
        wrapper.appendChild(widgetDiv);

        // Check if script is already globally loaded, if not, inject it
        const existingScript = document.querySelector('script.eg-widgets-script');
        if (existingScript) {
            // If script exists, we might need to trigger a re-render of widgets if the library supports it
            // Usually EG widgets auto-detect new elements. If not, we reload script.
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = "https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js";
        script.className = "eg-widgets-script";
        script.async = true;
        wrapper.appendChild(script);
    }

    return () => {
        if (wrapper) {
            wrapper.innerHTML = '';
        }
        const script = document.querySelector('script.eg-widgets-script');
        if (script) {
            script.remove();
        }
    };
  }, []);

  return (
    <section className="mb-8 relative rounded-3xl overflow-hidden shadow-xl group border border-gray-200 dark:border-gray-800">
        {/* Gradient Matching TransferBookingWidget */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600"></div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>

        <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                            Expedia Partner
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {t('hotelsTitle')}
                    </h2>
                    <p className="text-indigo-100 text-sm mt-1 max-w-md">{t('hotelsSubtitle')}</p>
                </div>
            </div>

            {/* Widget Container */}
            <div className="bg-white rounded-2xl p-4 shadow-lg overflow-hidden min-h-[100px] relative z-20">
               <div ref={wrapperRef} />
            </div>

             {/* USPs */}
             <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-1.5 border border-white/5">
                    <StarIcon className="w-4 h-4 text-lime-400" />
                    <span className="text-xs text-white font-medium">Best Rates Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-1.5 border border-white/5">
                    <StarIcon className="w-4 h-4 text-lime-400" />
                    <span className="text-xs text-white font-medium">Free Cancellation</span>
                </div>
            </div>
        </div>
    </section>
  );
};
