
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language } = useTranslation();
  const currentYear = new Date().getFullYear();

  const links = [
    { key: 'terms', label: { en: 'Terms of Service', fr: 'CGU', ar: 'شروط الخدمة', ru: 'Условия обслуживания' } },
    { key: 'privacy', label: { en: 'Privacy Policy', fr: 'Politique de Confidentialité', ar: 'سياسة الخصوصية', ru: 'Политика конфиденциальности' } },
    { key: 'cookies', label: { en: 'Cookie Policy', fr: 'Politique des Cookies', ar: 'سياسة ملفات تعريف الارتباط', ru: 'Политика куки' } },
    { key: 'refund', label: { en: 'Refund Policy', fr: 'Politique de Remboursement', ar: 'سياسة الاسترداد', ru: 'Политика возврата' } },
    { key: 'legal-notice', label: { en: 'Legal Disclaimer', fr: 'Mentions Légales', ar: 'إخلاء المسؤولية القانونية', ru: 'Правовая оговорка' } },
  ];

  const getLabel = (link: any) => {
    return link.label[language] || link.label['en'];
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-10 pb-24 md:pb-10 mt-12">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Khaleex.com</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              SAS OPTIMUM DIGITAL AGENCY
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Owner: Tarik Belhaj
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Email: contact@khaleex.com
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Légal' : language === 'ar' ? 'قانوني' : 'Legal'}
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onNavigate(link.key)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  >
                    {getLabel(link)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Support */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                 {language === 'fr' ? 'Aide' : language === 'ar' ? 'مساعدة' : 'Support'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              WhatsApp Support: 24/7
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Phone: 0638715799
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            &copy; {currentYear} SAS OPTIMUM DIGITAL AGENCY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
