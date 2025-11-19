
import React from 'react';
import { ArrowLeftIcon } from '../Icons';
import { useTranslation } from '../../contexts/LanguageContext';

type LegalPageType = 'terms' | 'privacy' | 'cookies' | 'refund' | 'legal-notice';

interface LegalPageProps {
  type: LegalPageType;
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  const { language } = useTranslation();
  
  const COMPANY = {
    NAME: "SAS OPTIMUM DIGITAL AGENCY",
    OWNER: "Tarik Belhaj",
    EMAIL: "contact@khaleex.com",
    ADMIN_EMAIL: "belhajweb.contact@gmail.com",
    PHONE: "0638715799",
    RETENTION: "30 days",
  };

  // Content dictionaries
  const content = {
    en: {
      terms: {
        title: "Terms of Service",
        sections: [
          { heading: "1. Introduction", text: `Welcome to Khaleex.com, operated by ${COMPANY.NAME}. By accessing our website and using our services, you agree to be bound by these Terms of Service.` },
          { heading: "2. Services", text: "Khaleex.com acts as a concierge interface connecting users with third-party providers for hotels, car rentals, and experiences. We are an intermediary and not the final provider of these services." },
          { heading: "3. User Obligations", text: "You agree to use the platform for lawful purposes only. You must provide accurate information during booking or registration. Any fraudulent activity will result in immediate account termination." },
          { heading: "4. Intellectual Property", text: `All content on this site (text, logos, images) is the property of ${COMPANY.NAME} or its licensors. Reproduction without permission is prohibited.` },
          { heading: "5. Limitation of Liability", text: `${COMPANY.NAME} is not liable for acts, errors, omissions, representations, warranties, breaches, or negligence of any third-party suppliers.` },
          { heading: "6. Applicable Law", text: "These terms are governed by the laws of France and applicable EU regulations." }
        ]
      },
      privacy: {
        title: "Privacy Policy",
        sections: [
          { heading: "1. Data Collection", text: "We collect personal data such as Name, Surname, Email, Address, Phone Number, and Payment Information to process your requests." },
          { heading: "2. Use of Data", text: "Your data is used to manage bookings, provide customer support, and improve our services. We do not sell your data to unauthorized third parties." },
          { heading: "3. Data Sharing", text: "Data is shared only with authorized third-party service providers (hotels, car rental agencies) necessary to fulfill your booking." },
          { heading: "4. Data Retention", text: `Personal data is retained for a period of ${COMPANY.RETENTION} after your last interaction, unless a longer retention period is required by law.` },
          { heading: "5. Your Rights (GDPR)", text: `You have the right to access, rectify, or delete your personal data. Contact us at ${COMPANY.EMAIL} to exercise these rights.` },
          { heading: "6. Security", text: "We implement appropriate technical measures to protect your data against unauthorized access." }
        ]
      },
      cookies: {
        title: "Cookie Policy",
        sections: [
          { heading: "1. What are Cookies?", text: "Cookies are small text files stored on your device to improve website functionality." },
          { heading: "2. Types of Cookies", text: "We use Functional Cookies (essential for the site to work), Analytics Cookies (to understand usage), and Marketing Cookies (to provide relevant offers)." },
          { heading: "3. Managing Consent", text: "You can choose to disable cookies through your browser settings. However, some parts of the site may not function correctly." }
        ]
      },
      refund: {
        title: "Refund Policy",
        sections: [
          { heading: "1. General Policy", text: "As an intermediary, Khaleex.com facilitates bookings. Refunds are generally subject to the specific terms and conditions of the third-party provider (Hotel, Car Rental Agency)." },
          { heading: "2. Service Fees", text: "Any concierge service fees paid directly to Khaleex.com are non-refundable once the service has been rendered." },
          { heading: "3. Cancellation Rights", text: "EU consumer protection laws provide a right of withdrawal for certain digital services within 14 days, provided the service has not fully begun. Please contact support for specific cases." },
          { heading: "4. Processing Time", text: "Approved refunds are processed within 5-10 business days to the original payment method." }
        ]
      },
      "legal-notice": {
        title: "Legal Disclaimer",
        sections: [
          { heading: "1. Publisher", text: `Site published by ${COMPANY.NAME}. Owner: ${COMPANY.OWNER}. Contact: ${COMPANY.EMAIL}.` },
          { heading: "2. Hosting", text: "The site is hosted by Vercel Inc." },
          { heading: "3. Disclaimer", text: "Information provided on Khaleex.com is for general information purposes. We make no representation or warranty of any kind, express or implied, regarding the accuracy or availability of the information." },
          { heading: "4. External Links", text: "Our website contains links to external sites. We are not responsible for the content or privacy practices of these third-party sites." }
        ]
      }
    },
    fr: {
      terms: {
        title: "Conditions Générales d'Utilisation (CGU)",
        sections: [
          { heading: "1. Introduction", text: `Bienvenue sur Khaleex.com, opéré par ${COMPANY.NAME}. En accédant à ce site, vous acceptez ces Conditions Générales.` },
          { heading: "2. Services", text: "Khaleex.com agit comme une interface de conciergerie connectant les utilisateurs à des fournisseurs tiers. Nous sommes intermédiaire et non le fournisseur final." },
          { heading: "3. Obligations", text: "Vous acceptez d'utiliser la plateforme à des fins légales. Toute activité frauduleuse entraînera la suspension du compte." },
          { heading: "4. Propriété Intellectuelle", text: `Tout le contenu est la propriété de ${COMPANY.NAME}. La reproduction est interdite.` },
          { heading: "5. Responsabilité", text: `${COMPANY.NAME} n'est pas responsable des erreurs ou manquements des fournisseurs tiers.` },
          { heading: "6. Droit Applicable", text: "Ces conditions sont régies par les lois françaises et européennes." }
        ]
      },
      privacy: {
        title: "Politique de Confidentialité",
        sections: [
          { heading: "1. Collecte", text: "Nous collectons : Nom, Prénom, Email, Adresse, Téléphone, Paiement." },
          { heading: "2. Utilisation", text: "Données utilisées pour gérer les réservations et le support." },
          { heading: "3. Partage", text: "Partage uniquement avec les prestataires (hôtels, loueurs) pour la bonne exécution du service." },
          { heading: "4. Conservation", text: `Conservation des données pour ${COMPANY.RETENTION}.` },
          { heading: "5. Droits (RGPD)", text: `Droit d'accès, rectification, suppression. Contact : ${COMPANY.EMAIL}.` },
          { heading: "6. Sécurité", text: "Mesures techniques mises en place pour protéger vos données." }
        ]
      },
      cookies: {
        title: "Politique des Cookies",
        sections: [
          { heading: "1. Définition", text: "Les cookies sont des fichiers stockés pour améliorer la fonctionnalité." },
          { heading: "2. Types", text: "Cookies fonctionnels, analytiques et marketing." },
          { heading: "3. Gestion", text: "Vous pouvez désactiver les cookies via votre navigateur." }
        ]
      },
      refund: {
        title: "Politique de Remboursement",
        sections: [
          { heading: "1. Général", text: "Les remboursements sont soumis aux conditions du fournisseur tiers." },
          { heading: "2. Frais", text: "Les frais de conciergerie Khaleex sont non-remboursables après service fait." },
          { heading: "3. Droit de Rétractation", text: "Conformément à la loi consommation, délai de 14 jours pour certains services numériques." },
          { heading: "4. Délais", text: "Traitement sous 5-10 jours ouvrés." }
        ]
      },
      "legal-notice": {
        title: "Mentions Légales",
        sections: [
          { heading: "1. Éditeur", text: `Édité par ${COMPANY.NAME}. Propriétaire : ${COMPANY.OWNER}. Contact : ${COMPANY.EMAIL}.` },
          { heading: "2. Hébergement", text: "Hébergé par Vercel Inc." },
          { heading: "3. Responsabilité", text: "Informations fournies à titre indicatif. Aucune garantie d'exactitude." },
          { heading: "4. Liens Externes", text: "Nous ne sommes pas responsables des sites tiers." }
        ]
      }
    },
    ar: {
      terms: {
        title: "شروط الخدمة",
        sections: [
          { heading: "1. مقدمة", text: `مرحبًا بكم في Khaleex.com، المشغل بواسطة ${COMPANY.NAME}.` },
          { heading: "2. الخدمات", text: "يعمل Khaleex.com كوسيط لربط المستخدمين بمزودي الخدمات." },
          { heading: "3. التزامات المستخدم", text: "يجب استخدام المنصة لأغراض قانونية فقط." },
          { heading: "4. الملكية الفكرية", text: `جميع المحتويات مملوكة لـ ${COMPANY.NAME}.` },
          { heading: "5. حدود المسؤولية", text: "نحن غير مسؤولين عن أخطاء المزودين الخارجيين." },
          { heading: "6. القانون الساري", text: "تخضع هذه الشروط للقوانين الفرنسية والأوروبية." }
        ]
      },
      privacy: {
        title: "سياسة الخصوصية",
        sections: [
          { heading: "1. جمع البيانات", text: "نجمع الاسم، البريد الإلكتروني، الهاتف، ومعلومات الدفع." },
          { heading: "2. الاستخدام", text: "تستخدم لإدارة الحجوزات والدعم." },
          { heading: "3. المشاركة", text: "تتم المشاركة فقط مع مزودي الخدمة المعتمدين." },
          { heading: "4. الاحتفاظ", text: `يتم الاحتفاظ بالبيانات لمدة ${COMPANY.RETENTION}.` },
          { heading: "5. الحقوق", text: `لديك حق الوصول والتصحيح والحذف. اتصل بـ ${COMPANY.EMAIL}.` },
          { heading: "6. الأمان", text: "نطبق معايير أمان تقنية لحماية بياناتك." }
        ]
      },
      cookies: {
        title: "سياسة ملفات تعريف الارتباط",
        sections: [
          { heading: "1. ما هي؟", text: "ملفات نصية صغيرة لتحسين وظائف الموقع." },
          { heading: "2. الأنواع", text: "وظيفية، تحليلية، وتسويقية." },
          { heading: "3. الإدارة", text: "يمكنك تعطيلها من إعدادات المتصفح." }
        ]
      },
      refund: {
        title: "سياسة الاسترداد",
        sections: [
          { heading: "1. السياسة العامة", text: "تخضع المبالغ المستردة لشروط المزود الخارجي." },
          { heading: "2. الرسوم", text: "رسوم خدمة Khaleex غير قابلة للاسترداد بعد تقديم الخدمة." },
          { heading: "3. الإلغاء", text: "حق الانسحاب خلال 14 يومًا للخدمات الرقمية وفق القانون الأوروبي." },
          { heading: "4. المعالجة", text: "تتم المعالجة خلال 5-10 أيام عمل." }
        ]
      },
      "legal-notice": {
        title: "إخلاء المسؤولية القانونية",
        sections: [
          { heading: "1. الناشر", text: `تم النشر بواسطة ${COMPANY.NAME}. المالك: ${COMPANY.OWNER}.` },
          { heading: "2. الاستضافة", text: "مستضاف بواسطة Vercel Inc." },
          { heading: "3. المسؤولية", text: "المعلومات مقدمة للأغراض العامة ولا نضمن دقتها." },
          { heading: "4. روابط خارجية", text: "نحن غير مسؤولين عن محتوى المواقع الخارجية." }
        ]
      }
    },
    ru: {
      terms: {
        title: "Условия использования",
        sections: [
          { heading: "1. Введение", text: `Добро пожаловать на Khaleex.com, управляемый ${COMPANY.NAME}. Используя наш сайт, вы соглашаетесь с этими условиями.` },
          { heading: "2. Услуги", text: "Khaleex.com выступает в качестве консьерж-интерфейса, связывающего пользователей со сторонними поставщиками (отели, аренда авто). Мы являемся посредником, а не конечным поставщиком." },
          { heading: "3. Обязательства", text: "Вы соглашаетесь использовать платформу только в законных целях. Любая мошенническая деятельность приведет к блокировке аккаунта." },
          { heading: "4. Интеллектуальная собственность", text: `Весь контент принадлежит ${COMPANY.NAME}. Копирование запрещено.` },
          { heading: "5. Ответственность", text: `${COMPANY.NAME} не несет ответственности за ошибки или упущения сторонних поставщиков.` },
          { heading: "6. Применимое право", text: "Эти условия регулируются законами Франции и ЕС." }
        ]
      },
      privacy: {
        title: "Политика конфиденциальности",
        sections: [
          { heading: "1. Сбор данных", text: "Мы собираем: Имя, Фамилия, Email, Адрес, Телефон, Платежные данные." },
          { heading: "2. Использование", text: "Данные используются для управления бронированиями и поддержки." },
          { heading: "3. Передача данных", text: "Данные передаются только авторизованным поставщикам услуг." },
          { heading: "4. Хранение", text: `Данные хранятся в течение ${COMPANY.RETENTION}.` },
          { heading: "5. Права", text: `Право на доступ, исправление, удаление. Контакт: ${COMPANY.EMAIL}.` },
          { heading: "6. Безопасность", text: "Мы применяем технические меры защиты данных." }
        ]
      },
      cookies: {
        title: "Политика Cookie",
        sections: [
          { heading: "1. Что это?", text: "Файлы cookie улучшают функциональность сайта." },
          { heading: "2. Типы", text: "Функциональные, аналитические и маркетинговые." },
          { heading: "3. Управление", text: "Вы можете отключить их в настройках браузера." }
        ]
      },
      refund: {
        title: "Политика возврата",
        sections: [
          { heading: "1. Общее", text: "Возврат средств зависит от условий стороннего поставщика." },
          { heading: "2. Комиссии", text: "Комиссии консьержа Khaleex не возвращаются после оказания услуги." },
          { heading: "3. Отмена", text: "Право на отказ в течение 14 дней для цифровых услуг (согласно законам ЕС)." },
          { heading: "4. Сроки", text: "Обработка занимает 5-10 рабочих дней." }
        ]
      },
      "legal-notice": {
        title: "Правовая оговорка",
        sections: [
          { heading: "1. Издатель", text: `Сайт опубликован ${COMPANY.NAME}. Владелец: ${COMPANY.OWNER}. Контакт: ${COMPANY.EMAIL}.` },
          { heading: "2. Хостинг", text: "Размещено на Vercel Inc." },
          { heading: "3. Отказ от ответственности", text: "Информация предоставлена в ознакомительных целях. Мы не гарантируем её точность." },
          { heading: "4. Внешние ссылки", text: "Мы не несем ответственности за сторонние сайты." }
        ]
      }
    }
  };

  const currentContent = content[language as keyof typeof content]?.[type] || content['en'][type];

  return (
    <div className="animate-fade-in pb-28 md:pb-0 min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 p-4 flex items-center gap-4 border-b dark:border-gray-700">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{currentContent.title}</h1>
      </header>

      <main className="p-6 md:p-12 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
          {currentContent.sections.map((section, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-100 dark:border-gray-700 pb-2 inline-block">
                {section.heading}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {section.text}
              </p>
            </div>
          ))}

          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-500 text-center">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mt-1">{COMPANY.NAME} - {COMPANY.EMAIL}</p>
          </div>
        </div>
      </main>
    </div>
  );
};
    