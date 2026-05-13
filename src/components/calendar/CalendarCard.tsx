"use client";

import React from 'react';
import { useCalendarData } from '@/hooks/use-calendar-data';
import CalendarGrid from './CalendarGrid';
import { MONTHS, getSeasonDataForDate } from '@/utils/calendar-utils';
import { cn } from '@/lib/utils';
import type { CalendarMode } from '@/hooks/use-calendar-mode';
import type { CalendarEvent } from '@/hooks/use-calendar-events';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { CalendarDays } from 'lucide-react';

interface CalendarCardProps {
    month: number;
    year: number;
    today: Date;
    onDayClick: (day: number) => void;
    goToToday: () => void;
    formatToday: () => string;
    isCenter?: boolean;
    position?: 'left' | 'right' | 'center' | 'far';
    mode?: CalendarMode;
    agendamentos?: any[];
    onViewAgendamento?: (date: string, id?: string) => void;
    onOpenCreateDrawer?: () => void;
    selectedPeriod?: { start: string, end: string } | null;
    calendarEvents?: CalendarEvent[];
    viewMode?: 'mensal' | 'anual';
}

const CalendarCard: React.FC<CalendarCardProps> = ({
    month,
    year,
    today,
    onDayClick,
    goToToday,
    formatToday,
    isCenter = false,
    position = 'center',
    mode = '24x48',
    agendamentos = [],
    onViewAgendamento,
    onOpenCreateDrawer,
    selectedPeriod,
    calendarEvents = [],
    viewMode = 'mensal',
}) => {
    const { calendarData, todayDayOfWeek, todayColors, isCurrentMonthAndYear } = useCalendarData({
        month,
        year,
        today,
        mode,
        calendarEvents,
    });

    const [isDesktopState, setIsDesktopState] = React.useState(false);

    React.useEffect(() => {
        const checkIsDesktop = () => {
            setIsDesktopState(window.innerWidth >= 1024);
        };
        checkIsDesktop();
        window.addEventListener('resize', checkIsDesktop);
        return () => window.removeEventListener('resize', checkIsDesktop);
    }, []);

    const getSeasonData = (m: number, y: number) => {
        const now = new Date();
        const isCurrentMonth = now.getMonth() === m && now.getFullYear() === y;
        const targetDay = isCurrentMonth ? now.getDate() : 15;

        const seasonInfo = getSeasonDataForDate(m, targetDay);

        const gradients: Record<string, { bg: string, text: string, border: string }> = {
            'Primavera': {
                bg: 'linear-gradient(to bottom, #fff5f8, #ffe4e6)',
                text: '#be185d',
                border: '#fbcfe8'
            },
            'Verão': {
                bg: 'linear-gradient(to bottom, #f0fdf4, #dcfce7)',
                text: '#166534',
                border: '#bbf7d0'
            },
            'Outono': {
                bg: 'linear-gradient(to bottom, #fff7ed, #ffedd5)',
                text: '#9a3412',
                border: '#fed7aa'
            },
            'Inverno': {
                bg: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)',
                text: '#075985',
                border: '#bae6fd'
            }
        };

        const style = gradients[seasonInfo.name] || gradients['Primavera'];

        return {
            name: seasonInfo.name,
            emoji: seasonInfo.emoji,
            style
        };
    };

    const season = getSeasonData(month, year);

    const seasonImages: Record<string, string> = {
        "VERÃO": "/season/verao.webp",
        "OUTONO": "/season/outono.webp",
        "INVERNO": "/season/inverno.webp",
        "PRIMAVERA": "/season/primavera.webp"
    };

    const bgImage = seasonImages[season.name.toUpperCase()] || seasonImages["PRIMAVERA"];

    return (
        <div
            className={cn(
                "w-full transition-all duration-500 ease-out flex flex-col",
                viewMode === 'anual' ? "p-0 bg-[#F9FAFB] shadow-sm border overflow-hidden" : "px-2 py-2 md:px-5 md:pt-0 md:pb-7 md:overflow-hidden",
                viewMode === 'anual' ? "" : "md:bg-white backdrop-blur-sm md:backdrop-blur-none",
                "antialiased [font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [contain:paint]",
                viewMode === 'anual' ? "rounded-t-[18px] rounded-b-[14px]" : "border border-slate-300/35 shadow-[0_4px_12px_rgba(15,23,42,0.03),inset_0_1px_2px_rgba(0,0,0,0.02)]",
                viewMode === 'anual' ? "" : "md:border md:border-[rgba(226,232,240,0.92)] md:shadow-[0_10px_30px_rgba(15,23,42,0.04),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_4px_rgba(0,0,0,0.02)]",
                viewMode === 'anual' ? "" : "rounded-2xl md:rounded-[24px] bg-clip-padding",
                "relative group/card"
            )}
            style={{
                background: viewMode === 'anual' ? '#F9FAFB' : (!isDesktopState ? '#ffffff' : 'linear-gradient(180deg, #ffffff 0%, #fcfdfe 100%)'),
                borderColor: viewMode === 'anual' ? 'rgba(170, 180, 195, 0.75)' : undefined
            }}
        >
            {/* Brilho superior sutil */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none opacity-50 z-20" />

            <div
                className={cn(
                    "flex justify-between items-start",
                    viewMode === 'anual' ? "h-[50px] md:h-[65px]" : "md:-mx-5 md:mt-0 md:px-5 md:pt-4 md:h-[99px] md:rounded-t-[24px]",
                    viewMode === 'anual' && !isDesktopState ? "hidden" : "md:flex",
                    "mb-0 relative overflow-hidden border-none outline-none shadow-none",
                    viewMode === 'anual' ? "bg-[#F9FAFB]" : "bg-transparent"
                )}
            >
                {/* Background da Estação */}
                <div
                    className="absolute inset-0 z-0 border-none outline-none contrast-[1.02] saturate-[1.05]"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    {/* Overlay local para melhorar integração e legibilidade */}
                    <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                            background: viewMode === 'anual' 
                                ? 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.05) 100%)' 
                                : 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.6) 92%, #ffffff 100%), radial-gradient(circle at top left, rgba(0,0,0,0.15) 0%, transparent 50%)'
                        }}
                    />
                </div>

                {/* Container Unificado para Badge e Estação */}
                <div className={cn(
                    "absolute z-20 flex items-start justify-between",
                    viewMode === 'anual' ? "top-[9px] left-[10px] right-[10px]" : "top-[12px] left-[16px] right-[16px]"
                )}>
                    {/* Badge Única: Mês e Ano */}
                    <div
                        className={cn(
                            "flex items-center justify-center transition-all duration-300 gap-2.5 antialiased rounded-[14px] md:rounded-full cursor-pointer",
                            "active:scale-95 active:translate-y-0 active:brightness-[0.98]"
                        )}
                        style={{ 
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(241,245,249,0.95))',
                            border: '1px solid rgba(59,130,246,0.18)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
                            padding: viewMode === 'anual' ? '4px 8px' : '8px 18px',
                            lineHeight: '1.3',
                            textShadow: 'none'
                        }}
                    >
                        <CalendarDays size={viewMode === 'anual' ? 14 : 20} className="text-[#1e3a8a] opacity-90 transform translate-y-[0.5px]" />
                        <span className={cn(
                            "text-[#1e3a8a] font-bold select-none tracking-[0.2px]",
                            viewMode === 'anual' ? "text-[13px]" : "text-base md:text-[18px]"
                        )}>
                            {MONTHS[month]}
                        </span>
                        <span className="text-[#1e3a8a] opacity-20 font-bold select-none">•</span>
                        <span className={cn(
                            "font-bold select-none tracking-[0.2px]",
                            viewMode === 'anual' ? "text-[14px]" : "text-base md:text-[19px]"
                        )} style={{ color: 'rgba(185, 28, 28, 0.95)' }}>
                            {year}
                        </span>
                    </div>

                    {/* Badge da Estação (Desktop) */}
                    <div className="flex items-center">
                        <Tooltip delayDuration={viewMode === 'anual' ? 999999 : 300}>
                            <TooltipTrigger asChild>
                                <div
                                    className={cn(
                                        "transition-all duration-500 cursor-pointer select-none group/season shadow-[0_4px_10px_rgba(0,0,0,0.12)] flex items-center justify-center overflow-hidden",
                                        viewMode === 'anual' ? "hover:pr-3" : "hover:scale-[1.10]"
                                    )}
                                    style={{
                                        padding: '4px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(226,232,240,0.9))',
                                        color: season.style.text,
                                        fontWeight: '800',
                                        border: `1px solid rgba(59,130,246,0.15)`,
                                        height: viewMode === 'anual' ? '25px' : '40px',
                                        minWidth: viewMode === 'anual' ? '25px' : '40px',
                                        width: 'fit-content'
                                    }}
                                >
                                    <span className={cn(
                                        "transform transition-transform group-hover/season:rotate-12 flex items-center justify-center",
                                        viewMode === 'anual' ? "text-sm w-[17px]" : "text-xl"
                                    )}>{season.emoji}</span>
                                    
                                    {viewMode === 'anual' && (
                                        <span className="max-w-0 opacity-0 group-hover/season:max-w-[100px] group-hover/season:opacity-100 group-hover/season:ml-2 transition-all duration-500 whitespace-nowrap text-[10px] uppercase tracking-widest overflow-hidden">
                                            {season.name}
                                        </span>
                                    )}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent
                                side="left"
                                className={cn(
                                    "bg-white/95 backdrop-blur-md border border-gray-100 shadow-xl font-bold text-[#334155] uppercase tracking-wider py-2 px-3 text-[11px] rounded-[10px]",
                                    viewMode === 'anual' && "hidden"
                                )}
                                sideOffset={8}
                            >
                                Estação: <span style={{ color: season.style.text }}>{season.name}</span>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    "relative opacity-100 transition-colors duration-500",
                    viewMode === 'anual' 
                        ? "p-2 md:p-3 mt-0" 
                        : "p-0 md:px-0 md:pt-1 md:pb-2 md:mt-0 md:rounded-none md:shadow-none",
                )}
                style={{
                    background: 'transparent',
                    border: 'none'
                }}
            >
                <CalendarGrid
                    calendarData={calendarData}
                    isTransitioning={false}
                    todayDayOfWeek={todayDayOfWeek}
                    todayColors={todayColors}
                    isCurrentMonthAndYear={isCurrentMonthAndYear}
                    onDayClick={onDayClick}
                    agendamentos={agendamentos}
                    onViewAgendamento={onViewAgendamento}
                    month={month}
                    year={year}
                    selectedPeriod={selectedPeriod}
                    viewMode={viewMode}
                />

                {/* Botões de Ação Compactos - Mobile apenas */}
                <div className="md:hidden absolute bottom-0.5 right-0 z-20 flex items-center gap-1.5">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToToday();
                        }}
                        className={cn(
                            "text-[11px] font-bold uppercase tracking-tight",
                            "transition-all duration-300 cursor-pointer",
                            "h-[32px] px-3 rounded-[9px] flex items-center gap-1",
                            "bg-clip-padding saturate-[1.05] border border-black/[0.1]",
                            "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_0_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.08)]",
                            "active:translate-y-[1px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_0_rgba(0,0,0,0.1)] active:scale-[0.98]",
                            todayColors.bg === 'bg-calendar-blue' && "bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white",
                            todayColors.bg === 'bg-calendar-green' && "bg-gradient-to-br from-[#2ecc71] to-[#27ae60] text-white",
                            todayColors.bg === 'bg-calendar-yellow' && "bg-gradient-to-br from-[#fde047] to-[#f59e0b] text-[#1A1A1A]",
                            mode === 'adm' && "bg-[#FEE2E2] text-red-800 active:bg-red-200 border-red-300/45",
                        )}
                    >
                        <span>{season.emoji} Hoje: {formatToday()}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CalendarCard);
