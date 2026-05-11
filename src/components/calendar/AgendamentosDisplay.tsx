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
                "bg-[#ffffff] rounded-2xl shadow-[0_4px_12px_rgba(15,23,42,0.03),inset_0_1px_2px_rgba(0,0,0,0.02)] border border-slate-300/35 overflow-hidden",
                "md:bg-[#ffffff] md:rounded-[22px] md:border md:border-[rgba(226,232,240,0.92)] md:shadow-[0_10px_30px_rgba(15,23,42,0.04),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_4px_rgba(0,0,0,0.02)] md:overflow-hidden md:transition-all md:duration-[200ms] md:ease-out",
                isEmpty ? "hidden md:flex" : "flex"
            )}
        >
            {/* Highlight de topo sutil */}

            <div
                className="relative w-full h-[54px] md:h-[92px] flex items-center rounded-t-2xl md:rounded-t-[22px] overflow-hidden"
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-[#3b82f6]" />

                {/* Conteúdo do Header */}
                <div className="relative flex items-center justify-between px-[16px] md:px-[34px] z-20 w-full h-full">
                    <div className="flex items-center">
                        {/* Mobile Header Modernizado */}
                        <div className="flex md:hidden items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <ClipboardList className="w-[18px] h-[18px] text-[#3b82f6]" />
                            </div>
                            <h4 className="font-bold text-white text-[14px] uppercase tracking-[0.8px]">
                                AGENDAMENTOS
                            </h4>
                        </div>

                        {/* Desktop Header Premium */}
                        <div className="hidden md:flex items-center">
                            <div className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center text-[26px] shrink-0 shadow-sm">
                                <ClipboardList className="w-[26px] h-[26px] text-[#3b82f6]" />
                            </div>
                            <div className="flex flex-col ml-4">
                                <span className="text-[20px] font-[800] tracking-[0.2px] text-[#ffffff] leading-none uppercase">Agendamentos</span>
                                <span className="text-[14px] font-[500] text-[rgba(255,255,255,0.85)] mt-[6px] leading-none">Lista de compromissos do mês</span>
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
                        <CalendarDays className="w-[16px] h-[16px] text-white hidden" />
                        <span className="font-bold uppercase tracking-[0.2px] text-[#ffffff] text-[12px] md:text-[15px]">{MONTHS[month]?.substring(0, 3)} {year}</span>
                    </div>
                </div>
            </div>

            <div className="p-[14px] md:px-[22px] md:pt-[24px] md:pb-[24px] flex flex-col justify-start flex-1 bg-transparent md:bg-[#ffffff] rounded-b-2xl md:rounded-b-[22px]">
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
                    <div className="flex flex-col gap-[10px] md:gap-[14px] relative md:before:hidden w-full pt-1 md:pt-0">
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
                                            "flex flex-row items-center justify-between min-h-[56px] p-[6px_10px_6px_8px] rounded-[14px] bg-[#ffffff] border border-slate-200/60 shadow-[0_2px_10px_rgba(15,23,42,0.04),inset_0_1.5px_3px_rgba(0,0,0,0.03)]", // Mobile
                                            "active:scale-[0.98] active:shadow-sm hover:-translate-y-[1px] md:hover:-translate-y-[1px]",
                                            "md:min-h-[78px] md:p-[12px_18px_12px_13px] md:rounded-[18px] md:border md:border-[rgba(226,232,240,0.55)] md:bg-[#fcfcfd] md:shadow-[0_2px_10px_rgba(15,23,42,0.035)] md:hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)] md:active:shadow-sm md:active:scale-[0.98]", // Desktop
                                            isHighlighted && "bg-yellow-100 md:bg-yellow-100 text-yellow-800 ring-2 ring-yellow-400 rounded-[16px] md:rounded-[18px] z-20 animate-bounce-twice font-semibold"
                                        )}
                                    >
                                        <div className={cn(
                                            "flex items-center gap-3 md:gap-[16px] w-full relative",
                                            "md:items-center",
                                            "md:before:hidden"
                                        )}>
                                            {/* Date Block */}
                                            <div className="flex flex-col items-center justify-center bg-[rgba(37,99,235,0.08)] md:bg-[rgba(59,130,246,0.08)] rounded-[12px] md:rounded-[16px] py-0 px-0 min-w-[48px] w-[48px] h-[48px] md:min-w-[64px] md:w-[64px] md:h-[64px] md:flex-col md:border-none md:shadow-none shrink-0">
                                                <span className="font-[800] text-[18px] md:text-[28px] text-[#2563eb] md:text-[#2563eb] leading-[1] md:leading-[1] tracking-tight md:font-[800] md:uppercase">{dia}</span>
                                                <span className="font-[700] text-[9px] md:text-[12px] text-[#2563eb] md:text-[#2563eb] md:opacity-[0.82] mt-[1px] md:mt-[4px] leading-none md:font-[700] uppercase md:uppercase">{mes}</span>
                                            </div>

                                            {/* Icon Circle & Text Area */}
                                            <div className="flex flex-row items-center gap-3 md:gap-[16px] flex-1 min-w-0 pr-1">
                                                {/* Icon Circle */}
                                                <div className="w-[38px] h-[38px] md:w-[48px] md:h-[48px] md:bg-[rgba(148,163,184,0.08)] rounded-full flex items-center justify-center bg-blue-500/10 shrink-0">
                                                    {emoji && <span className="text-[20px] md:text-[24px] md:filter-none filter saturate-[1.3] brightness-[1.1] md:leading-none">{emoji}</span>}
                                                </div>

                                                <div className={cn(
                                                    "flex flex-col min-w-0 flex-1 md:justify-center",
                                                    isEventSpecial ? "overflow-hidden" : "whitespace-normal"
                                                )}>
                                                    {isEventSpecial ? (
                                                        <>
                                                            <span className="text-[14px] md:text-[16px] font-bold md:font-[700] leading-[1.2] text-[#1e293b] md:text-[#1e293b] truncate uppercase">
                                                                {displayTipoNome}
                                                            </span>
                                                            {timeStr && (
                                                                <span className="text-[13px] md:text-[18px] font-medium md:font-[500] text-[#64748b] md:text-[#64748b] shrink-0 whitespace-nowrap mt-[1px] md:mt-[4px] lowercase first-letter:uppercase">
                                                                    <span className="md:inline hidden">- </span><span className="text-[12px] md:text-[14px] saturate-150 drop-shadow-sm mx-[1px] md:hidden">🕗</span> {timeStr}
                                                                </span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-[14px] md:text-[16px] font-bold md:font-[700] leading-[1.2] text-[#1e293b] md:text-[#1e293b] truncate uppercase">
                                                                {displayTipoNome}
                                                            </span>
                                                            {userName && (
                                                                <span className="text-[13px] md:text-[18px] font-medium md:font-[500] text-[#64748b] md:text-[#64748b] mt-[1px] md:mt-[4px] truncate lowercase first-letter:uppercase">
                                                                    <span className="md:inline hidden"> </span>{userName}
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
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
