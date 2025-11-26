import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { SimCardIcon, SignalIcon, GlobeIcon, CheckCircleIcon, ArrowRightOnRectangleIcon } from './Icons';

interface Plan {
    id: string;
    data: string;
    duration: string;
    price: string;
}

export const EsimBookingWidget: React.FC = () => {
    const { t } = useTranslation();
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const popularCountries = [
        { code: 'CH', name: t('countrySwitzerland'), flag: '🇨🇭' },
        { code: 'EU', name: t('countryEurope'), flag: '🇪🇺' },
        { code: 'FR', name: t('countryFrance'), flag: '🇫🇷' },
        { code: 'AE', name: t('countryUae'), flag: '🇦🇪' },
        { code: 'US', name: t('countryUsa'), flag: '🇺🇸' },
    ];

    const plans: Plan[] = [
        { id: '1gb', data: '1 GB', duration: t('days7'), price: '€ 5.00' },
        { id: '3gb', data: '3 GB', duration: t('days15'), price: '€ 12.00' },
        { id: '10gb', data: '10 GB', duration: t('days30'), price: '€ 25.00' },
        { id: 'unl', data: 'Unlimited', duration: t('days15'), price: '€ 45.00' },
    ];

    const affiliateLink = "https://yesim.tpo.lu/hkdLcVdT";

    const handleBuy = () => {
        if (selectedCountry && selectedPlan) {
            window.open(affiliateLink, '_blank');
        }
    };

    const selectedPlanDetails = plans.find(p => p.id === selectedPlan);
    const selectedCountryDetails = popularCountries.find(c => c.code === selectedCountry);

    return (
        <section className="my-10 relative rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
            {/* Background Image for Depth */}
            <div className="absolute inset-0">
                 <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop" 
                    alt="Global Connectivity" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                />
            </div>

            {/* Frozen Glass Overlay - Modern UX */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-indigo-900/60 backdrop-blur-xl"></div>
            
            {/* Decorative Gradient Orbs */}
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-overlay"></div>

            <div className="relative z-10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20 shadow-lg">
                                4G / 5G LTE
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 drop-shadow-md">
                            <SimCardIcon className="w-8 h-8 text-green-400" />
                            {t('esimTitle')}
                        </h2>
                        <p className="text-indigo-100 text-sm mt-1 max-w-md font-medium drop-shadow-sm">{t('esimSubtitle')}</p>
                    </div>
                </div>

                {/* Inner Card - Glassmorphism */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                    {/* Country Selector */}
                    <div className="mb-6">
                        <label className="text-xs font-bold text-indigo-100 ml-1 mb-2 block uppercase tracking-wide opacity-90">{t('selectDestination')}</label>
                        <div className="relative">
                            <GlobeIcon className="absolute left-4 top-3.5 w-5 h-5 text-indigo-900 z-10" />
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full bg-white/90 hover:bg-white text-indigo-900 font-bold rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-lime-400 appearance-none cursor-pointer shadow-sm transition-colors"
                            >
                                <option value="" disabled>{t('selectCountryPlaceholder')}</option>
                                {popularCountries.map(c => (
                                    <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Data Plans */}
                    <div className="mb-6">
                        <label className="text-xs font-bold text-indigo-100 ml-1 mb-3 block uppercase tracking-wide opacity-90">{t('dataPlans')}</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`cursor-pointer rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-200 border-2 ${
                                        selectedPlan === plan.id
                                            ? 'bg-white border-lime-400 shadow-lg scale-105'
                                            : 'bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/20 text-white'
                                    }`}
                                >
                                    <span className={`text-lg font-bold ${selectedPlan === plan.id ? 'text-gray-900' : 'text-white'}`}>{plan.data}</span>
                                    <span className={`text-xs font-medium mb-1 ${selectedPlan === plan.id ? 'text-gray-500' : 'text-indigo-200'}`}>{plan.duration}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${selectedPlan === plan.id ? 'bg-indigo-100 text-indigo-800' : 'bg-white/20 text-white'}`}>
                                        {plan.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Section */}
                    {selectedCountryDetails && selectedPlanDetails && (
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/10 animate-fade-in">
                            <h3 className="text-white font-bold text-xs mb-3 uppercase tracking-wider opacity-70">{t('summary')}</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-indigo-100 text-sm">
                                    <span>{t('destination')}:</span>
                                    <span className="font-bold text-white flex items-center gap-1">
                                        {selectedCountryDetails.flag} {selectedCountryDetails.name}
                                    </span>
                                </div>
                                <div className="flex justify-between text-indigo-100 text-sm">
                                    <span>{t('plan')}:</span>
                                    <span className="font-bold text-white">{selectedPlanDetails.data} - {selectedPlanDetails.duration}</span>
                                </div>
                                <div className="flex justify-between text-indigo-100 text-sm mt-2 pt-2 border-t border-white/10 items-center">
                                    <span className="font-medium">{t('total')}:</span>
                                    <span className="font-bold text-lime-400 text-xl">{selectedPlanDetails.price}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTA Button */}
                    <button
                        onClick={handleBuy}
                        disabled={!selectedCountry || !selectedPlan}
                        className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform ${
                            selectedCountry && selectedPlan
                                ? 'bg-lime-400 hover:bg-lime-300 text-gray-900 hover:-translate-y-0.5 shadow-lime-400/30 cursor-pointer'
                                : 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/5'
                        }`}
                    >
                        {t('buyEsim')}
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10">
                        <SignalIcon className="w-4 h-4 text-lime-400" />
                        <span className="text-xs text-white font-medium">{t('globalCoverage')}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10">
                        <CheckCircleIcon className="w-4 h-4 text-lime-400" />
                        <span className="text-xs text-white font-medium">{t('instantActivation')}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10">
                        <ArrowRightOnRectangleIcon className="w-4 h-4 text-lime-400" />
                        <span className="text-xs text-white font-medium">{t('bestRates')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};