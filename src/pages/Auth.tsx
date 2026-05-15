"use client";

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/contexts/ToastProvider';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { loginSchema, LoginInput } from '@/modules/auth/schemas';

const AuthPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const { signIn, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { showSuccessToast, showErrorToast } = useToast();

    const from = (location.state as any)?.from?.pathname || '/';

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, loading, navigate, from]);

    const loginForm = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const handleLogin = async (data: LoginInput) => {
        const { error } = await signIn(data.email, data.password);
        if (error) {
            showErrorToast(error.includes('Invalid login credentials')
                ? 'Email ou senha incorretos'
                : error
            );
        } else {
            showSuccessToast('Login realizado com sucesso!');
            navigate(from, { replace: true });
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetEmail) {
            showErrorToast('Informe seu e-mail para continuar.');
            return;
        }

        setIsResetting(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
                redirectTo: `${window.location.origin}/auth?action=reset_password`,
            });
            if (error) throw error;

            showSuccessToast('Link de recuperação enviado para seu e-mail!');
            setShowResetModal(false);
            setResetEmail('');
        } catch (error: any) {
            showErrorToast(error.message || 'Erro ao enviar link de recuperação.');
        } finally {
            setIsResetting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white md:bg-[url('/background1.webp')] md:bg-cover md:bg-center flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white md:bg-[url('/background1.webp')] md:bg-cover md:bg-center md:bg-no-repeat flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">

            {/* Logo lateral superior esquerda como botão link */}
            <div className="absolute top-6 left-6 z-[60]">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-[10px] group transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <img
                        src="/logo.png"
                        alt="Logo Calendário"
                        className="w-[42px] md:w-[48px] h-[42px] md:h-[48px] object-contain opacity-90 drop-shadow-md"
                    />
                    <div className="flex flex-col justify-center text-left antialiased md:drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        <h1
                            style={{
                                fontSize: '22px',
                                fontWeight: 700,
                                letterSpacing: '-0.6px',
                                lineHeight: 1,
                                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}
                            className="text-blue-900 md:text-white md:[font-size:25px]"
                        >
                            Agenda
                        </h1>
                        <span 
                            style={{
                                fontSize: '10px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                marginTop: '4px',
                                lineHeight: 1
                            }}
                            className="text-slate-500 md:text-[#BFD3EA] md:[font-size:11px] md:[letter-spacing:2px]"
                        >
                            CALENDÁRIO INTELIGENTE
                        </span>
                    </div>
                </button>
            </div>

            <div className="w-full max-w-[390px] relative z-10">
                {/* Card de Login - No Mobile fundo branco direto, no Desktop com Card */}
                <div className="bg-white md:bg-white md:rounded-[21px] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,1),inset_0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden px-4 md:px-8 pt-3 md:pt-3 pb-6 md:pb-1 flex flex-col items-center md:border-[4px] md:border-white/60">

                    {/* Ícone de Segurança */}
                    <img
                        src="/secure.png"
                        alt="Segurança"
                        className="w-20 md:w-20 h-20 md:h-20 drop-shadow-[0_8px_20px_rgba(0,0,0,0.1)] object-contain mb-2 md:mb-0"
                    />

                    {/* Títulos com Gradiente Premium */}
                    <div className="text-center mb-5 md:mb-4">
                        <h1
                            className="font-black text-[24px] md:text-[26px] leading-tight tracking-tight"
                            style={{
                                background: 'linear-gradient(to bottom, #FF4D4D 0%, #D32F2F 50%, #8B0000 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Bem-vindo
                        </h1>
                        <p className="text-slate-700 font-semibold text-[14px] md:text-[15px] mt-[-2px] tracking-tight">
                            Faça login para acessar
                        </p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="w-full space-y-4 md:space-y-2">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-slate-500 md:text-slate-700 text-[13px] font-bold ml-1 opacity-70">Email</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📧</span>
                                <input
                                    {...loginForm.register('email')}
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="w-full h-12 md:h-12 pl-12 pr-4 rounded-2xl bg-[#F1F5F9] border border-slate-200 text-slate-800 placeholder-slate-400 font-bold text-sm md:text-[15.5px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.08)]"
                                />
                            </div>
                            {loginForm.formState.errors.email && (
                                <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase tracking-tighter italic">
                                    {loginForm.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Senha */}
                        <div className="space-y-2">
                            <label className="text-slate-500 md:text-slate-700 text-[13px] font-bold ml-1 opacity-70">Senha</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔐</span>
                                <input
                                    {...loginForm.register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder=""
                                    className="w-full h-12 md:h-12 pl-12 pr-12 rounded-2xl bg-[#F1F5F9] border border-slate-200 text-slate-800 placeholder-slate-400 font-bold text-sm md:text-[15.5px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.08)]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {loginForm.formState.errors.password && (
                                <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase tracking-tighter italic">
                                    {loginForm.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Botão Entrar Anterior (Texto e Ícones) */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loginForm.formState.isSubmitting}
                                className="w-full h-12 md:h-12 rounded-2xl bg-gradient-to-b from-[#E53935] to-[#B71C1C] hover:from-[#EF5350] hover:to-[#C62828] text-white font-black text-[17.5px] shadow-[0_1px_0_#991B1B,0_8px_16px_rgba(183,28,28,0.15)] active:translate-y-[1px] active:shadow-none transition-all duration-150 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3 border border-white/10"
                            >
                                {loginForm.formState.isSubmitting ? (
                                    <><Loader2 size={24} className="animate-spin" /> Entrando...</>
                                ) : (
                                    <>🚀 Entrar</>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Esqueci a Senha */}
                    <button
                        type="button"
                        className="mt-[27px] md:mt-3 mb-4 md:mb-0 text-blue-900 font-black text-[14.5px] hover:text-blue-700 transition-all decoration-blue-900/30 underline-offset-4"
                        onClick={() => setShowResetModal(true)}
                    >
                        Esqueceu sua senha?
                    </button>

                    {/* Footer Desktop - Dentro do card */}
                    <div className="hidden md:block mt-5 text-slate-800 text-[10px] font-bold uppercase tracking-wider">
                        © {new Date().getFullYear()} - Calendário Agenda - by Vagner
                    </div>
                </div>
            </div>

            {/* Footer Mobile específico pinado embaixo fora do card */}
            <div className="md:hidden fixed bottom-0 left-0 w-full text-center text-slate-900 text-[10px] font-bold uppercase tracking-wider z-50 bg-gradient-to-t from-white via-white/90 to-transparent pt-6 pb-4">
                © {new Date().getFullYear()} - Calendário Agenda - by Vagner
            </div>

            {showResetModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-2">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowResetModal(false)} />
                    <div className="relative bg-white rounded-[24px] shadow-2xl border-2 border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_2px_1px_white] p-6 md:p-8 w-[99%] md:w-full md:max-w-md z-10 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col items-center gap-4 mb-6 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-blue-200 shadow-[0_4px_0_#93c5fd] border border-blue-200 flex items-center justify-center shrink-0">
                                    <span className="text-xl">🔑</span>
                                </div>
                                <h3 className="text-[1.35rem] font-black text-slate-800 leading-tight">Recuperar Senha</h3>
                            </div>
                            <p className="text-slate-600 font-bold text-sm px-2 leading-relaxed">
                                Enviaremos um link seguro para o seu e-mail para você redefinir sua senha.
                            </p>
                        </div>

                        <form onSubmit={handleResetPassword}>
                            <div className="mb-6 space-y-2 text-left">
                                <label className="text-slate-500 text-[13px] font-bold ml-1">Email Cadastrado</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xl">📧</span>
                                    <input
                                        type="email"
                                        required
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        placeholder="seu@email.com"
                                        className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200/60 bg-[#F8FAFC] text-slate-700 text-sm focus:outline-none focus:border-blue-500 transition-all font-bold placeholder-slate-400 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.05)]"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowResetModal(false)}
                                    className="flex-1 h-12 rounded-2xl bg-slate-200 text-slate-600 font-black text-[17.5px] border border-slate-300 shadow-[0_1px_0_#CBD5E1] hover:bg-slate-300 active:translate-y-[1px] active:shadow-none transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isResetting}
                                    className="flex-1 h-12 rounded-2xl bg-blue-600 text-white font-black text-[17.5px] shadow-[0_1px_0_#1E3A8A] hover:bg-blue-700 active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-70 flex items-center justify-center"
                                >
                                    {isResetting ? <Loader2 size={18} className="animate-spin" /> : 'Enviar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
