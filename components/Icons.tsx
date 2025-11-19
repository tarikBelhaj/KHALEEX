
import React from 'react';

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    {props.children}
  </svg>
);

export const AirbnbLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}><path d="M16 3.2C7.8 3.2 1.2 9.8 1.2 18c0 3.3 1.1 6.4 2.9 8.9l.2.2c.2.3.6.4.9.2l.2-.2c.2-.2.3-.5.2-.8l-.2-1.1C4.7 23.4 4 20.8 4 18c0-6.6 5.4-12 12-12s12 5.4 12 12c0 2.8-.9 5.4-2.6 7.3l-1.1.9c-.2.2-.3.5-.2.8l.2.2c.3.2.6.1.9-.2l.2-.2c1.8-2.5 2.9-5.5 2.9-8.9C30.8 9.8 24.2 3.2 16 3.2z M16 6c-2.4 0-4.7.9-6.5 2.5.3 0 .5-.1.8-.1 1.2 0 2.4.3 3.5.8 2.2 1.1 3.9 3.1 4.5 5.5.3 1.1.5 2.3.5 3.5 0 .1 0 .2-.1.4.3.4.7.7 1.1 1 1.2 1.1 2.9 1.7 4.6 1.7 1.3 0 2.6-.4 3.7-1.1C29.6 16.2 30 13 28.6 10c-1.3-2.9-3.9-5-7.1-5.6-2.1-.4-4.2-.2-6 .5-1.1.4-2.2 1-3.2 1.7C10.7 7.4 13.3 6 16 6zm-8.8 13.8c-.8 0-1.6.3-2.2.8.2.7.5 1.4.8 2.1.9 1.9 2.5 3.4 4.5 4.1.7.3 1.5.4 2.2.4.9 0 1.8-.2 2.6-.6.3-.1.5-.3.6-.5s.1-.5 0-.7c-.9-2-2.4-3.6-4.3-4.6-1.1-.6-2.3-.9-3.6-.9z"></path></svg>
);

export const KlookLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 1024 1024" fill="currentColor" {...props}><path d="M924.3 393.4c-4-4.1-8.5-7.8-13.4-10.9-10.2-6.5-20.9-11.7-31.9-15.6-19.1-6.7-38.6-10.3-58.4-10.3-29.3 0-57.8 6.4-84.3 18.7-21.7 10.1-41.9 24.1-59.8 41.5-12.8 12.5-24.3 26.8-34.3 42.6-1.5 2.4-3.1 4.8-4.6 7.2-2.5 3.9-3.9 8.2-3.9 13.2 0 10.6 8.6 19.2 19.2 19.2 5.3 0 9.8-2.2 13.2-5.5 1.5-1.5 3-3 4.4-4.5 7.8-9.1 16-17.8 24.8-25.9 15.3-14.1 32.3-26.4 50.5-36.4 22.8-12.6 47.4-19.3 73.1-19.3 15.6 0 31.1 2.8 46.1 8.2 8.4 3 16.7 6.8 24.6 11.2 7.7 4.4 14.9 9.3 21.6 14.9 4.3 3.5 9.1 6.5 13.4 9.9 5.8 4.6 10.8 9.9 15 15.7 6.8 9.5 11.4 20.1 13.1 31.7 1.3 8.7.6 17.5-1.9 25.9-2.9 9.5-7.7 18.3-13.9 26-6.1 7.6-13.4 14.2-21.6 19.6-12.3 8.1-26.3 12.4-40.9 12.4-30.7 0-60-12.4-81.5-34.3l-1.9-2-33.1-33.1-177.3 177.3c-28.7 28.7-75.3 28.7-104 0-28.7-28.7-28.7-75.3 0-104l177.3-177.3-33.1-33.1-2-1.9c-22-21.6-34.3-50.9-34.3-81.5 0-14.6 4.3-28.6 12.4-40.9 5.4-8.2 12-15.5 19.6-21.6 7.8-6.2 16.5-11 26-13.9 8.4-2.5 17.2-3.2 25.9-1.9 11.6 1.7 22.2 6.3 31.7 13.1 5.8 4.2 11.1 9.2 15.7 15 3.4 4.3 6.4 9.1 9.9 13.4 5.6 6.7 10.5 13.9 14.9 21.6 4.4 7.9 8.2 16.2 11.2 24.6 5.4 15 8.2 30.5 8.2 46.1 0 25.7-6.7 50.3-19.3 73.1-10 18.2-22.3 35.2-36.4 50.5-8.8 8.1-17.5 16.3-25.9 24.8-1.5 1.4-3 2.9-4.5 4.4-3.3 3.3-5.5 7.9-5.5 13.2 0 10.6 8.6 19.2 19.2 19.2 4.9 0 9.2-1.4 13.2-3.9 2.4-1.5 4.8-3.1 7.2-4.6 15.8-10 30.1-21.5 42.6-34.3 17.4-17.9 31.4-38.1 41.5-59.8 12.3-26.5 18.7-55 18.7-84.3 0-19.9-3.6-39.3-10.3-58.4-3.9-11-9.1-21.7-15.6-31.9-3.1-4.9-6.8-9.4-10.9-13.4L924.3 393.4zM425.4 786.6L248.1 609.3l-33.1 33.1-1.9 2c-15.1 15.1-23.9 35.8-23.9 57.2s8.7 42.1 23.9 57.2c15.1 15.1 35.8 23.9 57.2 23.9s42.1-8.7 57.2-23.9l177.3-177.3-33.1-33.1-2-1.9z"></path></svg>
);


export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </Icon>
);

export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </Icon>
);

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 200 200" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 25L175 62.5V137.5L100 175L25 137.5V62.5L100 25Z" stroke="#0C2340" strokeWidth="12" strokeLinejoin="round"/>
        <path d="M100 125L175 87.5" stroke="#F5B300" strokeWidth="12"/>
        <path d="M100 125L25 87.5" stroke="#F5B300" strokeWidth="12"/>
        <path d="M100 175V125" stroke="#F5B300" strokeWidth="12"/>
        <path d="M141.667 112.5L100 137.5L58.3333 112.5" stroke="#0C2340" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </Icon>
);

export const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5l-7.5-7.5 7.5-7.5" />
  </Icon>
);

export const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </Icon>
);


export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
  </svg>
);


export const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.75 13.96c.25.13.42.2.48.3.1.13.13.45.08.73-.04.28-.24.53-.47.7-.24.17-.5.28-.88.16-.38-.13-1.13-.4-1.93-1.13-.93-.83-1.55-1.7-1.7-2.08-.13-.38-.03-.58.08-.78.1-.18.24-.25.38-.32.14-.08.28-.1.35-.1.1.02.25.03.38.2.12.18.18.38.2.53.03.15.03.3.02.42-.02.13-.08.28-.15.35-.07.08-.13.15-.2.22-.07.07-.12.13-.1.22.02.08.13.3.28.5.28.35.5.6.78.82.25.2.45.25.58.22.13-.02.32-.12.45-.25s.22-.27.28-.35c.05-.08.1-.13.18-.13h.42zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8-8 8z"/>
    </svg>
);


export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M3 10.5v.75A2.25 2.25 0 005.25 13.5h13.5A2.25 2.25 0 0021 11.25v-.75m-18 0V21a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 21V10.5M16.5 9.75v1.5a2.25 2.25 0 01-2.25 2.25h-4.5a2.25 2.25 0 01-2.25-2.25v-1.5" />
  </Icon>
);

export const DealsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </Icon>
);

export const AccountIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </Icon>
);

export const LanguageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502" />
  </Icon>
);

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </Icon>
);

export const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </Icon>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </Icon>
);

export const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3a9 9 0 100 18 9 9 0 000-18z" opacity=".25"></path>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-9-9"></path>
    </svg>
);

export const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5M12 9v.01M12 12v.01M12 15v.01" />
    </Icon>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </Icon>
);

export const WifiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.136 11.886a9.75 9.75 0 0113.728 0M2 8.732a14.25 14.25 0 0120 0M12 20.25h.008v.008H12v-.008z" />
    </Icon>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.75 2.25.75-2.25h2.25l-.75 2.25.75 2.25h-2.25l-.75-2.25-.75 2.25h-2.25l.75-2.25-.75-2.25h2.25z" />
    </svg>
);

export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </Icon>
);

export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </Icon>
);

export const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-1.5m0 0a6.002 6.002 0 01-5.303-3A6 6 0 0112 3a6 6 0 015.303 13.5h-10.606zM12 16.5v1.5m-3-1.5v1.5m6-1.5v1.5m-9.75-4.5a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm13.5 0a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
    </Icon>
);

export const CreditCardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
    </Icon>
);

export const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </Icon>
);

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
    </Icon>
);

export const QuestionMarkCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </Icon>
);

export const ArrowRightOnRectangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </Icon>
);

export const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </Icon>
);

export const ChefHatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6.25a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zM19.5 6.25a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zM16.5 12.868V18.75a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v-5.882a3.75 3.75 0 01-1.125-2.618v-2.25a3.75 3.75 0 013.75-3.75h3.75a3.75 3.75 0 013.75 3.75v2.25a3.75 3.75 0 01-1.125 2.618zM8.25 12.868V18.75a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-5.882a3.75 3.75 0 001.125-2.618v-2.25a3.75 3.75 0 00-3.75-3.75H8.625a3.75 3.75 0 00-3.75 3.75v2.25a3.75 3.75 0 001.125 2.618zM4.5 6.25a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
  </svg>
);

export const DumbbellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 8.25h10.5M6.75 15.75h10.5M5.25 8.25v7.5m13.5-7.5v7.5M5.25 8.25a1.5 1.5 0 00-1.5 1.5v4.5a1.5 1.5 0 001.5 1.5m13.5-7.5a1.5 1.5 0 011.5 1.5v4.5a1.5 1.5 0 01-1.5 1.5" />
  </svg>
);

export const UserGroupIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023 1.53-1.808 2.65-2.327m2.818.324c1.12.518 2.08.13 2.65-.924m-10.264 4.318c.343.632.77 1.205 1.272 1.71m-2.16-1.71c-.343-.632-.77-1.205-1.272-1.71m12.392 4.072c.622.503 1.343.834 2.112.963m-14.324-1.25c.77.128 1.49.458 2.112.963M6.75 6.75h.008v.008H6.75V6.75zm3.75 0h.008v.008H10.5V6.75zm3.75 0h.008v.008H14.25V6.75z" />
    </Icon>
);

export const FilterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M6.75 9h10.5m-7.5 4.5h4.5" />
    </Icon>
);

export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008v-.008z" />
    </Icon>
);

export const PhotoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
    </Icon>
);
