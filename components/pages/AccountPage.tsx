import React from 'react';
import { 
    ArrowLeftIcon, 
    ChevronRightIcon, 
    CreditCardIcon, 
    BellIcon, 
    ShieldCheckIcon, 
    QuestionMarkCircleIcon, 
    ArrowRightOnRectangleIcon,
    AccountIcon
} from '../Icons';

interface PageProps {
  onBack: () => void;
}

const menuItems = [
    { text: 'Informations personnelles', icon: <AccountIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" /> },
    { text: 'Méthodes de paiement', icon: <CreditCardIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" /> },
    { text: 'Notifications', icon: <BellIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" /> },
    { text: 'Sécurité & Connexion', icon: <ShieldCheckIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" /> },
];

const supportItems = [
    { text: 'Aide & Support', icon: <QuestionMarkCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" /> },
];

export const AccountPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in pb-20 md:pb-0">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 p-4 flex items-center gap-4 border-b dark:border-gray-700">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Mon Compte</h1>
      </header>
      <main className="p-4 max-w-3xl mx-auto space-y-6">
        
        {/* Profile Card */}
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
            <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User Avatar" 
                className="w-16 h-16 rounded-full border-2 border-amber-400"
            />
            <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">Ahmed Al-Fahim</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">ahmed.alfahim@email.com</p>
            </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {menuItems.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors first:rounded-t-2xl last:rounded-b-2xl">
                        <div className="flex items-center gap-4">
                            {item.icon}
                            <span className="font-semibold text-gray-700 dark:text-gray-200">{item.text}</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Support Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
             <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {supportItems.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors rounded-2xl">
                        <div className="flex items-center gap-4">
                            {item.icon}
                            <span className="font-semibold text-gray-700 dark:text-gray-200">{item.text}</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </li>
                ))}
            </ul>
        </div>

        {/* Logout Button */}
        <div className="mt-4">
             <button className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                <span className="font-bold text-red-600 dark:text-red-400">Se déconnecter</span>
            </button>
        </div>
      </main>
    </div>
  );
};