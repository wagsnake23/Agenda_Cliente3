"use client";

import React from 'react';
import { CalendarDays, Clock3, Moon } from 'lucide-react';
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

// Custom 3D SVG Moon Phase component for desktop premium styling
const RealisticMoon: React.FC<{ phaseName: string; className?: string }> = ({ phaseName, className }) => {
  const name = phaseName.toLowerCase();
  
  // Base textures and crater definitions for high definition depth
  const baseCraters = (
    <g className="opacity-40">
      {/* Oceanus Procellarum / Lunar Maria (seas) */}
      <path d="M25 20 C 15 22, 10 32, 15 45 C 18 50, 30 48, 35 40 C 40 32, 35 18, 25 20 Z" fill="rgba(0,0,0,0.16)" />
      <path d="M55 25 C 65 22, 70 32, 65 45 C 62 50, 50 48, 45 40 C 40 32, 45 18, 55 25 Z" fill="rgba(0,0,0,0.12)" />
      <path d="M35 55 C 25 58, 28 72, 38 75 C 48 78, 55 68, 50 60 C 45 52, 40 52, 35 55 Z" fill="rgba(0,0,0,0.18)" />
      <path d="M60 55 C 70 58, 68 72, 58 75 C 48 78, 45 68, 50 60 C 55 52, 58 52, 60 55 Z" fill="rgba(0,0,0,0.14)" />
      
      {/* Craters (Tycho, Copernicus, Kepler, etc.) */}
      <circle cx="50" cy="74" r="3" fill="rgba(255,255,255,0.45)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
      <path d="M50 74 L 42 66 M50 74 L 58 66 M50 74 L 50 58 M50 74 L 38 74 M50 74 L 62 74" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" strokeDasharray="1 2" />
      
      <circle cx="36" cy="42" r="2.5" fill="rgba(255,255,255,0.3)" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
      <circle cx="28" cy="48" r="1.8" fill="rgba(255,255,255,0.35)" />
      <ellipse cx="48" cy="22" rx="3" ry="1.5" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <circle cx="68" cy="46" r="2" fill="rgba(255,255,255,0.25)" stroke="rgba(0,0,0,0.1)" />
      <circle cx="62" cy="35" r="1.5" fill="rgba(0,0,0,0.15)" />
      <circle cx="44" cy="32" r="1.2" fill="rgba(255,255,255,0.3)" />
    </g>
  );

  if (name.includes('cheia')) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="fullMoonShade" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F5F7FA" />
            <stop offset="85%" stopColor="#D5E0F2" />
            <stop offset="100%" stopColor="#A8BCCC" />
          </radialGradient>
          <filter id="moonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="50" cy="50" r="42" fill="#EBF3FF" opacity="0.3" filter="url(#moonGlow)" />
        <circle cx="50" cy="50" r="42" fill="url(#fullMoonShade)" />
        {baseCraters}
        <circle cx="50" cy="50" r="42" fill="url(#fullMoonShade)" opacity="0.08" style={{ mixBlendMode: 'multiply' }} />
      </svg>
    );
  }
  
  if (name.includes('nova')) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="newMoonShade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E1A3D" />
            <stop offset="75%" stopColor="#100D24" />
            <stop offset="100%" stopColor="#080614" />
          </radialGradient>
          <linearGradient id="newMoonGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#312E81" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="42" stroke="url(#newMoonGlow)" strokeWidth="1" opacity="0.5" />
        <circle cx="50" cy="50" r="42" fill="url(#newMoonShade)" />
        <g className="opacity-[0.12]">
          {baseCraters}
        </g>
        <circle cx="50" cy="50" r="42" stroke="#4F46E5" strokeWidth="0.5" opacity="0.2" />
      </svg>
    );
  }
  
  if (name.includes('cresc')) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="crescMoonShade" cx="65%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F5F7FA" />
            <stop offset="85%" stopColor="#D5E0F2" />
            <stop offset="100%" stopColor="#96AABF" />
          </radialGradient>
          <linearGradient id="crescShadow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="15%" stopColor="#0B0924" stopOpacity="0.98" />
            <stop offset="48%" stopColor="#110E36" stopOpacity="0.85" />
            <stop offset="68%" stopColor="#1F1A52" stopOpacity="0.15" />
            <stop offset="78%" stopColor="#1F1A52" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill="#0B0924" />
        <circle cx="50" cy="50" r="42" fill="url(#crescMoonShade)" />
        {baseCraters}
        <path d="M 50 8 A 42 42 0 0 0 50 92 A 20 42 0 0 0 50 8 Z" fill="url(#crescShadow)" style={{ mixBlendMode: 'multiply' }} />
        <path d="M 50 8 A 42 42 0 0 0 50 92 L 8 50 Z" fill="#0B0924" opacity="0.88" style={{ mixBlendMode: 'multiply' }} />
        <path d="M 50 8 A 42 42 0 0 1 50 92" stroke="#EBF3FF" strokeWidth="0.75" opacity="0.5" />
      </svg>
    );
  }
  
  if (name.includes('ming')) {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="mingMoonShade" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F5F7FA" />
            <stop offset="85%" stopColor="#D5E0F2" />
            <stop offset="100%" stopColor="#96AABF" />
          </radialGradient>
          <linearGradient id="mingShadow" x1="1" y1="0" x2="0" y2="0">
            <stop offset="15%" stopColor="#0B0924" stopOpacity="0.98" />
            <stop offset="48%" stopColor="#110E36" stopOpacity="0.85" />
            <stop offset="68%" stopColor="#1F1A52" stopOpacity="0.15" />
            <stop offset="78%" stopColor="#1F1A52" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill="#0B0924" />
        <circle cx="50" cy="50" r="42" fill="url(#mingMoonShade)" />
        {baseCraters}
        <path d="M 50 8 A 42 42 0 0 1 50 92 A 20 42 0 0 1 50 8 Z" fill="url(#mingShadow)" style={{ mixBlendMode: 'multiply' }} />
        <path d="M 50 8 A 42 42 0 0 1 50 92 L 92 50 Z" fill="#0B0924" opacity="0.88" style={{ mixBlendMode: 'multiply' }} />
        <path d="M 50 8 A 42 42 0 0 0 50 92" stroke="#EBF3FF" strokeWidth="0.75" opacity="0.5" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" fill="#EAEAEA" />
    </svg>
  );
};

const MoonPhasesDisplay: React.FC<MoonPhasesDisplayProps> = ({ moonPhases, month, year }) => {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth(); // 0-indexed to match 'month' prop
  const currentYear = new Date().getFullYear();
  const isCurrentMonthView = currentMonth === month && currentYear === year;
  
  // Find exact phase that corresponds to the current date.
  // The badge "ATUAL" should ONLY appear on the exact date of the phase for the current month.
  const nextPhaseIndex = isCurrentMonthView 
    ? moonPhases.findIndex((p, i) => {
        if (p.date !== currentDay) return false;
        // Prevent highlighting a phase from the next month that wrapped around at the end
        if (i === moonPhases.length - 1 && i > 0 && p.date < moonPhases[i-1].date) return false;
        // Prevent highlighting a phase from the previous month that wrapped around at the beginning
        if (i === 0 && moonPhases.length > 1 && p.date > moonPhases[1].date) return false;
        return true;
      }) 
    : -1;

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
      "min-h-[54px] bg-[#f8fafc] rounded-2xl shadow-[0_4px_12px_rgba(15,23,42,0.03),inset_0_1px_2px_rgba(0,0,0,0.02)] border border-slate-300/45 overflow-hidden",
      "md:min-h-0 md:rounded-[24px] md:border-none md:shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:overflow-hidden md:transition-none premium-astronomy-card"
    )}>
      
      {/* Starry space texture overlay - Desktop only */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden opacity-100 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Dense twinkling stars - Region 1 */}
          <circle cx="2%" cy="5%" r="0.8" fill="#fff" opacity="0.15" />
          <circle cx="5%" cy="12%" r="1.2" fill="#fff" opacity="0.25" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
          <circle cx="8%" cy="28%" r="0.6" fill="#fff" opacity="0.1" />
          <circle cx="11%" cy="8%" r="1" fill="#fff" opacity="0.2" />
          <circle cx="15%" cy="35%" r="0.5" fill="#fff" opacity="0.3" className="animate-pulse" style={{ animationDuration: '4s' }} />
          <circle cx="18%" cy="18%" r="1.5" fill="#fff" opacity="0.15" />
          <circle cx="22%" cy="45%" r="0.8" fill="#fff" opacity="0.25" />
          <circle cx="25%" cy="5%" r="1.1" fill="#fff" opacity="0.2" className="animate-pulse" style={{ animationDuration: '5s' }} />
          <circle cx="28%" cy="25%" r="0.6" fill="#fff" opacity="0.15" />
          <circle cx="32%" cy="12%" r="1.3" fill="#fff" opacity="0.25" />
          <circle cx="35%" cy="40%" r="0.7" fill="#fff" opacity="0.2" className="animate-pulse" style={{ animationDuration: '3.2s' }} />
          <circle cx="39%" cy="22%" r="1" fill="#fff" opacity="0.15" />
          <circle cx="43%" cy="8%" r="0.5" fill="#fff" opacity="0.3" />
          <circle cx="47%" cy="32%" r="1.4" fill="#fff" opacity="0.2" className="animate-pulse" style={{ animationDuration: '4.8s' }} />
          <circle cx="51%" cy="15%" r="0.8" fill="#fff" opacity="0.15" />
          <circle cx="55%" cy="45%" r="1.2" fill="#fff" opacity="0.25" />
          <circle cx="58%" cy="28%" r="0.6" fill="#fff" opacity="0.1" className="animate-pulse" style={{ animationDuration: '3.8s' }} />
          <circle cx="62%" cy="10%" r="1" fill="#fff" opacity="0.2" />
          <circle cx="66%" cy="38%" r="0.8" fill="#fff" opacity="0.15" />
          <circle cx="70%" cy="5%" r="1.5" fill="#fff" opacity="0.25" className="animate-pulse" style={{ animationDuration: '5.5s' }} />
          <circle cx="74%" cy="25%" r="0.7" fill="#fff" opacity="0.2" />
          <circle cx="78%" cy="42%" r="1.1" fill="#fff" opacity="0.15" />
          <circle cx="82%" cy="15%" r="0.5" fill="#fff" opacity="0.3" className="animate-pulse" style={{ animationDuration: '4.2s' }} />
          <circle cx="86%" cy="32%" r="1.3" fill="#fff" opacity="0.2" />
          <circle cx="90%" cy="8%" r="0.8" fill="#fff" opacity="0.15" />
          <circle cx="94%" cy="38%" r="1.2" fill="#fff" opacity="0.25" className="animate-pulse" style={{ animationDuration: '3s' }} />
          <circle cx="98%" cy="20%" r="0.6" fill="#fff" opacity="0.1" />

          {/* Dense twinkling stars - Region 2 */}
          <circle cx="3%" cy="55%" r="1" fill="#fff" opacity="0.2" />
          <circle cx="7%" cy="85%" r="0.5" fill="#fff" opacity="0.15" />
          <circle cx="10%" cy="65%" r="1.4" fill="#fff" opacity="0.25" className="animate-pulse" style={{ animationDuration: '5.2s' }} />
          <circle cx="14%" cy="92%" r="0.8" fill="#fff" opacity="0.1" />
          <circle cx="17%" cy="52%" r="1.1" fill="#fff" opacity="0.2" />
          <circle cx="21%" cy="75%" r="0.6" fill="#fff" opacity="0.3" className="animate-pulse" style={{ animationDuration: '3.6s' }} />
          <circle cx="24%" cy="88%" r="1.3" fill="#fff" opacity="0.15" />
          <circle cx="28%" cy="58%" r="0.7" fill="#fff" opacity="0.2" />
          <circle cx="31%" cy="82%" r="1.5" fill="#fff" opacity="0.25" className="animate-pulse" style={{ animationDuration: '4.6s' }} />
          <circle cx="35%" cy="68%" r="0.9" fill="#fff" opacity="0.15" />
          <circle cx="38%" cy="95%" r="1" fill="#fff" opacity="0.2" />
          <circle cx="42%" cy="55%" r="0.6" fill="#fff" opacity="0.1" className="animate-pulse" style={{ animationDuration: '3.3s' }} />
          <circle cx="46%" cy="78%" r="1.2" fill="#fff" opacity="0.25" />
          <circle cx="50%" cy="90%" r="0.8" fill="#fff" opacity="0.15" />
          <circle cx="54%" cy="62%" r="1.4" fill="#fff" opacity="0.2" className="animate-pulse" style={{ animationDuration: '5.8s' }} />
          <circle cx="57%" cy="85%" r="0.5" fill="#fff" opacity="0.3" />
          <circle cx="61%" cy="52%" r="1" fill="#fff" opacity="0.15" />
          <circle cx="65%" cy="72%" r="1.3" fill="#fff" opacity="0.25" className="animate-pulse" style={{ animationDuration: '4.1s' }} />
          <circle cx="69%" cy="92%" r="0.7" fill="#fff" opacity="0.2" />
          <circle cx="73%" cy="65%" r="1.1" fill="#fff" opacity="0.15" />
          <circle cx="77%" cy="88%" r="0.6" fill="#fff" opacity="0.1" className="animate-pulse" style={{ animationDuration: '3.7s' }} />
          <circle cx="81%" cy="55%" r="1.5" fill="#fff" opacity="0.2" />
          <circle cx="84%" cy="78%" r="0.8" fill="#fff" opacity="0.25" />
          <circle cx="88%" cy="95%" r="1.2" fill="#fff" opacity="0.15" className="animate-pulse" style={{ animationDuration: '4.9s' }} />
          <circle cx="92%" cy="68%" r="0.5" fill="#fff" opacity="0.3" />
          <circle cx="95%" cy="85%" r="1.4" fill="#fff" opacity="0.2" />
          <circle cx="99%" cy="60%" r="0.9" fill="#fff" opacity="0.15" className="animate-pulse" style={{ animationDuration: '3.4s' }} />

          {/* More Constellation lines */}
          <path d="M 5% 12% L 15% 35% L 28% 25% L 22% 45% L 10% 65%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" fill="none" strokeDasharray="1 2" />
          <path d="M 47% 32% L 55% 45% L 66% 38% L 74% 25% L 62% 10%" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4" fill="none" strokeDasharray="2 2" />
          <path d="M 82% 15% L 94% 38% L 84% 78% L 99% 60%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" fill="none" />
          <path d="M 14% 92% L 24% 88% L 31% 82% L 46% 78%" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" fill="none" strokeDasharray="1 1" />
          <path d="M 54% 62% L 65% 72% L 57% 85% L 77% 88%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" fill="none" />
        </svg>
      </div>

      {/* HEADER */}
      <div 
        className="relative w-full h-[54px] md:h-[92px] flex items-center rounded-t-2xl md:rounded-t-none md:px-[34px] overflow-hidden md:justify-between z-10"
      >
        {/* Mobile premium gradient overlay */}
        <div 
          className="absolute inset-0 md:hidden" 
          style={{
            background: 'linear-gradient(135deg, #2E2A8F 0%, #4F46E5 45%, #6D5BFF 100%)'
          }}
        />
        {/* Desktop gradient overlay */}
        <div className="absolute inset-0 hidden md:block md:bg-transparent" />

        <div className="relative flex items-center justify-between px-[16px] md:px-0 z-20 w-full h-full md:flex-row">
          <div className="flex items-center gap-2 md:gap-0">
            {/* Mobile Header */}
            <div className="flex md:hidden items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.10)'
                }}
              >
                <Moon className="w-[18px] h-[18px] text-white" />
              </div>
              <h4 
                className="font-bold text-white text-[14px] uppercase tracking-[0.8px]"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
              >
                FASES DA LUA
              </h4>
            </div>

            {/* Desktop Moon Icon and Title */}
            <div className="hidden md:flex items-center">
              <div 
                className="w-[54px] h-[54px] rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <Moon className="w-[26px] h-[26px] text-white" />
              </div>
              <div className="flex flex-col ml-4">
                <span 
                  className="text-[20px] font-[800] tracking-[0.2px] text-[#ffffff] leading-none uppercase"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                >
                  FASES DA LUA
                </span>
                <span className="text-[14px] font-[500] text-[#ffffff] mt-[6px] leading-none opacity-80">Calendário lunar do mês</span>
              </div>
            </div>
          </div>

          {/* Month Badge */}
          <div 
            className={cn(
              "flex flex-row items-center justify-center transition-all duration-300 ml-auto cursor-pointer gap-2",
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
            <span className="font-bold uppercase tracking-[0.2px] text-[#ffffff] text-[12px] md:text-[15px]">{MONTHS[month]?.substring(0, 3)} {year}</span>
          </div>
        </div>
      </div>

      {/* MOBILE FASES CONTAINER (Inalterado) */}
      <div className="md:hidden px-0.5 pt-[20px] pb-[20px] flex flex-col justify-center items-center flex-1 w-full bg-transparent rounded-b-2xl z-10">
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
                  <span className="font-bold opacity-80 ml-[1px] uppercase">{formattedMonth}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP FASES CONTAINER */}
      <div className="hidden md:flex flex-col bg-transparent rounded-b-[24px] z-10">
        <div className="relative flex flex-row items-stretch justify-between gap-[20px] p-[34px_34px_34px_34px]">
          {/* Timeline connecting moon phases */}
          <div className="absolute top-[50%] left-[34px] right-[34px] h-[1px] z-0 -translate-y-1/2" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,.04), rgba(255,255,255,.16), rgba(255,255,255,.04))' }} />
          
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
                  "flex-1 min-h-[290px] rounded-[24px] p-[24px_16px_20px_16px] flex flex-col items-center justify-between relative transition-all duration-[250ms] ease-out cursor-pointer",
                  isNextPhase 
                    ? "-translate-y-[4px] z-20 hover:-translate-y-[6px]" 
                    : "z-10 hover:-translate-y-[4px]"
                )}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: isNextPhase 
                    ? '0 0 0 1px rgba(168,85,247,0.5), 0 0 40px rgba(168,85,247,0.35)' 
                    : '0 10px 30px rgba(0,0,0,0.25)'
                }}
              >
                {isNextPhase && (
                  <div className="absolute top-[16px] left-[16px] bg-[#8B5CF6] text-white p-[4px_10px] rounded-md text-[10px] font-[700] tracking-[0.6px] uppercase shadow-[0_4px_12px_rgba(139,92,246,0.3)] z-[5]">
                    ATUAL
                  </div>
                )}
                
                <div className="flex flex-col items-center w-full mt-[12px]">
                  <div className="w-[110px] h-[110px] flex items-center justify-center">
                    <span className="text-[90px] leading-none drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)]">
                      {phase.phaseIcon}
                    </span>
                  </div>
                  <span className="text-[17px] font-[700] text-white mt-[16px] text-center leading-tight">{fullPhaseName}</span>
                  <span className="text-[13px] font-[500] text-white/70 leading-[1.4] text-center mt-[6px]">{phaseSubtitle}</span>
                </div>
                
                <div className="flex items-center justify-center gap-[8px] mt-[20px] w-full">
                  {/* Date Badge */}
                  <div className="flex items-center gap-[5px] p-[6px_10px] rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)] text-white/90">
                    <CalendarDays className="w-[12px] h-[12px] text-white/60" />
                    <span className="text-[12px] font-[700] leading-none">{String(phase.date).padStart(2, '0')} {monthAbbr}</span>
                  </div>

                  {/* Time Badge */}
                  <div className="flex items-center gap-[5px] p-[6px_10px] rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-white/70">
                    <Clock3 className="w-[12px] h-[12px] text-white/50" />
                    <span className="text-[12px] font-[600] leading-none">{mockTime}</span>
                  </div>
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