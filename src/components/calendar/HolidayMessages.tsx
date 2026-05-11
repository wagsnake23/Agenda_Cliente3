"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { MONTHS } from '@/utils/calendar-utils';
import { CalendarDays, ChevronRight, PartyPopper, Calendar as CalendarIcon } from 'lucide-react';
import BrasilFlagIcon from '@/components/BrasilFlagIcon';

interface HolidayMessagesProps {
  messages: { day: number; name: string; emoji: string | null; type: string; is_fixed?: boolean; is_system?: boolean }[];
  highlightedDay: number | null;
  month: number;
  year: number;
}

const HolidayMessages: React.FC<HolidayMessagesProps> = ({ messages, highlightedDay, month, year }) => {
  const isEmpty = messages.length === 0;

  const monthName = (MONTHS[month] || '').substring(0, 3);
  const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase();

  return (
    <div className={cn(
      "relative z-10 min-h-[100px] h-full flex flex-col transition-all duration-300",
      "bg-[#ffffff] rounded-2xl shadow-[0_4px_12px_rgba(15,23,42,0.03),inset_0_1px_2px_rgba(0,0,0,0.02)] border border-slate-300/35 overflow-hidden",
      "md:bg-[#ffffff] md:rounded-[22px] md:border md:border-[rgba(226,232,240,0.92)] md:shadow-[0_10px_30px_rgba(15,23,42,0.04),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_4px_rgba(0,0,0,0.02)] md:overflow-hidden md:transition-all md:duration-[200ms] md:ease-out"
    )}>
      {/* Highlight de topo sutil */}

      <div 
        className="relative w-full h-14 md:h-[92px] flex items-center rounded-t-2xl md:rounded-t-[22px] overflow-hidden"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[#ef5350]" />

        {/* Conteúdo do Header */}
        <div className="relative flex items-center justify-between px-[16px] md:px-[34px] z-20 w-full h-full">
          <div className="flex items-center">
            {/* Mobile Header Modernizado */}
            <div className="flex md:hidden items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <PartyPopper className="w-[18px] h-[18px] text-[#ef5350]" />
              </div>
              <h4 className="font-bold text-white text-[14px] uppercase tracking-[0.8px]">
                FERIADOS E DATAS
              </h4>
            </div>

            {/* Desktop Header Premium */}
            <div className="hidden md:flex items-center">
              <div className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center text-[26px] shrink-0 shadow-sm">
                <PartyPopper className="w-[26px] h-[26px] text-[#ef5350]" />
              </div>
              <div className="flex flex-col ml-4">
                <span className="text-[20px] font-[800] tracking-[0.2px] text-[#ffffff] leading-none uppercase">Feriados e Datas</span>
                <span className="text-[14px] font-[500] text-[rgba(255,255,255,0.85)] mt-[6px] leading-none">Datas importantes e feriados</span>
              </div>
            </div>
          </div>

          <div 
            className={cn(
              "flex flex-row items-center justify-center transition-all duration-300 ml-auto cursor-pointer gap-2",
              "rounded-[16px] px-[16px] py-[8px] backdrop-blur-[10px] bg-[rgba(255,255,255,0.16)] text-[#ffffff] border border-[rgba(255,255,255,0.14)]",
              "active:scale-95 active:translate-y-0"
            )}
            style={{ lineHeight: '1.2' }}
          >
            <CalendarIcon className="w-[16px] h-[16px] text-white hidden" />
            <span className="font-bold uppercase tracking-[0.2px] text-[#ffffff] text-[12px] md:text-[15px]">{MONTHS[month]?.substring(0, 3)} {year}</span>
          </div>
        </div>
      </div>

      <div className="p-[14px] md:px-[22px] md:pt-[24px] md:pb-[24px] flex flex-col justify-start flex-1 bg-transparent md:bg-[#ffffff] rounded-b-2xl md:rounded-b-[22px]">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-start py-4">
            <span className="text-[13px] md:text-[14px] font-normal md:font-[500] italic leading-[1.6] px-1 text-gray-400">
              Nenhum feriado ou evento registrado neste mês.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-[10px] md:gap-[14px] relative md:before:hidden w-full pt-1 md:pt-0">
            {messages.map((event, i) => {
              const day = event.day;
              const isHighlighted = day !== null && day === highlightedDay;

              const isInfoEvent = event.type === 'event' ||
                event.name.includes('Páscoa') ||
                event.name.includes('Mães') ||
                event.name.includes('Pais') ||
                event.name.includes('Namorados') ||
                event.name.includes('Mulher') ||
                event.name.includes('Bombeiro') ||
                event.name.includes('Cinzas') ||
                event.name.includes('Início d');

              const emoji = event.emoji;
              const name = event.name;

              return (
                <React.Fragment key={i}>
                  <div
                    className={cn(
                      "cursor-transition-all duration-150 ease-in-out group w-full",
                      "flex flex-row items-center justify-between min-h-[56px] p-[6px_10px_6px_8px] rounded-[14px] bg-[#ffffff] border border-slate-200/60 shadow-[0_2px_10px_rgba(15,23,42,0.04),inset_0_1.5px_3px_rgba(0,0,0,0.03)]", // Mobile
                      "active:scale-[0.98] active:shadow-sm hover:-translate-y-[1px] md:hover:-translate-y-[1px]",
                      "md:min-h-[78px] md:p-[12px_18px_12px_13px] md:rounded-[18px] md:border md:border-[rgba(226,232,240,0.55)] md:bg-[#fcfcfd] md:shadow-[0_2px_10px_rgba(15,23,42,0.035)] md:hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)] md:active:shadow-sm md:active:scale-[0.98]", // Desktop
                      isHighlighted && "bg-yellow-100 md:bg-yellow-100 text-yellow-800 ring-2 ring-yellow-400 rounded-[16px] md:rounded-[18px] z-20 animate-bounce-twice font-semibold"
                    )}
                  >
                    <div className={cn(
                      "flex items-center gap-3 md:gap-[16px] flex-1 relative min-w-0"
                    )}>
                      {/* Date Block */}
                      <div className={cn(
                        "flex flex-col items-center justify-center bg-[rgba(239,68,68,0.08)] md:bg-[rgba(239,68,68,0.08)] rounded-[12px] md:rounded-[16px] py-0 px-0 min-w-[48px] w-[48px] h-[48px] md:min-w-[64px] md:w-[64px] md:h-[64px] md:flex-col md:border-none md:shadow-none shrink-0"
                      )}>
                        <span className="font-[800] text-[18px] md:text-[28px] text-[#ef4444] md:text-[#ef4444] leading-[1] md:leading-[1] tracking-tight md:font-[800] uppercase md:uppercase">{String(day).padStart(2, '0')}</span>
                        <span className="font-[700] text-[9px] md:text-[12px] text-[#ef4444] md:text-[#ef4444] md:opacity-[0.82] mt-[1px] md:mt-[4px] leading-none uppercase md:uppercase md:font-[700]">{formattedMonth}</span>
                      </div>

                      {/* Icon Circle & Text Area */}
                      <div className="flex flex-row items-center gap-3 md:gap-[16px] flex-1 min-w-0 pr-1">
                          {/* Icon Circle */}
                          <div className={cn(
                              "w-[38px] h-[38px] md:w-[48px] md:h-[48px] md:bg-[rgba(148,163,184,0.08)] rounded-full flex items-center justify-center shrink-0",
                              isInfoEvent ? "bg-slate-500/10" : "bg-red-500/10"
                          )}>
                              {emoji ? (
                                <span className="text-[20px] md:text-[24px] md:filter-none filter saturate-[1.3] brightness-[1.1] leading-none">{emoji}</span>
                              ) : (
                                <CalendarIcon className="w-5 h-5 md:w-7 md:h-7 text-gray-400 opacity-60" />
                              )}
                          </div>
                          
                          <div className="flex flex-col min-w-0 flex-1 md:justify-center">
                              <div className="flex items-center gap-1 min-w-0 w-full">
                                   <span className="text-[14px] md:text-[16px] font-bold md:font-[700] leading-[1.2] text-[#1e293b] md:text-[#1e293b] truncate uppercase">
                                       {name}
                                   </span>
                                   {name.includes('Independência do Brasil') && (
                                       <span className="text-[14px] md:text-[16px] shrink-0 saturate-150 drop-shadow-sm emoji-desktop-colorful" style={{transform: 'translateY(-1px)'}}>🇧🇷</span>
                                   )}
                              </div>
                              
                              <span className="text-[13px] md:text-[18px] font-medium md:font-[500] text-[#64748b] md:text-[#64748b] mt-[1px] md:mt-[4px] truncate lowercase first-letter:uppercase">
                                  {isInfoEvent ? 'Data comemorativa' : 'Feriado'}
                              </span>
                          </div>
                      </div>
                    </div>

                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayMessages;