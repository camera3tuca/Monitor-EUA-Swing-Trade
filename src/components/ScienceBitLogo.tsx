import React from 'react';

interface ScienceBitLogoProps {
  variant?: 'light' | 'dark' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLink?: boolean;
  className?: string;
}

export const ScienceBitLogo: React.FC<ScienceBitLogoProps> = ({
  variant = 'light',
  size = 'md',
  showLink = true,
  className = '',
}) => {
  // Height sizing
  const heightClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-12',
  }[size];

  const content = (
    <div className={`inline-flex items-center select-none transition-all duration-200 group ${className}`}>
      {variant === 'badge' ? (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-md shadow-slate-900/20 px-3 py-1.5 rounded-xl flex items-center hover:border-blue-400 hover:shadow-blue-500/10 transition">
          <img
            src="/sciencebit-logo.svg"
            alt="ScienceBit Computer"
            className={`${heightClasses} w-auto object-contain`}
          />
        </div>
      ) : variant === 'dark' ? (
        <img
          src="/sciencebit-logo.svg"
          alt="ScienceBit Computer"
          className={`${heightClasses} w-auto object-contain hover:brightness-110 transition`}
        />
      ) : (
        /* Default 'light' text variant for dark background (navbar / footer) */
        <div className="flex items-center gap-1.5">
          <img
            src="/sciencebit-logo-white.svg"
            alt="ScienceBit Computer"
            className={`${heightClasses} w-auto object-contain hover:brightness-110 transition`}
          />
        </div>
      )}
    </div>
  );

  if (showLink) {
    return (
      <a
        href="https://sciencebit.com.br"
        target="_blank"
        rel="noopener noreferrer"
        title="ScienceBit Computer - sciencebit.com.br"
        className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        {content}
      </a>
    );
  }

  return content;
};
