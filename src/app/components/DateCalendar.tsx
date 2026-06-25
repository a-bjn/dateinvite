"use client";

import { useMemo, useState } from "react";

interface DateCalendarProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onContinue: () => void;
}

const WEEKDAYS = ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"];
const MONTHS = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function DateCalendar({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onContinue,
}: DateCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const days = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (Date | null)[] = [];

    for (let i = 0; i < startPad; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(viewYear, viewMonth, d));
    }
    return cells;
  }, [viewMonth, viewYear]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const canContinue = selectedDate && selectedTime;

  return (
    <div className="w-full max-w-md animate-fade-in-up relative z-30">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.25em] mb-2" style={{ color: "#b07050" }}>
          Pasul 1 din 2
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-2" style={{ color: "#7a4030" }}>
          Alege o zi 🌸
        </h2>
        <p className="text-base font-light" style={{ color: "#a06050" }}>
          Alege o dată și o oră care ți se potrivesc
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 md:p-8 relative z-10">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={prevMonth}
            className="calendar-nav-btn"
            aria-label="Luna anterioară"
          >
            ‹
          </button>
          <h3 className="text-lg font-medium" style={{ color: "#6a3828" }}>
            {MONTHS[viewMonth]} {viewYear}
          </h3>
          <button
            type="button"
            onClick={nextMonth}
            className="calendar-nav-btn"
            aria-label="Luna următoare"
          >
            ›
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-center text-xs uppercase tracking-wider py-1"
              style={{ color: "#c08060" }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1 mb-8">
          {days.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} />;

            const isPast = date.getTime() < today.getTime();
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const isToday = isSameDay(date, today);

            return (
              <button
                key={date.toISOString()}
                type="button"
                disabled={isPast}
                onClick={() => onSelectDate(date)}
                className={`calendar-day ${isSelected ? "calendar-day--selected" : ""} ${isToday ? "calendar-day--today" : ""} ${isPast ? "calendar-day--disabled" : ""}`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {/* Time slots */}
        <div>
          <p
            className="text-xs uppercase tracking-widest mb-3 text-center"
            style={{ color: "#b07050" }}
          >
            Alege ora
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["18:00", "18:30", "19:00", "19:30", "20:00"].map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => onSelectTime(time)}
                className={`time-slot ${selectedTime === time ? "time-slot--selected" : ""}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className="btn-yes text-white rounded-full px-12 py-4 text-lg font-medium tracking-wide w-full max-w-xs mx-auto block mt-8 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
      >
        Continuă 🌷
      </button>
    </div>
  );
}
