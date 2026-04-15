"use client";

import React from 'react';
import { Moon, CalendarDays } from 'lucide-react';
import { MONTHS } from '@/utils/calendar-utils';
import { cn } from '@/lib/utils';

interface MoonPhaseData {
  date: number;
  phaseName: string;
  phaseIcon: string;
}

interface MoonPhasesDisplayProps {
  moonPhases: MoonPhaseData[];
  month: number;
  year: number;
}

const MoonPhasesDisplay: React.FC<MoonPhasesDisplayProps> = ({ moonPhases, month, year }) => {
  return (
    <div className="premium-module-bg rounded-[16px] relative z-10 min-h-[44px] h-full flex flex-col overflow-hidden transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.05)]">
      {/* Highlight de topo sutil */}
      <div 
        className="absolute inset-x-0 top-0 h-[1.5px] z-30 pointer-events-none" 
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)' }} 
      />
      <div 
        className="relative w-full h-9 md:h-[52px] flex items-center"
        style={{ background: 'linear-gradient(180deg, #818cf8 0%, #6366f1 100%)' }}
      >
        {/* Conteúdo do Header */}
        <div className="relative flex items-center justify-between pl-1.5 pr-1.5 md:pl-6 md:pr-4 z-20 w-full">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-white text-[14px] lg:text-[17px] uppercase tracking-[0.5px]">
              Fases da Lua
            </h4>
          </div>

          <div 
            className={cn(
              "flex flex-row items-center justify-center transition-all duration-300 ml-auto rounded-[10px] md:rounded-full cursor-pointer gap-1.5",
              "py-[2px] px-[6px] md:py-[6px] md:px-[12px]",
              "active:scale-95 active:translate-y-0"
            )}
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(226,232,240,0.9))',
              border: '1px solid rgba(59,130,246,0.15)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
              lineHeight: '1.2'
            }}
          >
            <CalendarDays size={16} className="text-[#1e3a8a] opacity-90" />
            <span className="font-bold uppercase tracking-[0.2px] text-[#1e3a8a] text-[12px] md:text-[13px]">{MONTHS[month]?.substring(0, 3)}</span>
            <span className="font-bold text-[12px] md:text-[13px]" style={{ color: 'rgba(185, 28, 28, 0.95)' }}>/{year}</span>
          </div>
        </div>
      </div>


      <div className="px-1.5 md:px-6 pt-0.5 md:pt-3 pb-0 md:pb-5 flex flex-col justify-center items-center flex-1 w-full">
        <div className="flex flex-nowrap gap-3 md:gap-8 justify-center w-full overflow-x-auto pb-2">
          {moonPhases.map((phase, index) => {
            const monthAbbr = (MONTHS[month] || 'Mês').substring(0, 3);
            const formattedMonth = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1).toLowerCase();

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center px-0.5 py-0.5 transition-all duration-200 w-12 md:w-16 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 cursor-pointer"
              >
                <span className="text-2xl md:text-3xl mb-1.5 drop-shadow-[0_3px_10px_rgba(0,0,0,0.2)] filter saturate-[1.3] brightness-[1.05] transition-all duration-200 hover:scale-110">{phase.phaseIcon}</span>
                <span className="text-[13px] md:text-[15px] lg:text-[16px] font-medium text-[#1F2937] text-center leading-[1.6] uppercase tracking-tighter opacity-90">
                  {phase.phaseName}
                </span>
                <div className="flex flex-row mt-0.5 md:mt-1.5 items-center justify-center py-0 px-0 bg-transparent text-[#6366f1] text-[11px] md:text-[14px] leading-[1.6] md:leading-[1.1] shrink-0 border-none shadow-none">
                  <span className="font-semibold md:font-bold uppercase tracking-wide">{String(phase.date).padStart(2, '0')}</span>
                  <span className="font-semibold md:font-bold opacity-90 ml-[2px] uppercase">/{formattedMonth}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoonPhasesDisplay;