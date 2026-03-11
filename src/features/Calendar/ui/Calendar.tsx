'use client';

import { useState, useRef, useEffect } from 'react';
import { CalendarModal } from './CalendarModal';
import { Cancel } from '@/shared/asset/svg/Cancel';

const DAY_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const ALL_MONTHS = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

export interface Calendar_Modal {
  id: number;
  startDate: Date;
  endDate: Date;
  title: string;
  color: string;
}

export function Calendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState<Calendar_Modal[]>([]);
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const gapDate = (num: number) => String(num).padStart(2, '0');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClick = (date: Date) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
    } else {
      if (date < range.start) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ ...range, end: date });
      }
      setIsModalOpen(true);
    }
  };

  const addSchedule = (title: string, color: string) => {
    if (range.start && range.end) {
      const newSchedule: Calendar_Modal = {
        id: Date.now(),
        startDate: range.start,
        endDate: range.end,
        title,
        color,
      };
      setSchedules([...schedules, newSchedule]);
      setRange({ start: null, end: null });
    }
  };

  const deleteSchedule = (id: number) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const getDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const fristDayIndex = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < fristDayIndex; i++) {
      days.push({ day: null, fullDate: null });
    }
    for (let d = 1; d <= lastDate; d++) {
      days.push({ day: d, fullDate: new Date(year, month, d) });
    }
    return days;
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      const activeButton = scrollRef.current.querySelector('[data-active="true"]');
      if (activeButton) {
        const parent = scrollRef.current;
        const child = activeButton as HTMLElement;

        const scrollLeft = child.offsetLeft - parent.offsetWidth / 2 + child.offsetWidth / 2;
        parent.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [viewDate]);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center font-bold">
        {`${viewDate.getFullYear()}. ${gapDate(viewDate.getMonth() + 1)}. ${gapDate(viewDate.getDate())}`}
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 no-scrollbar scroll-smooth py-2 px-45"
        >
          {ALL_MONTHS.map((m, idx) => {
            const isCurrent = viewDate.getMonth() === idx;
            return (
              <button
                key={m}
                data-active={isCurrent}
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), idx, 1))}
                className={`flex-shrink-0 text-sm cursor-pointer ${
                  isCurrent
                    ? 'scale-110 bg-black text-white rounded-full px-3 py-1'
                    : 'text-gray-80 font-medium'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-7 text-center font-bold text-main     ">
        {DAY_OF_WEEK.map((name, i) => (
          <span key={i}>{name}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 ">
        {getDays().map((item, index) => {
          const isSelected =
            item.fullDate &&
            (range.start?.toDateString() === item.fullDate.toDateString() ||
              range.end?.toDateString() === item.fullDate.toDateString() ||
              (range.start &&
                range.end &&
                item.fullDate > range.start &&
                item.fullDate < range.end));

          const isToday = item.fullDate && item.fullDate.toDateString() === today.toDateString();

          return (
            <div key={index} className="flex items-center justify-center h-10">
              {item.day && (
                <button
                  onClick={() => item.fullDate && handleClick(item.fullDate)}
                  className={`w-12 h-8 rounded-2xl pt-1 cursor-pointer
                    ${isSelected ? 'bg-main text-white' : ''} 
                    ${!isSelected && isToday ? 'text-main font-bold border' : ''}`}
                >
                  {item.day}
                  <div className="flex justify-center gap-1 mt-1 absolute left-0 right-0 relative">
                    {schedules.map((s) => {
                      if (!item.fullDate) return null;

                      const d = new Date(item.fullDate).setHours(0, 0, 0, 0);
                      const start = new Date(s.startDate).setHours(0, 0, 0, 0);
                      const end = new Date(s.endDate).setHours(0, 0, 0, 0);

                      if (d >= start && d <= end) {
                        return (
                          <div
                            key={s.id}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: s.color }}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <p className="my-2 font-bold">등록된 일정 ({schedules.length})</p>
        <div className="flex flex-col gap-2">
          {schedules.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between py-2 px-3 rounded-lg group bg-white"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full mx-2"
                  style={{ backgroundColor: s.color }}
                ></div>
                <div>
                  <p>{s.title}</p>
                  <p>
                    {s.startDate.toLocaleDateString()} - {s.endDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button onClick={() => deleteSchedule(s.id)} className="cursor-pointer mx-2">
                <Cancel />
              </button>
            </div>
          ))}
        </div>
      </div>

      <CalendarModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setRange({ start: null, end: null });
        }}
        range={range}
        onAdd={addSchedule}
      />
    </div>
  );
}
