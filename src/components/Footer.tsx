import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={cn(
            "w-full mt-auto bg-gradient-to-b from-[#0F172A] to-[#111827] md:bg-none md:bg-[#0F172A] py-5 md:pt-[27px] md:pb-[43px] border-t border-white/[0.08] md:border-gray-800 shadow-2xl relative z-10",
            className
        )}>
            <div className="w-full max-w-[1600px] mx-auto px-0 md:px-8">
                {/* ---------- MOBILE FOOTER ---------- */}
                <div className="flex flex-col items-center justify-center w-full md:hidden">
                    <div className="flex items-center justify-center gap-[10px]">
                        <img src="/logo.png" alt="Logo" className="w-[38px] h-[38px] object-contain opacity-90 drop-shadow-md" />
                        <h3
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '24px',
                                fontWeight: 700,
                                letterSpacing: '-0.8px',
                                lineHeight: 1,
                                color: '#F8FAFC'
                            }}
                        >
                            Agenda
                        </h3>
                    </div>
                    
                    <p style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: 1.6,
                        color: '#94A3B8',
                        textAlign: 'center',
                        maxWidth: '240px',
                        marginTop: '8px'
                    }}>
                        Calendário inteligente para organização operacional
                    </p>

                    <div style={{
                        width: '72%',
                        height: '1px',
                        background: 'rgba(255,255,255,0.06)',
                        marginTop: '18px',
                        marginBottom: '14px'
                    }} />

                    <div style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#94A3B8',
                        marginBottom: '0px'
                    }}>
                        © 2026 Agenda
                    </div>

                    <div className="flex items-center justify-center gap-[8px]" style={{ fontSize: '13px', fontWeight: 500, color: '#94A3B8' }}>
                        <span>Design by</span>
                        <a
                            href="https://api.whatsapp.com/send?phone=5514991188921&text=Olá!%20Tenho%20interesse%20no%20Calendário%20Prontidão.%20Podemos%20conversar?"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-[8px] hover:opacity-80 transition-opacity"
                        >
                            <span style={{ color: '#3B82F6', fontWeight: 600 }}>BM Vagner</span>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px] opacity-90" style={{ color: '#94A3B8' }}>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* ---------- DESKTOP FOOTER ---------- */}
                <div className="hidden md:flex flex-row items-center justify-between w-full">
                    {/* Lado Esquerdo */}
                    <div className="flex items-center gap-3">
                        <img 
                            src="/logo.png" 
                            alt="Logo" 
                            className="w-14 h-14 opacity-90 drop-shadow-md object-contain" 
                        />
                        <div className="flex flex-col items-start">
                            <h3
                                className="font-bold text-xl tracking-wider uppercase whitespace-nowrap flex gap-2 leading-none relative z-10"
                                style={{
                                    textShadow: `
                                        0 1px 0 rgba(255,255,255,0.25),
                                        0 2px 4px rgba(0,0,0,0.25),
                                        0 6px 10px rgba(0,0,0,0.15)
                                    `
                                }}
                            >
                                <span 
                                    style={{ 
                                        background: 'linear-gradient(180deg, #eef6ff 10%, #93c5fd 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        color: 'transparent'
                                    }}
                                >
                                    CALENDÁRIO AGENDA
                                </span>
                            </h3>
                            <p className="text-gray-400 text-[14px] font-medium max-w-[400px] mt-[2px] leading-[1.6]">
                                Calendário digital de organização de escala operacional
                            </p>
                        </div>
                    </div>

                    {/* Lado Direito */}
                    <div className="flex flex-col items-end gap-1.5">
                        <span className="text-gray-400 text-[12px] font-semibold tracking-wide uppercase whitespace-nowrap">
                            © 2026 — <span style={{ 
                                background: 'linear-gradient(180deg, #eef6ff 10%, #93c5fd 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent'
                            }}>CALENDÁRIO AGENDA</span>
                        </span>

                        <div className="flex items-center gap-1.5 text-[14px] font-medium text-gray-400 whitespace-nowrap">
                            <span>Design by</span>
                            <a
                                href="https://api.whatsapp.com/send?phone=5514991188921&text=Olá!%20Tenho%20interesse%20no%20Calendário%20Prontidão.%20Podemos%20conversar?"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                                style={{ color: '#25D366' }}
                            >
                                BM Vagner
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
