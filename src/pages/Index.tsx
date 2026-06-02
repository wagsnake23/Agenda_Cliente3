import { useState, useEffect, useMemo, useCallback } from 'react';
import Calendar from '@/components/Calendar';
import { format, addMonths, subMonths } from 'date-fns';
import InstallPWAButton from '@/components/InstallPWAButton';
import { useCalendarMode } from '@/hooks/use-calendar-mode';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import { useAgendamentos } from '@/hooks/useAgendamentos';
import { useCalendarEventsContext } from '@/context/CalendarEventsContext';
import { useCalendarData } from '@/hooks/use-calendar-data';
import { getDynamicHolidays, getNationalHolidays } from '@/lib/dynamicHolidays';
import type { CalendarEvent } from '@/hooks/use-calendar-events';

const Index = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [viewMode, setViewMode] = useState<'mensal' | 'anual'>('mensal');
  const [isYearPopoverOpen, setIsYearPopoverOpen] = useState(false);
  
  const navigate = useNavigate();
  const { profile, isAuthenticated } = useAuth();
  const { mode, setMode } = useCalendarMode();
  const { agendamentos: agendamentosDB } = useAgendamentos();
  const { events: calendarEvents } = useCalendarEventsContext();

  // Sincronizar escala do perfil ao carregar
  useEffect(() => {
    if (isAuthenticated && profile?.escala) {
      const savedEscala = profile.escala;
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

  const handlePrevMonthMobile = useCallback(() => {
    if (viewMode === 'anual') {
      setCurrentYear(prev => prev - 1);
      return;
    }
    const prevDate = subMonths(new Date(currentYear, currentMonth, 1), 1);
    setCurrentMonth(prevDate.getMonth());
    setCurrentYear(prevDate.getFullYear());
  }, [currentMonth, currentYear, viewMode]);

  const handleNextMonthMobile = useCallback(() => {
    if (viewMode === 'anual') {
      setCurrentYear(prev => prev + 1);
      return;
    }
    const nextDate = addMonths(new Date(currentYear, currentMonth, 1), 1);
    setCurrentMonth(nextDate.getMonth());
    setCurrentYear(nextDate.getFullYear());
  }, [currentMonth, currentYear, viewMode]);

  const yearOptions = useMemo(() => {
    const currentYearRef = new Date().getFullYear();
    const years = [];
    for (let i = currentYearRef - 2; i <= currentYearRef + 3; i++) {
      years.push(i);
    }
    return years;
  }, []);

  const enrichedEvents = useMemo(() => {
    const systemEvents = [
      ...getDynamicHolidays(currentYear),
      ...getNationalHolidays(currentYear)
    ].map(ev => ({
      ...ev,
      description: null // Garantir que satisfaz a interface CalendarEvent
    })) as CalendarEvent[];

    return [...calendarEvents, ...systemEvents];
  }, [currentYear, calendarEvents]);

  const { todayColors } = useCalendarData({
    month: today.getMonth(),
    year: today.getFullYear(),
    today,
    mode,
    calendarEvents: enrichedEvents
  });

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  const todayAppointmentsCount = useMemo(() => {
    const countAgs = agendamentosDB.filter(ag => ag.data_inicial === todayStr).length;
    const countEvents = calendarEvents.filter(ev => {
      const datePart = ev.date.includes('T') ? ev.date.split('T')[0] : (ev.date.includes(' ') ? ev.date.split(' ')[0] : ev.date);
      return datePart === todayStr && (ev.type === 'holiday' || ev.type === 'event');
    }).length;
    return countAgs + countEvents;
  }, [agendamentosDB, calendarEvents, todayStr]);

  return (
    <>
    <div className="min-h-screen flex flex-col items-stretch justify-start px-4 pt-0 pb-0 lg:p-0 gap-y-2 overflow-x-hidden bg-[#f8faff] md:bg-[#FFFFFF]">
      
      {/* Mobile Unified Fixed Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[110] mobile-fixed-header-bg px-4 pt-1">
        <Header />
        <div className="pb-0.5 mt-2">
          <CalendarHeader
            month={currentMonth}
            year={currentYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            handlePrevMonth={handlePrevMonthMobile}
            handleNextMonth={handleNextMonthMobile}
            yearOptions={yearOptions}
            isYearPopoverOpen={isYearPopoverOpen}
            setIsYearPopoverOpen={setIsYearPopoverOpen}
            goToToday={goToToday}
            formatToday={formatToday}
            todayColors={todayColors}
            scaleType={mode}
            setScaleType={setMode}
            todayAppointmentsCount={todayAppointmentsCount}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-stretch justify-start px-0 lg:p-0 pt-[123px] lg:pt-2 pb-0 lg:gap-y-2 overflow-x-hidden">
        
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>

        <div className="w-full flex flex-col items-stretch justify-start">
          <main className="w-full flex flex-col items-stretch px-0">
            <Calendar
              month={currentMonth}
              year={currentYear}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              goToToday={goToToday}
              formatToday={formatToday}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
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