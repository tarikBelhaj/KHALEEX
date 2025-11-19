
import React from 'react';
import { 
    ArrowLeftIcon, 
    ChevronRightIcon, 
    CreditCardIcon, 
    BellIcon, 
    ShieldCheckIcon, 
    QuestionMarkCircleIcon, 
    ArrowRightOnRectangleIcon,
    AccountIcon,
    UserGroupIcon
} from '../Icons';
import { User } from '../../App';

interface PageProps {
  onBack: () => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
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

export const AccountPage: React.FC<PageProps> = ({ onBack, user, onLogin, onLogout, onNavigate }) => {
  
  // Legal menu items specific for mobile navigation via Account page
  const legalItems = [
    { text: 'Mentions Légales', action: () => onNavigate('legal-notice') },
    { text: 'CGU', action: () => onNavigate('terms') },
    { text: 'Confidentialité', action: () => onNavigate('privacy') },
  ];

  if (!user) {
      return (
        <div className="animate-fade-in pb-20 md:pb-0 h-screen flex flex-col">
             <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 p-4 flex items-center gap-4 border-b dark:border-gray-700">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Mon Compte</h1>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto w-full">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full mb-6">
                    <UserGroupIcon className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bienvenue sur Khaleex</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Connectez-vous pour accéder à votre profil VIP et débloquer des offres exclusives.</p>
                
                <button 
                    onClick={onLogin}
                    className="w-full bg-blue-900 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
                >
                    Se connecter / S'inscrire
                </button>
                 <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">En continuant, vous acceptez nos conditions générales d'utilisation.</p>
                 
                 {/* Legal Links for non-logged users */}
                 <div className="mt-8 flex gap-4 text-xs text-gray-400 justify-center">
                    <button onClick={() => onNavigate('terms')} className="hover:text-gray-600">CGU</button>
                    <button onClick={() => onNavigate('privacy')} className="hover:text-gray-600">Confidentialité</button>
                 </div>
            </main>
        </div>
      );
  }

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
                src={user.avatar} 
                alt="User Avatar" 
                className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover"
            />
            <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">{user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
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

        {/* Legal Section (Mobile Accessible) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80">
            <h3 className="px-4 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Légal & Conformité</h3>
             <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {legalItems.map((item, index) => (
                    <li key={index} onClick={item.action} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors last:rounded-b-2xl">
                        <div className="flex items-center gap-4">
                            <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                            <span className="font-semibold text-gray-700 dark:text-gray-200">{item.text}</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </li>
                ))}
            </ul>
        </div>

        {/* Logout Button */}
        <div className="mt-4">
             <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
             >
                <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                <span className="font-bold text-red-600 dark:text-red-400">Se déconnecter</span>
            </button>
        </div>
      </main>
    </div>
  );
};
