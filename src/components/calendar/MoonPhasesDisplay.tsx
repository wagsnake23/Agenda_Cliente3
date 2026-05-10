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
    <div className={cn(
      "relative z-10 min-h-[44px] h-full flex flex-col overflow-hidden transition-all duration-300",
      "premium-module-bg rounded-[16px] shadow-[0_10px_25px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.05)]"
    )}>
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
        <div className="relative flex items-center justify-between pl-2 pr-2 md:pl-6 md:pr-4 z-20 w-full">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-white text-[14px] lg:text-[17px] uppercase tracking-[0.5px]">
              <span className="emoji-3d mr-1">🌙</span> Fases da Lua
            </h4>
          </div>

          <div 
            className={cn(
              "flex flex-row items-center justify-center transition-all duration-300 ml-auto rounded-[7px] md:rounded-full cursor-pointer gap-1",
              "py-[1.5px] px-[5px] md:py-[6px] md:px-[12px]",
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


      <div className="px-1.5 md:px-6 pt-[5px] md:pt-3 pb-1 md:pb-5 flex flex-col justify-center items-center flex-1 w-full">
        <div className="flex flex-row justify-between items-center w-full gap-1">
          {moonPhases.map((phase, index) => {
            const monthAbbr = (MONTHS[month] || 'Mês').substring(0, 3);
            const formattedMonth = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1).toLowerCase();

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center transition-all duration-200 flex-1 min-w-0 cursor-pointer group"
              >
                <span className="text-xl md:text-2xl lg:text-3xl mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] filter saturate-[1.3] brightness-[1.05] transition-all duration-200 group-hover:scale-110">
                  {phase.phaseIcon}
                </span>
                <span className="text-[10px] md:text-[12px] lg:text-[14px] font-semibold text-[#1F2937] text-center leading-tight uppercase tracking-tighter opacity-90 truncate w-full px-0.5">
                  {phase.phaseName}
                </span>
                <div className="flex flex-row mt-0.5 md:mt-1 items-center justify-center bg-transparent text-[#6366f1] text-[9px] md:text-[12px] lg:text-[13px] leading-none shrink-0 border-none shadow-none">
                  <span className="font-bold uppercase tracking-tight">{String(phase.date).padStart(2, '0')}</span>
                  <span className="font-bold opacity-80 ml-[1px] uppercase">/{formattedMonth}</span>
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