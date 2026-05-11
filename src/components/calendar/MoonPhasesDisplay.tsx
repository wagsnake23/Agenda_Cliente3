"use client";

import React from 'react';
import { Moon, CalendarDays, Clock3, Sparkles, Telescope } from 'lucide-react';
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
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const isCurrentMonthView = currentMonth === month && currentYear === year;
  
  // Encontrar a próxima fase (se o mês for o atual, a primeira fase com data >= hoje)
  const nextPhaseIndex = isCurrentMonthView ? moonPhases.findIndex(p => p.date >= currentDay) : -1;

  const getFullPhaseName = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('cheia')) return 'Lua Cheia';
    if (n.includes('nova')) return 'Lua Nova';
    if (n.includes('cresc')) return 'Lua Crescente';
    if (n.includes('ming')) return 'Lua Minguante';
    return name;
  };

  const getPhaseSubtitle = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('cheia')) return 'Iluminação máxima';
    if (n.includes('nova')) return 'Baixa luminosidade';
    if (n.includes('cresc')) return 'Fase de crescimento';
    if (n.includes('ming')) return 'Iluminação decrescente';
    return '';
  };

  return (
    <div className={cn(
      "relative z-10 h-full flex flex-col transition-all duration-300",
      "min-h-[54px] bg-[#ffffff] rounded-2xl shadow-[0_4px_12px_rgba(15,23,42,0.03),inset_0_1px_2px_rgba(0,0,0,0.02)] border border-slate-300/45 overflow-hidden",
      "md:min-h-0 md:bg-[#ffffff] md:rounded-[24px] md:border md:border-[rgba(226,232,240,0.85)] md:shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:overflow-hidden md:transition-none"
    )}>
      {/* Highlight de topo sutil (Mobile apenas) */}

      
      {/* HEADER */}
      <div 
        className="relative w-full h-[54px] md:h-[92px] flex items-center rounded-t-2xl md:rounded-t-none md:px-[34px] overflow-hidden md:justify-between"
      >
        {/* Mobile gradient overlay */}
        <div className="absolute inset-0 bg-[#6366f1]" />

        <div className="relative flex items-center justify-between px-[16px] md:px-0 z-20 w-full h-full md:flex-row">
          <div className="flex items-center gap-2 md:gap-0">
            {/* Mobile Header Modernizado */}
            <div className="flex md:hidden items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Moon className="w-[18px] h-[18px] text-[#6366f1]" />
              </div>
              <h4 className="font-bold text-white text-[14px] uppercase tracking-[0.8px]">
                FASES DA LUA
              </h4>
            </div>

            {/* Desktop Moon Icon and Title */}
            <div className="hidden md:flex items-center">
              <div className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center text-[26px] shrink-0 shadow-sm">
                <Moon className="w-[26px] h-[26px] text-[#6366f1]" />
              </div>
              <div className="flex flex-col ml-4">
                <span className="text-[20px] font-[800] tracking-[0.2px] text-[#ffffff] leading-none uppercase">FASES DA LUA</span>
                <span className="text-[14px] font-[500] text-[rgba(255,255,255,0.85)] mt-[6px] leading-none">Calendário lunar do mês</span>
              </div>
            </div>
          </div>

          {/* Unified Badge: Month and Year */}
          <div 
            className={cn(
              "flex flex-row items-center justify-center transition-all duration-300 ml-auto cursor-pointer gap-2",
              "rounded-[16px] px-[16px] py-[8px] backdrop-blur-[10px] bg-[rgba(255,255,255,0.16)] text-[#ffffff] border border-[rgba(255,255,255,0.14)]",
              "active:scale-95 active:translate-y-0"
            )}
            style={{ lineHeight: '1.2' }}
          >
            <span className="font-bold uppercase tracking-[0.2px] text-[#ffffff] text-[12px] md:text-[15px]">{MONTHS[month]?.substring(0, 3)} {year}</span>
          </div>
      </div>
      </div>

      {/* MOBILE FASES CONTAINER (Inalterado) */}
      <div className="md:hidden px-0.5 pt-[20px] pb-[20px] flex flex-col justify-center items-center flex-1 w-full bg-transparent rounded-b-2xl">
        <div className="flex flex-row justify-between items-center w-full gap-0.5">
          {moonPhases.map((phase, index) => {
            const monthAbbr = (MONTHS[month] || 'Mês').substring(0, 3);
            const formattedMonth = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1).toLowerCase();

            return (
              <div key={index} className="flex flex-col items-center justify-center transition-all duration-200 flex-1 min-w-0 cursor-pointer group">
                <span className="text-xl mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] filter saturate-[1.3] brightness-[1.05] transition-all duration-200 group-hover:scale-110 leading-none">
                  {phase.phaseIcon}
                </span>
                <span className="text-[10px] font-semibold text-[#1F2937] text-center leading-tight uppercase tracking-tighter opacity-90 w-full px-0.5">
                  {getFullPhaseName(phase.phaseName).replace('Lua ', '')}
                </span>
                <div className="flex flex-row mt-1 items-center justify-center bg-transparent text-[#6366f1] text-[11px] leading-none shrink-0 border-none shadow-none">
                  <span className="font-bold uppercase tracking-tight">{String(phase.date).padStart(2, '0')}</span>
                  <span className="font-bold opacity-80 ml-[1px] uppercase">/ {formattedMonth}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP FASES CONTAINER (Novo Layout Premium) */}
      <div className="hidden md:flex flex-col bg-[#ffffff] rounded-b-[24px]">
        <div className="relative flex flex-row items-stretch justify-between gap-[20px] p-[34px_34px_24px_34px]">
          {/* Timeline conectando as fases */}
          <div className="absolute top-[50%] left-[34px] right-[34px] h-[2px] z-0 -translate-y-1/2" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,.15), rgba(99,102,241,.35), rgba(99,102,241,.15))' }} />
          
          {moonPhases.map((phase, index) => {
            const isNextPhase = isCurrentMonthView ? index === nextPhaseIndex : false;
            const fullPhaseName = getFullPhaseName(phase.phaseName);
            const phaseSubtitle = getPhaseSubtitle(phase.phaseName);
            const monthAbbr = (MONTHS[month] || 'Mês').substring(0, 3).toUpperCase();
            
            const mockTimes = ['18:45', '22:30', '03:15', '11:20'];
            const mockTime = mockTimes[index % 4];

            return (
              <div 
                key={index} 
                className={cn(
                  "flex-1 min-h-[250px] rounded-[24px] p-[24px_20px] flex flex-col items-center justify-between relative transition-all duration-[250ms] ease-out cursor-pointer",
                  isNextPhase 
                    ? "bg-[#ffffff] border-2 border-[rgba(99,102,241,0.32)] shadow-[0_16px_38px_rgba(99,102,241,0.12)] outline outline-[1px] outline-[rgba(99,102,241,0.08)] -translate-y-[4px] z-20 hover:-translate-y-[6px] hover:shadow-[0_22px_46px_rgba(99,102,241,0.18)]" 
                    : "bg-[#fcfcfd] border border-[rgba(226,232,240,0.92)] shadow-[0_8px_24px_rgba(15,23,42,0.04),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_4px_rgba(0,0,0,0.02)] z-10 hover:-translate-y-[4px] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_4px_rgba(0,0,0,0.02)]"
                )}
              >
                {isNextPhase && (
                  <div className="absolute top-[-14px] left-[50%] -translate-x-[50%] bg-[linear-gradient(135deg,#6366f1,#a855f7)] text-[#ffffff] p-[8px_16px] rounded-full text-[12px] font-[700] tracking-[0.4px] uppercase shadow-[0_10px_22px_rgba(99,102,241,0.24)] border border-[rgba(255,255,255,0.22)] z-[5]">
                    PRÓXIMA
                  </div>
                )}
                
                <div className="flex flex-col items-center w-full">
                  <span className={cn(
                    "text-[72px] leading-none mt-[10px]",
                    isNextPhase ? "filter drop-shadow-[0_8px_18px_rgba(255,215,0,0.22)]" : ""
                  )}>{phase.phaseIcon}</span>
                  <span className="text-[20px] font-[700] text-[#1e293b] mt-[18px] text-center leading-tight">{fullPhaseName}</span>
                  <span className="text-[15px] font-[500] text-[#64748b] leading-[1.5] text-center mt-[10px]">{phaseSubtitle}</span>
                </div>
                
                <div className="flex items-center justify-center gap-[10px] mt-[24px] w-full">
                  {/* Badge da Data */}
                  <div className="flex items-center gap-[6px] p-[8px_12px] rounded-full bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.12)]">
                    <CalendarDays className="w-[14px] h-[14px] text-[#6366f1] opacity-90" />
                    <span className="text-[13px] font-[700] text-[#6366f1] leading-none">{String(phase.date).padStart(2, '0')} {monthAbbr}</span>
                  </div>

                  {/* Badge do Horário */}
                  <div className="flex items-center gap-[6px] p-[8px_12px] rounded-full bg-[rgba(148,163,184,0.08)] border border-[rgba(148,163,184,0.12)]">
                    <Clock3 className="w-[14px] h-[14px] text-[#64748b] opacity-90" />
                    <span className="text-[13px] font-[700] text-[#64748b] leading-none">{mockTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloco Inferior Informativo */}
        <div className="mx-[34px] mb-[24px] p-[24px_28px] rounded-[22px] bg-[rgba(99,102,241,0.045)] border border-[rgba(99,102,241,0.08)] flex justify-between items-center gap-[28px]">
          {/* Área Esquerda */}
          <div className="flex items-center gap-[18px]">
            <div className="w-[54px] h-[54px] rounded-full bg-[rgba(99,102,241,0.10)] flex items-center justify-center shrink-0">
              <Sparkles className="w-[24px] h-[24px] text-[#6366f1]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-[700] text-[#1e293b]">Dica Astronômica</span>
              <span className="text-[15px] leading-[1.7] text-[#64748b] mt-[6px] max-w-[760px]">
                Acompanhe as mudanças na iluminação lunar. A fase da lua afeta as marés e cria oportunidades incríveis de observação com equipamentos simples.
              </span>
            </div>
          </div>

          {/* Área Direita (Melhor Horário) */}
          <div className="flex items-center gap-[14px] p-[18px_20px] rounded-[18px] bg-[rgba(255,255,255,0.72)] border border-[rgba(99,102,241,0.10)] min-w-[230px] shrink-0">
            <div className="w-[42px] h-[42px] rounded-full bg-[rgba(99,102,241,0.10)] flex items-center justify-center shrink-0">
              <Telescope className="w-[20px] h-[20px] text-[#6366f1]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-[700] tracking-[0.6px] uppercase text-[#64748b]">Melhor Horário</span>
              <span className="text-[22px] font-[800] text-[#6366f1] leading-none mt-1">21:00 - 02:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonPhasesDisplay;