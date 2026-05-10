"use client";

import { useState, useEffect, useRef } from 'react';
import Calendar from '@/components/Calendar';
import { format } from 'date-fns';
import InstallPWAButton from '@/components/InstallPWAButton';
import { useCalendarMode } from '@/hooks/use-calendar-mode';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const navigate = useNavigate();
  const { profile, isAuthenticated } = useAuth();
  const { setMode } = useCalendarMode();

  // Sincronizar escala do perfil ao carregar
  useEffect(() => {
    if (isAuthenticated && profile?.escala) {
      const savedEscala = profile.escala;
      // Mapear se necessário (ex: 'Adm' -> 'adm')
      if (savedEscala === 'Adm') {
        setMode('adm');
      } else if (savedEscala === '12x36' || savedEscala === '24x48') {
        setMode(savedEscala);
      }
    }
  }, [isAuthenticated, profile?.escala, setMode]);

  const handleMonthChange = (newMonth: number) => {
    setCurrentMonth(newMonth);
  };

  const handleYearChange = (newYear: number) => {
    setCurrentYear(newYear);
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const formatToday = () => {
    return format(today, 'dd/MM/yyyy');
  };

  return (
    <>
    <div className="min-h-screen flex flex-col bg-transparent">
      <div className="flex-1 flex flex-col items-stretch justify-start px-4 py-2 lg:p-0 gap-y-2 overflow-x-hidden">
        <Header />

        {/* Wrapper de Escala apenas para Desktop - Aplica o padding-top p/ header fixo lg:pt-0 agora, compensado no Calendar */}
        <div className="w-full flex flex-col items-stretch justify-start">

          <main className="w-full flex flex-col items-stretch">
            <Calendar
              month={currentMonth}
              year={currentYear}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              goToToday={goToToday}
              formatToday={formatToday}
            />
          </main>

          <InstallPWAButton />
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Index;