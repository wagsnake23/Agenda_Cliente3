"use client";

import React, { useMemo } from 'react';
import { MONTHS } from '@/utils/calendar-utils';
import { cn } from '@/lib/utils';
import { Cake, CalendarDays, ChevronRight } from 'lucide-react';
import { getBirthdaysForMonth } from '@/hooks/use-calendar-events';
import type { CalendarEvent } from '@/hooks/use-calendar-events';

interface BirthdayMessagesProps {
  month: number;
  year: number;
  highlightedDay: number | null;
  calendarEvents?: CalendarEvent[];
}

const BirthdayMessages: React.FC<BirthdayMessagesProps> = ({ month, year, highlightedDay, calendarEvents = [] }) => {
  const monthName = (MONTHS[month] || '').substring(0, 3);
  const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase();

  const currentMonthBirthdays = useMemo(() => {
    return getBirthdaysForMonth(calendarEvents, month, year)
      .map(b => ({
        day: b.day,
        name: b.name,
        dateFormatted: `${String(b.day).padStart(2, '0')}/${formattedMonth}`
      }));
  }, [month, year, calendarEvents, formattedMonth]);

  const isEmpty = currentMonthBirthdays.length === 0;

  return (
    <div className={cn(
      "relative z-10 min-h-[100px] h-full flex flex-col transition-all duration-300",
      "bg-[#f8fafc] rounded-2xl shadow-[0_4px_12px_rgba(15,23,42,0.03),inset_0_1px_2px_rgba(0,0,0,0.02)] border border-slate-300/35 overflow-hidden",
      "md:bg-[#f8fafc] md:rounded-[22px] md:border md:border-[rgba(226,232,240,0.92)] md:shadow-[0_10px_30px_rgba(15,23,42,0.04),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_4px_rgba(0,0,0,0.02)] md:overflow-hidden md:transition-all md:duration-[200ms] md:ease-out",
      isEmpty ? "hidden lg:flex" : "flex"
    )}>
      {/* Highlight de topo sutil */}

      <div
        className="relative w-full h-[54px] md:h-[92px] flex items-center rounded-t-2xl md:rounded-t-[22px] overflow-hidden"
      >
        {/* Gradient overlay for Mobile */}
        <div className="absolute inset-0 bg-[#f59e0b] md:hidden" />

        {/* Gradient overlay for Desktop */}
        <div
            className="absolute inset-0 hidden md:block"
            style={{
                background: `radial-gradient(circle at 85% 20%, rgba(255,255,255,0.18), transparent 35%), linear-gradient(135deg, #D97706 0%, #F59E0B 45%, #FBBF24 100%)`
            }}
        />

        {/* Conteúdo do Header */}
        <div className="relative flex items-center justify-between px-[16px] md:px-[34px] z-20 w-full h-full">
          <div className="flex items-center">
            {/* Mobile Header Modernizado */}
            <div className="flex md:hidden items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Cake className="w-[18px] h-[18px] text-[#f59e0b]" />
              </div>
              <h4 className="font-bold text-white text-[14px] uppercase tracking-[0.8px]">
                ANIVERSARIANTES
              </h4>
            </div>

            {/* Desktop Header Premium */}
            <div className="hidden md:flex items-center">
              <div 
                className="w-[54px] h-[54px] rounded-full flex items-center justify-center text-[26px] shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.10)'
                }}
              >
                <Cake className="w-[26px] h-[26px] text-white" />
              </div>
              <div className="flex flex-col ml-4">
                <span 
                  className="text-[20px] font-[800] tracking-[0.2px] text-[#ffffff] leading-none uppercase"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  Aniversariantes
                </span>
                <span className="text-[14px] font-[500] text-[rgba(255,255,255,0.85)] mt-[6px] leading-none">Celebrando a vida</span>
              </div>
            </div>
          </div>

          {/* Mobile Month Badge */}
          <div
            className={cn(
              "flex md:hidden flex-row items-center justify-center transition-all duration-300 ml-auto cursor-pointer gap-2",
              "rounded-[16px] px-[16px] py-[8px] backdrop-blur-[10px] bg-[rgba(255,255,255,0.16)] text-[#ffffff] border border-[rgba(255,255,255,0.14)]",
              "active:scale-95 active:translate-y-0"
            )}
            style={{ lineHeight: '1.2' }}
          >
            <span className="font-bold uppercase tracking-[0.2px] text-[#ffffff] text-[12px]">{MONTHS[month]?.substring(0, 3)} {year}</span>
          </div>

          {/* Desktop Premium Month Badge */}
          <div
            className={cn(
              "hidden md:flex flex-row items-center justify-center transition-all duration-300 ml-auto cursor-pointer gap-2",
              "rounded-[16px] px-[16px] py-[8px] text-[#ffffff]",
              "active:scale-95 active:translate-y-0"
            )}
            style={{
              lineHeight: '1.2',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 0 12px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <span className="font-bold uppercase tracking-[0.2px] text-[#ffffff] text-[15px]">{MONTHS[month]?.substring(0, 3)} {year}</span>
          </div>
        </div>
      </div>


      <div className="pt-[11px] pb-[14px] px-[13px] md:px-[22px] md:pt-[24px] md:pb-[24px] flex flex-col justify-start flex-1 bg-transparent md:bg-transparent rounded-b-2xl md:rounded-b-[22px]">
        {isEmpty ? (
          <div className="flex flex-col items-start justify-start pt-3 pb-4 gap-1 px-1">
            <div className="flex items-center gap-2.5 opacity-60">
              <Cake className="w-5 h-5 md:w-6 md:h-6 text-gray-400 opacity-60" />
              <span className="text-[11px] md:text-[14px] font-bold md:font-[500] text-gray-400 uppercase md:normal-case tracking-[1px] md:tracking-normal leading-tight">
                Nenhum aniversariante para este mês
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[10px] md:gap-[14px] relative md:before:hidden w-full pt-1 md:pt-0">
            {currentMonthBirthdays.map((data, i) => {
              const isHighlighted = data.day === highlightedDay;

              return (
                <React.Fragment key={i}>
                  <div
                    className={cn(
                      "cursor-transition-all duration-150 ease-in-out group w-full",
                      "flex flex-row items-center justify-between min-h-[56px] p-[6px_10px_6px_8px] rounded-[14px] bg-[#ffffff] border border-slate-200/60 shadow-[0_2px_10px_rgba(15,23,42,0.04),inset_0_1.5px_3px_rgba(0,0,0,0.03)]", // Mobile
                      "active:scale-[0.98] active:shadow-sm hover:-translate-y-[1px] md:hover:-translate-y-[1px]",
                      "md:min-h-[78px] md:p-[12px_18px_12px_13px] md:rounded-[18px] md:border md:border-slate-300/50 md:bg-[#ffffff] md:shadow-[0_2px_10px_rgba(15,23,42,0.035)] md:hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)] md:active:shadow-sm md:active:scale-[0.98]", // Desktop
                      isHighlighted && "bg-yellow-100 md:bg-yellow-100 text-yellow-800 ring-2 ring-yellow-400 rounded-[16px] md:rounded-[18px] z-20 animate-bounce-twice font-semibold",
                      !isHighlighted && "text-[#1F2937]"
                    )}
                  >
                    <div className={cn(
                      "flex items-center gap-3 md:gap-[16px] flex-1 relative min-w-0",
                      "-ml-[2px] md:ml-0"
                    )}>
                      {/* Date Block */}
                      <div className={cn(
                        "flex flex-col items-center justify-center bg-[rgba(245,158,11,0.10)] md:bg-[rgba(245,158,11,0.10)] rounded-[12px] md:rounded-[16px] py-0 px-0 min-w-[46px] w-[46px] h-[46px] md:min-w-[64px] md:w-[64px] md:h-[64px] md:flex-col md:border-none md:shadow-none shrink-0",
                        "ml-[2px] md:ml-0"
                      )}>
                        <span className="font-[800] text-[18px] md:text-[28px] text-[#f59e0b] md:text-[#f59e0b] leading-[1] md:leading-[1] tracking-tight md:font-[800] uppercase md:uppercase">{String(data.day).padStart(2, '0')}</span>
                        <span className="font-[700] text-[9px] md:text-[12px] text-[#f59e0b] md:text-[#f59e0b] md:opacity-[0.82] mt-[1px] md:mt-[4px] leading-none uppercase md:uppercase md:font-[700]">{formattedMonth}</span>
                      </div>

                      {/* Icon Circle & Text Area */}
                      <div className="flex flex-row items-center gap-3 md:gap-[16px] flex-1 min-w-0 pr-1">
                          {/* Icon Circle */}
                          <div className={cn(
                              "w-[38px] h-[38px] md:w-[48px] md:h-[48px] md:bg-[rgba(148,163,184,0.08)] rounded-full flex items-center justify-center shrink-0 bg-amber-500/10"
                          )}>
                              <span className="text-[20px] md:text-[24px] md:filter-none filter saturate-[1.3] brightness-[1.1] leading-none">🎂</span>
                          </div>
                          
                          <div className="flex flex-col min-w-0 flex-1 md:justify-center">
                              <span className="text-[14px] md:text-[16px] font-bold md:font-[700] leading-[1.2] text-[#1e293b] md:text-[#1e293b] truncate uppercase">
                                  {data.name.replace(/Bombeiro\s+/i, '')}
                              </span>
                              
                              <span className="text-[13px] md:text-[18px] font-medium md:font-[500] text-[#64748b] md:text-[#64748b] mt-[1px] md:mt-[4px] truncate lowercase first-letter:uppercase">
                                  Aniversário
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

export default BirthdayMessages;