"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { MONTHS } from '@/utils/calendar-utils';
import { CalendarDays, ChevronRight } from 'lucide-react';
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
      "bg-[#ffffff] rounded-2xl shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-[#e2e8f0]/70 overflow-hidden",
      "md:bg-[#F9FAFB] md:rounded-[26px] md:border md:border-[rgba(226,232,240,0.7)] md:shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:overflow-hidden md:transition-all md:duration-[220ms] md:ease-out md:hover:-translate-y-[2px] md:hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
    )}>
      {/* Highlight de topo sutil */}
      <div 
        className="absolute inset-x-0 top-0 h-[1.5px] z-30 pointer-events-none hidden md:block" 
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)' }} 
      />
      <div 
        className="relative w-full h-[50px] md:h-[72px] flex items-center rounded-t-2xl md:rounded-t-[26px] overflow-hidden"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ef4444]/90 to-[#f87171]/90 md:from-[#ef5350] md:to-[#ff8a80]" />

        {/* Conteúdo do Header */}
        <div className="relative flex items-center justify-between px-[16px] md:px-[22px] z-20 w-full h-full">
          <div className="flex items-center gap-2">
            <h4 className="font-bold md:font-[700] text-white text-[15px] md:text-[17px] uppercase tracking-[0.5px] md:tracking-[0.2px]">
              <span className="emoji-3d mr-1">📅</span> <span className="md:inline hidden">FERIADOS E DATAS</span><span className="md:hidden">Feriados e Datas</span>
            </h4>
          </div>

          <div 
            className={cn(
              "flex flex-row items-center justify-center transition-all duration-300 ml-auto cursor-pointer gap-1",
              "rounded-[14px] px-[10px] py-[5px] backdrop-blur-[10px] bg-white/18 text-white", // Mobile
              "md:rounded-[16px] md:px-[14px] md:py-[8px] md:backdrop-blur-[10px] md:bg-white/18 md:text-white md:border-none md:shadow-none", // Desktop
              "active:scale-95 active:translate-y-0"
            )}
            style={{ lineHeight: '1.2' }}
          >
            <CalendarDays className="w-[16px] h-[16px] text-white hidden md:block" />
            <span className="font-bold uppercase tracking-[0.2px] text-white text-[12px] md:text-[13px]">{MONTHS[month]?.substring(0, 3)}</span>
            <span className="font-bold text-[12px] md:text-[13px] text-white/90 md:text-white">/{year}</span>
          </div>
        </div>
      </div>

      <div className="p-[14px] md:px-[22px] md:pt-[24px] md:pb-[24px] flex flex-col justify-start flex-1 bg-transparent md:bg-[#F9FAFB] rounded-b-2xl md:rounded-b-[26px]">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-start py-4">
            <span className="text-[13px] md:text-[14px] font-normal md:font-[500] italic leading-[1.6] px-1 text-gray-400">
              Nenhum feriado ou evento registrado neste mês.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-[10px] md:gap-[16px] relative md:before:hidden w-full pt-1 md:pt-0">
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
                      "flex flex-row items-center justify-between min-h-[56px] p-[6px_10px] rounded-[14px] bg-[#ffffff] border border-slate-100/80 shadow-[0_2px_10px_rgba(15,23,42,0.04)]", // Mobile
                      "active:scale-[0.98] active:shadow-sm hover:-translate-y-[1px] md:hover:-translate-y-[1px]",
                      "md:min-h-[84px] md:p-[16px_18px] md:rounded-[20px] md:border md:border-[rgba(226,232,240,0.55)] md:shadow-[0_2px_10px_rgba(15,23,42,0.04)] md:hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] md:active:shadow-sm md:active:scale-[0.98]", // Desktop
                      isHighlighted && "bg-yellow-100 md:bg-yellow-100 text-yellow-800 ring-2 ring-yellow-400 rounded-[16px] md:rounded-[20px] z-20 animate-bounce-twice font-semibold",
                      isInfoEvent && !isHighlighted && "text-slate-500",
                      !isInfoEvent && !isHighlighted && "text-[#1F2937]"
                    )}
                  >
                    <div className={cn(
                      "flex items-center gap-3 md:gap-[16px] flex-1 relative min-w-0",
                      "md:items-center",
                      "md:before:hidden"
                    )}>
                      {/* Date Block */}
                      <div className={cn(
                        "flex flex-col items-center justify-center bg-[rgba(239,68,68,0.08)] md:bg-[#f4f7fb] rounded-[12px] md:rounded-[18px] py-0 px-0 min-w-[50px] w-[50px] h-[50px] md:min-w-[72px] md:w-[72px] md:h-[72px] md:flex-col md:border-none md:shadow-none shrink-0"
                      )}>
                        <span className="font-[800] text-[18px] md:text-[32px] text-[#ef4444] md:text-[#2563eb] leading-none tracking-tight md:font-[800] uppercase md:uppercase">{String(day).padStart(2, '0')}</span>
                        <span className="font-[700] text-[9px] md:text-[13px] text-[#ef4444] md:text-[#64748b] opacity-90 mt-[1px] md:mt-[4px] leading-none uppercase md:uppercase md:font-[700]"><span className="md:inline hidden">/</span>{formattedMonth}</span>
                      </div>

                      {/* Icon Circle & Text Area */}
                      <div className="flex flex-row items-center gap-3 md:gap-[16px] flex-1 min-w-0 pr-1">
                          {/* Icon Circle */}
                          <div className={cn(
                              "w-[38px] h-[38px] md:w-[54px] md:h-[54px] rounded-full flex items-center justify-center shrink-0",
                              isInfoEvent ? "bg-slate-500/10 md:bg-slate-500/10" : "bg-red-500/10 md:bg-red-500/10"
                          )}>
                              {emoji ? (
                                <span className="text-[20px] md:text-[28px] filter saturate-[1.3] brightness-[1.1] emoji-desktop-colorful leading-none">{emoji}</span>
                              ) : (
                                <span className="text-[20px] md:text-[28px] filter saturate-[1.3] brightness-[1.1] emoji-desktop-colorful leading-none">📅</span>
                              )}
                          </div>
                          
                          <div className="flex flex-col min-w-0 flex-1 md:justify-center">
                              <div className="flex items-center gap-1 min-w-0 w-full">
                                  <span className="text-[14px] md:text-[18px] font-bold md:font-[700] leading-[1.2] text-[#1e293b] md:text-[#1e293b] truncate uppercase md:uppercase">
                                      {name}
                                  </span>
                                  {name.includes('Independência do Brasil') && (
                                    <div className="md:scale-125 origin-left transition-transform shrink-0 md:mt-0">
                                      <BrasilFlagIcon size={14} />
                                    </div>
                                  )}
                              </div>
                              
                              <span className="text-[11px] md:text-[14px] font-medium md:font-[500] text-[#64748b] md:text-[#64748b] mt-[1px] md:mt-[4px] truncate">
                                  {isInfoEvent ? 'Data comemorativa' : 'Feriado'}
                              </span>
                          </div>
                      </div>
                    </div>
                    
                    {/* Chevron */}
                    <div className="shrink-0 ml-2 md:flex md:items-center md:justify-center hidden">
                        <ChevronRight className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-[#ef5350] opacity-55 md:opacity-45" />
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