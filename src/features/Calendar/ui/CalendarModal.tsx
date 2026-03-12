'use client';

import { useState } from 'react';
import { Cancel } from '@/shared/asset/svg/Cancel';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  range: { start: Date | null; end: Date | null };
  onAdd: (title: string, color: string) => void;
}

const COLORS = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF'];

export function CalendarModal({ isOpen, onClose, range, onAdd }: CalendarModalProps) {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  if (!isOpen || !range.start) return null;

  const formDate = (date: Date) =>
    `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`;

  const handleAdd = () => {
    if (!title.trim()) return;  
    onAdd(title, selectedColor);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex z-50 items-center justify-center bg-black/40 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">일정 추가</h2>
          <button onClick={onClose} className="cursor-pointer">
            <Cancel />
          </button>
        </div>

        <div className="bg-main-card p-3 rounded-lg">
          {formDate(range.start)} {range.end && `~ ${formDate(range.end)}`}
        </div>

        <div className="flex flex-col gap-2">
          <span>일정 이름</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 계획서 제출"
            className="bg-main-card px-4 py-3 rounded-lg focus:ring-2 focus:ring-main-60 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span>색상</span>
          <div className="flex justify-between">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${selectedColor === color ? 'scale-120 ring-2 ring-offset-1 ring-gray-100' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="bg-main font-bold text-white py-3 rounded-lg cursor-pointer mt-2"
        >
          추가하기
        </button>
      </div>
    </div>
  );
}
