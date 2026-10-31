import React from 'react';
import { PARTNERS_MARQUEE } from '../data/cynbitData';

export default function Marquee() {
  // Duplicate array for infinite seamless looping
  const partners = [...PARTNERS_MARQUEE, ...PARTNERS_MARQUEE, ...PARTNERS_MARQUEE];

  return (
    <div className="relative py-12 md:py-16 border-y border-outline-variant/10 overflow-hidden bg-surface-container-low/40 dark:bg-surface-dark-container/30">
      <div className="flex whitespace-nowrap gap-16 md:gap-32 items-center animate-marquee hover:[animation-play-state:paused]">
        {partners.map((partner, index) => (
          <span
            key={index}
            className="text-2xl md:text-4xl lg:text-5xl font-headline font-black uppercase tracking-tighter text-slate-400/40 dark:text-slate-600/50 hover:text-primary dark:hover:text-primary-light transition-colors cursor-default select-none transition-all duration-300"
          >
            {partner}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-surface dark:from-surface-dark to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-surface dark:from-surface-dark to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}
