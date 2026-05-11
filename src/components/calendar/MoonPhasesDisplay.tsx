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
      "relative z-10 min-h-[44px] h-full flex flex-col transition-all duration-300",
      "premium-module-bg rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.05)] overflow-hidden",
      "md:bg-[#F9FAFB] md:rounded-[26px] md:border md:border-[rgba(226,232,240,0.7)] md:shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:transition-all md:duration-[220ms] md:ease-out md:hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
    )}>
      {/* Highlight de topo sutil */}
      <div 
        className="absolute inset-x-0 top-0 h-[1.5px] z-30 pointer-events-none" 
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)' }} 
      />
      <div 
        className="relative w-full h-9 md:h-[72px] flex items-center rounded-t-2xl md:rounded-t-[26px] overflow-hidden"
      >
        {/* Mobile gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#818cf8] to-[#6366f1] md:hidden" />
        {/* Desktop gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5b5ff5] to-[#7b61ff] hidden md:block" />

        {/* Conteúdo do Header */}
        <div className="relative flex items-center justify-between pl-2 pr-2 md:px-[22px] z-20 w-full h-full">
          <div className="flex items-center gap-2">
            <h4 className="flex items-center font-semibold md:font-[700] text-white text-[14px] md:text-[17px] uppercase tracking-[0.5px] md:tracking-[0.2px]">
              <Moon className="w-5 h-5 md:w-7 md:h-7 text-white drop-shadow-sm mr-1.5 md:mr-2" />
              <span className="md:inline hidden">FASES DA LUA</span>
              <span className="md:hidden">Fases da Lua</span>
            </h4>
          </div>

          <div 
            className={cn(
              "flex flex-row items-center justify-center transition-all duration-300 ml-auto cursor-pointer gap-1",
              "rounded-[7px] py-[1.5px] px-[5px] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(226,232,240,0.9))] border border-blue-500/15 shadow-[0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] text-[#1e3a8a]", // Mobile
              "md:rounded-[16px] md:px-[14px] md:py-[8px] md:backdrop-blur-[10px] md:bg-white/18 md:text-white md:border-none md:shadow-none", // Desktop
              "active:scale-95 active:translate-y-0"
            )}
            style={{ lineHeight: '1.2' }}
          >
            <CalendarDays className="w-[16px] h-[16px] text-white hidden md:block" />
            <span className="font-bold uppercase tracking-[0.2px] text-[12px] md:text-[13px] md:text-white">{MONTHS[month]?.substring(0, 3)}</span>
            <span className="font-bold text-[12px] md:text-[13px] text-red-700/95 md:text-white">/{year}</span>
          </div>
        </div>
      </div>


      <div className="px-1.5 md:px-[28px] pt-[5px] md:pt-[28px] pb-1 md:pb-[28px] flex flex-col justify-center items-center flex-1 w-full bg-transparent md:bg-[#F9FAFB] rounded-b-2xl md:rounded-b-[26px]">
        <div className="flex flex-row justify-between md:justify-around items-center w-full gap-1 md:gap-[16px]">
          {moonPhases.map((phase, index) => {
            const monthAbbr = (MONTHS[month] || 'Mês').substring(0, 3);
            const formattedMonth = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1).toLowerCase();

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center transition-all duration-200 flex-1 min-w-0 md:min-w-[120px] cursor-pointer group md:gap-[10px]"
              >
                <span className="text-xl md:text-[42px] mb-1 md:mb-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] filter saturate-[1.3] brightness-[1.05] transition-all duration-200 group-hover:scale-110 leading-none">
                  {phase.phaseIcon}
                </span>
                <span className="text-[10px] md:text-[16px] font-semibold md:font-[700] text-[#1F2937] text-center leading-tight uppercase tracking-tighter md:tracking-normal opacity-90 truncate w-full px-0.5 md:px-0">
                  {phase.phaseName}
                </span>
                <div className="flex flex-row mt-0.5 md:mt-0 items-center justify-center bg-transparent text-[#6366f1] text-[9px] md:text-[15px] leading-none md:font-[700] shrink-0 border-none shadow-none">
                  <span className="font-bold md:font-[700] uppercase tracking-tight md:tracking-normal">{String(phase.date).padStart(2, '0')}</span>
                  <span className="font-bold md:font-[700] opacity-80 md:opacity-100 ml-[1px] uppercase">/{formattedMonth}</span>
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