import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={cn(
            "w-screen md:w-full relative left-1/2 right-1/2 md:left-auto md:right-auto -ml-[50vw] md:ml-0 -mr-[50vw] md:mr-0 mt-auto bg-gradient-to-b from-[#0F172A] to-[#111827] md:bg-none md:bg-[#0F172A] pt-[12px] pb-[21px] md:pt-[27px] md:pb-[43px] border-t border-white/[0.08] md:border-gray-800 shadow-2xl z-10",
            className
        )}>
            <div className="w-full max-w-[1400px] mx-auto px-0 md:px-8">
                {/* ---------- MOBILE FOOTER ---------- */}
                {/* ---------- MOBILE FOOTER ---------- */}
                <div className="flex flex-col items-center justify-center w-full md:hidden px-4">
                    {/* Bloco Principal Centralizado */}
                    <div className="flex items-center justify-center gap-[16px] w-full max-w-[340px]">
                        {/* Logo Maior */}
                        <img 
                            src="/logo.png" 
                            alt="Logo" 
                            className="w-[64px] h-[64px] object-contain opacity-90 drop-shadow-xl shrink-0" 
                        />
                        
                        {/* Bloco de Texto ao Lado */}
                        <div className="flex flex-col items-start justify-center text-left">
                            <h3
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.8px',
                                    lineHeight: 1,
                                    color: '#F8FAFC',
                                    marginBottom: '8px'
                                }}
                            >
                                Agenda
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                fontWeight: 500,
                                lineHeight: 1.5,
                                color: '#94A3B8',
                                maxWidth: '220px'
                            }}>
                                Calendário inteligente para organização operacional
                            </p>
                        </div>
                    </div>
                    
                    {/* Divisor com Opacidade Reduzida */}
                    <div style={{
                        width: '72%',
                        height: '1px',
                        background: 'rgba(255,255,255,0.06)',
                        opacity: 0.6,
                        marginTop: '22px',
                        marginBottom: '16px'
                    }} />

                    <div style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#94A3B8',
                        marginBottom: '4px'
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
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px] opacity-90" style={{ color: '#25D366' }}>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* ---------- DESKTOP FOOTER ---------- */}
                <div className="hidden md:flex flex-row items-center justify-between w-full">
                    {/* Lado Esquerdo */}
                    <div className="flex items-center gap-[16px]">
                        <img 
                            src="/logo.png" 
                            alt="Logo" 
                            className="w-14 h-14 opacity-90 drop-shadow-md object-contain" 
                        />
                        <div className="flex flex-col items-start">
                            <h3
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '25px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.6px',
                                    lineHeight: 1,
                                    color: '#F8FAFC'
                                }}
                            >
                                Agenda
                            </h3>
                            <p style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '15px',
                                fontWeight: 500,
                                lineHeight: 1.6,
                                color: '#94A3B8',
                                marginTop: '6px'
                            }}>
                                Calendário inteligente para organização operacional
                            </p>
                        </div>
                    </div>

                    {/* Lado Direito */}
                    <div className="flex flex-col items-end justify-center gap-[8px]">
                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#94A3B8' }}>
                            © 2026 Agenda
                        </div>

                        <div className="flex items-center gap-[8px]" style={{ fontSize: '14px', fontWeight: 500, color: '#94A3B8' }}>
                            <span>Design by</span>
                            <a
                                href="https://api.whatsapp.com/send?phone=5514991188921&text=Olá!%20Tenho%20interesse%20no%20Calendário%20Prontidão.%20Podemos%20conversar?"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-[8px] hover:opacity-80 transition-opacity"
                            >
                                <span style={{ color: '#3B82F6', fontWeight: 600 }}>BM Vagner</span>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px] opacity-90" style={{ color: '#25D366' }}>
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
