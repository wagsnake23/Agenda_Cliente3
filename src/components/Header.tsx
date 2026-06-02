import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogIn, LogOut, Users, CalendarDays, ClipboardList, ChevronDown, Bell } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { useCalendarEventsContext } from '@/context/CalendarEventsContext';
import { useAgendamentos } from '@/hooks/useAgendamentos';
import { cn } from '@/lib/utils';

export const UserMenu = () => {
    const { profile, signOut, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const initials = profile?.nome
        ? profile.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
        : 'U';

    return (
        <div ref={ref} className="relative z-[102]">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 px-[14px] py-[6px] rounded-xl bg-[#2d3f63] hover:bg-[#3a5585] transition-all duration-300 ease-in-out text-white border border-white/[0.08] group"
            >
                <div className="w-[34px] h-[34px] rounded-full overflow-hidden border border-white/20 ring-2 ring-white/30 group-hover:ring-yellow-400 transition-all duration-300">
                    {profile?.foto_url ? (
                        <img src={profile.foto_url} alt={profile.nome} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-[11px] font-black">
                            {initials}
                        </div>
                    )}
                </div>
                <span className="text-[16px] font-semibold hidden md:block max-w-[120px] truncate">
                    {profile?.nome?.split(' ')[0] || 'Usuário'}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2.5 border-b border-gray-100">
                        <p className="font-bold text-slate-700 text-sm truncate">{profile?.nome}</p>
                        <p className="text-slate-400 text-xs truncate">{profile?.email}</p>
                    </div>

                    <button
                        onClick={() => { navigate('/meu-perfil'); setOpen(false); }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-bold text-left whitespace-nowrap"
                    >
                        <span className="w-5 flex justify-center shrink-0 text-[17px] drop-shadow-sm leading-none">👤</span> Meu Perfil
                    </button>

                    <button
                        onClick={() => { navigate(`/agendamentos?usuario=${profile?.id}`); setOpen(false); }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-bold text-left whitespace-nowrap"
                    >
                        <span className="w-5 flex justify-center shrink-0 text-[17px] drop-shadow-sm leading-none">🗓️</span> Meus Agendamentos
                    </button>

                    <div className="border-t border-gray-100">
                        <button
                            onClick={() => { signOut(); setOpen(false); }}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-red-500 hover:bg-red-50 transition-colors text-sm font-bold text-left whitespace-nowrap"
                        >
                            <div className="w-5 flex justify-center shrink-0">
                                <LogOut size={16} />
                            </div> Sair
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Header = () => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { events: calendarEvents } = useCalendarEventsContext();
    const { agendamentos: agendamentosDB } = useAgendamentos();

    const todayStr = useMemo(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }, []);

    const todayAppointmentsCount = useMemo(() => {
        // Combinar agendamentos do DB com eventos do calendário de hoje
        const countAgs = agendamentosDB.filter(ag => ag.data_inicial === todayStr).length;
        const countEvents = calendarEvents.filter(ev => {
            const datePart = ev.date.includes('T') ? ev.date.split('T')[0] : (ev.date.includes(' ') ? ev.date.split(' ')[0] : ev.date);
            return datePart === todayStr && (ev.type === 'holiday' || ev.type === 'event');
        }).length;
        return countAgs + countEvents;
    }, [agendamentosDB, calendarEvents, todayStr]);

    const handleOpenTodayAppointments = () => {
        if (location.pathname !== '/') {
            navigate('/');
            // Pequeno delay para garantir que o componente Calendar foi montado
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('open-today-appointments'));
            }, 100);
        } else {
            window.dispatchEvent(new CustomEvent('open-today-appointments'));
        }
    };

    const handleAgendar = () => {
        window.dispatchEvent(new CustomEvent('open-global-agendamento-modal'));
    };

    return (
        <>
            {/* Barra de Título Institucional - Desktop Apenas */}
            <header 
                className="hidden lg:flex fixed top-0 w-full h-[76px] bg-[#243552] items-center z-[100] select-none border-b border-white/10"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(255,255,255,0.05)' }}
            >
                <div className="w-full max-w-[1400px] mx-auto px-8 flex items-center justify-between">
                    <div onClick={() => navigate('/')} className="flex items-center gap-[10px] cursor-pointer relative">
                        <img
                            src="/logo.png"
                            alt="Logo Calendário"
                            className="w-[48px] h-[48px] object-contain pointer-events-auto relative z-10 opacity-90 drop-shadow-md"
                        />
                        <div className="flex flex-col justify-center pointer-events-auto select-none relative z-10 antialiased" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            <h1
                                style={{
                                    fontSize: '25px',
                                    fontWeight: 700,
                                    color: '#FFFFFF',
                                    letterSpacing: '-0.6px',
                                    lineHeight: 1,
                                    textShadow: '0 1px 1px rgba(0,0,0,0.35)'
                                }}
                            >
                                Agenda
                            </h1>
                            <span 
                                style={{
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    color: '#BFD3EA',
                                    marginTop: '4px',
                                    lineHeight: 1
                                }}
                            >
                                CALENDÁRIO INTELIGENTE
                            </span>
                        </div>
                    </div>

                    {/* Área de Auth - Alinhada à Direita */}
                    <div className="flex items-center gap-6">
                        {/* Enquanto auth carrega, não exibir nenhum botão (evita flash de estado incorreto) */}
                        {!loading && (
                            isAuthenticated ? (
                                <>
                                    {/* Links do Menu */}
                                    <div className="flex items-center gap-2">
                                        {/* Admin Menu */}
                                        {isAdmin && (
                                            <button
                                                onClick={() => navigate('/usuarios')}
                                                className={`px-3 py-2 rounded-lg text-[17px] font-medium tracking-wide transition-all duration-200 ease-in-out relative group flex items-center gap-2 ${location.pathname.startsWith('/usuarios')
                                                    ? 'text-white bg-white/10'
                                                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                                                    }`}
                                            >
                                                <Users size={18} strokeWidth={2.5} className="text-white" />
                                                <span>Usuários</span>
                                                {location.pathname.startsWith('/usuarios') && (
                                                    <div className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#fef08a] rounded-full shadow-[0_0_8px_rgba(254,240,138,0.6)]" />
                                                )}
                                            </button>
                                        )}

                                        <button
                                            onClick={() => navigate('/admin/calendario')}
                                            className={`px-3 py-2 rounded-lg text-[17px] font-medium tracking-wide transition-all duration-200 ease-in-out relative group flex items-center gap-2 ${location.pathname.startsWith('/admin/calendario')
                                                ? 'text-white bg-white/10'
                                                : 'text-white/90 hover:bg-white/10 hover:text-white'
                                                }`}
                                        >
                                            <CalendarDays size={18} strokeWidth={2.5} className="text-white" />
                                            <span>Feriados e Datas</span>
                                            {location.pathname.startsWith('/admin/calendario') && (
                                                <div className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#fef08a] rounded-full shadow-[0_0_8px_rgba(254,240,138,0.6)]" />
                                            )}
                                        </button>

                                        {/* Agendamentos */}
                                        <button
                                            onClick={() => navigate('/agendamentos')}
                                            className={`px-3 py-2 rounded-lg text-[17px] font-medium tracking-wide transition-all duration-200 ease-in-out relative group flex items-center gap-2 ${location.pathname === '/agendamentos'
                                                ? 'text-white bg-white/10'
                                                : 'text-white/90 hover:bg-white/10 hover:text-white'
                                                }`}
                                        >
                                            <ClipboardList size={18} strokeWidth={2.5} className="text-white" />
                                            <span>Agendamentos</span>
                                            {location.pathname === '/agendamentos' && (
                                                <div className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#fef08a] rounded-full shadow-[0_0_8px_rgba(254,240,138,0.6)]" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Botão Agendar */}
                                    <button
                                        onClick={handleAgendar}
                                        className="px-6 py-2.5 rounded-xl lg:rounded-2xl font-black uppercase text-[13px] tracking-wider text-[#0B1221] bg-gradient-to-br from-[#fef08a] via-[#facc15] to-[#eab308] hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center gap-2 border-none ring-0 outline-none"
                                    >
                                        <span className="relative top-[-1px] text-[16px]">📝</span> Agendar
                                    </button>

                                    {/* Avatar Dropdown */}
                                    <UserMenu />
                                </>
                            ) : (
                                <button
                                    onClick={() => navigate('/auth')}
                                    className="px-5 py-2 rounded-xl lg:rounded-2xl font-black uppercase text-sm text-[#0B1221] bg-gradient-to-b from-[#fef08a] to-[#facc15] shadow-md hover:brightness-110 transition-all duration-200 cursor-pointer flex items-center gap-2 border-none ring-0 outline-none"
                                >
                                    <LogIn size={16} strokeWidth={3} /> Entrar
                                </button>
                            )
                        )}
                    </div>
                </div>
            </header>

            {/* Header Mobile/Tablet */}
            <header className="relative w-full flex flex-row items-center justify-between mt-0 md:mt-0 pt-[12px] pb-[4px] select-none lg:hidden md:relative md:z-auto md:h-auto">
                <div className="flex items-center cursor-pointer relative -top-[1px]" onClick={() => navigate('/')}>
                    <div className="flex items-center gap-2.5 w-full max-w-[320px]">
                        <img
                            src="/logo.png"
                            alt="Logo Calendário"
                            className="w-[44px] h-[44px] object-contain transition-transform duration-300 hover:scale-105 shrink-0"
                            style={{ filter: 'none' }}
                        />
                        <div className="flex flex-col justify-between h-[44px] py-[2px] select-none antialiased" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            <h1
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 800,
                                    color: '#2447A5',
                                    letterSpacing: '-1px',
                                    lineHeight: 1
                                }}
                            >
                                Agenda
                            </h1>
                            <span 
                                style={{
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    letterSpacing: '1.4px',
                                    color: '#64748B',
                                    lineHeight: 1
                                }}
                            >
                                Calendário Inteligente
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    {/* Sino de Notificações Mobile */}
                    <div
                        onClick={todayAppointmentsCount > 0 ? handleOpenTodayAppointments : undefined}
                        className={cn(
                            "relative transition-transform left-[4px]",
                            todayAppointmentsCount > 0
                                ? "cursor-pointer active:scale-90"
                                : "opacity-40"
                        )}
                    >
                        <Bell
                            size={24}
                            color={todayAppointmentsCount > 0 ? "#1e40af" : "#94A3B8"}
                            strokeWidth={2.5}
                            className={cn(
                                "opacity-90",
                                todayAppointmentsCount > 0 && "filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                            )}
                        />
                        {todayAppointmentsCount > 0 && (
                            <span className={cn(
                                "absolute -top-[6px] -right-[5px] text-white text-[9px] font-black rounded-full px-[5px] py-[1.5px]",
                                "flex items-center justify-center",
                                "bg-[radial-gradient(circle_at_30%_30%,#ff6b6b_0%,#ef4444_60%,#b91c1c_100%)]",
                                "shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)]",
                                "border border-red-600/20"
                            )}>
                                {todayAppointmentsCount}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-end w-10 relative -bottom-[1px] left-[2px]">
                        <MobileMenu />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
