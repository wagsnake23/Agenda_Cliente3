"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { MONTHS } from '@/utils/calendar-utils';
import { Agendamento } from './DrawerAgendamento';
import { CalendarDays, ChevronRight, ClipboardList } from 'lucide-react';

interface AgendamentosDisplayProps {
    agendamentos: Agendamento[];
    month: number;
    year: number;
    highlightedDay: number | null;
    onViewAgendamento: (date: string, id?: string) => void;
}

const AgendamentosDisplay: React.FC<AgendamentosDisplayProps> = ({
    agendamentos,
    month,
    year,
    highlightedDay,
    onViewAgendamento
}) => {
    // Sem lógica de deduplicação ou filtragem pesada: o componente pai (Calendar.tsx) 
    // já entrega a lista filtrada para o mês visível (filteredMonthAgendamentos).
    // Este componente apenas ordena para garantir exibição cronológica.
    const currentMonthAgendamentos = [...agendamentos].sort((a, b) => {
        return new Date(a.dataInicio + 'T12:00:00').getTime() - new Date(b.dataInicio + 'T12:00:00').getTime();
    });

    const isEmpty = currentMonthAgendamentos.length === 0;

    const getDiaMes = (data: string) => {
        const d = new Date(data + 'T12:00:00');
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = (MONTHS[d.getMonth()] || '').substring(0, 3).toUpperCase();
        return { dia, mes };
    };

    return (
        <div
            className={cn(
                "relative z-10 min-h-[100px] h-full flex flex-col transition-all duration-300",
                "bg-[#ffffff] rounded-2xl shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-[#e2e8f0]/70 overflow-hidden",
                "md:bg-[#F9FAFB] md:rounded-[26px] md:border md:border-[rgba(226,232,240,0.7)] md:shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:overflow-hidden md:transition-all md:duration-[220ms] md:ease-out md:hover:-translate-y-[2px] md:hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]",
                isEmpty ? "hidden md:flex" : "flex"
            )}
        >
            {/* Highlight de topo sutil */}
            <div
                className="absolute inset-x-0 top-0 h-[1.5px] z-30 pointer-events-none hidden md:block"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)' }}
            />
            <div
                className="relative w-full h-[50px] md:h-[72px] flex items-center rounded-t-2xl md:rounded-t-[26px] overflow-hidden"
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/90 to-[#60a5fa]/90 md:from-[#1976d2] md:to-[#42a5f5]" />

                {/* Conteúdo do Header */}
                <div className="relative flex items-center justify-between px-[16px] md:px-[22px] z-20 w-full h-full">
                    <div className="flex items-center gap-2">
                        <h4 className="flex items-center font-bold md:font-[700] text-white text-[15px] md:text-[17px] uppercase tracking-[0.5px] md:tracking-[0.2px]">
                            <ClipboardList className="w-5 h-5 md:w-7 md:h-7 text-white drop-shadow-sm mr-1.5 md:mr-2" />
                            <span className="md:inline hidden">AGENDAMENTOS</span>
                            <span className="md:hidden">AGENDAMENTOS</span>
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
                    <div className="flex flex-col items-start justify-start pt-3 pb-4 gap-1 px-1">
                        <div className="flex items-center gap-2.5 opacity-60">
                            <ClipboardList className="w-5 h-5 md:w-6 md:h-6 text-gray-400 opacity-60" />
                            <span className="text-[11px] md:text-[14px] font-bold md:font-[500] text-gray-400 uppercase md:normal-case tracking-[1px] md:tracking-normal leading-tight">
                                Nenhum agendamento para este mês
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-[10px] md:gap-[16px] relative md:before:hidden w-full pt-1 md:pt-0">
                        {currentMonthAgendamentos.map((agendamento, index) => {
                            const isHighlighted = highlightedDay !== null && (() => {
                                const hoverDate = new Date(year, month, highlightedDay, 12, 0, 0);
                                const dInicio = new Date(agendamento.dataInicio + 'T12:00:00');
                                const dFim = new Date(agendamento.dataFim + 'T12:00:00');
                                return hoverDate >= dInicio && hoverDate <= dFim;
                            })();

                            const emoji = agendamento.tipo.split(' ')[0];
                            const tipoNome = agendamento.tipo.replace(emoji, '').trim();
                            const isEventSpecial = agendamento.userName === '_SPECIAL_EVENT_';
                            const userName = isEventSpecial ? '' : (agendamento.userName ? agendamento.userName.split(' ')[0] : 'Usuário');

                            let displayTipoNome = tipoNome;
                            let timeStr = "";
                            if (isEventSpecial && tipoNome.includes(' - 🕗 ')) {
                                const parts = tipoNome.split(' - 🕗 ');
                                displayTipoNome = parts[0].trim();
                                timeStr = parts[1].trim();
                            }
                            const { dia, mes } = getDiaMes(agendamento.dataInicio);
                            const hasContinuation = agendamento.dataInicio !== agendamento.dataFim;

                            return (
                                <React.Fragment key={agendamento.id}>
                                    <div
                                        onClick={() => onViewAgendamento(agendamento.dataInicio, agendamento.id)}
                                        className={cn(
                                            "cursor-pointer transition-all duration-150 ease-in-out w-full origin-left group",
                                            "flex flex-row items-center justify-between min-h-[56px] p-[6px_10px] rounded-[14px] bg-[#ffffff] border border-slate-100/80 shadow-[0_2px_10px_rgba(15,23,42,0.04)]", // Mobile
                                            "active:scale-[0.98] active:shadow-sm hover:-translate-y-[1px] md:hover:-translate-y-[1px]",
                                            "md:min-h-[84px] md:p-[16px_18px] md:rounded-[20px] md:border md:border-[rgba(226,232,240,0.55)] md:shadow-[0_2px_10px_rgba(15,23,42,0.04)] md:hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] md:active:shadow-sm md:active:scale-[0.98]", // Desktop
                                            isHighlighted && "bg-yellow-100 md:bg-yellow-100 text-yellow-800 ring-2 ring-yellow-400 rounded-[16px] md:rounded-[20px] z-20 animate-bounce-twice font-semibold"
                                        )}
                                    >
                                        <div className={cn(
                                            "flex items-center gap-3 md:gap-[16px] w-full relative",
                                            "md:items-center",
                                            "md:before:hidden"
                                        )}>
                                            {/* Date Block */}
                                            <div className="flex flex-col items-center justify-center bg-[rgba(37,99,235,0.08)] md:bg-[#f4f7fb] rounded-[12px] md:rounded-[18px] py-0 px-0 min-w-[50px] w-[50px] h-[50px] md:min-w-[72px] md:w-[72px] md:h-[72px] md:flex-col md:border-none md:shadow-none shrink-0">
                                                <span className="font-[800] text-[18px] md:text-[32px] text-[#2563eb] md:text-[#2563eb] leading-none tracking-tight md:font-[800] md:uppercase">{dia}</span>
                                                <span className="font-[700] text-[9px] md:text-[13px] text-[#2563eb] md:text-[#64748b] opacity-90 mt-[1px] md:mt-[4px] leading-none md:font-[700] uppercase md:uppercase">{mes}</span>
                                            </div>

                                            {/* Icon Circle & Text Area */}
                                            <div className="flex flex-row items-center gap-3 md:gap-[16px] flex-1 min-w-0 pr-1">
                                                {/* Icon Circle */}
                                                <div className="w-[38px] h-[38px] md:w-[54px] md:h-[54px] rounded-full flex items-center justify-center bg-blue-500/10 shrink-0">
                                                    {emoji && <span className="text-[20px] md:text-[28px] filter saturate-[1.3] brightness-[1.1] emoji-desktop-colorful leading-none">{emoji}</span>}
                                                </div>

                                                <div className={cn(
                                                    "flex flex-col min-w-0 flex-1 md:justify-center",
                                                    isEventSpecial ? "overflow-hidden" : "whitespace-normal"
                                                )}>
                                                    {isEventSpecial ? (
                                                        <>
                                                            <span className="text-[14px] md:text-[18px] font-bold md:font-[700] leading-[1.2] text-[#1e293b] md:text-[#1e293b] truncate uppercase md:uppercase">
                                                                {displayTipoNome}
                                                            </span>
                                                            {timeStr && (
                                                                <span className="text-[11px] md:text-[14px] font-medium md:font-[500] text-[#64748b] md:text-[#64748b] shrink-0 whitespace-nowrap mt-[1px] md:mt-[4px]">
                                                                    <span className="md:inline hidden">- </span><span className="text-[12px] md:text-[14px] saturate-150 drop-shadow-sm mx-[1px] emoji-desktop-colorful md:inline hidden">🕗</span> {timeStr}
                                                                </span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-[14px] md:text-[18px] font-bold md:font-[700] leading-[1.2] text-[#1e293b] md:text-[#1e293b] truncate uppercase md:uppercase">
                                                                {displayTipoNome}
                                                            </span>
                                                            {userName && (
                                                                <span className="text-[11px] md:text-[14px] font-medium md:font-[500] text-[#64748b] md:text-[#64748b] mt-[1px] md:mt-[4px] truncate md:truncate">
                                                                    <span className="md:inline hidden"> - </span>{userName}
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chevron */}
                                        <div className="shrink-0 ml-2 md:flex md:items-center md:justify-center hidden">
                                            <ChevronRight className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] text-[#1976d2] opacity-55 md:opacity-45" />
                                        </div>

                                        {hasContinuation && (
                                            <div className="hidden w-full mt-1.5">
                                                <div className="border-b border-dashed border-blue-400/30 flex-1 ml-[10px]" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Separator removed for desktop as we use gap-[16px] now */}
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgendamentosDisplay;
